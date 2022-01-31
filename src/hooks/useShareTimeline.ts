import { useShareTimeline as useShare } from "@tarojs/taro"

export default function useShareTimeline(title = '元素周期表PRO —— 探索化学的世界') {

    useShare(() => {
        return {
            title: title,
        }
    })
}