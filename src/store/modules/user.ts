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
        }
        // 用户名验证码登录
    }
})