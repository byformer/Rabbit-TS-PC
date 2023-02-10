import { h,render } from "vue"
import Message from './message.vue'
type Props = {
    type:'success' | 'error' | 'warning',
    text:string
    duration?:number
}

// 准备一个容器，专门用于存放显示隐藏的弹窗
// 1. 显示往专门的div中
// 2. 隐藏删除专门的div
// 目前的效果，如果有多个提示框，后面的提示框则会将前面的覆盖 => 同时只能一个提示框
const divContainer = document.createElement('div')
divContainer.setAttribute('class','xtx-message-container')
document.body.appendChild(divContainer)

export default function FnMessage({type,text,duration = 2000}:Props){
    // 1.创建虚拟dom
      const vNode = h(Message,{type,text})
    //  2.动态render
    render(vNode,divContainer)
    // 3. 开一个延时器，到时间让他隐藏
    setTimeout(()=>{
        // 删除虚拟dom
        render(null,divContainer)
       
    },duration)
}
