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
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { themeRoute } from '~/stores/theme'
const useThemeRoute = themeRoute();

const currentThemeComponent = computed(() => {
    if (!useThemeRoute.fileRoute) return null;
    return defineAsyncComponent(() => import(`~/pageRoute/${useThemeRoute.fileRoute}/login/beforeLogin.vue`))
});

const changeTheme = () => {
    useThemeRoute.fileRoute = useThemeRoute.fileRoute === '01' ? '02' : '01';
}
</script>