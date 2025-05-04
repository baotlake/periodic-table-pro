import { STATIC_BASE } from '@packages/components'
import { useShareAppMessage } from '@tarojs/taro'

const posterImg = STATIC_BASE + '/img/ui/poster.png'

type Argrments = {
  path?: string
  theme?: 'dark' | 'light'
  posterImage?: boolean
}
export default function useShareMessage(
  { path, theme, posterImage } = {
    path: '',
    theme: 'dark',
    posterImage: true,
  } as Argrments
) {
  useShareAppMessage((res) => {
    return {
      title: '一起来探索有关化学的有趣知识。',
      path: path || 'pages/index/index',
      // imageUrl: theme === 'light' ? shareImgLight : shareImgDark,
      imageUrl: posterImage ? posterImg : undefined,
    }
  })
}

export { useShareMessage }
