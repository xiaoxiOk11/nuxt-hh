<script setup>
import { onMounted } from 'vue';
const pages = ref({
    page: 1,
    size: 10,
})
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const showVanSkeletonLoading = ref(true)
const recordList = ref([])
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
}


onMounted(() => {
    getRecordList()
})


</script>


<template>
    <div class=" hasBgContent">

        <div class="container">

            <div class=" recordPage   f13">
                <van-skeleton v-if="showVanSkeletonLoading">
                    <template #template>
                        <div class="recordItem mb20 " style="height: 130px;" v-for="(item, index) in 3" :key="index">
                        </div>
                    </template>
                </van-skeleton>

                <div v-else>
                   
                    <van-list v-model:loading="loading" :finished="finished" :error-text="$t('all.r2')"
                        :loading-text="$t('all.r3')" :finished-text="$t('all.r1')" @load="getRecordList">
                        <div class="recordItem f14 mb20" v-for="(item, index) in recordList" :key="index">
                            <div class="  between ">
                                <div>{{ t('record.r6') }}</div>
                                <div class="">{{ item.order_no }}</div>
                            </div>
                            <div class="mt10  between">
                                <div>{{ t('record.r14') }}</div>

                                <div v-if="item.production_channel?.pact">{{ item.production_channel?.name + '-' +
                                    item.production_channel?.pact
                                    }}
                                </div>
                                <div v-else>
                                    {{ item.production_channel?.name }}
                                </div>
                            </div>
                            <div class=" mt10 between ">
                                <div>{{ t('record.r8') }} </div>
                                <div class="">{{ item.amount + " " + item.unit }}</div>
                            </div>


                            <div class=" mt10 between ">
                                <div>{{ t('record.r10') }} </div>
                                <div class="">{{ item.arrive_amount + " " + item.unit }}</div>
                            </div>

                            <div class=" mt10 between ">
                                <div>{{ t('record.r12') }} </div>
                                <div
                                    :class="item.status == 0 ? ' colorff9' : item.status == 1 ? 'colorUp' : item.status == 2 ? 'colorCA' : 'colorDown'">
                                    {{ rechargeStatus[item.status] }}</div>
                            </div>
                            <div class=" mt10 between " v-if="item.remark">
                                <div>{{ t('record.r13') }}</div>
                                <div class="">{{ item.remark }}</div>
                            </div>
                            <div class=" mt10 between ">
                                <div>{{ t('record.r9') }} </div>
                                <div class="">{{ item.createTime }}</div>
                            </div>
                        </div>
                    </van-list>
                </div>
            </div>
        </div>
    </div>
</template>

