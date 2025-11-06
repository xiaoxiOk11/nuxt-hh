<template>
  <div class="pageContainer">
    <NuxtPage />

    <van-backTop ></van-backTop>
  </div>
</template>


<script setup>
import { themeRoute } from '~/stores/theme'
// 确保在 setup 顶层调用 store
const useThemeRoute = themeRoute();
watch(
  () => useThemeRoute.fileRoute,
  (newRoute) => {
    console.log('Theme route changed to:', newRoute);
    import(`~/assets/css/${newRoute}/main.scss`);
  },
  { immediate: true }
);
</script>