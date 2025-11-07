<!-- app.vue -->
<template>
  <div>
    <!-- NuxtPage 现在会使用我们动态生成的 pageTransition 对象 -->
    <NuxtPage class="pageContainer" :transition="pageTransition" />
    <van-backTop></van-backTop>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { themeRoute } from '~/stores/theme'
import gsap from 'gsap'

// --- 1. 保留你现有的主题切换逻辑 ---
const useThemeRoute = themeRoute()
watch(
  () => useThemeRoute.fileRoute,
  (newRoute) => {
    // 在 nuxt.config.ts 中通过 body aatributes 或 useHead 动态添加 class/style 可能是更稳健的方式。
    console.log('Theme route changed to:', newRoute)
    if (newRoute) {
      import(`~/assets/css/${newRoute}/main.scss`)
    }
  },
  { immediate: true }
)

const animations = [
  {
    name: 'slide-up',
    enter: { opacity: 0, y: 50 },
    leave: { opacity: 0, y: -50 }
  },
  {
    name: 'slide-down',
    enter: { opacity: 0, y: -50 },
    leave: { opacity: 0, y: 50 }
  },
  {
    name: 'slide-left',
    enter: { opacity: 0, x: 100 },
    leave: { opacity: 0, x: -100 }
  },
  {
    name: 'zoom-in',
    enter: { opacity: 0, scale: 0.8 },
    leave: { opacity: 0, scale: 0.8 }
  },
  {
    name: 'fade',
    enter: { opacity: 0 },
    leave: { opacity: 0 }
  }
]

let lastAnimationIndex = -1 
const getRandomAnimation = () => {
  let randomIndex
  do {
    randomIndex = Math.floor(Math.random() * animations.length)
  } while (animations.length > 1 && randomIndex === lastAnimationIndex)

  lastAnimationIndex = randomIndex
  return animations[randomIndex]
}

const currentAnimation = ref(getRandomAnimation())

const router = useRouter()
router.beforeEach((to, from, next) => {
  // 仅在实际发生页面切换时才更新动画（跳过初始加载）
  if (from.name) {
    currentAnimation.value = getRandomAnimation()
  }
  next() // 必须调用 next() 以继续导航
})

// 这个对象将从 currentAnimation 中读取动画参数
const pageTransition = reactive({
  name: 'dynamic-gsap', 
  mode: 'out-in',

  // onEnter(el, done) {
  //   // 使用当前选定动画的 enter 参数
  //   gsap.from(el, {
  //     duration: 0.5,
  //     ease: 'power2.inOut',
  //     ...currentAnimation.value.enter,
  //     onComplete: done
  //   })
  // },

  // onLeave(el, done) {
  //   gsap.to(el, {
  //     duration: 0.5,
  //     ease: 'power2.inOut',
  //     ...currentAnimation.value.leave,
  //     onComplete: done
  //   })
  // }
})
</script>

<style>
/* 可选：为了防止页面切换时因滚动条消失/出现导致的页面抖动 */
html.page-leave-active {
  overflow: hidden;
}
</style>