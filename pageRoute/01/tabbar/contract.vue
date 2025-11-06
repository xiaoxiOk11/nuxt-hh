<template>
    <div>
        Contract
        <div class="pageComContainer">
            <div class="">
                <div id="klineChartBox">
                </div>
            </div>
        </div>
        <Tabbar />
    </div>
</template>

<script setup>
import Tabbar from '../publicComponents/Tabbar.vue';
import { init } from 'klinecharts'
import { getKlineStyles } from './klineStyle';

const chartRef = ref("")

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
</style>