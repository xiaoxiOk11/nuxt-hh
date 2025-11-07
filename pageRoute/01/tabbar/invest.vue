<template>
    <div>
        <Header />

        <div class="pageComContainer ">
            <div class="gridBox2 typeBox">
                <div class="recodTypeEl toPointer" v-for="(item, index) in recordTypeList"
                    :class="recordTypeInd == index ?'actRecodTypeEl':''" :key="index" @click="recordTypeInd = index">
                    {{ item.name }}
                </div>
            </div>
            <div class="pageBoxEl mt30">
                <img src="" class="img">
                <div class="mt20 pdlr10">
                    <div class="f24 text_bold  mainTextColor">
                        Shenma mining machine
                    </div>
                    <div class="mt20 infoBox">
                        <div class="gridBox3">
                            <div>
                                <div class="label">Price</div>
                                <div class="value">150 USDT</div>
                            </div>
                            <div>
                                <div class="label">Daily Rate </div>
                                <div class="value">15.00%</div>
                            </div>
                            <div>
                                <div class="label">Cycle </div>
                                <div class="value">15.00%</div>
                            </div>
                        </div>
                        <div class="mt20 investBtn">
                            Invest
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

const recordTypeList = computed(() => {
    return [
        {
            name: 'Email Register',
            value:0
        },
        {
            name: 'Phone Register',
            value: 1
        },
    ]
})
const recordTypeInd = ref(0)
</script>


<style lang="scss" scoped>
.pageBoxEl {
    padding: 0 0 20px 0;
    overflow: hidden;
    .img{
        width: 100%;
        height: 400px;
        background: pink;
    }
    .infoBox{
        background: #E9E7EF;
            border-radius: 16px 16px 16px 16px;
            padding: 15px;
            .label{
                color: #7B797E;
            }
            .value{
                font-size: 16px;
                margin-top: 10px;
                font-weight: bold;
                color: var(--mainColor);
            }
            .investBtn{
                background: var(--mainColor);
                height: 60px;
                line-height: 60px;
                text-align: center;
                border-radius: 20px;
                font-size: 22px;
            }
    }
}
.typeBox{
    background: #EAE6FA;
    text-align: center;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    .recodTypeEl{
        height: 40px;
        line-height: 40px;
        color: var(--secondTextColor);
    }
    .actRecodTypeEl{
        background: #fff;
        // color: #fff;
    }
}

</style>