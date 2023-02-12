import { defineStore } from "pinia";
import request from '@/utils/request'
const useCartStore = defineStore('cart', {

    // 状态
    state() {
        return {
            list: []
        }
    },
    
// 计算
getters: {},
    // 方法
    actions: {
       async addCart(data:{skuId:string,count:number}){
           await request.post('/member/cart',data)
       
        }
    },
});

export default useCartStore; 