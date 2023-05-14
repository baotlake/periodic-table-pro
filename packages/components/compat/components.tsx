import { createElement, PropsWithChildren, HTMLAttributes, AllHTMLAttributes } from 'react'
import { pick, omit } from 'lodash-es'
import type {
    Button as TaroButtonType,
    Canvas as TaroCanvasType,
    Image as TaroImageType,
    ImageProps,
    Input as TaroInput,
    Navigator as TaroNavigator,
    ScrollView as TaroScrollView,
    Video as TaroVideo,
    RichText as TaroRichText,
    RichTextProps,
    Slider as TaroSlider,
    Switch as TaroSwitch,
} from "@tarojs/components"
import type { LinkProps } from 'next/link'
import { isTaro } from './Taro'

const PLATFORM = process.env.PLATFORM

type HTMLProps = PropsWithChildren<AllHTMLAttributes<{}>>


type HTMLButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
type ButtonType = typeof TaroButtonType | React.FC<HTMLButtonProps>
const buttonOmitProps = ['size', 'type', 'openType']
let Button: ButtonType = (props: HTMLButtonProps) => createElement('button', omit(props, buttonOmitProps), props.children)
if (isTaro) {
    const { Button: TaroButton } = require('@tarojs/components')
    Button = TaroButton
}


type HTMLCanvasProps = PropsWithChildren<HTMLAttributes<HTMLCanvasProps>>
type CanvasType = typeof TaroCanvasType | React.FC<HTMLCanvasProps>
let Canvas: CanvasType = (props: HTMLCanvasProps) => createElement('canvas', props, props.children)
if (isTaro) {
    const { Canvas: TaroCanvas } = require('@tarojs/components')
    Canvas = TaroCanvas
}

type HTMLImageProps = Omit<HTMLProps, 'src'> & Omit<ImageProps, 'src'> & { src?: any }
type ImageType = React.FC<HTMLImageProps>
const imageOmitProps = ['mode']
let Image: ImageType = (props: HTMLImageProps) => {
    let p: HTMLProps = {
        ...omit(props, imageOmitProps),
        ...(typeof props.src === 'object' ? { src: props.src['src'] } : {})
    }
    return createElement('img', p, props.children)
}
if (isTaro) {
    const { Image: TaroImage } = require('@tarojs/components')
    Image = TaroImage
}


type InputType = typeof TaroInput | React.FC<HTMLProps>
let Input: InputType = (props: HTMLProps) => createElement('input', props, props.children)
if (isTaro && PLATFORM !== 'h5') {
    const { Input: TaroInput } = require('@tarojs/components')
    Input = TaroInput
}

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


type TypeScrollView = typeof TaroScrollView | React.FC<HTMLProps>
let ScrollView: TypeScrollView = (props: HTMLProps) => createElement('div', props, props.children)
if (isTaro) {
    const { ScrollView: TaroScrollView } = require('@tarojs/components')
    ScrollView = TaroScrollView
}


type TypeVideo = typeof TaroVideo | React.FC<HTMLProps>
const videoProps = ['muted', 'loop', 'autoPlay', 'src', 'width', 'height', 'controls']
let Video: TypeVideo = (props: HTMLProps) => createElement('video', pick(props, videoProps), props.children)
if (isTaro) {
    const { Video: TaroVideo } = require('@tarojs/components')
    Video = TaroVideo
}


let RichText: typeof TaroRichText = (props: RichTextProps) => {
    return createElement('div', {
        ...props,
        dangerouslySetInnerHTML: {
            __html: props.nodes,
        }
    })
}
if (isTaro && PLATFORM !== 'h5') {
    const { RichText: TaroRichText } = require('@tarojs/components')
    RichText = TaroRichText
}
if (PLATFORM === 'alipay') {
    const { AliRichText } = require('./RichText.ali')
    RichText = AliRichText
}


type SliderType = typeof TaroSlider | React.FC
let Slider: SliderType = () => <></>
if (isTaro) {
    const { Slider: TaroSlider } = require('@tarojs/components')
    Slider = TaroSlider
} else {
    const { Slider: S } = require('./Slider')
    Slider = S
}


type SwitchType = typeof TaroSwitch | React.FC
let Switch: SwitchType = () => <></>
if (isTaro) {
    const { Switch: TaroSwitch } = require('@tarojs/components')
    Switch = TaroSwitch
} else {
    const { Switch: S } = require('./Switch')
    Switch = S
}


export {
    Button,
    Canvas,
    Image,
    Input,
    Navigator,
    ScrollView,
    Video,
    RichText,
    Slider,
    Switch,
}