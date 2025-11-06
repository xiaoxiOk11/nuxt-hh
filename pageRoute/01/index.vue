<template>
    <div>
        <ClientOnly>
            <div class="topHeaderEl colorfff  between">
                <div class="f18 text_bold flex col_center ">
                    <img src="" alt="">
                    环宇出海量化平台
                </div>
                <div class="flex col_center colorfff">
                    <div class="center msgEl">
                        <img src="~/assets/images/01/icon/msg.png" class="ww-35 hh-35">

                    </div>
                    <div class="flex col_center ml15 langSelectorEl">
                        <img src="~/assets/images/01/icon/lang.png" class="ww-20 hh-20">

                        <span class="ml10">English</span>
                        <img src="~/assets/images/01/icon/down.png" class="ww-20 hh-20">

                    </div>
                </div>
            </div>
        </ClientOnly>
        <div class="pageComContainer">
            <div class="noticeEl">
                <van-notice-bar background="transparent" color="#fff" :left-icon="noticeIcon"
                    text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />

            </div>

            <div class="mt20">
                <van-swipe :autoplay="3000" lazy-render>
                    <van-swipe-item v-for="image in images" :key="image">
                        <img :src="image" class="swiperImg" />
                    </van-swipe-item>
                </van-swipe>
            </div>

            <div class="gridBox3 mt20 text_center">
                <div class="grid3ItemEl" v-for="(item, index) in commList" :key="index">
                    <div class="blurBg">
                        {{ item.name }}
                    </div>
                </div>
            </div>

            <div class="mt10">
                <div class="downImg f20 text_bold flex col_center pl30">
                    DownLoad APP
                </div>
            </div>

            <div class="gridBox2 mt20 text_center">
                <div class="grid2ItemEl" v-for="(item, index) in parnterList" :key="index">
                    <div class="blurBg">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script setup>
import Tabbar from './publicComponents/Tabbar.vue';
import noticeIcon from '~/assets/images/01/icon/notice.png';

const images = [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
];

const commList = computed(() => {
    return [
        {
            name: 'Recharge'
        },
        {
            name: 'Withdraw'
        },
        {
            name: 'Team'
        },
    ]
})

const parnterList = computed(() => {
    return [
        {
            name: 'Agent Cooperation'
        },
        {
            name: 'Activity'
        },
    ]
})
// 
</script>


<style lang="scss" scoped>
.downImg {
    height: 65px;

    background: url('~/assets/images/01/index/downImg.png') no-repeat;
    background-size: contain;
    background-position: center;
}

.gridBox2 {
    gap: 10px;
    .grid2ItemEl {
        height: 110px;
        padding-bottom: 10px;
        // padding: 0 10px;
        // width: 100%;
        display: flex;
        align-items: flex-end;

        &:nth-child(1) {
            background-image: url('~/assets/images/01/index/i_p1.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        &:nth-child(2) {
            background-image: url('~/assets/images/01/index/i_p2.png');
            background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
        }
    }

 
    .blurBg{
        height:50px;
        width: 100%;
        line-height: 50px;
        background-size: contain;
    }
  
}
  .blurBg {
      margin: 0 5px;
      background: url('~/assets/images/01/index/blurBg.png') no-repeat;
      background-size: contain;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-position: center;
  }
.gridBox3 {
    gap: 10px;

    .grid3ItemEl {
        height: 125px;
        padding-bottom: 10px;
        // padding: 0 10px;
        // width: 100%;
        display: flex;
        align-items: flex-end;

        &:nth-child(1) {
            background-image: url('~/assets/images/01/index/i_c1.png');
        }

        &:nth-child(2) {
            background-image: url('~/assets/images/01/index/i_c2.png');
        }

        &:nth-child(3) {
            background-image: url('~/assets/images/01/index/i_c3.png');
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

.topHeaderEl {
    height: 40px;
    padding: 10px 16px;

    .langSelectorEl {
        border: 1px solid #fff;
        padding: 5px 10px;
        border-radius: 50px;
    }
}
</style>