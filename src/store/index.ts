
import useCateGoryStore from './modules/category'
import useHomeStore from './modules/home'
import useGoodsStore from './modules/goods'
import useUserStore from './modules/user'
export default function useStore() {
    return {
        category: useCateGoryStore(),
        home: useHomeStore(),
        goods:useGoodsStore(),
        user:useUserStore()
    }
}