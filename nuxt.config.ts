// nuxt.config.ts
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/public.scss"],
  modules: ["@pinia/nuxt"],

  // 关键1: 为了让 Vant 的 JS 函数式调用（如 showToast）的样式能被正确处理
  build: {
    transpile: ["vant"],
  },

  vite: {
    plugins: [
      Components({
        resolvers: [
          // 关键2: 自动导入 Vant 组件，并为其导入 LESS 样式源文件
          // 这需要你已经安装了 `less` 预处理器
          VantResolver({ importStyle: true }),
        ],
      }),
    ],
  },

  routeRules: {},
});
