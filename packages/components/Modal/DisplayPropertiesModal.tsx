import { Image } from '../compat'
import classNames from 'classnames/bind'
import Modal from './Modal'
import {
  type DisplayProperty,
  properties,
  propertiesLabels,
  type ColorSign,
} from '@periodic-table-pro/data'
import trendImg from '../assets/icons/trend.svg'
import propertyImg from '../assets/icons/property.svg'

import styles from './displayPropertiesModal.module.scss'

const cx = classNames.bind(styles)

type Props = {
  themeClass?: string
  visible: boolean
  setVisible: (value: boolean) => void
  displayProperty: DisplayProperty
  colorSign?: ColorSign
  onSelect?: (type: DisplayProperty) => void
}

export default function DisplayPropertiesModal({
  visible,
  setVisible,
  themeClass,
  onSelect,
  colorSign,
  displayProperty,
}: Props) {
  return (
    <Modal
      visible={visible}
      onClose={() => setVisible(false)}
      themeClass={themeClass}
    >
      <div className={cx('display-properties', themeClass)}>
        {properties.map((item) => (
          <div
            key={item.type}
            className={cx('item', {
              selected: displayProperty === item.type,
              hidden: colorSign === 'trend' && !item.trend,
            })}
            onClick={() =>
              onSelect && onSelect(item.type as typeof displayProperty)
            }
          >
            <Image
              className={cx('icon')}
              src={item.trend ? trendImg : propertyImg}
            />
            {propertiesLabels[item.type]}
          </div>
        ))}
      </div>
    </Modal>
  )
}
