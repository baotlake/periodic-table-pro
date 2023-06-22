import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import { NavigationHeader, RichText } from '@periodic-table-pro/components'
import { Categories, getElementsCyclopedia } from '@periodic-table-pro/data'
import useShareMessage from '../../hooks/useShareMessage'
import useShareTimeline from '../../hooks/useShareTimeline'
import { useRecoilState } from 'recoil'
import {
  menuButtonClientRect,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

const BUCKET_HOST = process.env.BUCKET_HOST

export default function ElementsEncyclopedia() {
  const itemList = getElementsCyclopedia()

  const host = BUCKET_HOST
  const imageDir = host + '/elements/1920p/'

  const [theme] = useRecoilState(themeModeState)
  const [rect] = useRecoilState(menuButtonClientRect)

  useShareMessage({
    path: 'pages/elements-cyclopedia/index',
    theme,
  })
  useShareTimeline()

  return (
    <View
      className={classNames('elements-encyclopedia-page', theme)}
      style={{
        paddingTop: rect.bottom + 8 + 'px',
      }}
    >
      <NavigationHeader
        background
        themeClass={theme}
        className="navigation"
        title="元素百科"
      />

      <View className="content">
        {itemList.map((item) => (
          <View
            className={classNames('card-item', Categories[item.category])}
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/wiki/index?Z=' + item.Z,
              })
            }}
          >
            <View className="image-wrapper">
              <Image
                className="image"
                mode="aspectFill"
                src={imageDir + item.symbol + '.jpg'}
              />
            </View>
            <View className="text-wrapper">
              <View className="card-title">{item.title}</View>
              <View className="card-summary">
                <RichText nodes={item.summary} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
