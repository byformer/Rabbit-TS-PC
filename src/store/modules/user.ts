import request from '@/utils/request'
import { defineStore } from 'pinia'
import { Profile } from '@/types/user'
import { ApiRes } from '@/types/data'
import { getProfile, removeProfile, setProfile } from '@/utils/storage'

export default defineStore('user', {
    state() {
        return {
            // 个人信息
            profile: getProfile(),
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

            // 往本地存
            setProfile(res.data.result)
        },
        // 用户名验证码登录
        async sendMobileCode(mobile: string) {
            await request.get('/login/code', {
                params: {
                    mobile
                }
            })
        },
        // qq登录
        //  source: 1为pc，2为webapp，3为微信小程序, 4为Android, 5为ios, 6为qq, 7为微信
        async qqLogin(openId: string) {
            const res = await request.post<ApiRes<Profile>>('/login/social', {
              unionId: openId,
              source: 6,
            })
            this.profile = res.data.result
            setProfile(res.data.result)
          },

        // 手机号验证码登录
        async mobileLogin(mobile: string, code: string) {
            const res = await request.post<ApiRes<Profile>>('/login/code', {
                mobile,
                code
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            // 往本地存
            setProfile(res.data.result)
        },
        //   退出
        logout() {
            this.profile = {} as Profile
            removeProfile()
        }
    }
})