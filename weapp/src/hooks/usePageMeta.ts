import { useEffect } from 'react'
import Taro from '@tarojs/taro'

export function usePageMeta() {

    useEffect(() => {
        const { page } = Taro.getCurrentInstance()
        page?.setData && page?.setData({
            pageMeta: {
                // rootBackgroundColor: '#ff0000',
            }
        })
    }, [])
}