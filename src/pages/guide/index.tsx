import { View, Text, Button, Video } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout } from '../../components/Layout'
import { VideoDemo } from '../../components/Guide'
import useThemeMode from '../../hooks/useThemeMode'
import useShareMessage from '../../hooks/useShareMessage'

import './index.scss'

const host = process.env.TARO_ENV == 'weapp' ? STORAGE_HOST : BUCKET_HOST
const videosPath = host + '/videos/'

export default function GuidePage() {

    const [theme] = useThemeMode()
    useShareMessage()

    return (
        <View className={classNames('guide-page', theme)}>
            <MenuPageLayout
                themeClass={theme}
                title='使用说明'
            >
                <View className='content'>
                    <View className='paragraph'>
                        <Text style={{ fontWeight: 'bold' }}>2022 </Text>
                        新版「元素周期表PRO」来啦！
                    </View>
                    <View className='paragraph'>
                        全新的设计，更好的屏幕适配，手机、平板iPad和桌面(Windows、Mac)都有更好的使用体验！
                    </View>

                    <View className='paragraph'>
                        <Text>1.切换元素中央的属性</Text>
                        <VideoDemo src={videosPath + 'emphasize_guide.mp4'} ratio={600 / 440} />
                    </View>
                    <View className='paragraph'>
                        <Text>2.切换元素底部的属性</Text>
                        <VideoDemo src={videosPath + 'properties_guide.mp4'} ratio={720 / 932} />
                    </View>
                    <View className='paragraph'>
                        <Text>3.切换元素颜色标识</Text>
                        <VideoDemo src={videosPath + 'color_guide.mp4'} ratio={960 / 1000} />
                    </View>

                    <View className='paragraph'>
                        <Button
                            size='mini'
                            openType='share'
                            style={{
                                verticalAlign: '-1.5ex',
                                padding: '0 0.6em',
                                margin: '0 0.2em',
                            }}
                        >推荐给朋友</Button>
                        ，元素周期表会越来越好用呦！
                    </View>
                </View>
            </MenuPageLayout>
        </View>
    )
}
