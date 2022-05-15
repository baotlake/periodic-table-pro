import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'

import wxacode from '../../assets/images/wxacode.jpg'
import "./menuButton.scss"


type Props = {
    style?: React.CSSProperties

}

export default function MenuButton({ style }: Props) {

    const [visible, setVisible] = useState(false)

    return (
        <View
            className='menu-button'
            style={{
                ...style,
                '--radius': style?.borderRadius,
            } as React.CSSProperties}
        >
            <View
                className='more'
                onClick={() => setVisible(!visible)}
            >
                <View className='css-icon' />
            </View>
            <View
                className='other'
                onClick={() => setVisible(!visible)}
            >
                <View className='css-icon' />
            </View>

            {
                visible && (
                    <View className='dropdown'>
                        <Image src={wxacode} />
                    </View>
                )
            }
        </View>
    )
}