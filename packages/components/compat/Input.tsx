import { createElement } from 'react'
import { isTaro } from './Taro'
import type { Input as TaroInput } from "@tarojs/components"

const PLATFORM = process.env.PLATFORM

type HTMLProps = React.PropsWithChildren<React.AllHTMLAttributes<{}>>
type TypeInput = typeof TaroInput | React.FC<HTMLProps>
let Input: TypeInput = (props: HTMLProps) => createElement('input', props, props.children)

if (isTaro && PLATFORM !== 'h5') {
    const { Input: V } = require('@tarojs/components')
    Input = V
}

export {
    Input,
}

export default Input
