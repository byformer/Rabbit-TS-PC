
// 所有接口的通用类型
export interface ApiRes<T>{
    code:String,
    msg:string,
    result:T
};

// 单个类型
export  interface categoryItem {
    id:string,
    name:string,
    picture:string,
    open:boolean,
    children:categoryItem[],
    
}