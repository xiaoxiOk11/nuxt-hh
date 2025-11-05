<template>
    <section>
        <h1>My App</h1> <!-- 这是一个在服务器和客户端都一样的静态标题 -->
        <ClientOnly>
            <!-- 动态组件 -->
            <component :is="currentThemeComponent"></component>
            <!-- 控制器和状态显示 -->
            <div style="margin-top: 20px; border: 1px solid red; padding: 10px;">
                <p>This part is client-only:</p>
                <van-button type="primary" @click="changeTheme">切换主题</van-button>
                <p>Current theme value from store: {{ useThemeRoute.fileRoute }}</p>
            </div>
        </ClientOnly>

    </section>
</template>

<script setup>
import icon from '~/assets/images/o2.png'

import { computed, defineAsyncComponent, onMounted } from 'vue'
import { themeRoute } from '~/stores/theme'
const useThemeRoute = themeRoute();

const currentThemeComponent = computed(() => {
    if (!useThemeRoute.fileRoute) return null;
    return defineAsyncComponent(() => import(`~/pageRoute/${useThemeRoute.fileRoute}/index.vue`))
});

const changeTheme = () => {
    useThemeRoute.fileRoute = useThemeRoute.fileRoute === '01' ? '02' : '01';
}



useHead({
    title: '哈哈哈哈',
    meta: [
        {
            name: '哈哈哈哈',
            content: 'This is the article page of the Nuxt 3 demo application.'
        },
        { property: 'og:title', content: '哈哈哈哈' },
        { property: 'og:description', content: '哈哈哈哈' },
        { property: 'og:image', content: icon },
        { property: 'og:type', content: 'website' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: icon }
    ]
})
</script>