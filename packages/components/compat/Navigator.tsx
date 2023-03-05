import { createElement } from 'react'
import { isTaro } from './Taro'
import type { Navigator as TaroNavigator } from "@tarojs/components"
import type { LinkProps } from 'next/link'

const PLATFORM = process.env.PLATFORM

type HTMLProps = React.PropsWithChildren<React.AllHTMLAttributes<{}>>
type TypeNavigator = typeof TaroNavigator | React.FC<HTMLProps> | React.FC<LinkProps>
let Navigator: TypeNavigator = (props: HTMLProps) => createElement('a', props, props.children)

if (isTaro) {
    const { Navigator: N } = require('@tarojs/components')
    Navigator = N
}

if (PLATFORM == 'next') {
    const Link = require('next/link')
    Navigator = Link
}

export {
    Navigator,
}

export default Navigator
