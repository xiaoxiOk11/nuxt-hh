<template>
  <div>
    <Header />
    <div class="pageComContainer">
      <div class="noticeEl">
        <van-notice-bar
          background="transparent"
          color="#fff"
          :left-icon="noticeIcon"
          text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
        />
      </div>

      <div class="mt20">
        <van-swipe :autoplay="3000" lazy-render>
          <van-swipe-item v-for="image in images" :key="image">
            <img :src="image" class="swiperImg" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="gridBox3 mt20 text_center">
        <div
          class="grid3ItemEl toPointer"
          v-for="(item, index) in commList"
          :key="index"
          @click="jumpPage(item.url)"
        >
          <div class="blurBg">
            {{ item.name }}
          </div>
        </div>
      </div>

      <div class="mt10">
        <div class="downImg f20 toPointer text_bold flex col_center pl30">
          DownLoad APP
        </div>
      </div>

      <div class="gridBox2 mt20 text_center">
        <div
          class="grid2ItemEl toPointer"
          v-for="(item, index) in parnterList"
          :key="index"
        >
          <div class="blurBg">
            {{ item.name }}
          </div>
        </div>
      </div>

      <div class="mt20 infoTitle pageBoxEl">
        <div class="title boxContentEl">ajskdjkasjdklqwjeklq</div>
      </div>

      <div class="pageBoxEl mt20">
        <div class="c_title text_bold">Real-Time Quotes</div>
        <div class="mt20 gridBox4">
          <div
            class="coinTypeEl toPointer"
            :class="[{ actContypeEl: index == actCoinType }]"
            v-for="(item, index) in coinFromList"
            :key="index"
            @click="changeCoinFrom(item, index)"
          >
            {{ item.name }}
          </div>
        </div>

        <div class="mt20 boxContentEl coinContentEl">
          <div class="gridBox3">
            <div>Currency</div>
            <div>last Price($)</div>
            <div>24h Rise & Down</div>
          </div>
          <div
            class="gridBox3 toPointer mt10 mb20 coinItemEl"
            v-for="item in 5"
            :key="item"
          >
            <div>
              <span class="text_bold f14 coinName">BTC</span>
              <span class="label f12">/USDT</span>
            </div>

            <div
              class="f16 text_bold"
              :class="item % 2 == 1 ? 'colorDown' : 'colorUp'"
            >
              44444.44
            </div>

            <div class="f14" :class="item % 2 == 1 ? 'colorDown' : 'colorUp'">
              +98%
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script setup>
import Header from "./publicComponents/Header.vue";
import Tabbar from "./publicComponents/Tabbar.vue";
import noticeIcon from "~/assets/images/01/icon/notice.png";
import { useRouter } from "vue-router";
const images = [
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
];

const router = useRouter();
const commList = computed(() => {
  return [
    {
      name: "Recharge",
      url: "/fund/recharge",
    },
    {
      name: "Withdraw",
      url: "/fund/withdraw",
    },
    {
      name: "Team",
    },
  ];
});

const parnterList = computed(() => {
  return [
    {
      name: "Agent Cooperation",
    },
    {
      name: "Activity",
    },
  ];
});

const actCoinType = ref(0);
const coinFromList = computed(() => {
  return [
    {
      name: "Binance",
      value: 0,
    },
    {
      name: "Okx",
      value: 1,
    },
    {
      name: "Huobi",
      value: 2,
    },
    {
      name: "CoinBase",
      value: 3,
    },
  ];
});
const jumpPage = (url) => {
  if (url) {
    router.push(url);
  }
};
//
const changeCoinFrom = (item, ind) => {
  actCoinType.value = ind;
};

// console.log('',import.meta.env);
</script>

<style lang="scss" scoped>
.coinContentEl {
  padding: 10px;
  border-radius: 10px;

  .gridBox3 {
    text-align: center;
    color: #130040;
  }
  .coinItemEl {
    .label {
      color: #818088;
    }
  }
}

.downImg {
  height: 65px;

  background: url("~/assets/images/01/index/downImg.png") no-repeat;
  background-size: contain;
  background-position: center;
}

.coinTypeEl {
  color: #130040;
  text-transform: uppercase;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.actContypeEl {
  background: var(--btnColor);
  color: #fff;
  border-radius: 10px;
}

.infoTitle {
  .title {
    padding: 10px;
    border-radius: 10px;
  }
}

.gridBox2 {
  .grid2ItemEl {
    height: 110px;
    padding-bottom: 10px;
    // padding: 0 10px;
    // width: 100%;
    display: flex;
    align-items: flex-end;

    &:nth-child(1) {
      background-image: url("~/assets/images/01/index/i_p1.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    &:nth-child(2) {
      background-image: url("~/assets/images/01/index/i_p2.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }

  .blurBg {
    height: 50px;
    width: 100%;
    line-height: 50px;
    background-size: contain;
  }
}

.blurBg {
  margin: 0 5px;
  background: url("~/assets/images/01/index/blurBg.png") no-repeat;
  background-size: contain;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-position: center;
}

.gridBox3 {
  .grid3ItemEl {
    height: 125px;
    padding-bottom: 10px;
    // padding: 0 10px;
    // width: 100%;
    display: flex;
    align-items: flex-end;

    &:nth-child(1) {
      background-image: url("~/assets/images/01/index/i_c1.png");
    }

    &:nth-child(2) {
      background-image: url("~/assets/images/01/index/i_c2.png");
    }

    &:nth-child(3) {
      background-image: url("~/assets/images/01/index/i_c3.png");
    }

    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
}

.noticeEl {
  padding: 3px 10px;
  border: 1px solid #fff;
  border-radius: 50px;

  :deep(.van-notice-bar) {
    padding-left: 1px;

    .van-notice-bar__wrap {
      margin-left: 5px;
    }

    .van-icon__image {
      width: 30px;
      height: 30px;
    }
  }
}

.swiperImg {
  height: 180px;
  width: 100%;
}
</style>
