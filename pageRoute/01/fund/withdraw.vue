<script setup>
import recIco from "~/assets/images/01/icon/recIco.png";
import TopNav from "../publicComponents/TopNavBar.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
import {
  getWithdrawAddressInfo,
  getWithdrawInfo,
  submitWithdraw,
} from "~/api/realse/realse";
import { showToast } from "vant";

const usePublicStore = publicStore();
const router = useRouter();
const webSiteData = computed(() => {
  return usePublicStore.webSiteData;
});
const actCoinTypeId = ref(0);
const coinTypeList = ref([]);
const configInfo = ref({});
const balanceInfo = ref({
  user_balance: 0,
  wait_balance: 0,
});
const withdrawConfig = ref("");
const getData = () => {
  getWithdrawInfo({
    type: "withdraw",
  }).then((res) => {
    coinTypeList.value = res.list;
    configInfo.value = res.config;
    actCoinTypeId.value = coinTypeList.value[0].pro_code;
    balanceInfo.value.user_balance = res.user_balance;
    balanceInfo.value.wait_balance = res.wait_balance;
    withdrawConfig.value = res.config;
    checkUserAddress();
  });

  usePublicStore.updateUserInfo();
};

const userDetailInfo = computed(() => {
  return usePublicStore.userInfo;
});
const selectCoinInfo = ref({
  currency: "--",
  rate: 1,
  config: {
    min: 0,
    max: 0,
  },
  address: {
    address: "",
  },
});
const withdrawRange = computed(() => {
  return (
    selectCoinInfo.value.config.min + " - " + selectCoinInfo.value.config.max
  );
});
const checkUserAddress = () => {
  getWithdrawAddressInfo({ pro_code: actCoinTypeId.value }).then((res) => {
    console.log(res);

    selectCoinInfo.value = res;
  });
};

const changeSelectCoin = (item) => {
  actCoinTypeId.value = item.pro_code;
  pasteVal.value = "";
  checkUserAddress();
};

const pasteVal = ref("");
const pasteHandle = () => {
  if (!navigator.clipboard) {
    console.error("当前浏览器不支持 Clipboard API");
    return;
  }
  navigator.clipboard
    .readText()
    .then((text) => {
      if (text) {
        pasteVal.value = text;
        console.log("剪贴板内容:", text);
      }
    })
    .catch((err) => {
      console.error("无法读取剪贴板:", err);
    });
};

const showPwd = ref(false);

const sendCodeFlag = ref(false);
const showSeconds = ref(60);
const timer = ref("");
const startTimer = () => {
  timer.value = setInterval(() => {
    if (showSeconds.value < 1) {
      showSeconds.value = 60;
      sendCodeFlag.value = false;
      clearInterval(timer.value);
    } else {
      showSeconds.value--;
    }
  }, 1000);
};
const sendCodeHandle = () => {
  sendCodeFlag.value = true;

  startTimer();

  return;
  sendCodeHandle({
    type: 4,
  })
    .then((res) => {
      startTimer();
    })
    .catch((e) => {
      showToast(e.message);
    });
};
const smsCode = ref("");
const inpVal = ref("");
const secPwd = ref("");

const confirmHandle = () => {
  if (withdrawConfig.value.check_res.status == 1) {
    showToast(withdrawConfig.value.check_res.txt);
    return;
  }
  const data = {
    address: selectCoinInfo.value.address.address || pasteVal.value,
    amount: inpVal.value,
    password: secPwd.value,
    pro_code: actCoinTypeId.value,
    sms_code: smsCode.value,
  };
  if (
    data.amount < selectCoinInfo.value.config.min ||
    data.amount > selectCoinInfo.value.config.max
  ) {
    showToast("Please enter a valid withdrawal amount.");
    return;
  }
  submitWithdraw(data).then((res) => {
    showToast("Withdraw Success");
    getData();
  });
};
onMounted(() => {
  getData();
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

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
            <span class="f26 text_bold mainTextColor">{{
              balanceInfo.user_balance
            }}</span>
            <span class="ml10">USDT</span>
          </div>
          <div class="mt20 between f16">
            <span>Amount to be processed</span>
            <span>{{ balanceInfo.wait_balance }} USDT</span>
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
        <div class="mt20 between">
          <div></div>
          <div>
            1 {{ selectCoinInfo.currency }} =
            <span class="greenText">{{ selectCoinInfo.rate }}</span> USDT
          </div>
        </div>

        <div class="mt20">
          <div>Withdrawal limit range {{ withdrawRange }}</div>
          <div class="mt10 inpBoxEl">
            <input
              v-model="inpVal"
              type="number"
              :placeholder="'Withdrawal  range ' + withdrawRange"
            />
          </div>
        </div>

        <div class="mt20">
          <div>Withdrawal Address</div>
          <div
            class="mt10 inpBoxEl between"
            v-if="selectCoinInfo.address.address"
          >
            <div class="leftBox">{{ selectCoinInfo.address.address }}</div>
            <div class="copyBtn ml10">Copy</div>
          </div>
          <div class="mt10 inpBoxEl between" v-else>
            <input
              type="text"
              v-model="pasteVal"
              placeholder="Wallet Address"
            />

            <div class="copyBtn ml10" @click="pasteHandle">Paste</div>
          </div>
          <!-- writeText -->
          <div class="mt10" v-if="pasteVal">
            <div class="between">
              <div class="inpBoxEl flex1">{{ userDetailInfo.email }}</div>

              <div class="sendBtn" v-if="!sendCodeFlag" @click="sendCodeHandle">
                Send
              </div>
              <div class="sendBtn" v-else>{{ showSeconds }} s</div>
            </div>
            <div class="mt10 inpBoxEl">
              <input
                type="text"
                v-model="smsCode"
                placeholder="Please Enter The Verification Code"
              />
            </div>
          </div>
        </div>

        <div class="mt20">
          <div>Security Password</div>
          <div class="mt10 inpBoxEl">
            <input
              :type="!showPwd ? 'password' : 'text'"
              placeholder="Security Password"
              v-model="secPwd"
            />
            <div class="fixedRightIcon center">
              <UIcon
                :name="
                  showPwd ? 'ic:sharp-remove-red-eye' : 'tabler:eye-closed'
                "
                class="ww-25 hh-25"
                color="color0"
                @click="showPwd = !showPwd"
              ></UIcon>
            </div>
          </div>
        </div>

        <div class="mt20 between">
          <div class="colorC">Service charge</div>
          <div class="textRight flex1">
            <div class="colorC">
              <del> {{ withdrawConfig.fee_rate }} USDT</del>
            </div>
            <div class="f13">
              Number of free withdrawals remaining:{{
                withdrawConfig.free_fee_num
              }}
            </div>
          </div>
        </div>

        <div class="mt20 between">
          <div class="colorC">Receipt</div>
          <div class="textRight greenText">{{ inpVal ? inpVal : 0 }} USDT</div>
        </div>

        <div class="mt20 contentBtn" @click="confirmHandle">Confirm</div>
      </div>

      <div class="mt20">
        <div class="f22">Withdraw Note</div>
        <div class="pageBoxEl mt20" v-html="withdrawConfig.info"></div>
      </div>
    </div>
  </div>
</template>

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
.sendBtn {
  background: var(--mainColor);
  margin-left: 20px;
  color: #fff;
  border-radius: 10px;
  height: 50px;
  line-height: 50px;
  border: 1px solid currentColor;
  width: 80px;
  text-align: center;
}
.inpBoxEl {
  position: relative;
  .fixedRightIcon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.contentBtn {
  border-radius: 10px;
}
</style>
