import { defineStore } from "pinia";
import request from '@/utils/request'
import {ApiRes,categoryItem } from '@/types/data'
export default defineStore ('category',{
    state(){
        return{
            list:[] as categoryItem[],
        }
    },
    getters:{

    },
    actions:{
       async getCateGoryList(){
             const res = await request.get<ApiRes<categoryItem[]>>('/home/category/head')
             this.list = res.data.result
             
             
        }
    }
})