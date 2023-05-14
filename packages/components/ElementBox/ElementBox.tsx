import { CSSProperties, ReactNode } from 'react'
import classNames from 'classnames/bind'
import { MaskIcon } from '../Icon'
import { Navigator } from '../compat'
import { getDetailPath } from '../utils/routes'

import styles from "./elementBox.module.scss"

const cx = classNames.bind(styles)

type ItemValue = string | {
  url: string
}

type ItemProps = {
  value: ItemValue
  className: string
}

function Item({ value, className }: ItemProps) {
  if (typeof value === 'string') {
    return <span className={cx(className, 'text')} >{value}</span>
  }

  if (value.url) {
    return <MaskIcon className={className} url={value.url} />
  }

  return <span></span>
}

type Props = {
  onClick?: (Z: number) => void
  className?: string
  style?: CSSProperties
  emphasize?: 'symbol' | 'number' | 'name'
  atomicNumber: number
  symbol: string
  zhName?: ItemValue
  tl?: string
  tr?: string
  ml?: string
  mc?: string
  mr?: string
  bc?: ReactNode | ReactNode[]
};

export function ElementBox({
  onClick,
  className,
  style,
  emphasize,
  atomicNumber,
  symbol,
  zhName,
  mr,
  mc,
  bc,
  tl,
  tr,
}: Props) {
  return (
    <Navigator
      role="button"
      className={cx("element-box", className)}
      style={style}
      url={getDetailPath(atomicNumber)}
      href={getDetailPath(atomicNumber)}
      onClick={() => onClick && onClick(atomicNumber)}
    >
      {
        (emphasize === 'symbol' || !emphasize) ? (
          <>
            {atomicNumber && !tl && <div className={cx('text', 'tl')}>{atomicNumber}</div>}
            {symbol && !mc && <div className={cx('text', 'mc')}>{symbol}</div>}
            {zhName && !tr && <Item className={cx('tr')} value={zhName} />}
          </>
        ) : emphasize === 'name' ? (
          <>
            {atomicNumber && !tl && <div className={cx('text', 'tl')}>{atomicNumber}</div>}
            {symbol && !tr && <div className={cx('text', 'tr')}>{symbol}</div>}
            {zhName && !mc && <Item className={cx('mc')} value={zhName} />}
          </>
        ) : (
          // number
          <>
            {symbol && !tl && <div className={cx('text', 'tl')}>{symbol}</div>}
            {zhName && !tr && <Item className={cx('tr')} value={zhName} />}
            {atomicNumber && !mc && <div className={cx('text', 'mc')}>{atomicNumber}</div>}
          </>
        )
      }

      {tr && <span className={cx('text', 'tr')}>{tr}</span>}
      {mr && <span className={cx('text', 'mr')}>{mr}</span>}
      <div className={cx('text', 'bc')}>{bc}</div>
    </Navigator>
  );
}

export default ElementBox

