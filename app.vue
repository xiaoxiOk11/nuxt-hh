<!-- app.vue -->
<template>
  <div>
    <!-- NuxtPage 现在会使用我们动态生成的 pageTransition 对象 -->
    <NuxtPage class="pageContainer" :transition="pageTransition" />
    <van-backTop :bottom="60" :right="10"></van-backTop>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { themeRoute } from "~/stores/theme";
import gsap from "gsap";
import { getWebSite } from "~/api/home/home";
import { registerSW } from "virtual:pwa-register";
const usePublicStore = publicStore();

// --- 1. 保留你现有的主题切换逻辑 ---
const useThemeRoute = themeRoute();
watch(
  () => useThemeRoute.fileRoute,
  (newRoute) => {
    if (newRoute) {
      import(`~/assets/css/${newRoute}/main.scss`);
    }
  },
  { immediate: true }
);

const animations = [
  {
    name: "slide-up",
    enter: { opacity: 0, y: 50 },
    leave: { opacity: 0, y: -50 },
  },
  {
    name: "slide-down",
    enter: { opacity: 0, y: -50 },
    leave: { opacity: 0, y: 50 },
  },
  {
    name: "slide-left",
    enter: { opacity: 0, x: 100 },
    leave: { opacity: 0, x: -100 },
  },
  {
    name: "zoom-in",
    enter: { opacity: 0, scale: 0.8 },
    leave: { opacity: 0, scale: 0.8 },
  },
  {
    name: "fade",
    enter: { opacity: 0 },
    leave: { opacity: 0 },
  },
];

let lastAnimationIndex = -1;
const getRandomAnimation = () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * animations.length);
  } while (animations.length > 1 && randomIndex === lastAnimationIndex);

  lastAnimationIndex = randomIndex;
  return animations[randomIndex];
};

const currentAnimation = ref(getRandomAnimation());

const router = useRouter();
router.beforeEach((to, from, next) => {
  // 仅在实际发生页面切换时才更新动画（跳过初始加载）
  if (from.name) {
    currentAnimation.value = getRandomAnimation();
  }
  next(); // 必须调用 next() 以继续导航
});

// 这个对象将从 currentAnimation 中读取动画参数
const pageTransition = reactive({
  name: "dynamic-gsap",
  mode: "out-in",

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
});

const getWebSiteData = () => {
  getWebSite().then((res) => {
    usePublicStore.webSiteData = res;
  });
};
onMounted(() => {
  getWebSiteData();
});
</script>

<style>
/* 可选：为了防止页面切换时因滚动条消失/出现导致的页面抖动 */
html.page-leave-active {
  overflow: hidden;
}

/* 全局 Vant popup 默认样式可以按需调整 */
.van-popup {
  background: transparent;
}

.pwa-update-popup {
  width: 80%;
  max-width: 320px;
}

.pwa-update-dialog {
  background: #111827;
  color: #f9fafb;
  padding: 20px 18px 16px;
  border-radius: 14px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.pwa-update-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.pwa-update-desc {
  line-height: 1.6;
  color: #e5e7eb;
}

.pwa-update-highlight {
  color: #38bdf8;
  font-weight: 500;
}

.pwa-update-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.pwa-update-actions .btn-secondary,
.pwa-update-actions .btn-primary {
  outline: none;
  border: none;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
}

.pwa-update-actions .btn-secondary {
  background: #111827;
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.35);
}

.pwa-update-actions .btn-primary {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #f9fafb;
}

.pwa-update-actions .btn-primary:active {
  opacity: 0.9;
}
</style>
