import { useEffect, Dispatch } from 'react'
import {
    Action,
    initialState,
    setMenuButtonClientRect
} from '../state'
import { Taro, isTaro, onWindowResize, offWindowResize } from '../compat'

const PLATFORM = process.env.PLATFORM

export function useMenuClientRect(dispatch: Dispatch<Action>) {
    useEffect(() => {
        const getClientRect = async () => {

            if (isTaro && PLATFORM != 'h5') {
                const { windowWidth: ww, windowHeight: wh } = Taro.getSystemInfoSync()
                await new Promise<void>((resolve) => { Taro.nextTick(() => { resolve() }) })
                const rect = Taro.getMenuButtonBoundingClientRect()
                return {
                    ...rect,
                    windowWidth: ww,
                    windowHeight: wh,
                }
            }

            const [ww, wh] = [innerWidth, innerHeight]
            const rect = initialState['menuButtonClientRect']
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

        onWindowResize(handleResize)

        return () => {
            offWindowResize(handleResize)
        }
    }, [])
}

export default useMenuClientRect
