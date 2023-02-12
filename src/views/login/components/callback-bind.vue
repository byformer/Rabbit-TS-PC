<script name="CallbackBind" lang="ts" setup>
import { QQUserInfoRes, QQUserInfo } from '@/types/user'
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate'
import { codeRule, mobileRule } from '@/utils/validate';
import useStore from '@/store';
import FnMessage from '@/components/message';
import { useRouter } from 'vue-router';


const router = useRouter()
// 获取qq头像昵称
const qqInfo = ref<QQUserInfo>({} as QQUserInfo)
let openId = ''
// 判断qq是否登录
if (QC.Login.check()) {
  //  获取qq信息
  QC.api('get_user_info').success((res: QQUserInfoRes) => {
    qqInfo.value = res.data
  })
}
// 获取openId
QC.Login.getMe( id =>{
  openId = id
})
const { user } = useStore()
// 表单校验
const { validate, resetForm } = useForm({
  validationSchema: {
    mobile: mobileRule,
    code: codeRule
  }
})

const { value: mobile, errorMessage: mobileError,validate:validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')

const mobileRef = ref<HTMLInputElement | null>(null)
const time = ref(0) // 倒计时的秒数
let timeId = -1
const send = async () => {
  if (time.value > 0) return
   // 手机号通过效验发送验证码，效验结果为true，才发送验证码
   const res = await validateMobile()
  if(!res.valid){
    mobileRef.value?.focus()
    return
  }
  await user.sendQQBindMsg(mobile.value)
  // 添加提示
  FnMessage({
    type: 'success',
    text: '发送验证码成功'
  })
  // 开启倒计时
  time.value = 60
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timeId)
    }
  }, 1000)
}

const bind = async()=>{
  const res = await validate()
  if(!res.valid) return

  // 校验通过发送，发请求进行绑定
  await user.qqBindLogin(openId,mobile.value,code.value)
  // 提示成功信息
    FnMessage({
      type:'success',
      text:'QQ绑定成功'
    })
    // 跳转到首页
    router.push('/')
  
}
</script>
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="qqInfo.figureurl_qq_1" alt="" />
      <p>Hi，{{ qqInfo.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input v-model="mobile" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input v-model="code" class="input" type="text" placeholder="短信验证码" />
        <span class="code" @click="send">{{ time === 0 ? '发送验证码' : `${time}s后发送` }}</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>

