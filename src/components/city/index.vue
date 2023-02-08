<script lang="ts" setup name="XtxCity">
import { ref, watch } from 'vue';
import axios from 'axios';

import { onClickOutside } from '@vueuse/core'
// 组件对外输出的信息格式
export type CityResult = {
    provinceCode: string;
    provinceName: string;
    cityCode: string;
    cityName: string;
    countyCode: string;
    countyName: string;
  }

  // 城市列表类型
export type AreaList = {
  code: string
  level: number
  name: string
  areaList: AreaList[]
}

defineProps<{
  userAddress?: string
}>()
const emit = defineEmits<{
  (e:'changeCity',value:CityResult):void
}>()



const active = ref(false)
const cityList = ref<AreaList[]>([])
// 原始数据
const cacheList = ref<AreaList[]>([])

const target = ref(null)
// 选择城市结果集合
const changeResult = ref({
  // 省份
  provinceCode: '',
  provinceName: '',
  // 城市相关
  cityCode: '',
  cityName: '',
  // 区县相关
  countyCode: '',
  countyName: ''
})
// 切换弹框的显示
const toggle = () => {
  active.value = !active.value
}
// 点击在外面时关闭弹框
onClickOutside(target, (e) => {
  active.value = false
})
const getCityList = async () => {
  const res = await axios.get<AreaList[]>(
    'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')

  cityList.value = res.data
  cacheList.value = res.data
}

const selectCity = (item: AreaList) => {
  // 操作省
  if (item.level === 0) {
    changeResult.value.provinceCode = item.code
    changeResult.value.provinceName = item.name
    cityList.value = item.areaList
  }
  // 处理城市
  if (item.level === 1) {
    changeResult.value.cityCode = item.code
    changeResult.value.cityName = item.name
    cityList.value = item.areaList
  }
  // 处理区
  if (item.level === 2) {
    changeResult.value.countyCode = item.code
    changeResult.value.cityName = item.name
    active.value = false

    // 在这里传数据
    // this.$emit(事件名，参数)
    // emit(事件名，参数)
    emit('changeCity',changeResult.value)
  }
}
getCityList()
// 监听弹框关闭，就恢复
watch(active, (value) => {
  if (!value) {
    cityList.value = cacheList.value
  }
})

</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active:active}">
      <span class="value" v-if="userAddress">{{ userAddress }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span class="ellipsis" v-for="item in cityList" @click="selectCity(item)" :key="item.code">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

