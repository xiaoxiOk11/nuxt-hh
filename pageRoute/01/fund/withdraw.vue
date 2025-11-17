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
        <div class="mt20 balanceBoxEl">
          <div class="f20">Withdrawable</div>
          <div class="mt20">
            <span class="f26 text_bold mainTextColor">0.00</span>
            <span class="ml10">USDT</span>
          </div>
          <div class="mt20 between f20">
            <span>Amount to be processed</span>
            <span>0 USDT</span>
          </div>
        </div>
      </div>

      <div class="mt20">
        <div>Payment method</div>
        <div class="mt20 gridBox2El">
          <div
            class="flex col_center coinTypeItem toPointer"
            v-for="item in coinTypeList"
            :key="item.id"
            :class="{ actCoinTypeEl: item.pro_code === actCoinTypeId }"
            @click="changeSelectCoin(item)"
          >
            <van-image :src="item.pro_img" class="ww-30 hh-30"></van-image>
            <span class="ml10">{{ item.title }}</span>
          </div>
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
    coinTypeList.value = res.list;
    configInfo.value = res.config;
    actCoinTypeId.value = coinTypeList.value[0].pro_code;
    checkUserAddress();
  });
};
const checkUserAddress = () => {
  getWithdrawAddressInfo({ pro_code: actCoinTypeId.value }).then((res) => {
    console.log(res);
  });
};

const changeSelectCoin = (item) => {
  actCoinTypeId.value = item.pro_code;
};
onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.pageBoxEl {
  padding: 16px;
  color: #130040;
  .balanceBoxEl {
    background: #e5e5e5;
    padding: 20px;
    border-radius: 10px;
  }
}
.gridBox2El {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  border-radius: 10px;
  .coinTypeItem {
    padding: 10px;
    background: #e5e5e5;
    border-radius: 10px;
    color: #130040;
  }
  .actCoinTypeEl {
    background: var(--mainColor);
    color: #fff;
  }
}
</style>
