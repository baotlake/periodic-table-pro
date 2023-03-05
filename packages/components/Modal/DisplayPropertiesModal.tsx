import { ContextType } from "react"
// import { View, Image } from '@tarojs/components'
import { Image } from '../compat'
import classNames from "classnames/bind"
import { SelectModal } from '.'
import { properties, propertiesLabels } from "@periodic-table-pro/data"
import { Context } from '../state'
import trendImg from '../assets/icons/trend.svg'
import propertyImg from '../assets/icons/property.svg'

import styles from './displayPropertiesModal.module.scss'

const cx = classNames.bind(styles)

type ContextState = ContextType<typeof Context>['state']

type Props = {
  themeClass?: string
  visible: boolean
  setVisible: (value: boolean) => void
  displayProperty: ContextState['periodicTable']['displayProperty']
  colorSign?: ContextState['periodicTable']['colorSign']
  onSelect?: (type: ContextState['periodicTable']['displayProperty']) => void
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
      <div className={cx('display-properties', themeClass)}>
        {
          properties.map(item => (
            <div
              key={item.type}
              className={cx('item', {
                selected: displayProperty === item.type,
                hidden: colorSign === 'trend' && !item.trend,
              })}
              onClick={() => onSelect && onSelect(item.type as typeof displayProperty)}
            >
              <Image className={cx('icon')} src={item.trend ? trendImg : propertyImg} />
              {propertiesLabels[item.type]}
            </div>
          ))
        }
      </div>
    </SelectModal>
  )
}
