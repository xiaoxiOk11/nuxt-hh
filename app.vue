<template>
  <div class="pageContainer">
    <NuxtPage />
  </div>
</template>


<script setup>
import { themeRoute } from '~/stores/theme'
// 确保在 setup 顶层调用 store
const useThemeRoute = themeRoute();
import(`~/assets/css/${useThemeRoute.fileRoute}/main.scss`)
</script>