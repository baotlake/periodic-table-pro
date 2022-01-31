import { ContextType } from "react"
import { View, Image } from '@tarojs/components'
import classNames from "classnames"
import { SelectModal } from '.'
import { properties, propertiesLabels } from "../../data/displayProperties"
import { PeriodicTableContext } from "../PeriodicTable/reducer"
import trendImg from '../../assets/icons/trend.svg'
import propertyImg from '../../assets/icons/property.svg'

import './displayPropertiesModal.scss'

type ContextState = ContextType<typeof PeriodicTableContext>['state']

type Props = {
  themeClass?: string
  visible: boolean
  setVisible: (value: boolean) => void
  displayProperty: ContextState['displayProperty']
  colorSign?: ContextState['colorSign']
  onSelect?: (type: ContextState['displayProperty']) => void
}

export default function DisplayPropertiesModal({
  visible,
  setVisible,
  themeClass,
  onSelect,
  colorSign,
  displayProperty
}: Props) {
  return (
    <SelectModal
      visible={visible}
      onClose={() => setVisible(false)}
      themeClass={themeClass}
    >
      <View className={classNames('display-properties', themeClass)}>
        {
          properties.map(item => (
            <View
              key={item.type}
              className={classNames('item', {
                selected: displayProperty === item.type,
                hidden: colorSign === 'trend' && !item.trend,
              })}
              onClick={() => onSelect && onSelect(item.type as typeof displayProperty)}
            >
              <Image className='icon' src={item.trend ? trendImg : propertyImg} />
              {propertiesLabels[item.type]}
            </View>
          ))
        }
      </View>
    </SelectModal>
  )
}
