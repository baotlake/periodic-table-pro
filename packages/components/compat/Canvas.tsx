import { createElement } from 'react'
import { isTaro } from './Taro'
import type { Canvas as TaroCanvasType } from "@tarojs/components"

type CanvasType = typeof TaroCanvasType | React.FC
let Canvas: CanvasType = () => <></>

if (isTaro) {
    const { Canvas: TaroCanvas } = require('@tarojs/components')
    Canvas = TaroCanvas
}

export {
    Canvas
}

export default Canvas