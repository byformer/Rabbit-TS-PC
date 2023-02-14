import XtxConfirm from './confirm.vue'
import { h, render} from 'vue'
// 准备容器
const div = document.createElement('div')
// 设置类
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)


type ParamsType = {
    text: string
    title: string
}
export default function Confirm({ text, title,}: ParamsType) {
  return new Promise((resolve,reject)=>{
    const confirmCllabck =()=>{
        resolve('确认')
        // 关闭弹框
        render(null,div)
    }   
    const cancelConfirm = ()=>{
        reject('取消')
         // 关闭弹框
         render(null,div)
    }
    // 创建虚拟dom
    const vNode = h(XtxConfirm, {
         text, title,
         confirmCllabck,
         cancelConfirm, 
        })
    // 动态render到容器
    render(vNode,div)
  })
}