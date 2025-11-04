<!-- pages/index.vue -->
<template>
    <section>
        <h1>My App</h1> <!-- 这是一个在服务器和客户端都一样的静态标题 -->
        <ClientOnly>
            <!-- 动态组件 -->
            <component :is="currentThemeComponent"></component>
           
        </ClientOnly>

       
    </section>
</template>

<script setup>
import icon from '~/assets/images/o1.png'

import { computed, defineAsyncComponent, onMounted } from 'vue'
import { themeRoute } from '~/stores/theme'
const useThemeRoute = themeRoute();

const currentThemeComponent = computed(() => {
    if (!useThemeRoute.fileRoute) return null;
    return defineAsyncComponent(() => import(`~/pageRoute/${useThemeRoute.fileRoute}/mine/artcle.vue`))
});

useHead({
    title: '特卖会',
    meta: [
        {
            name: '特卖会',
            content: 'This is the article page of the Nuxt 3 demo application.'
        },
        { property: 'og:title', content: '特卖会' },
        { property: 'og:description', content: '了解我们的公司' },
        { property: 'og:image', content: icon },
        { property: 'og:type', content: 'website' },

    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: icon }
    ]
})

</script>