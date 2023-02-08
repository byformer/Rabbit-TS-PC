<script lang="ts" setup name="SubCategory">
import useStore from '@/store';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsItem from './components/goods-item.vue'
const { category } = useStore()
const route = useRoute()
watchEffect(() => {
  const id = route.params.id as string
  // id存在且路径是我们的二级分类路由路径
  if (id && route.fullPath === `/category/sub/${id}`) {
    category.getSubFilter(route.params.id as string)
  }
})

</script>
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem :to="`/category/${category.subCategory.parentId}`">
          {{ category.subCategory.parentName }}</BreadItem>
        <BreadItem>{{ category.subCategory.name }}</BreadItem>
      </Bread>

  
      <!-- 筛选区 -->
      <div class="sub-filter">
        <!-- 渲染品牌 -->
        <div class="item" >
          <div class="head">品牌：</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a href="javascript:;" 
            v-for="item in category.subCategory.brands"
             :key="item.id">
             {{ item.name }}
            </a>
          </div>
        </div>
        <!-- 规格 -->
        <div class="item" 
        v-for="obj in category.subCategory.saleProperties"
         :key="obj.id"
        >
          <div class="head">{{ obj.name }}</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a href="javascript:;" 
               v-for="sub in obj.properties"
               :key="sub.id">{{ sub.name }}</a>
          </div>
        </div>

      </div>

      <!-- 商品区域 -->
<div class="goods-list">
  <!-- 排序区域 -->
  <div class="sub-sort">
    <div class="sort">
      <a href="javascript:;" class="active">默认排序</a>
      <a href="javascript:;">最新商品</a>
      <a href="javascript:;">最高人气</a>
      <a href="javascript:;">评论最多</a>
      <a href="javascript:;">
        价格排序
        <i class="arrow up" />
        <i class="arrow down" />
      </a>
    </div>
  </div>
  <!-- 商品列表 --> 
  <ul>
    <li v-for="goods in  category.subCategory.goods" :key="goods.id">
      <GoodsItem :goods="goods"  />
    </li>
  </ul>
</div>
    </div>
  </div>
</template>


<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  .sub-sort {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sort {
      display: flex;
      a {
        height: 30px;
        line-height: 28px;
        border: 1px solid #e4e4e4;
        padding: 0 20px;
        margin-right: 20px;
        color: #999;
        border-radius: 2px;
        position: relative;
        transition: all 0.3s;
        &.active {
          background: @xtxColor;
          border-color: @xtxColor;
          color: #fff;
        }
        .arrow {
          position: absolute;
          border: 5px solid transparent;
          right: 8px;
          &.up {
            top: 3px;
            border-bottom-color: #bbb;
            &.active {
              border-bottom-color: @xtxColor;
            }
          }
          &.down {
            top: 15px;
            border-top-color: #bbb;
            &.active {
              border-top-color: @xtxColor;
            }
          }
        }
      }
    }
    .check {
      .xtx-checkbox {
        margin-left: 20px;
        color: #999;
      }
    }
  }
}
</style>


