
import useCateGoryStore from './modules/category'

export default function useStore(){
    return {
        category:useCateGoryStore()
    }
}