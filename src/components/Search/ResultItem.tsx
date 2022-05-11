import Taro from "@tarojs/taro"
import classNames from "classnames"
import { View, Text } from "@tarojs/components"
import ElementBox from "../ElementBox"
import * as elements from "../../data/elements"
import type { search } from '../../utils/search'
import { Categories, elementsCategories } from "../../data/classification"


import './resultItem.scss'

type ResultData = NonNullable<ReturnType<typeof search>>[0]

type Props = {
    data: ResultData
}

export function ResultItem({ data }: Props) {

    const handleClick = () => {
        Taro.navigateTo({
            url: "/pages/detail/index?Z=" + data.Z
        })
    }

    return (
        <View
            className={classNames("search-result-item",
                [Categories[elementsCategories[data.Z - 1]]],
            )}
            onClick={handleClick}
        >
            <View className="box-wrapper">
                <ElementBox
                    atomicNumber={data.Z}
                    symbol={elements.symbol[data.Z - 1]}
                    zhName={elements.zhCNNames[data.Z - 1]}
                    bc={elements.formalShortAtomicWeights[data.Z - 1]}
                />
            </View>

            <View className="detail">
                <View>
                    <Text className="name">名称: {elements.zhCNNames[data.Z - 1]}</Text>
                    <Text>英文名: {elements.enName[data.Z - 1]}</Text>
                </View>
                <View>
                    相对原子质量: {elements.formalShortAtomicWeights[data.Z - 1]}
                </View>
            </View>
        </View>
    )
}