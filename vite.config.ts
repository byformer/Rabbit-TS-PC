
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
// name插件
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
function pathResolve(dir: string): string {
  return resolve(process.cwd(), '.', dir)
};
export default defineConfig({
  // 添加name插件
  plugins: [
    vue(),vueSetupExtend(),vueJsx(),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: ElementPlusResolver()
    })
  ],
  // 配置路径别名
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  server: {
    host: 'www.corho.com', //ip地址
    port: 8080, //端口号
    open: true, //启动后是否自动打开浏览器
    cors:true, // 允许开发时使用 ajax跨域
  },
  // 配置css的全局注入
   
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/style/variables.less";
          @import "@/assets/style/mixins.less";
        `
      }
    }
  }
})
