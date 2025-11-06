<template>
    <section>

        <ClientOnly>
            <!-- 动态组件 -->
            <component :is="currentThemeComponent"></component>

        </ClientOnly>
    </section>
</template>

<script setup>
import { themeRoute } from '~/stores/theme'
const useThemeRoute = themeRoute();

const currentThemeComponent = computed(() => {
    if (!useThemeRoute.fileRoute) return null;
    return defineAsyncComponent(() => import(`~/pageRoute/${useThemeRoute.fileRoute}/index.vue`))
});

const changeTheme = () => {
    if(useThemeRoute.fileRoute === '01'){
        useThemeRoute.fileRoute = '02';
    } else {
        useThemeRoute.fileRoute = '01';
    }
}
import { showToast } from 'vant';
const showToastHandle = (message) => {
    // console.log('showToast', showToast);
    showToast('Hello World');
    console.log('111',111);
};
</script>


<style lang="scss" scoped>

</style>