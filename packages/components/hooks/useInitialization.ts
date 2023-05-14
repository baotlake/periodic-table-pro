import { useEffect, Dispatch } from 'react'
import { Action, setDisplayProperty, setTrendData } from '../state'
import { getStorage } from '../utils/storage'
import { getTrendData } from '../utils/trend'


export function useInitialization(dispatch: Dispatch<Action>) {
    useEffect(() => {
        getStorage('displayProperty').then(({ displayProperty }) => {
            console.log('displayProperty: ', displayProperty)

            dispatch && dispatch(setDisplayProperty(displayProperty))
            const trendData = getTrendData(displayProperty)
            dispatch && dispatch(setTrendData(trendData))
        })
    }, [])
}
