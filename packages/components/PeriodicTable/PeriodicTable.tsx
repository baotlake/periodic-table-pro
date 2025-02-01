'use client'

import { CSSProperties, useState, forwardRef, ForwardedRef } from 'react'
import classNames from 'classnames/bind'
import ElementBox, { BottomProperty } from '../ElementBox'
import {
  symbol,
  zhCNNames,
  block,
  StateOfMatter,
  Categories,
  elementsCategories,
  mediumLongForm,
} from '@periodic-table-pro/data'
import Groups from './Groups'
import Periods from './Periods'
import Legend from './Legend'
import { trendBg } from '../utils/trend'
import { chineseName } from '../utils/utils'
import { getState } from '../utils/property'
import { reportEvent } from '../utils/analytics'

import styles from './periodicTable.module.scss'
import { useAtom } from 'jotai'
import {
  periodicTableColorSign,
  periodicTableDisplayProperty,
  periodicTableEmphasize,
  periodicTableTemperature,
  periodicTableTrendData,
  themeModeState,
} from '../recoil/atom'

const cx = classNames.bind(styles)

type Props = {}

function PeriodicTableFc({}: Props, ref: ForwardedRef<HTMLDivElement>) {
  const { elements, groups, periods } = mediumLongForm

  const [themeMode] = useAtom(themeModeState)
  const [emphasize] = useAtom(periodicTableEmphasize)
  const [colorSign] = useAtom(periodicTableColorSign)
  const [trendData] = useAtom(periodicTableTrendData)
  const [temperature] = useAtom(periodicTableTemperature)
  const [displayProperty] = useAtom(periodicTableDisplayProperty)

  const [currentZ, setCurrentZ] = useState(1)

  const handleClickElement = (Z: number) => {
    setCurrentZ(Z)
    reportEvent('element_detail', {
      name: symbol[Z - 1],
    })
  }

  return (
    <div
      ref={ref}
      className={cx('periodic-table', 'medium-long-form', themeMode)}
    >
      <Groups groups={groups} />
      <Periods periods={periods} />
      <div className={cx('main-table')}>
        {elements.map((atomicNumber, index) => {
          if (!atomicNumber)
            return <div className={cx('empty')} key={'empty' + index} />
          return (
            <ElementBox
              key={atomicNumber}
              className={cx({
                [Categories[elementsCategories[atomicNumber - 1]]]:
                  colorSign === 'classification',
                [block[atomicNumber - 1] + '-block']: colorSign === 'block',
                [StateOfMatter[getState(temperature, atomicNumber)]]:
                  colorSign === 'state',
                trend: colorSign === 'trend',
              })}
              style={
                {
                  '--trend-bg': trendBg(trendData[atomicNumber - 1]),
                } as CSSProperties
              }
              onClick={handleClickElement}
              emphasize={emphasize}
              atomicNumber={atomicNumber}
              symbol={symbol[atomicNumber - 1]}
              zhName={chineseName(zhCNNames[atomicNumber - 1], atomicNumber)}
              bc={
                <BottomProperty property={displayProperty} Z={atomicNumber} />
              }
            />
          )
        })}
        <Legend themeClass={themeMode} Z={currentZ} />
      </div>
    </div>
  )
}

export const PeriodicTable = forwardRef(PeriodicTableFc)

export default PeriodicTable
