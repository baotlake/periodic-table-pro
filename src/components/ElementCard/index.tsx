import { View } from "@tarojs/components";
import classNames from "classnames";
import { zhCNCategories, Categories } from "../../data/classification";
import './index.scss'

type Props = {
    themeClass?: string
    symbol: string
    enName: string
    name: string
    atomicNumber: number
    atomicWeight: string | number
    category: number
    pinyin: string
}

export default function ElementCard({
    themeClass,
    symbol,
    enName,
    name,
    atomicNumber,
    atomicWeight,
    category,
    pinyin,
}: Props) {

    return (
        <View className={classNames('element-card default', Categories[category], themeClass)}>
            <View className='tag'>{zhCNCategories[category]}</View>
            <View className='name'>{symbol}</View>
            <View className='properties'>
                <View className='item'>
                    {atomicNumber + ' ' + name + ' ' + pinyin}
                </View>
                <View className='item'>{enName}</View>
                <View className='item'>{atomicWeight}</View>
            </View>
        </View>
    )
}