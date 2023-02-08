// 商品的规格类型
export type Spec = {
  name: string
  values: SpecValue[]
}

type GoodsDetail = {
  pictures: string[]
  properties: {
    name: string
    value: string
  }[]
}

// 商品的sku类型 （最小库存单元）
export type Sku = {
  id: string
  inventory: number
  oldPrice: string
  price: string
  skuCode: string
  specs: {
    name: string
    valueName: string
  }[]
}

// 商品模块的类型声明
export type GoodsInfo = {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  evaluationInfo?: any
  categories: {
    id: string
    name: string
  }[]
  specs: Spec[]
  skus: Sku[]
  details: GoodsDetail
}


  