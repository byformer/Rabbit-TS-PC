<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from '@/store';
import DefaultImg from '@/assets/images/200.png';
import { useLazyData } from '@/utils/hooks'
import HomeSkeleton from './home-skeleton.vue';
const { home } = useStore()
// 组件懒加载
const target = useLazyData(() => {
  home.getNewList()
})

</script>
<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" subtitle="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 面板内容 -->
      <Transition name="fade ">
        <ul class="goods-list" v-if="home.newGoodList.length > 0">
          <li v-for="item in home.newGoodList" :key="item.id">
            <RouterLink :to="`/goods/${item.id}`">
              <img v-lazy="item.picture || DefaultImg" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>

        <HomeSkeleton v-else></HomeSkeleton>
      </Transition>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>

