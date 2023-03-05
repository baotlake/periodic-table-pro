import { createElement } from 'react'
import { isTaro } from './Taro'
import type { ScrollView as TaroScrollView } from "@tarojs/components"

type HTMLProps = React.PropsWithChildren<React.AllHTMLAttributes<{}>>
type TypeScrollView = typeof TaroScrollView | React.FC<HTMLProps>
let ScrollView: TypeScrollView = (props: HTMLProps) => createElement('div', props, props.children)

if (isTaro) {
    const { ScrollView: S } = require('@tarojs/components')
    ScrollView = S
}

export {
    ScrollView,
}

export default ScrollView
