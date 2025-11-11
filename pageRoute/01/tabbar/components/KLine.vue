<template>
    <div>
        <div class="timeSelectBox">
            <div v-for="(item, index) in timeSelectList" :key="index" :class="item.name == timeVal ? 'timeSelectEl' : ''"
                class="timeEl toPointer" @click="changeTime(item)">{{ item.name }}</div>
        </div>
        <div id="klineChartBox">
        </div>
    </div>
</template>


<script setup>
import { init } from 'klinecharts'
import { getKlineStyles } from './klineStyle';

const chartRef = ref("")
const timeVal = ref("1min")
const timeSelectList = ref([
    {
        name: '1min',
        value: '1min',
    },
    {
        name: '5min',
        value: '5min',
    }, {
        name: '15min',
        value: '15min',
    }, {
        name: '30min',
        value: '30min',
    }, {
        name: '60min',
        value: '60min',
    },
    {
        name: '4hour',
        value: '4hour',
    },
    {
        name: '1day',
        value: '1day',
    },
])

const changeTime = item => {
    console.log('item', item);
    timeVal.value = item.name
}
onMounted(() => {
    chartRef.value = init('klineChartBox')
    chartRef.value.setStyles(getKlineStyles());

    fetch('https://klinecharts.com/datas/kline.json')
        .then(res => res.json())
        .then(dataList => {
            chartRef.value.applyNewData(dataList);
        })

})
</script>


<style lang="scss" scoped>
#klineChartBox {
    // position: relative;
    width: 100%;
    height: 250px;

    .chartLoading {
        background: rgba(255, 255, 255, 1);
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 120%;
        z-index: 99;
    }
}

.timeSelectBox {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    color: #626060;

    .timeSelectEl {
        color: #fff;
        position: relative;

        &::after {
            display: block;
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 4px;
            width: 70%;
            bottom: -10px;
            background: #fff;
            border-radius: 50px;
        }
    }

}
</style>