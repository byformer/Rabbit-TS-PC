<script lang="ts" setup name="Goods">
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsImage from './components/goods-image.vue';
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetail from './components/goods-detail.vue';
import GoodsHot from './components/goods-hot.vue'
const { goods } = useStore()
const { info } = storeToRefs(goods)
const route = useRoute()

watchEffect(() => {
  const id = route.params.id as string
  // 必须id存在，且是商品才发请求
  if (id && route.fullPath === `/goods/${id}`) {


    goods.resetGoodsInfo()

    goods.getGoodsInfo(id)
  }

})

const changeSku = (skuId: string) => {
  // console.log(skuId)
  const sku = info.value.skus.find((item) => item.id === skuId)
  if (sku) {
    info.value.inventory = sku.inventory // 更新库存
    info.value.price = sku.price // 更新价格
    info.value.oldPrice = sku.oldPrice // 更新老价格
  }
}

const count = ref(1)
</script> 
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <transition name="fade">
        <!-- 渲染 -->
        <div v-if="info.categories">
          <!-- 面包屑 -->
          <Bread>
            <BreadItem to="/">首页</BreadItem>
            <BreadItem :to="`/category/${info.categories[1].id}`">
              {{ info.categories[1].name }}
            </BreadItem>
            <BreadItem :to="`/category/sub/${info.categories[0].id}`">
              {{ info.categories[0].name }}
            </BreadItem>
            <BreadItem>{{ info.name }}</BreadItem>
          </Bread>
          <!-- 商品信息 -->
          <div class="goods-info">
            <div class="media">
              <GoodsImage :images="info.mainPictures" />
              <GoodsSales />
            </div>
            <div class="spec">
              <!-- 商品名称 -->
              <GoodsName :goods="info" />
              <!-- 商品规格 sku组件-->
              <GoodsSku :goods="info" @changeSku="changeSku" />
              <!-- 数字框组件 -->
              <Numbox v-model:modelValue="count" :min="2" :max="10" />
              <Button type="primary" style="margin-top:20px">加入购物车</Button>

            </div>
          </div>
          <!-- 商品详情 -->
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品+评价 -->
              <div class="goods-tabs">
                <!-- 商品详情 -->
                <GoodsDetail :goods="info" />
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
              <div class="goods-aside">
                <GoodsHot :type="1" />
                <GoodsHot :type="2" />
                <GoodsHot :type="3" />
           
            </div>
          </div>
        </div>

        <!-- 占位的 -->
        <div v-else>
          <!-- 面包屑 -->
          <Bread>
            <BreadItem to="/">首页</BreadItem>
            <BreadItem></BreadItem>
            <BreadItem></BreadItem>
            <BreadItem></BreadItem>
          </Bread>
          <!-- 商品信息 -->
          <div class="goods-info"></div>
          <!-- 商品详情 -->
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品+评价 -->
              <div class="goods-tabs"></div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside"></div>
          </div>
        </div>

      </transition>
    </div>



  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>

