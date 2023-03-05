import { createElement, Fragment } from 'react'
import { isTaro } from './Taro'
import type { Switch as TaroSwitchType } from "@tarojs/components"

type SwitchType = typeof TaroSwitchType | React.FC
let Switch: SwitchType = () => <></>

if (isTaro) {
    const { Switch: TaroSwitch } = require('@tarojs/components')
    Switch = TaroSwitch
}

export {
    Switch
}

export default Switch
