import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout } from '@packages/components'
import useShareMessage from '../../hooks/useShareMessage'

import logoImg from '../../assets/images/logo.png'
import githubSvg from '../../assets/icons/github.svg'

import './index.scss'
import { useAtom } from 'jotai'
import { themeModeState } from '@packages/components'

const PLATFORM = process.env.PLATFORM

export default function AboutPage() {
    const [theme] = useAtom(themeModeState)

    useShareMessage()

    return (
        <View className={classNames('about-page', theme)}>
            <MenuPageLayout className={theme} title="关于">
                <View className="profile">
                    <Image className="logo" src={logoImg}></Image>
                    <View className="name">元素周期表PRO</View>
                </View>

                <View className="section">
                    元素周期表Pro ——
                    高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。
                </View>

                <View className="section">
                    元素周期表Pro是由欢洋精心打造的原创化学元素周期表工具，采用全新的设计风格，
                    支持Web（H5）、微信小程序、QQ小程序和支付宝小程序等多种平台，适配不同尺寸的屏幕设备。
                </View>

                <View className="section">
                    <Image className="icon" src={githubSvg} />
                    <Text userSelect className="text">
                        https://github.com/baotlake/periodic-table-pro
                    </Text>
                </View>

                <View className="section text-8xl">
                    如果我们的某些内容无意侵犯您了的合法权益，请您通过客服联系我们进行移除。
                </View>
                {['weapp', 'h5'].includes(PLATFORM) && (
                    <View className="section">
                        <View>公众号可自由关联「元素周期表Pro」</View>
                        <Text userSelect>AppID: wx20e649abe5acb0bc</Text>
                    </View>
                )}
            </MenuPageLayout>
        </View>
    )
}
