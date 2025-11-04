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
import icon from '~/assets/images/i1.png'
useHead({
  title: 'Nuxt 3 Demo',

  meta: [
    {
      name: 'description',
      content: 'This is a demo Nuxt 3 application.'
    }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: icon }
  ]
})
</script>