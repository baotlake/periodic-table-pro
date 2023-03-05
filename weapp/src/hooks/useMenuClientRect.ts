import Taro from '@tarojs/taro'
import { useEffect, Dispatch } from 'react'
import { Action, initialState, setMenuButtonClientRect } from '../state'


const PLATFORM = process.env.PLATFORM

export function useMenuClientRect(dispatch: Dispatch<Action>) {
    useEffect(() => {
        const getClientRect = async () => {
            const { windowWidth: ww, windowHeight: wh } = Taro.getSystemInfoSync()

            if (['weapp', 'qq', 'alipay'].includes(PLATFORM)) {
                await new Promise<void>((resolve) => { Taro.nextTick(() => { resolve() }) })
                const rect = Taro.getMenuButtonBoundingClientRect();
                return {
                    ...rect,
                    windowWidth: ww,
                    windowHeight: wh,
                }
            }

            const rect = initialState['menuButtonClientRect'];
            const rm = rect.windowWidth - rect.right
            
            return {
                ...rect,
                right: ww - rm,
                left: ww - rect.width - rm,
                windowWidth: ww,
                windowHeight: wh,
            }
        }

        getClientRect()
            .then((rect) => {
                dispatch && dispatch(setMenuButtonClientRect(rect))
            })


        const handleResize = () => {
            getClientRect()
                .then((rect) => {
                    dispatch && dispatch(setMenuButtonClientRect(rect))
                })
        }

        let listenOnWindowResize = false

        if (['weapp', 'qq', 'h5'].includes(PLATFORM)) {
            listenOnWindowResize = true
            Taro.onWindowResize(handleResize)
        }

        return () => {
            if (listenOnWindowResize) {
                Taro.offWindowResize(handleResize)
            }
        }
    }, [])
}