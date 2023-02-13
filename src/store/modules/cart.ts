import { defineStore } from "pinia";
import request from '@/utils/request'
import { ApiRes } from "@/types/data";
import { CartItem } from '@/types/cart'
const useCartStore = defineStore('cart', {

    // 状态
    state() {
        return {
            list: [] as CartItem[],
        }
    },

    // 计算
    getters: {
        // 基于原有的数据，进行筛选，筛选出有效的购物车列表
        // 有效的列表 isEffective true
        effectiveList(): CartItem[] {
            return this.list.filter(item => item.isEffective && item.stock > 0)
        },
        // 有效商品的总数量
        effectiveListCounts(): number {
            const total = this.effectiveList.reduce((sum, item, index) => {
                return sum + item.count
            },0)
            return total
        },
        // 有效商品的总价格
        effectiveListPrice(): string{
            const totalPrice = this.effectiveList.reduce((sum,item,index)=>{
                return sum + item.count * +item.nowPrice
            },0)
            return totalPrice.toFixed(2)
        }
    },
    // 方法
    actions: {
       
        // 获取购物车
        async getCartList() {
            const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
            this.list = res.data.result
        },
         // 加入购物车
         async addCart(data: { skuId: string, count: number }) {
            await request.post('/member/cart', data)
            // 重新获取购物车列表
            this.getCartList()
        }
    },
});

export default useCartStore; 