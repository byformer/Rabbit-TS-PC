
// 所有接口的通用类型
export interface ApiRes<T>{
    code:String,
    msg:string,
    result:T
};
 export interface GoodsItem{
    desc: string
    id: string
    name: string
    picture: string
    price: string 
 }
// 单个类型
export  interface categoryItem {
    id:string,
    name:string,
    picture:string,
    children:categoryItem[],
    open:boolean,
    goods:GoodsItem[]
    
}

// 轮播图类型
export type BannerItem = {
    hrefUrl: string
    id: string
    imgUrl: string
    type: string
  }