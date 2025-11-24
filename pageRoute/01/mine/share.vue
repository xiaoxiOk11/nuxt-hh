<template>
  <div>
    <TopNav pageTitle="Share"> </TopNav>
    <div class="pageComContainer">
      <div class="pageBoxEl">
        <div class="between">
          <div>Build a team and get generous rewards</div>
          <div class="center text_center rightRewardBtn">
            Invitation rewards

            <UIcon name="material-symbols:chevron-right-rounded" class="hh-50 ww-50" />
          </div>
        </div>

        <div class="mt20 gridBox3">
          <div class="gridBox3ItemEl text_center" v-for="item in shareTopInfo" :key="item.name">
            <div>
              <van-image :src="item.icon" width="40" height="40"></van-image>
            </div>
            <div class="mt5 f14">{{ item.name }}</div>
          </div>
        </div>

        <div class="mt20 center">
          <div class="qrcodeBoxEl">
            <QrcodeVue :value="qrcodeVal" :size="120" level="H" render-as="svg" :background="'#ffffff'"
              :foreground="'#000000'" :radius="10" />
          </div>
        </div>

        <div class="mt20 ">
          <div class="f18 text_bold">
            Invite Link
          </div>
          <div class="mt10 copyBox between">
            <div class="f14 flex1 textHiddenOne">https://www.invitationlink.com/abcd
            </div>
            <div class="center">
              <UIcon name="material-symbols:content-copy" class="hh-25 ww-25 ml5 copyIcon"
                @click="copyHandle('https://www.invitationlink.com/abcd')" />
            </div>
          </div>
        </div>

        <div class="mt20 ">

          <div class="f18 text_bold">
            My Invitation Code
          </div>
          <div class="mt10 copyBox between">
            <div class="f14 flex1 textHiddenOne">abcd
            </div>
            <div class="center">
              <UIcon name="material-symbols:content-copy" class="hh-25 ww-25 ml5 copyIcon"
                @click="copyHandle('https://www.invitationlink.com/abcd')" />
            </div>
          </div>
        </div>

        <div class="mt30">
          <div class="text_center f18 text_bold">Share To</div>
          <div class="mt30 gridBox4">
            <div v-for="item in botShareList" :key="item" class="center">
              <img :src="item.icon" :alt="item.name" class="ww-30 hh-30" />
            </div>
          </div>
        </div>

        <div class="mt50 contentBtn">
          View The Team
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QrcodeVue from "qrcode.vue";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
import TopNav from "../publicComponents/TopNavBar.vue";
import st1 from "~/assets/images/01/share/st1.png";
import st2 from "~/assets/images/01/share/st2.png";
import st3 from "~/assets/images/01/share/st3.png";

import s1 from "~/assets/images/01/share/s1.png";
import s2 from "~/assets/images/01/share/s2.png";
import s3 from "~/assets/images/01/share/s3.png";
import s4 from "~/assets/images/01/share/s4.png";
import { showToast } from "vant";

const shareTopInfo = ref([
  {
    name: "Send Friend Invitation",
    icon: st1,
  },
  {
    name: "Friend Completes Registration",
    icon: st2,
  },
  {
    name: "Get Rebate Income",
    icon: st3,
  },
]);

const botShareList = ref([
  {
    name: "X",
    icon: s1,
  },
  {
    name: "FB",
    icon: s2,
  },
  {
    name: "TG",
    icon: s3,
  },
  {
    name: "INS",
    icon: s4,
  },
]);

const qrcodeVal = ref("123123");

const copyHandle = async (val) => {
  await toClipboard(val).then(() => {
    showToast("Copy Success");
  });
}
</script>

<style lang="scss" scoped>
.pageBoxEl {
  padding: 16px;
  color: #130040;
  .rightRewardBtn {
    background: #f9dec9;
    padding: 0 10px;
    border-radius: 50px;
    margin-left: 30px;
  }
}
.qrcodeBoxEl {
  padding: 10px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
.copyBox{
  border: 1px solid #fff;
  color: var(--mainColor);
  padding: 10px;
  border-radius: 10px;
}
.contentBtn{
  border-radius: 10px;
}
</style>
