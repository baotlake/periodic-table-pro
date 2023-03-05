import { createElement } from 'react'
import { isTaro } from './Taro'
import type { ImageProps } from "@tarojs/components"

type HTMLProps = React.AllHTMLAttributes<{}>
type Props = React.PropsWithChildren<Omit<HTMLProps, 'src'> | Omit<ImageProps, 'src'>> & { src: any }
let Image: React.FC<Props> = (props: Props) => {
    let p = {
        ...props,
        ...(typeof props.src === 'object' ? { src: props.src['src'] } : {})
    } as HTMLProps
    return createElement('img', p, props.children)
}

if (isTaro) {
    const { Image: I } = require('@tarojs/components')
    Image = I
}

export {
    Image,
}

export default Image
