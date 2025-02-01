import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import { NavigationHeader, RichText } from '@periodic-table-pro/components'
import { Categories, getElementsCyclopedia } from '@periodic-table-pro/data'
import { STATIC_BASE } from '@periodic-table-pro/components/config'
import useShareMessage from '../../hooks/useShareMessage'
import useShareTimeline from '../../hooks/useShareTimeline'
import { useAtom } from 'jotai'
import {
  menuButtonClientRect,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

export default function ElementsEncyclopedia() {
  const itemList = getElementsCyclopedia()

  const imageDir = STATIC_BASE + '/img/1920p/'

  const [theme] = useAtom(themeModeState)
  const [rect] = useAtom(menuButtonClientRect)

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
        className="navigation"
        title="元素百科"
      />

      <View className="content">
        {itemList.map((item, i) => (
          <View
            key={i}
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
