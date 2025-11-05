// plugins/iconify.ts
import { Icon } from "@iconify/vue";

export default defineNuxtPlugin((nuxtApp) => {
  // 这等同于 main.ts 中的 app.component('Icon', Icon)
  nuxtApp.vueApp.component("Icon", Icon);
});
