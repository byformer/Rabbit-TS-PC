// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })


import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
function pathResolve(dir: string): string {
  return resolve(process.cwd(), '.', dir)
};
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  server: {
    host: '127.0.0.1', //ip地址
    port: 8080, //端口号
    open: true //启动后是否自动打开浏览器
  }
})
