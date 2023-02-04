
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// name插件
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
function pathResolve(dir: string): string {
  return resolve(process.cwd(), '.', dir)
};
export default defineConfig({
  // 添加name插件
  plugins: [vue(),vueSetupExtend()],
  // 配置路径别名
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  server: {
    host: '127.0.0.1', //ip地址
    port: 8080, //端口号
    open: true //启动后是否自动打开浏览器
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
