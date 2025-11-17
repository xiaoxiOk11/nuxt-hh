<template>
  <div>
    <TopNav pageTitle="Recharge"> </TopNav>
    <div class="pageComContainer">
      <div class="pdlr20 mt30">
        <div
          v-for="item in pageData.list"
          class="flex col_center balanceItemEl toPointer"
          :class="{ activeBalanceItemEl: item.code === initBalance }"
          @click="selectBalanceItem(item)"
        >
          <div>
            <div v-if="item.code === initBalance">
              <UIcon
                name="material-symbols:check-circle-rounded"
                class="hh-20 ww-20"
              />
            </div>
            <div v-else>
              <UIcon name="ic:outline-circle" class="hh-20 ww-20" />
            </div>
          </div>
          <div class="ml10">
            <div class="title">{{ item.title }}</div>
            <div class="mt5">{{ item.info }}</div>
          </div>
        </div>
      </div>

      <div class="text_center mt20">
        <div class="center">
          <van-image :src="pageData.info.pro_img" class="ww-40 hh-40" />
          <div class="ml10 f20">{{ pageData.info.title }}</div>
        </div>
        <div class="center mt20">
          <div class="qrcodeBoxEl">
            <QrcodeVue
              :value="qrcodeVal"
              :size="150"
              level="H"
              :margin="2"
              render-as="svg"
              :background="'#ffffff'"
              :foreground="'#000000'"
              :radius="10"
            />
          </div>
        </div>
        <div class="mt20 f20">Recharge Address</div>
      </div>

      <div class="mt20 addressBoxEl">
        <div class="between">
          <div class="flex col_center">
            <van-image :src="webSiteData.logo" radius="5" class="ww-30 hh-30" />
            <div class="ml10 f20">
              {{ webSiteData.front_site_name }}
            </div>
          </div>
          <van-image :src="recIco" radius="5" class="ww-30 hh-30" />
        </div>
        <div class="mt10 linkContentEl between">
          <div class="linkEl">{{ qrcodeVal }}</div>
          <div class="copyBtn toPointer" @click="copyHandle(qrcodeVal)">
            Copy
          </div>
        </div>
        <div class="mt20 contentBtn toPointer">Recharge Complete</div>
      </div>
      <div class="pageBoxEl mt20" v-if="pageData.info.des">
        <div v-html="pageData.info.des"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNav from "../publicComponents/TopNavBar.vue";
import { useI18n } from "vue-i18n";
import QrcodeVue from "qrcode.vue";
import recIco from "~/assets/images/01/icon/recIco.png";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
const { t } = useI18n();

const usePublicStore = publicStore();
import { getRechargeTypeList, getRechargeInfo } from "~/api/realse/realse";
import { showToast } from "vant";

const selectRechargeType = computed(() => {
  return usePublicStore.selectRechargeType;
});
const initBalance = ref("");
const selectBalanceItem = (item) => {
  initBalance.value = item.code;
};
const pageData = ref({
  list: [],
  info: {
    pro_img: "",
    title: "",
    des: "",
  },
});
const copyHandle = async (val) => {
  await toClipboard(val).then(() => {
    showToast("Copy Success");
  });
};
const qrcodeVal = ref(""); //二维码值

const webSiteData = computed(() => {
  return usePublicStore.webSiteData;
});

const getCoinInfo = () => {
  getRechargeInfo({
    id: selectRechargeType.value.id,
  }).then((res) => {
    pageData.value = res;
    qrcodeVal.value = res.address;
    initBalance.value = res.init_balance;
  });
};
onMounted(() => {
  getCoinInfo();
  usePublicStore.updateUserInfo();
});
</script>

<style lang="scss" scoped>
.contentBtn {
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  color: #fff;
}
.addressBoxEl {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  color: #130040;
  .linkContentEl {
    background: #f5f3fc;
    padding: 10px;
    border-radius: 5px;
    .linkEl {
      word-break: break-all;
      color: #7b7f95;
    }
    .copyBtn {
      margin-left: 10px;
      background: var(--mainColor);
      color: #fff;
      padding: 10px;
      border-radius: 5px;
    }
  }
}
.balanceItemEl {
  background: var(--secondBoxBg);
  padding: 15px;
  border-radius: 10px;
  color: #130040;
  margin-bottom: 20px;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
}
.activeBalanceItemEl {
  background: var(--mainColor);
  color: #fff;
}
.qrcodeBoxEl {
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}
.pageBoxEl {
  padding: 16px;
  color: #130040;
}
</style>
