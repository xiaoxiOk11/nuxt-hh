// nuxt.config.ts
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  loading: false,
  devtools: { enabled: false },

  // [保留] 你的全局 CSS
  css: ["@/assets/css/public.scss"],

  // [合并] 在 modules 数组中添加新的模块
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt", // 新增: Pinia 持久化
    "@nuxtjs/i18n", // 新增: i18n
  ],

  // [新增] 为 i18n 模块提供配置
  i18n: {
    langDir: "./locales/", // 语言文件目录
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.ts" },
      { code: "es", iso: "es-ES", name: "Español", file: "es.ts" },
      { code: "zh", iso: "zh-CN", name: "简体中文", file: "zh.ts" },
    ],
    defaultLocale: "en",
  },

  build: {
    transpile: ["vant"],
  },

  vite: {
    plugins: [
      Components({
        resolvers: [VantResolver({ importStyle: true })],
      }),
    ],
  },
  app: {
    pageTransition: true, // 或者 pageTransition: {}
    layoutTransition: true, // 同理
    head: {
      title: "My App",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  routeRules: {},
});
