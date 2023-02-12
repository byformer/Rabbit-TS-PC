<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, SpecValue, Spec } from '@/types/goods'
import bwPowerset from '@/utils/bwPowerset'
const props = defineProps<{
    goods: GoodsInfo
    skuId?:string
}>()
const emit = defineEmits<{
  (e: 'changeSku', skuId: string): void
}>()
// sku组件的基本使用
// 1. 需要传入的商品对象 => 
// 修改按钮的选中状态

const changeSelected = (spec: Spec, SpecValue: SpecValue) => {

    if (SpecValue.disabled) return
    // 1. 如果选中了，二次点击要取消选中
    // 2. 如果没选中，让他选中，并且排他
    if (SpecValue.selected) {
        SpecValue.selected = false
    } else {
        // 排他，先干掉所有人，再复活自己
        spec.values.forEach((v) => v.selected = false)
        SpecValue.selected = true
    }
    // 一旦按钮被重新选择了，那么按钮状态也会随之更新
    updateStatus()
    // (1) 判断, 是否所有可选规格, 都选择
    const selectedArr = getSelectedSpec().filter((item) => item)
    if (selectedArr.length === props.goods.specs.length) {
        // (2) 说明全部选中, 将得到的数组, 转成字符串, 去pathMap中找对应skuId
        const key = selectedArr.join('+') // '蓝色+10cm+中国'
        const result = pathMap[key]
        const skuId = result[0] // 这个skuId, 是result中的唯一值
        emit('changeSku', skuId)
    }else{
        emit('changeSku','')
    }
}
type PathMapObj = {
    [key: string]: string[]
}
// 基于数据，得到路径子集
const getPathMap = () => {
    const pathMap: PathMapObj = {}

    // 过滤所有的skus，得到有效的skus
    const skus = props.goods.skus.filter(item => item.inventory > 0)
    // 遍历有效的skus，获取skus的子集，进行处理
    skus.forEach(sku => {
        // 整理数据，得到[属性1，属性2，属性3..]
        const arr = sku.specs.map(item => item.valueName)
        // 整理子集
        const powerSet = bwPowerset(arr)

        // 遍历子集，将子集的数据，往pathMap存
        //  (1) 如果筛选条件不存在，新开一个条件，存
        //  (2) 如果筛选条件已存在，则在已有的属性上累加
        powerSet.forEach(sub => {
            // 将数组拼合成一个字符串，将来作为键
            const key = sub.join('+')
            // 判断键在对象中是否存在
            if (key in pathMap) {
                // 已存在，在已有的属性上累计啊
                pathMap[key].push(sku.id)
            } else {
                pathMap[key] = [sku.id]
            }

        })

    })
    return pathMap
}

// 更新启用禁用状态
const updateStatus = () => {
    const selectArr = getSelectedSpec()
    // 根据路径字典更新
    props.goods.specs.forEach((spec, index) => {
        spec.values.forEach(specValue => {
            // 让当前这个按钮，specValue.name 和selectArr进行组合
            const tempArr = [...selectArr]
            tempArr[index] = specValue.name

            const key = tempArr.filter(item => item).join('+')
            if (key in pathMap) {
                // 存在，说明有库存，不禁用
                specValue.disabled = false
            } else {
                // 不存在，说明没库存，禁用
                specValue.disabled = true
            }
        })
    })
}

// 获取当前的选中状态
const getSelectedSpec = () => {
    // 根据现有所以的值，根据下标，进行遍历，将选中的值，按照下标存入数组 
    const arr = ['', '', '']
    props.goods.specs.forEach((spec, index) => {
        // spec.values.forEach(specValue =>{
        //     console.log(specValue.selected);

        // })
        const tempObj = spec.values.find(specValue => specValue.selected)
        arr[index] = tempObj ? tempObj.name : ''
    })
    return arr
}
// 默认根据父传子
const initSelectedSpec = () => {
    if (!props.skuId) return
    const sku = props.goods.skus.find((item) => item.id === props.skuId)

    if (!sku) return
    // 基于sku.specs, 让按钮设置成选中状态
    // 三排按钮, 一排一排的来
    props.goods.specs.forEach((spec, index) => {
        // find, 每一排其实, 只会有一个被选中
        const text = sku.specs[index].valueName
        const specValue = spec.values.find((item) => item.name === text)
        specValue!.selected = true
    })
}



const pathMap = getPathMap()
// 2. 先按照skuId进行初始化, 将选中状态设置好
initSelectedSpec()
// 更新禁用状态
updateStatus()


</script>
<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.name">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="sub in item.values" :key="sub.name">
                    <img v-if="sub.picture" :class="{
                        selected: sub.selected,
                        disabled: sub.disabled
                    }" :src="sub.picture" alt="" @click="changeSelected(item, sub)" />
                    <span v-else :class="{
                        selected:
                            sub.selected, disabled: sub.disabled
                    }" @click="changeSelected(item, sub)">
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

            >img {
                width: 50px;
                height: 50px;
                margin-top: 5px;
                .sku-state-mixin ();
            }

            >span {
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


