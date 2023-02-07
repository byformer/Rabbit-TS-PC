<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia';
import GoodsItem from './components/goods-item.vue'
const routes = useRoute()
const { category, home } = useStore()
// 由于路由切换，组件没有切换，还是同一个分类组件，只是根据不同的id渲染不同的分类
// setup只会执行一次，就应该监听路由的变化，路由只要变了，就应该发送请求
// watch(
//     () => routes.params.id,
//     (newVal)=>{
//         if(!newVal) return
//         category.getCategory(routes.params.id as string)
//     },{
//         immediate:true,
//     }
// )

// 优化 使用watchEffect
watchEffect(() => {
    // 如果用的到数据，确实都需要依赖，依赖了就有变化 => watchEffect
    // 有参数才发请求
    if (!routes.params.id) return
    // 这个请求只在一级目录发
    if (routes.fullPath !== `/category/${routes.params.id}`) return
    // 获取一级分类的数据
    category.getCategory(routes.params.id as string)
    // 获取展示的轮播图数据
    home.getBannerList()
})

const { topCategory } = storeToRefs(category)
</script>

<template>
    <div class="top-category">
        <div class="container">
            <Bread>
                <BreadItem to="/">去首页</BreadItem>
                <BreadItem>{{ category.topCategory.name }}</BreadItem>
            </Bread>

            <Carousel :slider="home.bannerList" style="height:500px" autopaly>
            </Carousel>

            <!-- 所有二级分类 -->
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="item in topCategory.children" :key="item.id">
                        <a href="javascript:;">
                            <img v-lazy="item.picture">
                            <p>{{ item.name }}</p>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- 分类关联商品 -->
            <div class="ref-goods" v-for="item in topCategory.children">
                <div class="head">
                    <h3>- {{ item.name }} -</h3>
                    <p class="tag">温暖柔软，品质之选</p>
                    <XtxMore />
                </div>
                <div class="body">
                    <GoodsItem :goods="goods" v-for="goods in item.goods" :key="goods.id" />
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped lang="less">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;

                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: @xtxColor;
                    }
                }
            }
        }
    }
}

.ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>