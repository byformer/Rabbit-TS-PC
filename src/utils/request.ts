import FnMessage from '@/components/message'
import axios, { AxiosError } from 'axios'

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
// http://pcapi-xiaotuxian-front.itheima.net/
const instance = axios.create({
  // 请求基地址
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  // 超时时间 
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError<{ message: string, code: string }>) {
    // 特殊情况，响应没回来
    if (!error.response) {
      FnMessage({
        type: 'error',
        text: '网络异常或服务器繁忙，请稍后重试'
      })
    } else {
      // 有响应，正常给提示
      const { code, message } = error.response.data

      if (code === '501' && message === '三方登录失败') {
        FnMessage({
          type: 'success',
          text: '当前QQ号与平台账号未关联'
        })
      } else {
        FnMessage({
          type: 'error',
          text: message
        })
      }

    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance