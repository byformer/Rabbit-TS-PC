/// <reference types="vite/client" />

declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}


declare namespace QC {
  type callbackFn = (openId: string) => void
  const Login: {
    signOut: () => void // 退出
    check: () => boolean // 检查QQ是否登录成功
    getMe: (callback: callbackFn) => void // 获取openId
  }
  const api: (api: 'get_user_info') => {
    success: any
  }
}



