import { defineStore } from "pinia";
import request from '@/utils/request'
import { ApiRes } from "@/types/data";
import { CartItem } from '@/types/cart'
import useStore from "..";
type CheckObj ={
    isEffective:boolean
    nowPrice:number
    stock:number
}
const useCartStore = defineStore('cart', {

   
    // 状态
    state() {
        return {
            list: [] as CartItem[],
        }
    },
    // 本地存储
    persist:{
        key:'rabbit-cart_53'
    },
    // 计算
    getters: {
        // 标记是否登录
            isLogin():boolean{
                const {user} = useStore() 
                return !!user?.profile?.token
            },
        // 基于原有的数据，进行筛选，筛选出有效的购物车列表
        // 有效的列表 isEffective true
        effectiveList(): CartItem[] {
            return this.list.filter(item => item.isEffective && item.stock > 0)
        },
        // 有效商品的总数量
        effectiveListCounts(): number {
            const total = this.effectiveList.reduce((sum, item, index) => {
                return sum + item.count
            }, 0)
            return total
        },
        // 有效商品的总价格
        effectiveListPrice(): string {
            const totalPrice = this.effectiveList.reduce((sum, item, index) => {
                return sum + item.count * +item.nowPrice
            }, 0)
            return totalPrice.toFixed(2)
        },
         // 统计是否全部选中，设置是否全选
         isAllSelected():boolean{
            return this.effectiveList.every((item) => item.selected) && 
            this.effectiveList.length !== 0
        },
        // 已选择的列表
        selectedList(): CartItem[]{
            return this.effectiveList.filter(item => item.selected)
        },
        // 已选择的总数量
        selectedListCounts():number{
            return this.selectedList.reduce((sum,item)=> sum + item.count,0)
        },
        // 已选择的总价
        selectedListPrice():string{
            return this.selectedList.reduce((sum,item)=> sum + item.count * +item.nowPrice,0).toFixed(2)
        }
    },
    // 方法
    actions: {

        // 获取购物车
        async getCartList() {
            if(this.isLogin){
                const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
            this.list = res.data.result
            }else{
                this.list.forEach(async cartItem =>{
                    const skuId = cartItem.skuId
                    const res = await request.get<ApiRes<CheckObj>>(`/goods/stock/${skuId}`)
                    // 更新现价
                    const cartItemInfo = res.data.result
                    cartItem.nowPrice= (+cartItemInfo.nowPrice).toFixed(2)
                    cartItem.stock = cartItemInfo.stock
                    cartItem.isEffective = cartItemInfo.isEffective
                })

               
                
            }
            
        },
        // 加入购物车
        async addCart(data: CartItem) {
          if(this.isLogin){
            await request.post('/member/cart', {
                skuId:data.skuId,
                count:data.count
            })
            

            // 重新获取购物车列表
            this.getCartList()
          }else{
             console.log('本地添加操作',data);
             const goods = this.list.find(item => item.skuId === data.skuId)
            //  已存在，数量上累加
           if(goods){
            goods.count += data.count
           } else{
            this.list.unshift(data)
           }
          }
        },
        // 删除购物车
        async deleteCart(skuIds: string[]) {
            if(this.isLogin){
                  await request.delete('/member/cart', {
                data: {
                    ids: skuIds
                }
            })
            this.getCartList()
        }else{
            this.list = this.list.filter(item => !skuIds.includes(item.skuId))
        }
          
            
        },
        async updateCart(skuId: string,
            data: { selected?: boolean, count?: number }
        ) {
           if(this.isLogin){
            await request.put(`/member/cart/${skuId}`, data)
            //    重新获取购物车列表
            this.getCartList()
           }else{
            const goods = this.effectiveList.find(item=>item.skuId === skuId)
            if(data.selected !== undefined){
                goods!.selected= data.selected
            }
            if(data.count !== undefined){
                goods!.count = data.count
            }
           }
        },
        // 修改全选或者不全选
        async updateCartAllSelected(isSelected:boolean){
          if(this.isLogin){
            await request.put('/member/cart/selected',{
                selected:isSelected,
            })
            // 获取最新的购物车列表
            this.getCartList()
          }else{
            this.list.forEach(item =>{
                item.selected = isSelected
            })
          }
     },
        // 清除购物车
        clearCart(){
            // 清除购物车
            this.list =[]
        },
        // 合并购物车
        async mergeLocalCart(){
            const data= this.list.map(item => {
                return {
                    skuId:item.skuId,
                    selected:item.selected,
                    count:item.count,
                }
            })
            // 合并购物车
            await request.post('member/cart/merge',data)
            // 合并成功
            this.getCartList()
        }
    },
});

export default useCartStore; 