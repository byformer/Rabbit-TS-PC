
import useCateGoryStore from './modules/category'
import useHomeStore from './modules/home'
export default function useStore() {
    return {
        category: useCateGoryStore(),
        home: useHomeStore(),
    }
}