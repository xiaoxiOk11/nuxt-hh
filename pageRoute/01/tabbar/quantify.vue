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

            <div class="mt30">
                <div class="pageBoxEl mb20 vipListItem" v-for="(item, index) in 3" :key="index">
                    <div class="between">
                        <div class="text_bold f20 colorSecond">VIP {{ item }}</div>
                        <div class="lowBtn" v-if="item <2">Up Than This Level</div>
                        <div class="mainTextColor" v-else-if="item == 2">Current Level</div>

                        <div class="upBtn" v-else>Click To Unlock</div>
                    </div>
                    <div class="mt10 gridBox2">
                        <div class="gridBox2ItemEl">
                            <div class="label">
                                Quantification Times Per Day
                            </div>
                            <div class="value">1</div>
                        </div>
                        <div class="gridBox2ItemEl">
                            <div class="label">
                                Profit Ratio
                            </div>
                            <div class="value">1</div>
                        </div>
                        <div class="gridBox2ItemEl">
                            <div class="label">
                                Minimum Unlock Amount
                            </div>
                            <div class="value">1</div>
                        </div>
                        <div class="gridBox2ItemEl">
                            <div class="label">
                                Quantifiable Number Of Days
                            </div>
                            <div class="value">1</div>
                        </div>
                    </div>
                    <div class="mt20 text_bold text_center f20 colorSecond">
                        VIP Preferred Strategy
                    </div>
                    <div class="mt20 infoBox " v-if="item == 2">
                        <div class="between ">
                            <div class="popBtn">Popular</div>
                            <div class="colorSecond flex col_center">
                                Check
                                <img src="~/assets/images/01/icon/right_fill.png" class="ww-20 hh-20">
                            </div>
                        </div>
                        <div class="mt20 gridBox4">
                            <div class="grid4ItemEl flex col_center colorSecond">
                                <img src="~/assets/images/01/icon/p1.png" class="ww-30 hh-30">
                                <div class="ml5">Huobi</div>
                            </div>
                            <div class="grid4ItemEl flex col_center colorSecond">
                                <img src="~/assets/images/01/icon/p2.png" class="ww-30 hh-30">
                                <div class="ml5">Binance</div>
                            </div>
                            <div class="grid4ItemEl flex col_center colorSecond">
                                <img src="~/assets/images/01/icon/p3.png" class="ww-30 hh-30">
                                <div class="ml5">CoinBase</div>
                            </div>
                            <div class="grid4ItemEl flex col_center colorSecond">
                                <img src="~/assets/images/01/icon/p4.png" class="ww-30 hh-30">
                                <div class="ml5">OKX</div>
                            </div>
                        </div>
                    </div>
                </div>
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
    .lowBtn{
        color: #ACACC7;
    }
    .upBtn{
        background: #F9DEC9;
        color: #000;
        padding: 10px;
        border-radius: 8px 11px;
    }
}
.vipListItem{
    background: #fff;
    .infoBox {
            background: #F5F3FC;
            padding: 10px;
            border-radius: 10px;
            .popBtn{
                background: var(--mainColor);
                padding: 10px;
                border-radius: 50px;
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