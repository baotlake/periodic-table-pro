'use client'

import {
  PropsWithChildren,
  HTMLAttributes,
  AllHTMLAttributes,
  Fragment,
} from 'react'
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
  CustomWrapper as TaroCustomWrapper,
  PageMeta as TaroPageMeta,
  AdCustom as TaroAdCustom,
  Ad as TaroAd,
} from '@tarojs/components'
import { isTaro, components } from './Taro'
import { Slider as MySlider } from './Slider'

const omit = (props: Record<string, any>, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(props).filter(([k, v]) => !keys.includes(k))
  )
}

type HTMLProps = PropsWithChildren<AllHTMLAttributes<{}>>
type LinkProps = any

type HTMLButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
type ButtonType = typeof TaroButtonType | React.FC<HTMLButtonProps>
const buttonOmitProps = ['size', 'type', 'openType']
let Button: ButtonType = (props: HTMLButtonProps) => (
  <button {...omit(props, buttonOmitProps)}>{props.children}</button>
)
if (isTaro) {
  const { Button: TaroButton } = components
  Button = TaroButton
}

type HTMLCanvasProps = HTMLAttributes<HTMLCanvasElement>
type CanvasType = typeof TaroCanvasType | React.FC<HTMLCanvasProps>
let Canvas: CanvasType = (props: HTMLCanvasProps) => (
  <canvas {...omit(props, ['dangerouslySetInnerHTML'])}>
    {props.children}
  </canvas>
)
if (isTaro) {
  const { Canvas: TaroCanvas } = components
  Canvas = TaroCanvas
}

type HTMLImageProps = Omit<HTMLProps, 'src'> &
  Omit<ImageProps, 'src'> & { src?: any }
type ImageType = React.FC<HTMLImageProps>
const imageOmitProps = ['mode']
let Image: ImageType = (props: HTMLImageProps) => {
  let p: HTMLProps = {
    ...omit(props, imageOmitProps),
    ...(typeof props.src === 'object' ? { src: props.src['src'] } : {}),
  }
  return <img {...omit(p, ['dangerouslySetInnerHTML'])}>{props.children}</img>
}
if (isTaro) {
  const { Image: TaroImage } = components
  Image = TaroImage as any
}

type InputType = typeof TaroInput | React.FC<HTMLProps>
let Input: InputType = (props: HTMLProps) => (
  <input {...omit(props, ['dangerouslySetInnerHTML'])}>{props.children}</input>
)
if (isTaro && process.env.PLATFORM !== 'h5') {
  const { Input: TaroInput } = components
  Input = TaroInput
}

type TypeNavigator =
  | typeof TaroNavigator
  | React.FC<HTMLProps>
  | React.FC<LinkProps>
let Navigator: TypeNavigator = (props: HTMLProps) => (
  <a {...omit(props, ['dangerouslySetInnerHTML'])}>{props.children}</a>
)
if (isTaro) {
  const { Navigator: N } = components
  Navigator = N
}
if (process.env.PLATFORM == 'next') {
  const Link = require('next/link')
  Navigator = Link
}

type TypeScrollView = typeof TaroScrollView | React.FC<HTMLProps>
let ScrollView: TypeScrollView = (props: HTMLProps) => (
  <div
    {...omit(props, ['dangerouslySetInnerHTML', 'scrollIntoView', 'scrollY'])}
  >
    {props.children}
  </div>
)
if (isTaro) {
  const { ScrollView: TaroScrollView } = components
  ScrollView = TaroScrollView
}

type TypeVideo = typeof TaroVideo | React.FC<HTMLProps>
let Video: TypeVideo = (props: HTMLProps) => (
  <video {...omit(props, [])}>{props.children}</video>
)
if (isTaro) {
  const { Video: TaroVideo } = components
  Video = TaroVideo
}

let RichText: typeof TaroRichText = (props: RichTextProps) => {
  return (
    <div
      {...omit(props, ['nodes'])}
      dangerouslySetInnerHTML={{ __html: props.nodes as string }}
    >
      {props.children}
    </div>
  )
}
if (isTaro && process.env.PLATFORM !== 'h5') {
  const { RichText: TaroRichText } = components
  RichText = TaroRichText
}
if (process.env.PLATFORM === 'alipay') {
  const { AliRichText } = require('./RichText.ali')
  RichText = AliRichText
}

type SliderType = typeof TaroSlider | React.FC
let Slider: SliderType = () => <></>
if (isTaro) {
  const { Slider: TaroSlider } = components
  Slider = TaroSlider
} else {
  Slider = MySlider
}

type SwitchType = typeof TaroSwitch | React.FC
let Switch: SwitchType = () => <></>
if (isTaro) {
  const { Switch: TaroSwitch } = components
  Switch = TaroSwitch
} else {
  const { Switch: S } = require('./Switch')
  Switch = S
}

/**
 * 小程序性能优化：创建一个原生自定义组件，对后代节点的 setData 将由此自定义组件进行调用，达到局部更新的效果
 * - flex 布局在跨原生自定义组件时会失效
 * - SelectorQuery.select 方法的跨自定义组件的后代选择器写法需要增加 >>>
 */
let CustomWrapper = Fragment as typeof TaroCustomWrapper
if (isTaro) {
  const { CustomWrapper: TaroCustomWrapper } = components
  CustomWrapper = TaroCustomWrapper
}

type PageMetaType = typeof TaroPageMeta
let PageMeta: PageMetaType = () => <></>
if (isTaro) {
  const { PageMeta: TaroPageMeta } = components
  PageMeta = TaroPageMeta
}

type AdCustomType = typeof TaroAdCustom
let AdCustom: AdCustomType = () => null
if (isTaro) {
  const { AdCustom: TaroAdCustom } = components
  AdCustom = TaroAdCustom
}

type AdType = typeof TaroAd
let Ad: AdType = () => null
if (isTaro) {
  const { Ad: TaroAd } = components
  Ad = TaroAd
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
  CustomWrapper,
  PageMeta,
  AdCustom,
  Ad,
}
