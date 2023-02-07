import { defineStore } from "pinia";
import request from '@/utils/request'
import { ApiRes, categoryItem,TopCategory } from '@/types/data'
import { topCatepory } from '../constants'

const defaultCategory = topCatepory.map(item => {
    return {
        name: item,
    }
})

export default defineStore('category', {
    state() {
        return {
            list: defaultCategory as categoryItem[],
            topCategory:{} as TopCategory,
        }
    },
    getters: {

    },
    actions: {
        async getCateGoryList() {
            const res = await request.get<ApiRes<categoryItem[]>>(
                '/home/category/head')

            // 这里对后台返回回来的数据进行加工, 新增一个属性 open, 标记弹层显示隐藏
            // 默认所有都隐藏
            res.data.result.forEach((item) => {
                item.open = false
            })
            this.list = res.data.result
        },
        show(id: string) {
            const itemObj = this.list.find((item) => item.id === id)
            itemObj!.open = true
        },

        hide(id: string) {
            const itemObj = this.list.find((item) => item.id === id)
            itemObj!.open = false
        },
        // 获取一级分类
       async getCategory(id: string){
            const res = await request.get<ApiRes<TopCategory>>('/category',{
                params:{
                    id,
                }
            })
            this.topCategory = res.data.result
        }
    }
})