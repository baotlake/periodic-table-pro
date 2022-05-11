import { View } from "@tarojs/components"


import './noResult.scss'

export function NoResult() {

    return (
        <View className="no-result">
            <View className="title" >没有找到任何结果</View>
            <View className="des">
                可以搜索“元素符号”、“原子序数”、“元素名称”或“原子量”等。
            </View>
            <View className="des">
                例如: "H", "氢", "1"
            </View>
        </View>
    )
}