import Taro from '@tarojs/taro'
import { View, Image, Text, OpenData, Button } from '@tarojs/components'
import classNames from "classnames"
import menus from './menus'

import backgroundImg from '../../assets/images/background.jpg'
import logoImg from '../../assets/images/logo.png'
import './persistentDrawer.scss'


type Props = {
  themeClass?: string
  visible: boolean
  onClose?: () => void
}


export default function PersistentDrawer({ themeClass, visible, onClose }: Props) {

  const handleClickItem = (item: (typeof menus)[0]['items'][0]) => {
    switch (item.name) {
      case 'share':
        break
      default:
        Taro.navigateTo({
          url: item.route,
        })
        break
    }
  }

  return (
    <View className={classNames('menu-drawer-wrapper', { visible: visible }, themeClass)}>
      <View className='backdrop' onClick={onClose} />
      <View className='menu-drawer'>
        <View className='profile-container'>
          <Image className='background-image' mode='aspectFill' src={backgroundImg} />
          <View className='profile'>
            <View className='user'>
              {
                process.env.TARO_ENV === 'weapp' ? (
                  <>
                    <OpenData className='avatar' type='userAvatarUrl' />
                    <OpenData className='nickname' type='userNickName' />
                  </>
                ) : (
                  <>
                    <Image className='avatar' src={logoImg} />
                    <Text className='nickname'>元素周期表Pro</Text>
                  </>
                )
              }
            </View>
            <View className=''></View>
          </View>
        </View>
        <View className='menu-container'>
          {
            menus.map((group) => (
              <View key={group.key} className='group'>
                {group.items.map((item) => {

                  if (item.name === 'shop') {
                    return <View
                      key={item.name}
                      className='menu-item'
                      onClick={() => Taro.navigateToMiniProgram({ appId: item.route })}
                    >
                      <Image className='icon shop' src={item.icon} />
                      <Text className='label'>{item.label}</Text>
                    </View>
                  }

                  if (item.name === 'share') {
                    return <View
                      key={item.name}
                      className='menu-item'
                      onClick={() => handleClickItem(item)}
                    >
                      <Image className='icon' src={item.icon}></Image>
                      <Text className='label'>{item.label}</Text>
                      <Button className='wx-open-type-button' openType='share' />
                    </View>
                  }

                  return <View
                    key={item.name}
                    className='menu-item'
                    onClick={() => handleClickItem(item)}
                  >
                    <Image className='icon' src={item.icon}></Image>
                    <Text className='label'>{item.label}</Text>
                  </View>
                })}
              </View>
            ))
          }
        </View>
      </View>
    </View>
  )
}
