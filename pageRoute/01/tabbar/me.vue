<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter()
import Tabbar from '../publicComponents/Tabbar.vue';
import Header from '../publicComponents/Header.vue';
import menuIcon1 from '~/assets/images/01/icon/menu1.png';
import menuIcon2 from '~/assets/images/01/icon/menu2.png';
import menuIcon3 from '~/assets/images/01/icon/menu3.png';
import menuIcon4 from '~/assets/images/01/icon/menu4.png';
import menuIcon5 from '~/assets/images/01/icon/menu5.png';
import menuIcon6 from '~/assets/images/01/icon/menu6.png';
import menuIcon7 from '~/assets/images/01/icon/menu7.png';
import menuIcon8 from '~/assets/images/01/icon/menu8.png';
import menuIcon9 from '~/assets/images/01/icon/menu9.png';
import menuIcon10 from '~/assets/images/01/icon/menu10.png';

const banlanceInfo = computed(() => {
    return [
        {
            name: 'Total Assets (USDT)',
            value:0
        },
        {
            name: 'Quantitative Account (USDT)',
            value: 0
        },
        {
            name: 'Smart Account (USDT)',
            value: 0
        },
        {
            name: 'Contract assets (USDT)',
            value: 0
        },
        {
            name: 'Profit Assets(USDT)',
            value: 0
        },
        {
            name: 'Recharge Amount(USDT)',
            value: 0
        },
    ]
})

const levelInfo = computed(() => {
    return [
        {
            value: '1',
            total: 10,
            valid: 3,
            commission:20
        },
        {
            value: '2',
            total: 20,
            valid: 3,
            commission: 20
        },
        {
            value: '3',
            total: 9,
            valid: 1,
            commission: 20
        },
    ]
})

const menuList = computed(() => {
    return [
        {
            ico: menuIcon1 ,
            name: 'Invite Friends',
            url:''
        },
        {
            ico: menuIcon2,
            name: 'Security Center',
            url: ''
        },
        {
            ico: menuIcon3,
            name: 'Transfer',
            url: ''
        },
        {
            ico: menuIcon4,
            name: 'Quantization Tutorial',
            url: ''
        },
        {
            ico: menuIcon5,
            name: 'News',
            url: ''
        },
        {
            ico: menuIcon6,
            name: 'Language Settings',
            url: ''
        },
        {
            ico: menuIcon7,
            name: 'Common Problem',
            url: ''
        },
        {
            ico: menuIcon8,
            name: 'Term Of Use',
            url: ''
        },
        {
            ico: menuIcon9,
            name: 'Privacy Policy',
            url: ''
        },
        {
            ico: menuIcon10,
            name: 'About Us',
            url: ''
        },
    ]
})

const showLogoutPop = ref(false)
const loginOutHandle = () => {
    showLogoutPop.value = false
    localStorage.removeItem('authorization')
    router.push('/login/beforeLogin')
}
</script>
<template>
    <div>
        <Header />
        <div class="myPage  pageComContainer">
            <div class="flex col_center">
                <div>
                    <img src="~/assets/images/01/img/header.png" class="ww-50 hh-50">
                </div>
                <div class="ml20">
                    <div class="flex col_center">
                        <span>+4******554</span>
                        <span class="copyBtn">Copy</span>
                    </div>
                    <div class="mainTextColor mt5">VIP0</div>
                </div>
            </div>

            <div class="m_bgBox mt20">
                <div class="between mb20" v-for="(item, index) in banlanceInfo" :key="index">
                    <div class="label">{{ item.name }}</div>
                    <div class="value">{{ item.value }}</div>
                </div>
                <div class="mt20 gridBox3">
                    <div class="contentBtn">Recharge</div>
                    <div class="contentBtn">Withdraw</div>
                    <div class="contentBtn">Detail</div>
                </div>
            </div>

            <div class="m_bgBox mt20">
                <div class="text_center text_bold">
                    <div class="value  f16">Total Revenue</div>
                    <div class="mainTextColor f22 mt10 ">123</div>
                </div>
                <div class="gridBox3 mt20">
                    <div class="text_center ">
                        <div class="label  f16">Commission Today</div>
                        <div class="mainTextColor text_bold f18 mt10 ">123</div>
                    </div>
                    <div class="text_center ">
                        <div class="label  f16">Today's Earnings</div>
                        <div class="mainTextColor text_bold f18 mt10 ">123</div>
                    </div>
                    <div class="text_center ">
                        <div class="label  f16">Yesterday's Earnings</div>
                        <div class="mainTextColor text_bold f18 mt10 ">123</div>
                    </div>
                </div>
            </div>

            <div class="m_bgBox mt20">
                <div class="text_center value f16">Subordinate Invitation</div>
                <div class="levelInfo " :class="index !== levelInfo.length - 1 ?'mb20':''"
                    v-for="(item, index) in levelInfo" :key="index">
                    <div class="value f18">Level {{ item.value }}</div>
                    <div class="gridBox2 mt20">
                        <div>
                            <div class="label">Total/Valid</div>
                            <div class="mt20 value">{{ item.total+'/'+item.valid }}</div>
                        </div>
                        <div>
                            <div class="label">Get Commission</div>
                            <div class="value mt20">{{ item.commission }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt20 m_bgBox">
                <div class="between" v-for="(item, index) in menuList" :key="index"
                    :class="index !== menuList.length-1?'mb20':''">

                    <div class="flex col_center">
                        <img :src="item.ico" class="ww-50 hh-50">
                        <div class="ml10 value">{{ item.name }}</div>
                    </div>
                    <div class="">
                        <UIcon name="ic:baseline-keyboard-arrow-right" class="hh-30 ww-30 value" />

                    </div>
                </div>
            </div>
            <div class="outBtn mgtb20" @click="showLogoutPop = true">Sign Out</div>
        </div>

        <van-popup v-model:show="showLogoutPop" position="center" round :style="{ width: '90%', maxWidth: '500px' }"
            :closeable="false">
            <div class="titleEl color000">
                <div class="text_center pt20 f20 text_bold">{{ t('setting.s19') }}</div>

                <div class="mt30 pdlr20 ">
                    <div class="text_center f16">{{ t('setting.s20') }}</div>
                    <div class="gridBox2 mgtb20">
                        <div class="cancelBtn center  toPointer" @click="showLogoutPop = false">{{ t('all.c2') }}</div>
                        <div class="contentBtn center" @click="loginOutHandle">{{ t('all.c1') }}</div>
                    </div>
                </div>
            </div>
        </van-popup>
        <Tabbar />
    </div>
</template>



<style lang="scss" scoped>
.myPage{
background: #0D081A;
min-height: 100vh;
.outBtn{
    text-align: center;
        height: 60px;
        line-height: 60px;
        /* 让单行文字垂直居中 */
        color: white;
        /* 假设文字是白色的 */
    
        /* 背景 */
        background: #623CBF;
    
        border-radius: 16px;
        // border: 1px solid transparent;
        background-clip: padding-box;
        border-top: 2px solid #fff;
}
.copyBtn{
    margin-left: 10px;
    padding: 5px 10px;
    background: var(--mainColor);
    border-radius: 5px;
}
.m_bgBox{
    padding: 20px 16px;
    background: #F6F3FC;
    border-radius: 10px;
    .label{
        color: #7B797E;
    }
    .value{
        color: #130040;
    }
    .contentBtn{
        border-radius: 10px;
    }
    .levelInfo{
        border: 1px solid #fff;
        border-radius: 10px;
        padding: 10px;
    }
}
}
</style>