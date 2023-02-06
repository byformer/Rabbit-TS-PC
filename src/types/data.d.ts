
// 所有接口的通用类型
export interface ApiRes<T> {
  code: String,
  msg: string,
  result: T
};
export interface GoodsItem {
  desc: string
  id: string
  name: string
  picture: string
  price: string
}
// 单个类型
export interface categoryItem {
  id: string,
  name: string,
  picture: string,
  children: categoryItem[],
  open: boolean,
  goods: GoodsItem[]

}

// 轮播图类型
export type BannerItem = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: string
}


//  新鲜好物
export interface GoodItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  orderNum: number;
}

//   人气推荐
export type HotGoods = {
  id: string
  picture: string
  title: string
  alt: string
}

// 热门品牌
export type Brand = {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}

