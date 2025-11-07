<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    pageTitle: {
        type: String,
        default: ''
    },
    backUrl: {
        type: String
    },
    rightUrl: {
        type: String,
        default: ''
    },
    rightIconClick: {
        type: Function,
        default: () => { }
    },
    titleColor: {
        type: Boolean,
        default: true
    },
    color: {
        type: String,
        default: "#000"
    },
    showLangIcon: {
        type: Boolean,
        default: false
    },
    isLoginPage: {
        type: Boolean,
        default: false
    },
})

const rightIconClick = () => {
    props.rightIconClick()
}

const isFixed = ref(false)
const change = (bool) => {
    isFixed.value = bool
}

const goBack = () => {
    if (props.backUrl) {
        router.push(props.backUrl)
        return
    }
    router.back()
}
</script>

<template>
    <van-sticky position="top" offset-top="0" @change="change">
        <div class="pageTopNavEl between"
            :style="{ background: '#fff' }">
            <div class="flex toPointer col_center">
                <div @click="goBack" class="toPointer center">
                    <Icon icon="icon-park-outline:left" :color="color" width="34">
                    </Icon>
                </div>
            </div>
            <div class=" centerTitle f14 text_bold"
                :style="{ color: color }">{{
                    pageTitle }}</div>
            <div class="center toPointer" :style="{ color: color }"
                @click="rightIconClick" style="width: 40px;">
                <slot>
                </slot>
                <Icon icon="ic:baseline-language" width="35" height="35" :color="color"
                    v-if="showLangIcon" />
            </div>
        </div>
    </van-sticky>
</template>

<style lang="scss" scoped>
.pageTopNavEl {
    // background: #fff;
    padding: 0 8px;
    position: relative;
    height: 3rem;
    line-height: 3rem;
box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
    .centerTitle {
        // position: absolute;
        // left: 50%;
        width: 100%;
        text-align: center;
        // transform: translateX(-50%);
        // z-index: -1;
    }
}
</style>