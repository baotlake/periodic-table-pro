import classNames from 'classnames/bind'
import { CustomWrapper, Image, Slider } from '../../compat'
import ElementBox, { BottomProperty } from '../../ElementBox'
import LineChart from './LineChart'
import {
  formalShortAtomicWeights,
  propertiesLabels,
  properties,
  zhCNCategories,
  Categories,
  elementsCategories,
  DisplayProperty,
  block,
  symbol,
  StateOfMatter,
  zhCNNames,
  Emphasize,
} from '@periodic-table-pro/data'
import { chineseName } from '../../utils/utils'
import { getTrendData } from '../../utils/trend'
import { reportEvent } from '../../utils/analytics'
import { getState } from '../../utils/property'
import { setStorage, getStorage } from '../../utils/storage'
import { useAtom, useSetAtom } from 'jotai'
import {
  displayPropertiesModalVisible,
  periodicTableColorSign,
  periodicTableDisplayProperty,
  periodicTableEmphasize,
  periodicTableTemperature,
  periodicTableTrendData,
  zoomModalVisible,
} from '../../recoil/atom'

import arrowImg from '../../assets/icons/dropdown-arrow.svg'
import autorenewImg from '../../assets/icons/autorenew.svg'
import arrowDownUp from '../../assets/icons/arrow-down-up.svg'
import panZoomImg from '../../assets/icons/pan_zoom.svg'
import maximizeImg from '../../assets/icons/maximize.svg'
import styles from './legend.module.scss'
import { MaskIcon } from '../../Icon'

const cx = classNames.bind(styles)

const emphasizes: Emphasize[] = ['number', 'symbol', 'name']

const emphasizeLabel = {
  number: '序数',
  symbol: '符号',
  name: '名称',
}

const colorSignData = {
  trend: 1,
  classification: 2,
  block: 3,
  state: 4,
}

type Props = {
  Z: number
  themeClass?: string
}

