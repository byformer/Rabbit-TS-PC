
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
  goods: GoodsItem[],
  parentId:string,
  parentName:string,
  open: boolean,
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


// 首页商品推荐
export type HomeProduct = {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: {
    id: string
    name: string
  }[]
  goods: {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    discount?: any
    orderNum: number
  }[]
}

// 指定专题
export type Special = {
  creator: string
  isDelete: number
  createTime: string
  updateTime: string
  id: string
  classificationId: string
  title: string
  summary: string
  lowestPrice: number
  cover: string
  detailsUrl: string
  collectNum: number
  viewNum: number
  replyNum: number
}

// 顶级分类类型
export type TopCategory = {
  id: string
  name: string
  picture: string
  children: categoryItem[]
}


// sub
export type SaleProperty = {
  id: string
  name: string
  properties: {
    id: string
    name: string
  }[]
}

export type SubCategory = {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
  }[]
  saleProperties: SaleProperty[],
  goods:GoodItem[]
}

