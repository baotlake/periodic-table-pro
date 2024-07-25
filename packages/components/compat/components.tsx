'use client'

import {
  PropsWithChildren,
  HTMLAttributes,
  AllHTMLAttributes,
  Fragment,
} from 'react'
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
  CustomWrapper as TaroCustomWrapper,
  PageMeta as TaroPageMeta,
  AdCustom as TaroAdCustom,
  Ad as TaroAd,
} from '@tarojs/components'
import { isTaro } from './Taro'
import { Slider as MySlider } from './Slider'

type HTMLProps = PropsWithChildren<AllHTMLAttributes<{}>>
type LinkProps = any

type HTMLButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
type ButtonType = typeof TaroButtonType | React.FC<HTMLButtonProps>
const buttonOmitProps = ['size', 'type', 'openType']
let Button: ButtonType = (props: HTMLButtonProps) => (
  <button {...omit(props, buttonOmitProps)}>{props.children}</button>
)
if (isTaro) {
  const { Button: TaroButton } = require('@tarojs/components')
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
  const { Canvas: TaroCanvas } = require('@tarojs/components')
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
  const { Image: TaroImage } = require('@tarojs/components')
  Image = TaroImage
}

type InputType = typeof TaroInput | React.FC<HTMLProps>
let Input: InputType = (props: HTMLProps) => (
  <input {...omit(props, ['dangerouslySetInnerHTML'])}>{props.children}</input>
)
if (isTaro && process.env.PLATFORM !== 'h5') {
  const { Input: TaroInput } = require('@tarojs/components')
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
  const { Navigator: N } = require('@tarojs/components')
  Navigator = N
}
if (process.env.PLATFORM == 'next') {
  const Link = require('next/link')
  Navigator = Link
}

type TypeScrollView = typeof TaroScrollView | React.FC<HTMLProps>
let ScrollView: TypeScrollView = (props: HTMLProps) => (
  <div {...omit(props, ['dangerouslySetInnerHTML', 'scrollIntoView'])}>
    {props.children}
  </div>
)
if (isTaro) {
  const { ScrollView: TaroScrollView } = require('@tarojs/components')
  ScrollView = TaroScrollView
}

type TypeVideo = typeof TaroVideo | React.FC<HTMLProps>
const videoProps = [
  'muted',
  'loop',
  'autoPlay',
  'src',
  'width',
  'height',
  'controls',
]
let Video: TypeVideo = (props: HTMLProps) => (
  <video {...pick(props, videoProps)}>{props.children}</video>
)
if (isTaro) {
  const { Video: TaroVideo } = require('@tarojs/components')
  Video = TaroVideo
}

let RichText: typeof TaroRichText = (props: RichTextProps) => {
  return (
    <div
      {...omit(props, ['nodes'])}
      dangerouslySetInnerHTML={{ __html: props.nodes }}
    >
      {props.children}
    </div>
  )
  // return createElement('div', {
  //   ...props,
  //   dangerouslySetInnerHTML: {
  //     __html: props.nodes,
  //   },
  // })
}
if (isTaro && process.env.PLATFORM !== 'h5') {
  const { RichText: TaroRichText } = require('@tarojs/components')
  RichText = TaroRichText
}
if (process.env.PLATFORM === 'alipay') {
  const { AliRichText } = require('./RichText.ali')
  RichText = AliRichText
}

type SliderType = typeof TaroSlider | React.FC
let Slider: SliderType = () => <></>
if (isTaro) {
  const { Slider: TaroSlider } = require('@tarojs/components')
  Slider = TaroSlider
} else {
  Slider = MySlider
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

let CustomWrapper = Fragment as typeof TaroCustomWrapper
if (isTaro) {
  const { CustomWrapper: TaroCustomWrapper } = require('@tarojs/components')
  CustomWrapper = TaroCustomWrapper
}

type PageMetaType = typeof TaroPageMeta
let PageMeta: PageMetaType = () => <></>
if (isTaro) {
  const { PageMeta: TaroPageMeta } = require('@tarojs/components')
  PageMeta = TaroPageMeta
}

type AdCustomType = typeof TaroAdCustom
let AdCustom: AdCustomType = () => null
if (isTaro) {
  const { AdCustom: TaroAdCustom } = require('@tarojs/components')
  AdCustom = TaroAdCustom
}

type AdType = typeof TaroAd
let Ad: AdType = () => null
if (isTaro) {
  const { Ad: TaroAd } = require('@tarojs/components')
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
