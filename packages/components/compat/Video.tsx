import { createElement } from 'react'
import { isTaro } from './Taro'
import type { Video as TaroVideo } from "@tarojs/components"
import { pick } from 'lodash-es'

type HTMLProps = React.PropsWithChildren<React.AllHTMLAttributes<{}>>
type TypeVideo = typeof TaroVideo | React.FC<HTMLProps>

const videoProps = ['muted', 'loop', 'autoPlay', 'src', 'width', 'height', 'controls']
let Video: TypeVideo = (props: HTMLProps) => createElement('video', pick(props, videoProps), props.children)

if (isTaro) {
    const { Video: V } = require('@tarojs/components')
    Video = V
}

export {
    Video,
}

export default Video
