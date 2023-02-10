import request from '@/utils/request'
import { defineStore } from 'pinia'
import { Profile } from '@/types/user'
import { ApiRes } from '@/types/data'

export default defineStore('user', {
    state() {
        return {
            // 个人信息
            profile: {} as Profile,
        }
    },
    actions: {
        // 用户名和密码
        async login(account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password
            })
            console.log(res);
            this.profile = res.data.result
        },
        // 用户名验证码登录
        async sendMobileCode(mobile:string){
            await request.get('/login/code',{
                params:{
                    mobile
                }
            }) 
        },
        async mobileLogin(mobile: string, code: string) {
            const res = await request.post<ApiRes<Profile>>('/login/code', {
              mobile,
              code
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
           
          },
    }
})