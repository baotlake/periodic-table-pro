import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import classNames from 'classnames'
import menus from './menus'

import './permanentDrawer.scss'

type Props = {
    className?: string
    themeClass?: string
}

export default function MenuPageDrawer({ className, themeClass }: Props) {

    const handleClickItem = (item: (typeof menus)[0]['items'][0]) => {
        switch (item.name) {
            case 'share':
                break
            default:
                Taro.redirectTo({
                    url: item.route,
                })
                break
        }
    }

    return (
        <View className={classNames('menu-page-drawer', className, themeClass)}>
            {
                menus.map((group) => (
                    <View key={group.key} className='group'>
                        {
                            group.items.map((item) => {
                                if (item.name == 'shop') {
                                    return <View
                                      className='item'
                                      key={item.name}
                                      onClick={() => Taro.navigateToMiniProgram({ appId: item.route })}
                                    >
                                        <Image className='icon shop' src={item.icon} />
                                        <Text className='title'>{item.label}</Text>
                                    </View>
                                }
                                if (item.name === 'share') {
                                    return <View
                                      className='item'
                                      key={item.name}
                                      onClick={() => Taro.showShareMenu({
                                            menus: ['shareAppMessage', 'shareTimeline']
                                        } as any)}
                                    >
                                        <Image className='icon' src={item.icon} />
                                        <Text className='title'>{item.label}</Text>
                                        <Button className='wx-open-type-button' openType='share' />
                                    </View>
                                }
                                return (
                                    <View
                                      className='item'
                                      key={item.name}
                                      onClick={() => handleClickItem(item)}
                                    >
                                        <Image className='icon' src={item.icon} />
                                        <Text className='title'>{item.label}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                ))
            }
        </View>
    )
}