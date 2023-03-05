import { createElement } from 'react'
import { isTaro } from './Taro'
import type { RichText as RichTextType, RichTextProps } from "@tarojs/components"

const PLATFORM = process.env.PLATFORM

let RichText: typeof RichTextType = (props: RichTextProps) => {
    return createElement('div', {
        ...props,
        dangerouslySetInnerHTML: {
            __html: props.nodes,
        }
    })
}

if (isTaro && PLATFORM !== 'h5') {
    const { RichText: R } = require('@tarojs/components')
    RichText = R
}

if (PLATFORM === 'alipay') {
    const { AliRichText } = require('./RichText.ali')
    RichText = AliRichText
}

export {
    RichText,
}

export default RichText