<template>
    <div>
        <Header />
        <div class="pageComContainer">
            <div class="vipCardBox pageBoxEl">
                <div class="between">
                    <div class="flex col_center">
                        <img src="~/assets/images/01/icon/q_v.png" class="ww-30 hh-30">
                        <div class="ml10 f20 text_bold mainTextColor">
                            VIP1
                        </div>
                    </div>
                    <div>
                        <img src="~/assets/images/01/icon/q_rec.png" class="ww-30 hh-30">

                    </div>
                </div>

                <div class="mt10  gridBox2">
                    <div class="gridBox2ItemEl f15" v-for="(item, index) in cardInfo" :key="index">
                        <div class="flex1 label">{{ item.name }}</div>
                        <div class="ml5 value">{{ item.value }}</div>

                    </div>
                </div>
            </div>

            <div class="mt20  colorfff  f14 ">
                <div class="center">
                    <div>Quantify Reset Time</div>
                    <div class="mglr10">Reset Complete</div>
                    <div class="f20 text_bold">0 / 1</div>
                </div>
                <div class="textRight mt15">
                    Transaction Record>>
                </div>
            </div>

            <div class="mt30 start-quantify-btn f18 toPointer">
                <span class="text_bold">0/5</span> Start Quantify
            </div>
        </div>

        <Tabbar />
    </div>
</template>

<script setup>
import Header from '../publicComponents/Header.vue';
import Tabbar from '../publicComponents/Tabbar.vue';
import { countryApi } from '~/api/home/home'
const getData = () => {
    countryApi().then(res => {
        console.log('res',res);
    })
}
getData()

const cardInfo = [
    {
        name: 'Trial Fee',
        value:0
    },
    {
        name: 'Profit Assets',
        value: 0
    },
    {
        name: "Today's Earnings",
        value: 0
    },
    {
        name: "Total Revenue",
        value: 0
    },
    {
        name:  "Quantification Times Per Day",
        value: 0
    },
    {
        name:  "Profit Ratio",
        value: 0
    },
    {
        name:  "Quantifiable Number Of Days",
        value: 0
    },
    {
        name:  "Countdown Days",
        value: 0
    },
]
</script>


<style lang="scss" scoped>
.pageBoxEl{
    padding: 16px;
    background: #F6F3FC;
    .gridBox2ItemEl{
        display: flex;
        justify-content: space-between;
        .label{
            color: #7B797E;
        }
        .value{
            color: #130040;
        }
    }
}
.start-quantify-btn {
    text-align: center;
        height: 60px;
        line-height: 60px;
        /* 让单行文字垂直居中 */
        color: white;
        /* 假设文字是白色的 */
    
        /* 背景 */
        background: #623CBF;
    
        border-radius: 16px;
        // border: 1px solid transparent;
        background-clip: padding-box;
        border-top: 2px solid #fff;
}

</style>