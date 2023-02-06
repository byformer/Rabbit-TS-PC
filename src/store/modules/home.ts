import {defineStore} from 'pinia'
import request from '@/utils/request'
import { BannerItem,ApiRes,GoodItem,HotGoods,Brand,HomeProduct,Special } from '@/types/data'
export default defineStore('home',{
    state(){
        return {
            bannerList:[] as BannerItem[], // banner轮播
            newGoodList:[] as GoodItem[],  // 新鲜好物
            hotGoodList:[] as HotGoods[],  // 人气推荐
            brandList: [] as Brand[], // 热门品牌
            productList: [] as HomeProduct[], // 居家美食区域
            specialList: [] as Special[], // 指定专题
        }
    },
    actions:{
        // banner轮播
        async getBannerList(){
            const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
            this.bannerList = res.data.result
        },
        // 新鲜好物
        async getNewList(){
            const res = await request.get<ApiRes<GoodItem[]>>('/home/new')
            this.newGoodList = res.data.result
            
        },
        // 人气推荐
         async getHotList(){
            const res = await request.get<ApiRes<HotGoods[]>>('/home/hot')
            this.hotGoodList = res.data.result
         }, 
        //  热门品牌
        async getBrandList(){
            const res = await request.get<ApiRes<Brand[]>>('/home/brand')
            this.brandList = res.data.result
         },
        //  居家美食区域
        async getProductList() {
            const res = await request.get<ApiRes<HomeProduct[]>>('/home/goods')
            this.productList = res.data.result
          },
        //   指定专题
        async getSpecialList() {
            const res = await request.get<ApiRes<Special[]>>('/home/special')
            this.specialList = res.data.result
          },
    }
})