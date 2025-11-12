<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
import { useRouter } from 'vue-router'
const router = useRouter();
import { emailLogin, joinLogin } from '~/api/home/home';

import { LoginStore } from '@/stores/login'
const useLoginStore = LoginStore()

import circleCheck from '~/assets/images/01/login/circle.png';
import circleChecked from '~/assets/images/01/login/circle_c.png';
import SelectAreacode from '../publicComponents/SelectAreacode.vue';
import { showToast } from 'vant';
const changePage = (url) => {
    if (url) {
        router.push(url)

        return
    }
    router.back()
}
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

// [
//     // {
//     //     name: 'Email Login',
//     //     value: 'email'
//     // },
//     // {
//     //     name: 'Phone Login',
//     //     value: 'phone'
//     // },
// ]
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
if (loginTypeList.length>1) {
    loginTypeVal.value = loginTypeList[0].value
} else {
    loginTypeVal.value = 'phone'
}
const changeLoginType = item => {
    loginTypeVal.value = item.value
    showSuccessFlag.value = false
}

const showPwd = ref(false)
const loginForm = ref({
    username: "",
    password: ""
})
const agreeChecked = ref(false)
const onSubmit = () => {

    if (!agreeChecked.value) return showToast(t('login.a1'))
    if (loginTypeVal.value == 'phone') {
        // 手机号登陆
        const data = {
            country_code: areaCode.value.code,
            username: loginForm.value.username,
            password: loginForm.value.password
        }
        // usePublicStore.$state.showLoading = true
        joinLogin(data).then(res => {
            showToast(t('login.s1'))
            localStorage.setItem('authorization', res.accessToken)
            router.push('/')
        })
    } else {
        // 邮箱登陆
        const data = {
            country_code: areaCode.value.code,
            email: loginForm.value.username,
            password: loginForm.value.password
        }
        // usePublicStore.$state.showLoading = true

        emailLogin(data).then(res => {
            showToast(t('login.s1'))

            localStorage.setItem('authorization', res.accessToken)
            router.push('/')
        })
    }
}

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
                            <div class="mt20 flex  ">
                                <img :src="!agreeChecked ? circleCheck : circleChecked" class="ww-20 hh-20"
                                    @click="agreeChecked = !agreeChecked" />
                                <div class="ml10 color000">
                                    <div> <span>Agree with our</span> <span class="mainTextColor mglr5">Term Of
                                            Use</span>
                                        and
                                        <span class="mainTextColor">Privacy Policy</span>

                                    </div>
                                    
                                </div>
                            </div>
                            <div class="actionBtn mt20  contentBtn" native-type="submit" @click="onSubmit">
                                Login
                            </div>

                            <div class="actionBtn mt20 toPointer  borderBtn" @click="changePage('/login/register')">
                                Register
                            </div>
                        </van-form>
                    </div>
                </div>
            </div>
        </div>
        <SelectAreacode ref="selectAreaCodeRef" :selectCodeHandle="selectCodeHandle" />
    </div>
</template>

