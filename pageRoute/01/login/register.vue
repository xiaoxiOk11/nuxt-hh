<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();
import { LoginStore } from '@/stores/login'
const useLoginStore = LoginStore()

import circleCheck from '~/assets/images/01/login/circle.png';
import circleChecked from '~/assets/images/01/login/circle_c.png';
import SelectAreacode from '../publicComponents/SelectAreacode.vue';
const changePage = (url) => {
    if (url) {
        router.push(url)

        return
    }
    router.back()
}

const showInviteCodeFlag = computed(() => useLoginStore.registerInviteCode)
const areaCode = computed(() => useLoginStore.areaCode)
const internationalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u

const selectAreaCodeRef = ref("")
const showSuccessFlag = ref(false)
const inputHandle = (e) => {
    if (loginTypeVal.value == 'phone') {
        if (areaCode.value.len == String(e.target.value).length) {
            showSuccessFlag.value = true
        } else {
            showSuccessFlag.value = false
        }
    } else {
        if (internationalEmailRegex.test(e.target.value)) {
            showSuccessFlag.value = true
        } else {
            showSuccessFlag.value = false
        }
    }
}

const openSelectAreaCode = () => {
    selectAreaCodeRef.value.showAreaCode = true
    selectAreaCodeRef.value.showCountryList = useLoginStore.countryList
}

// 选择区号
const selectCodeHandle = (item) => {
    if (areaCode.value.len == String(loginForm.value.username).length) {
        showSuccessFlag.value = true
    } else {
        showSuccessFlag.value = false
    }
}


const loginType = computed(() => {
    return useLoginStore.loginType
})
const loginTypeList = loginType.value.map(item => {
    let obj = {
        value: item,
    }
    if (item == 'phone') {
        obj.name = 'Phone Login'
    } else if (item == 'email') {
        obj.name = 'Email Login'
    }
    return obj
})
const loginTypeVal = ref('')
loginTypeVal.value = loginTypeList[0].value
const changeLoginType = item => {
    loginTypeVal.value = item.value
    showSuccessFlag.value = false
}

const showPwd = ref(false)
const showPwd2 = ref(false)
const showPwd3 = ref(false)
const showPwd4 = ref(false)
const loginForm = ref({
    username: "",
    password: "",
    password2: "",
    secPwd: "",
    secPwd2: "",

})
const agreeChecked = ref(false)
const onSubmit = () => {
    console.log('123', 123);
}

const sendCodeFlag = ref(false)
const sendHandle = () => {
    if (sendCodeFlag.value) return
    if (!inpVal1.value) {

        return showToast(loginTypeActInd < 2 ? t('login.a5') : t('login.a6'))
    }
    let data = {}
    if (showImgVerfy.value > 0 && !captcha.value) {
        return showToast(t('login.r17'))
    } else {
        data = {
            captcha: captcha.value,
            uuid: uuid.value
        }
    }

    // tel  sendPhoneCode, sendEmailCode 
    if (loginTypeVal.value < 2) {

        data.tel = inpVal1.value
        data.country = areaCode.value.code

        // 手机号注册
        // 手机注册
        sendPhoneCode(data).then(res => {
            showToast(t('all.s1'))
            startTimer()
        }).catch(e => {
            captcha.value = ""
            changUUid()
        })
    } else {
        // 邮箱注册
        data.email = inpVal1.value
        sendEmailCode(data).then(res => {
            showToast(t('all.s1'))
            startTimer()
        }).catch(e => {
            captcha.value = ""
            changUUid()
        })
    }

}
const resetSeconds = ref(60)
const smsCode = ref("") //验证码
const inviteCode = ref("")//邀请码
onMounted(() => {
    useLoginStore.initLoginData()
})
</script>

