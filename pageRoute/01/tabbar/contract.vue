<script setup>
import TopNav from '../publicComponents/TopNav.vue';
import KLine from './components/KLine.vue';
import leftCoinPop from '../publicComponents/leftCoinPop.vue';

const recordType = ref(0)
const recordTypeList = ref([
    {
        name: 'In progress',
        value: "0"
    },
    {
        name: 'Settled',
        value: "1"

    },
])

const changeRecordType = item => {
    recordType.value = item.value
}

const recordList = ref([])
const showVanSkeletonLoading = ref(true)
const loading = ref(true)
const finished = ref(false)
const totalSize = ref(0)

const getRecordList = () => {
    // rechargeRecordList(pages.value).then(res => {
    //     totalSize.value = res.total
    //     recordList.value = recordList.value.concat(res.data)
    // }).finally(() => {
    //     loading.value = false
    //     if (recordList.value.length == totalSize.value) {
    //         finished.value = true
    //     } else {
    //         pages.value.page++;
    //     }
    //     showVanSkeletonLoading.value = false
    // })
    loading.value = false
    showVanSkeletonLoading.value = false
    recordList.value = [1,2]
}

const leftCoinPopRef = ref("")
onMounted(() => {
    getRecordList()
})

</script>


<template>
    <div>
        <TopNav pageTitle="Contract">
        </TopNav>

        <div class="pageComContainer">
            <div class="flex col_center f20">
                <UIcon name="material-symbols:menu-rounded" class="hh-30 ww-30 toPointer"
                    @click="leftCoinPopRef.showLeftPop = true" />
                <leftCoinPop ref="leftCoinPopRef" />

                <div class="ml10 ">
                    BTC/USDT
                </div>
                <div class="ml10 flex col_center">
                    798712 <span class="f12 ml5">+0.98%</span>
                </div>
                <!-- -->
            </div>
            <div class="mt20">
                <KLine />
            </div>

            <div class="mt20">
                <div class="f18">Historical orders</div>
                <div class="recordTypeBox gridBox2 mt20">
                    <div class="recordItemEl toPointer" :class="recordType == item.value ? 'actRecordType' : ''"
                        v-for="(item, index) in recordTypeList" :key="index" @click="changeRecordType(item)">
                        {{ item.name }}
                    </div>

                </div>
                <!-- <div class="mt20">
                    <div class="nullData"></div>
                    <div class="text_center color999">Empty</div>
                </div> -->
                <div class=" recordPage  mt20  f13">
                    <van-skeleton v-if="showVanSkeletonLoading">
                        <template #template>
                            <div class="recordItem mb20 " style="height: 130px;" v-for="(item, index) in 3"
                                :key="index">
                            </div>
                        </template>
                    </van-skeleton>

                    <div v-else>

                        <van-list v-model:loading="loading" :finished="finished" :error-text="$t('all.r2')"
                            :loading-text="$t('all.r3')" :finished-text="$t('all.r1')" @load="getRecordList">
                            <div class="recordItem f14 mb20" v-for="(item, index) in recordList" :key="index">
                                <div class="between">
                                    <div class="flex col_center f18 text_bold">
                                        <span v-if="index == 0" class="colorUp">Buy up</span>
                                        <span v-else class="colorDown">Buy Down</span>

                                        <span class="ml10">BTC/USDT</span>
                                    </div>
                                    <div class="f14 ">
                                        10/02/2025 13:51:51
                                    </div>
                                </div>
                                <div class="gridBox3 mt20 ">
                                    <div class="text-left">
                                        <div>Amount(USDT)</div>
                                        <div>100</div>
                                    </div>
                                    <div class="text-left">
                                        <div>Profit/loss probability</div>
                                        <div>50%</div>
                                    </div>
                                    <div class="text-right">
                                        <div>Contract Time</div>
                                        <div>50s</div>
                                    </div>
                                    <div class="text-left">
                                        <div>Admission Price</div>
                                        <div>100</div>
                                    </div>
                                    <div class="text-left">
                                        <div>Closing Price</div>
                                        <div>50%</div>
                                    </div>
                                    <div class="text-right">
                                        <div>State</div>
                                        <div>
                                            <span class="colorDown" v-if="index == 0">Loss</span>
                                            <span class="colorUp" v-else>Win</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </div>
                </div>
            </div>
        </div>
        <div class="hh-80"></div>
        <div class="fixedBotBtn">
            <div class="gridBox2 pdlr20">
                <div class="buyBtn">Buy up</div>
                <div class="sellBtn">Buy Down</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.recordTypeBox {
    height: 40px;
    background: #EAE6FA;
    text-align: center;
    line-height: 40px;
    color: #000;
    border-radius: 10px 10px 0 0;
    overflow: hidden;

    .actRecordType {
        background: #fff;
    }
}
.gridBox3{
    gap: 10px;
    grid-template-columns: 1.2fr 1.5fr 1fr;
    .text-left,.text-right{
        div:nth-child(1){
            height: 24px;
        }
        div:nth-child(2){
            font-size: 16px;
        }
        
    }
    .text-right{
        text-align: right;
    }

}
</style>