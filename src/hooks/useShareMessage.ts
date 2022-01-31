import { useShareAppMessage } from "@tarojs/taro"

import shareImgDark from '../assets/images/share-dark.jpg'
import shareImgLight from '../assets/images/share-light.jpg'


type Argrments = {
    path?: string,
    theme?: 'dark' | 'light'
}
export default function useShareMessage({ path, theme } = { path: '', theme: 'dark' } as Argrments) {
    useShareAppMessage((res) => {
        return {
            title: '一起来探索有关化学的有趣知识。',
            path: path || 'pages/index/index',
            imageUrl: theme === 'light' ? shareImgLight : shareImgDark,
        }
    })
}