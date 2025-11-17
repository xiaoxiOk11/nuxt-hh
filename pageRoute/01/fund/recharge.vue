<template>
    <div>
        <TopNav pageTitle="Recharge">
        </TopNav>
        <div class="pageComContainer">
            <div class="pageBoxEl">
                <div class="borderDashB  between mb10 pdtb10" v-for="item in rechargeTypeList" :key="item.id" @click="selectRechargeTypeHandle(item)">
                    <div class="flex col_center">
                        <van-image :src="item.pro_img" class="ww-40 hh-40"></van-image>
                        <div class="ml10  f20">
                            {{ item.title }}
                        </div>
                    </div>

                    <UIcon name="ic:baseline-keyboard-arrow-right" class="hh-30 ww-30" />

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import TopNav from '../publicComponents/TopNavBar.vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const usePublicStore = publicStore();
const router = useRouter()
import { getRechargeTypeList } from '~/api/realse/realse'


const rechargeTypeList = computed(() => {
    return usePublicStore.rechargeTypeList
})
const getData = () => {
    getRechargeTypeList({ type: 'recharge' }).then(res => {
        usePublicStore.rechargeTypeList = res
    })
}

const selectRechargeTypeHandle = item => {
    usePublicStore.selectRechargeType = item

    router.push('/fund/rechargeCoinDetail')

}
onMounted(() => {
    getData()
})
</script>


<style lang="scss" scoped>
.pageBoxEl {
    padding: 16px;
    .borderDashB{
        color: #130040;
        border-bottom: 1px dashed  #7B797E;
    }
}
</style>