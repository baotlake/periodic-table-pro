import Taro from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'
import classNames from 'classnames'
import {MenuPageLayout} from '../../components/Layout'
import useThemeMode from '../..//hooks/useThemeMode'
import useShareMessage from '../../hooks/useShareMessage'

import rewardQRImg from '../../assets/images/reward-qr.jpg'
import './index.scss'

export default function LikePage() {

  useShareMessage()
  const [theme] = useThemeMode()

  const previewQR = () => {
    Taro.previewImage({
      urls: [rewardQRImg],
      showmenu: true,
    })
  }

  return (
    <View className={classNames('like-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='喜欢'
      >
        <View className='content'>
          <View className='text'>
            让「元素周期表PRO」变的更好！
          </View>
          <View className='qr-wrapper'>
            <View className='qr-block'>
              <Image
                className='qr'
                src={rewardQRImg}
                onClick={previewQR}
                showMenuByLongpress
              />
            </View>
          </View>
          <View className='text'>
            转发「元素周期表PRO」给身边的人，也是对我们的一种支持和帮助哟！
          </View>
          <Button className='share-button'>转发</Button>
        </View>
      </MenuPageLayout>
    </View>
  )
}
