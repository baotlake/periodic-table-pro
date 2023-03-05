import { CSSProperties, useContext, useState } from "react"
import classNames from "classnames/bind"
import ElementBox from "../ElementBox"
import {
  symbol,
  zhCNNames,
  block,
  StateOfMatter,
  Categories,
  elementsCategories,
  mediumLongForm,
} from '@periodic-table-pro/data'
import Groups from "./Groups"
import Periods from "./Periods"
import Legend from "./Legend"
import { Context } from '../state'
import { trendBg } from '../utils/trend'
import { chineseName } from "../utils/utils"
import { getDisplayProperty, getState } from "../utils/property"
import { reportEvent } from "../utils/analytics"

import styles from "./periodicTable.module.scss"

const cx = classNames.bind(styles)

type Props = {
}

export function PeriodicTable({ }: Props) {
  const { elements, groups, periods } = mediumLongForm

  const { state: {
    theme: { mode: themeMode },
    periodicTable: {
      emphasize,
      colorSign,
      trendData,
      temperature,
      displayProperty,
    },
  }, dispatch } = useContext(Context)

  const [currentZ, setCurrentZ] = useState(1)

  const handleClickElement = (Z: number) => {
    setCurrentZ(Z)
    // navigateTo({
    //   url: "/pages/detail/index?Z=" + Z
    // })
    reportEvent('element_detail', {
      "name": symbol[Z - 1]
    })
  };

  return (
    <div
      className={cx('periodic-table', 'medium-long-form', themeMode)}
    >
      <Groups groups={groups} />
      <Periods periods={periods} />
      <div className={cx('main-table')}>
        {elements.map((atomicNumber, index) => {
          if (!atomicNumber) return <div className={cx('empty')} key={'empty' + index} />;
          return (
            <ElementBox
              key={atomicNumber}
              className={cx({
                [Categories[elementsCategories[atomicNumber - 1]]]: colorSign === 'classification',
                [block[atomicNumber - 1] + '-block']: colorSign === 'block',
                [StateOfMatter[getState(temperature, atomicNumber)]]: colorSign === 'state',
                trend: colorSign === 'trend',
              })}
              style={{
                '--trend-bg': trendBg(trendData[atomicNumber - 1])
              } as CSSProperties}
              onClick={handleClickElement}
              emphasize={emphasize}
              atomicNumber={atomicNumber}
              symbol={symbol[atomicNumber - 1]}
              zhName={chineseName(zhCNNames[atomicNumber - 1], atomicNumber)}
              bc={getDisplayProperty(displayProperty, atomicNumber)}
            />
          );
        })}
        <Legend themeClass={themeMode} Z={currentZ} />
          {/* <ElementBox
            key={currentZ}
            className={cx({
              [Categories[elementsCategories[currentZ - 1]]]: colorSign === 'classification',
              [block[currentZ - 1] + '-block']: colorSign === 'block',
              [StateOfMatter[getState(temperature, currentZ)]]: colorSign === 'state',
              trend: colorSign === 'trend',
            })}
            style={{
              '--trend-bg': trendBg(trendData[currentZ - 1])
            } as CSSProperties}
            onClick={handleClickElement}
            emphasize={emphasize}
            atomicNumber={currentZ}
            symbol={symbol[currentZ - 1]}
            zhName={chineseName(zhCNNames[currentZ - 1], currentZ)}
            bc={getDisplayProperty(displayProperty, currentZ)}
          /> */}
      </div>
    </div>
  );
}

export default PeriodicTable
