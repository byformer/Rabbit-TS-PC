import { defineStore } from "pinia";
import { GoodsInfo } from '@/types/goods'
import { ApiRes } from '@/types/data'
import request from '@/utils/request'
export default defineStore('goods', {
    state() {
        return {
            // 商品详情信息
            info: {} as GoodsInfo,
        }
    },
    actions:{
        async getGoodsInfo(id:string){
            const res = await request.get<ApiRes<GoodsInfo>>('/goods',{
                params:{
                    id,
                }
            })
            
            this.info= res.data.result
            
        }
    }
})