export default function Legend({ themeClass, Z }: Props) {
  const [emphasize, setEmphasize] = useAtom(periodicTableEmphasize)
  const [colorSign, setColorSign] = useAtom(periodicTableColorSign)
  const [temperature, setTemperature] = useAtom(periodicTableTemperature)
  const [displayProperty, setDisplayProperty] = useAtom(
    periodicTableDisplayProperty
  )
  const [trendData, setTrendData] = useAtom(periodicTableTrendData)

  const setDisplayPropertiesModalVisible = useSetAtom(
    displayPropertiesModalVisible
  )
  const setZoomModalVisible = useSetAtom(zoomModalVisible)

  const emphasizeIndex = emphasizes.findIndex((v) => v == emphasize)

  const handleTemperature = (value: number) => {
    const celsius = value - 273.15
    setTemperature(celsius)
  }

  const handleColorSign = (type: typeof colorSign) => {
    const trend = properties.some(
      (item) => item.type === displayProperty && item.trend
    )
    if (type === 'trend' && !trend) {
      const property: DisplayProperty = 'atomicWeight'
      setDisplayProperty(property)
      setTrendData(getTrendData(property))
      setStorage({ displayProperty: property })
    }

    setColorSign(type)
    reportEvent('color_sign', {
      name: type,
    })
  }

  const handleEmphasize = () => {
    const next = (emphasizeIndex + 1) % emphasizes.length
    const type = emphasizes[next]

    setEmphasize(type)

    reportEvent('emphasize', {
      name: type,
    })
  }

  return (
    <div className={cx('legend', 'absolute w-full h-full', themeClass)}>
      <CustomWrapper>
        <div className="flex h-full items-center justify-evenly">
          <div className={cx('legend-container')}>
            <ElementBox
              className={cx('element-box', {
                [Categories[elementsCategories[Z - 1]]]:
                  colorSign == 'classification',
                [block[Z - 1] + '-block']: colorSign === 'block',
                [StateOfMatter[getState(temperature, Z)]]:
                  colorSign === 'state',
                trend: colorSign === 'trend',
              })}
              emphasize={emphasize}
              atomicNumber={Z}
              symbol={symbol[Z - 1]}
              zhName={chineseName(zhCNNames[Z - 1])}
              bc={<BottomProperty property={displayProperty} Z={Z} />}
            />

            {emphasize === 'symbol' ? (
              <>
                <div className={cx('label-1')}>原子序数</div>
                <div className={cx('label-2')}>元素名称</div>
                <div className={cx('label-3')}>元素符号</div>
              </>
            ) : emphasize === 'name' ? (
              <>
                <div className={cx('label-1')}>原子序数</div>
                <div className={cx('label-2')}>元素符号</div>
                <div className={cx('label-3')}>元素名称</div>
              </>
            ) : (
              // number
              <>
                <div className={cx('label-1')}>元素符号</div>
                <div className={cx('label-2')}>元素名称</div>
                <div className={cx('label-3')}>原子序数</div>
              </>
            )}
            <div
              className={cx('label-4')}
              onClick={() => setDisplayPropertiesModalVisible(true)}
            >
              {propertiesLabels[displayProperty]}
              <MaskIcon className="size-3 ms-1" src={arrowImg} />
            </div>
            <div className={cx('switch-container')}>
              <div
                className={cx('switch-button', 'bg-background-mute px-2')}
                onClick={handleEmphasize}
              >
                <div>{emphasizeLabel[emphasize]}</div>
                <MaskIcon className="size-4 ms-1" src={arrowDownUp} />
              </div>
              <div
                className={cx('switch-button', 'bg-background-mute px-2')}
                onClick={() => setZoomModalVisible(true)}
              >
                <div>缩放</div>
                <MaskIcon className="size-4 ms-1" src={maximizeImg} />
              </div>
            </div>
          </div>
          <div className={cx('color-sign-container')}>
            {colorSign === 'trend' ? (
              <div className={cx('trend-illustrate')}>
                <div
                  className={cx('trend-title')}
                  onClick={() => setDisplayPropertiesModalVisible(true)}
                >
                  {propertiesLabels[displayProperty]}
                  <MaskIcon className="size-3 ms-1" src={arrowImg} />
                </div>
                <div>
                  小
                  <div className={cx('trend-gradient')} />大
                </div>
                <LineChart
                  className={cx('line-chart')}
                  width={280 * 3}
                  height={120 * 3}
                  data={trendData || []}
                  // data={formalShortAtomicWeigths}
                  // data={electronegativity}
                />
              </div>
            ) : colorSign === 'classification' ? (
              <div className={cx('classification-color')}>
                {zhCNCategories.map((label, index) => (
                  <div
                    key={index}
                    className={cx('classification-item', Categories[index])}
                  >
                    {label}
                  </div>
                ))}
              </div>
            ) : colorSign === 'block' ? (
              <div className={cx('block-table')}>
                <div className={cx('block-item', 's-block', 'H')} />
                <div className={cx('block-item', 's-block', 'He')} />
                <div className={cx('block-item', 's-block', 'other')}>s</div>
                <div className={cx('block-item', 'd-block')}>d</div>
                <div className={cx('block-item', 'p-block')}>p</div>
                <div className={cx('block-item', 'f-block')}>f</div>
              </div>
            ) : colorSign === 'state' ? (
              <div className={cx('state-panel')}>
                <div className={cx('state-title')}>物态</div>
                <div className={cx('state-label')}>
                  <div className={cx('state-item', 'gas')}>气态</div>
                  <div className={cx('state-item', 'liquid')}>液态</div>
                  <div className={cx('state-item', 'solid')}>固态</div>
                  <div className={cx('state-item', 'unknown')}>未知</div>
                </div>
                <div className={cx('mt-3 mb-1')}>
                  温度: {temperature.toFixed(2)}°C{' '}
                  {(temperature + 273.15).toFixed(2)}K
                </div>
                <Slider
                  min={0}
                  max={6000}
                  step={1}
                  value={temperature + 273.15}
                  onChanging={(e) => handleTemperature(e.detail.value)}
                  onChange={(e) => handleTemperature(e.detail.value)}
                />
                <div className={cx('')}>
                  <div className={cx('add')} />

                  <div className={cx('subtract')} />
                </div>
              </div>
            ) : (
              ''
            )}

            <div
              className={cx(
                'switch',
                'i'.repeat(colorSignData[colorSign]),
                'p-1 bg-background-soft rounded-lg before:bg-lighter before:rounded'
              )}
            >
              <div
                role="button"
                className={cx('item')}
                onClick={() => handleColorSign('trend')}
              >
                趋势
              </div>
              <div
                role="button"
                className={cx('item')}
                onClick={() => handleColorSign('classification')}
              >
                类别
              </div>
              <div
                role="button"
                className={cx('item')}
                onClick={() => handleColorSign('block')}
              >
                区块
              </div>
              <div
                role="button"
                className={cx('item')}
                onClick={() => handleColorSign('state')}
              >
                物态
              </div>
            </div>
          </div>
        </div>
      </CustomWrapper>
    </div>
  )
}
