<template>
  <div>
    <TopNav pageTitle="Withdraw"> </TopNav>
    <div class="pageComContainer">
      <div class="pageBoxEl">
        <div class="between">
          <div class="flex col_center">
            <van-image :src="webSiteData.logo" radius="5" class="ww-30 hh-30" />
            <div class="ml10 f20">
              {{ webSiteData.front_site_name }}
            </div>
          </div>
          <van-image :src="recIco" radius="5" class="ww-30 hh-30" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import recIco from "~/assets/images/01/icon/recIco.png";

import TopNav from "../publicComponents/TopNavBar.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
import { getWithdrawAddressInfo, getWithdrawInfo } from "~/api/realse/realse";

const usePublicStore = publicStore();
const router = useRouter();
const webSiteData = computed(() => {
  return usePublicStore.webSiteData;
});
const actCoinTypeId = ref(0);
const coinTypeList = ref([]);
const configInfo = ref({});
const getData = () => {
  getWithdrawInfo({
    type: "withdraw",
  }).then((res) => {
    console.log(res);
    coinTypeList.value = res.list;
    configInfo.value = res.config;
    actCoinTypeId.value = coinTypeList.value[0].pro_code;
    checkUserAddress();
  });
};
const checkUserAddress = () => {
  getWithdrawAddressInfo({ id: actCoinTypeId.value }).then((res) => {
    console.log(res);
  });
};
onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.pageBoxEl {
  padding: 16px;
  color: #130040;
}
</style>
