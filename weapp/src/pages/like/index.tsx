import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { View, Image, Button } from '@tarojs/components'
import { MenuPageLayout } from '@packages/components'
import useShareMessage from '../../hooks/useShareMessage'
import { useAtom } from 'jotai'
import { STATIC_BASE, themeModeState } from '@packages/components'
import './index.scss'

const PLATFORM = process.env.PLATFORM

const base =
  PLATFORM === 'alipay'
    ? STATIC_BASE + '/alipay'
    : PLATFORM === 'qq'
    ? STATIC_BASE + '/qq'
    : STATIC_BASE

const posterImg = base + '/img/ui/poster.png'

export default function LikePage() {
  useShareMessage()
  const [theme] = useAtom(themeModeState)

  const previewQR = () => {
    Taro.previewImage({
      urls: [posterImg],
      showmenu: true,
    })
  }

  return (
    <View className={classNames('like-page', theme)}>
      <MenuPageLayout className={theme} title="支持">
        <View className="content">
          <View className="text">
            喜欢请转发给更多人，为「元素周期表Pro」加油！点击图片可保存
          </View>
          <View className="qr-wrapper">
            <View className="qr-block">
              <Image
                className="qr"
                src={posterImg}
                onClick={previewQR}
                showMenuByLongpress
              />
            </View>
          </View>
          <View className="text">
            {/* 分享转发「元素周期表Pro」给需要的人 */}
          </View>
          <Button className="share-button" openType="share" type="primary">
            转发给朋友
          </Button>
        </View>
      </MenuPageLayout>
    </View>
  )
}
