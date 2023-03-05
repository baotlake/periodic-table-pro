import { createElement } from 'react'
import { isTaro } from './Taro'
import type { Button as TaroButtonType } from "@tarojs/components"

type HTMLProps = React.PropsWithChildren<React.HTMLAttributes<HTMLAnchorElement>>
type ButtonType = typeof TaroButtonType | React.FC<HTMLProps>

let Button: ButtonType = (props: HTMLProps) => createElement('button', props, props.children)

if (isTaro) {
    const { Button: TaroButton } = require('@tarojs/components')
    Button = TaroButton
}

export {
    Button,
}

export default Button
