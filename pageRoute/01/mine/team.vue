<template>
  <div>
    <TopNav pageTitle="Team"> </TopNav>
    <div class="pageComContainer">
      <div class="pageBoxEl text_center">
        <div class="f18">Commision</div>
        <div class="mt20 f22 text_bold"><span>USDT</span> 15.76</div>

        <div class="center mt20">
          <div class="contentBtn recodBtn" @click="changePage('/record/balanceRecord?type=1')">Commision Record</div>
        </div>
      </div>

      <div class="pageBoxEl mt30">
        <div class="borderBDash between">
          <div>Total People</div>
          <div>124</div>
        </div>
        <div class="borderBDash between">
          <div>Valid invitation people number</div>
          <div>124</div>
        </div>

        <div class="borderBDash between" v-for="item in levelInfo" :key="item.level">
          <div>Level {{ item.level }}</div>
          <div class="flex col_center">
            <div>
              <div>Total/Valid : {{ item.total }}/{{ item.valid }}</div>
              <div>Get Commission: {{ item.commsion }}</div>
            </div>
            <UIcon name="material-symbols:chevron-right-rounded" class="hh-30 ww-30" />
          </div>
        </div>
        <div class="mt40 contentBtn inviteBtn f20" @click="changePage('/mine/share')">
          Invite Friends
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNav from "../publicComponents/TopNavBar.vue";

const router = useRouter();
const levelInfo = ref([
  {
    level: 1,
    total: 115,
    valid: 3,
    commsion: 41,
  },
  {
    level: 2,
    total: 15,
    valid: 31,
    commsion: 40,
  },
  {
    level: 3,
    total: 5,
    valid: 31,
    commsion: 444,
  },
]);

const changePage = (url) => {
  router.push(url);
};
</script>

<style lang="scss" scoped>
.pageBoxEl {
  padding: 16px;
  color: #130040;
  border-radius: 10px;
  .recodBtn {
    border-radius: 10px;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
  }
  .borderBDash {
    padding: 15px 0;
    border-bottom: 1px dashed #e0e0e0;
  }
}
.inviteBtn {
  border-radius: 10px;
}
</style>
