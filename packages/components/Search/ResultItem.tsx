import classNames from 'classnames/bind'
import ElementBox from '../ElementBox'
import {
  elements,
  Categories,
  elementsCategories,
} from '@periodic-table-pro/data'
import type { search } from '../utils/search'
import { navigateTo } from '../compat'
import { getDetailPath } from '../utils/routes'

import styles from './resultItem.module.scss'

const cx = classNames.bind(styles)

type ResultData = NonNullable<ReturnType<typeof search>>[0]

type Props = {
  themeClass?: string
  data: ResultData
}

export function ResultItem({ data, themeClass }: Props) {
  const handleClick = () => {
    navigateTo(getDetailPath(data.Z))
  }

  return (
    <div
      className={cx('search-result-item', themeClass, [
        Categories[elementsCategories[data.Z - 1]],
      ])}
    >
      <div className={cx('box-wrapper')}>
        <ElementBox
          atomicNumber={data.Z}
          symbol={elements.symbol[data.Z - 1]}
          zhName={elements.zhCNNames[data.Z - 1]}
          bc={elements.shortAbridgedAtomicWeights[data.Z - 1]}
        />
      </div>

      <div className={cx('detail')} onClick={handleClick}>
        <div className={cx('first-line')}>
          <span className={cx('name')}>
            名称: {elements.zhCNNames[data.Z - 1]}
          </span>
          <span>英文名: {elements.enName[data.Z - 1]}</span>
        </div>
        <div>相对原子质量: {elements.formalShortAtomicWeights[data.Z - 1]}</div>
      </div>
    </div>
  )
}
