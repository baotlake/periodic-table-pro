
import { View, Image, Button } from "@tarojs/components"
import classNames from "classnames"
import { useState } from "react"
import Taro from "@tarojs/taro"

import searchSvg from '../../assets/icons/search.svg'
import toolsSvg from '../../assets/icons/tools.svg'
import settingSvg from '../../assets/icons/setting.svg'
import likeSvg from '../../assets/icons/like_outlined.svg'
import shareSvg from '../../assets/icons/share.svg'
import circleSvg from '../../assets/icons/circle.svg'

import './index.scss'

type Props = {
    themeClass?: string
}

export function BottomNavigation({ themeClass }: Props) {
    const [collapse, setCollapse] = useState(false)


    return (
        <View className={classNames("bottom-navigation-wrapper", themeClass)}>
            <View
                className={classNames("box", {
                    collapse: collapse,
                })}
            >
                {/* <View
                    className="item"
                    onLongPress={(e) => {
                        e.preventDefault()
                        setCollapse(false)
                    }}
                >
                    <Image className="icon" src={shareSvg} />
                    <View className="label">分享</View>
                    <Button className="wx-open-type-button" openType="share" />
                </View> */}
                <View
                    className="item"
                    onLongPress={() => setCollapse(false)}
                    onClick={() => Taro.navigateTo({
                        url: '/pages/search/index'
                    })}
                >
                    <Image className="icon" src={searchSvg} />
                    <View className="label">搜索</View>
                </View>
                <View
                    className="item"
                    onClick={() => Taro.navigateTo({
                        url: '/pages/tools/index'
                    })}
                >
                    <Image className="icon" src={toolsSvg} />
                    <View className="label">工具</View>
                </View>
                <View
                    className="item"
                    onClick={() => Taro.navigateTo({
                        url: '/pages/setting/index'
                    })}
                >
                    <Image className="icon" src={settingSvg} />
                    <View className="label">设置</View>
                </View>
                <View
                    className="item"
                    onClick={() => Taro.navigateTo({
                        url: '/pages/like/index'
                    })}
                >
                    <Image className="icon" src={likeSvg} />
                    <View className="label">支持</View>
                </View>
                <View className="item">
                    <Image className="icon" src={shareSvg} />
                    <View className="label">分享</View>
                    <Button className="wx-open-type-button" openType="share" />
                </View>
                <View className="item"
                    onClick={() => setCollapse(true)}
                >
                    <Image className="icon" src={circleSvg} />
                    <View className="label">收起</View>
                </View>
            </View>
        </View>
    )
}