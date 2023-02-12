export function accountRule(value: string) {
    // value是将来使用该规则的表单元素的值
    // 1. 必填
    // 2. 6-20个字符，需要以字母开头
    // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
}
export function passwordRule(value: string) {
    if (!value) return '请输入密码'
    if (!/^\w{6,12}$/.test(value)) return '密码必须是6-12位字符'
    return true
}
export function isAgreeRule(value: boolean) {
    if (!value) return '请同意许可'
    return true
}
export function mobileRule(value: string){
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号输入有误'
    return true
}
export function codeRule(value: string){
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码输入有误'
    return true
}

export function rePasswordRule(value: string, { form }: any) {
    if (!value) return '请输入确认密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-12个字符'
    // 校验密码是否一致  form表单数据对象
    if (value !== form.password) return '两次输入的密码不一致'
    return true
  }
  
  