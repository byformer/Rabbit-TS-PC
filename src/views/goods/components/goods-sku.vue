<script setup lang="ts" name="GoodsSku">
import {GoodsInfo,SpecValue,Spec} from '@/types/goods'
defineProps<{
    goods:GoodsInfo
}>()
const changeSelected = (spec:Spec,SpecValue:SpecValue)=>{
    // 1. 如果选中了，二次点击要取消选中
    // 2. 如果没选中，让他选中，并且排他
    if(SpecValue.selected){
        SpecValue.selected = false
    }else{
        // 排他，先干掉所有人，再复活自己
        spec.values.forEach((v) => v.selected =false)
        SpecValue.selected = true
    }
    
}
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
       <template v-for="sub in item.values" :key="sub.name">
        <img
        v-if="sub.picture"
          :class="{selected:sub.selected}"
          :src="sub.picture"
          alt=""
          @click="changeSelected(item,sub)"
        />
        <span v-else 
        :class="{selected:sub.selected}"
        @click="changeSelected(item,sub)"
        >
        {{ sub.name }}
    </span>
       </template>
      
      </dd>
    </dl>
  
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>


