<template>
    <div>
        <TopNav pageTitle="Recharge">
        </TopNav>
        <div class="pageComContainer">
            
        </div>

    </div>
</template>

<script setup>
import TopNav from '../publicComponents/TopNavBar.vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const usePublicStore = publicStore();
import { getRechargeTypeList, getRechargeInfo } from '~/api/realse/realse'

const selectRechargeType = computed(() => {
    return usePublicStore.selectRechargeType
})
console.log('selectRechargeType.value',selectRechargeType.value);

onMounted(() => {

})
</script>


<style lang="scss" scoped>
.pageBoxEl {
    padding: 16px;
    
}
</style>