<template>
    <div class="loginPage">
        <div class="loginContent">
            <div class="topNav pt20 between pl10 ">
                <div @click="changePage">
                    <UIcon name="humbleicons:arrow-go-back" class="ww-30 hh-30"></UIcon>
                </div>
                <div class="rightLangEl flex col_center">
                    <img src="~/assets/images/01/icon/lang.png" class="ww-20 hh-20">

                    <span class="ml10">English</span>
                    <img src="~/assets/images/01/icon/down.png" class="ww-20 hh-20">
                </div>
            </div>

            <div class="center flex_col mt20">
                <div>
                    <img src="https://github.com/benjamincanac.png" height="100" width="100"
                        style="border-radius: 10px;">
                </div>
                <div class="mt5 f32 text_bold">
                    Xxxxxx
                </div>
            </div>

            <div class="pageComContainer">
                <div class="loginForm">
                    <div class="loginType gridBox2" v-if="loginTypeList.length > 1">
                        <div class="toPointer" :class="item.value == loginTypeVal ? 'actTypeEl' : ''"
                            @click="changeLoginType(item)" v-for="(item) in loginTypeList" :key="item.value">
                            {{ item.name }} </div>
                    </div>
                    <div class="loginFormContent">

                        <van-form @submit="onSubmit">
                            <div>
                                <div class="form-label f18 text_bold">
                                    {{ loginTypeVal == 'email' ? 'Email' : 'Phone' }}
                                </div>
                                <van-field v-model="loginForm.username" name="username" type="number"
                                    :placeholder="loginTypeVal == 'email' ? 'Email' : 'Phone'" @input="inputHandle">
                                    <template #left-icon v-if="loginTypeVal == 'phone'">
                                        <div class="center f14 text_bold toPointer" @click="openSelectAreaCode">
                                            {{ areaCode.code }}
                                            <UIcon name="solar:alt-arrow-down-line-duotone" class="ww-20 hh-20 ml3 ">
                                            </UIcon>
                                        </div>
                                    </template>
                                    <template #right-icon v-if="showSuccessFlag">
                                        <div class="center f14 text_bold">
                                            <UIcon name="material-symbols:check-rounded"
                                                class="mainTextColor ww-30 hh-30">
                                            </UIcon>
                                        </div>
                                    </template>
                                    <!--  -->
                                </van-field>
                            </div>
                            <div class="mt20">
                                <div class="form-label f18 text_bold">
                                    SMS Code
                                </div>
                                <van-field v-model="smsCode" name="username" placeholder="SMS Code"
                                    @input="inputHandle">
                                    <template #right-icon>
                                        <div class="center f14 text_bold">
                                            <div class="sendCodeBtn bbo8" @click="sendHandle"
                                                :class="sendCodeFlag ? 'disabled' : ''">
                                                {{ sendCodeFlag ? resetSeconds + 's' : 'OTP' }}
                                            </div>
                                        </div>
                                    </template>
                                    <!--  -->
                                </van-field>
                            </div>
                            <div class="mt20">
                                <div class="form-label f18 text_bold">
                                    Login Password
                                </div>
                                <van-field v-model="loginForm.password" :type="showPwd ? 'text' : 'password'"
                                    name="password" placeholder="Password">
                                    <template #right-icon>
                                        <div class="center">
                                            <UIcon :name="showPwd ? 'ic:sharp-remove-red-eye' : 'tabler:eye-closed'"
                                                class="ww-25 hh-25" @click="showPwd = !showPwd"></UIcon>
                                        </div>
                                    </template>
                                </van-field>
                            </div>

                            <div class="mt20">
                                <div class="form-label f18 text_bold">
                                    Confirm Password
                                </div>
                                <van-field v-model="loginForm.password2" :type="showPwd2 ? 'text' : 'password'"
                                    name="password" placeholder="Confirm Password">
                                    <template #right-icon>
                                        <div class="center">
                                            <UIcon :name="showPwd2 ? 'ic:sharp-remove-red-eye' : 'tabler:eye-closed'"
                                                class="ww-25 hh-25" @click="showPwd2 = !showPwd2"></UIcon>
                                        </div>
                                    </template>
                                </van-field>
                            </div>
                            <div class="mt20">
                                <div class="form-label f18 text_bold">
                                    Security Password
                                </div>
                                <van-field v-model="loginForm.password" :type="showPwd3 ? 'text' : 'password'"
                                    name="password" placeholder="Security Password">
                                    <template #right-icon>
                                        <div class="center">
                                            <UIcon :name="showPwd3 ? 'ic:sharp-remove-red-eye' : 'tabler:eye-closed'"
                                                class="ww-25 hh-25" @click="showPwd3 = !showPwd3"></UIcon>
                                        </div>
                                    </template>
                                </van-field>
                            </div>
                            <div class="mt20">
                                <div class="form-label f18 text_bold">
                                    Confirm Security Password
                                </div>
                                <van-field v-model="loginForm.secPwd2" :type="showPwd4 ? 'text' : 'password'"
                                    name="password" placeholder="Confirm Security Password">
                                    <template #right-icon>
                                        <div class="center">
                                            <UIcon :name="showPwd4 ? 'ic:sharp-remove-red-eye' : 'tabler:eye-closed'"
                                                class="ww-25 hh-25" @click="showPwd4 = !showPwd4"></UIcon>
                                        </div>
                                    </template>
                                </van-field>
                            </div>
                            <!--  -->
                            <div class="mt20" v-if="showInviteCodeFlag">
                                <div class="form-label f18 text_bold">
                                    Invition Code
                                </div>
                                <van-field v-model="inviteCode" 
                                    name="password" placeholder="Invition Code">
                                 
                                </van-field>
                            </div>

                            <div class="mt20 flex  ">
                                <img :src="agreeChecked ? circleCheck : circleChecked" class="ww-20 hh-20"
                                    @click="agreeChecked = !agreeChecked" />
                                <div class="ml10 color000">
                                    <div> <span>Agree with our</span> <span class="mainTextColor mglr5">Term Of
                                            Use</span>
                                        and
                                    </div>
                                    <div class="mt5">
                                        <span class="mainTextColor">Privacy Policy</span>

                                    </div>
                                </div>
                            </div>
                            <div class="actionBtn mt20  contentBtn" native-type="submit" @click="onSubmit">
                                Register
                            </div>

                            <div class="actionBtn mt20 toPointer  borderBtn" @click="changePage('/login/login')">
                                Login
                            </div>
                        </van-form>
                    </div>
                </div>
            </div>
        </div>
        <SelectAreacode ref="selectAreaCodeRef" :selectCodeHandle="selectCodeHandle" />
    </div>
</template>

