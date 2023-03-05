import { createElement, Fragment } from 'react'
import { isTaro } from './Taro'
import type { Slider as TaroSliderType } from "@tarojs/components"

type SliderType = typeof TaroSliderType | React.FC
let Slider: SliderType = () => <></>

if (isTaro) {
    const { Slider: TaroSlider } = require('@tarojs/components')
    Slider = TaroSlider
}

export {
    Slider
}

export default Slider
