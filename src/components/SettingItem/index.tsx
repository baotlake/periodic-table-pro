import { View, Image, Text, Switch } from "@tarojs/components"
import classNames from "classnames"

import arrowImg from '../../assets/icons/dropdown-arrow.svg'
import './index.scss'

type Props<T = string | boolean> = {
    themeClass?: string
    icon: string
    title: string
    value: T
    onChange?: (value: T) => void
    onClick?: () => void
}

export default function SettingItem({ themeClass, icon, title, value, onChange, onClick }: Props) {

    return (
        <View className={classNames('setting-item', themeClass)} onClick={onClick}>
            <View className='title-container'>
                <Image className='icon' src={icon} />
                <Text className='title'>{title}</Text>
            </View>
            <View className='value-container'>
                {
                    typeof value === 'boolean' ? (
                        <Switch
                          className='switch'
                          checked={value}
                          onChange={(e) => onChange && onChange(e.detail.value)}
                        />
                    ) : typeof value === 'string' ? (
                        <>
                            {value}
                            <Image className='icon' src={arrowImg} />
                        </>
                    ) : false
                }
            </View>
        </View>
    )
}