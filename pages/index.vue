<template>
  <section>
    <ClientOnly>
      <component :is="currentThemeComponent"></component>
    </ClientOnly>
  </section>
</template>

<script setup>
import { themeRoute } from "~/stores/theme";
const useThemeRoute = themeRoute();

const currentThemeComponent = computed(() => {
  if (!useThemeRoute.fileRoute) return null;
  return defineAsyncComponent(
    () => import(`~/pageRoute/${useThemeRoute.fileRoute}/index.vue`)
  );
});
</script>

<style lang="scss" scoped></style>
