<script lang="ts" setup name="LoginForm">
import FnMessage from '@/components/message/';
import useStore from '@/store';
import { ref,watch } from 'vue'
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate'
const type = ref<'account' | 'mobile'>('account')
const { user } = useStore()
const router = useRouter()
const form = ref({
  account: '',
  password: '',
  isAgree: false,
})

// 添加表单验证
const { validate,resetForm } = useForm({
  validationSchema: {
    account(value: string) {
      // value是将来使用该规则的表单元素的值
      // 1. 必填
      // 2. 6-20个字符，需要以字母开头
      // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
      if (!value) return '请输入用户名'
      if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
      return true
    },
    password(value: string) {
      if (!value) return '请输入密码'
      if (!/^\w{6,12}$/.test(value)) return '密码必须是6-12位字符'
      return true
    },
    isAgree(value: boolean) {
      if (!value) return '请同意许可'
      return true
    },
    mobile(value:string){
      if(!value) return '请输入手机号'
      if(!/^1[3-9]\d{9}$/.test(value) ) return '手机号输入有误' 
      return true 
    },
    code(value:string){ 
      if(!value) return '请输入验证码'
      if(!/^\d{6}$/.test(value)) return '验证码输入有误'
      return true
    }
  }
})

const { value: account, errorMessage: accountError } = useField<string>('account')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeError } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileError,validate:validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')

// 基本登录逻辑
const login = async () => {
  // 登录前的校验
  const res = await validate()
  // 没有校验通过则返回
  if(!res.valid) return
  console.log(res);
  
 
    await user.login(account.value, password.value)

    FnMessage({
      type: 'success',
      text: '登录成功',
    })
    router.push('/')


}

// 处理切换重置
watch(type,()=>{
  // 一旦触发，说明切换了，直接重置
  resetForm()
})

// 处理发送验证码
const mobileRef = ref<HTMLInputElement | null>(null)
   const time = ref(0) // 倒计时的秒数
   let timeId = -1
const send = async ()=>{
  if(time.value >0) return
  // 手机号通过效验发送验证码，效验结果为true，才发送验证码
/*   const res = await validateMobile()
  if(!res.valid){
    mobileRef.value?.focus()
    return
  }

   await user.sendMobileCode(mobile.value)
   FnMessage({
    type:'success',
    text:'获取验证码成功'
   }) */
   time.value = 5
   timeId =window.setInterval(()=>{
    time.value--
    if(time.value<= 0){
      clearInterval(timeId)
    }
   },1000)

}
</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="type = 'account'" href="javascript:;" v-if="type==='mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="type = 'mobile'" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="type === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="account" type="text" placeholder="请输入用户名" />
          </div>
          <div class="error" v-if="accountError">
            <i class="iconfont icon-warning" />{{ accountError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="passwordError">
            <i class="iconfont icon-warning" />{{ passwordError }}
          </div>
        </div>

      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input ref="mobileRef" v-model="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="mobileError">
            <i class="iconfont icon-warning" />{{ mobileError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" type="text" placeholder="请输入验证码" />
            <span class="code" @click="send">
            {{ time === 0 ? '发送验证码' : `${time}s后发送` }}
            </span>
          </div>
          <div class="error" v-if="codeError">
            <i class="iconfont icon-warning" />{{ codeError }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <CheckBox v-model="isAgree">我已同意</CheckBox>

          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeError">
          <i class="iconfont icon-warning" />{{ isAgreeError }}
        </div>
      </div>

      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

