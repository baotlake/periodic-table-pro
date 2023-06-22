import { DisplayPropertiesModal } from "../Modal"
import { DisplayProperty } from '@periodic-table-pro/data'
import { getTrendData } from '../utils/trend'
import { setStorage } from '../utils/storage'
import { reportEvent } from '../utils/analytics'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { displayPropertiesModalVisible, periodicTableColorSign, periodicTableDisplayProperty, periodicTableTrendData, themeModeState } from '../recoil/atom'


export function AutoDisplayPropertiesModal() {
    const [mode] = useRecoilState(themeModeState)
    const [visible, setVisible] = useRecoilState(displayPropertiesModalVisible)
    const [displayProperty, setDisplayProperty] = useRecoilState(periodicTableDisplayProperty)
    const [colorSign] = useRecoilState(periodicTableColorSign)
    const setTrendData = useSetRecoilState(periodicTableTrendData)

    const handleSelectDisplayProperty = (type: DisplayProperty) => {
        setDisplayProperty(type)
        const trendData = getTrendData(type)
        setTrendData(trendData)

        setStorage({ displayProperty: type })
        reportEvent("properties", {
            "name": type,
            "page": 'index'
        })
    }

    const handleSetVisible = (visible: boolean) => {
        setVisible(visible)
    }

    return (
        <DisplayPropertiesModal
            themeClass={mode}
            visible={visible}
            setVisible={handleSetVisible}
            displayProperty={displayProperty}
            colorSign={colorSign}
            onSelect={handleSelectDisplayProperty}
        />
    )
}