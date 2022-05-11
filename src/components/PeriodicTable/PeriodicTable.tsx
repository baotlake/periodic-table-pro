import { CSSProperties, useContext, useCallback, useState } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";
import ElementBox from "../ElementBox";
import { mediumLongForm } from "../../data/table";
import {
  symbol,
  zhCNNames,
  formalShortAtomicWeights,
  electronConfigurations,
  block,
  standardState,
  StateOfMatter,
  meltingPoints,
  boilingPoints,
  pinyin,
  electronegativity,
  atomicRadius,
} from "../../data/elements";
import { Categories, elementsCategories } from '../../data/classification'
import Groups from "./Groups";
import Periods from "./Periods";
import Legend from "./Legend";
import { PeriodicTableContext } from "./reducer";
import { reportEvent } from "../../utils/analytics";

import "./periodicTable.scss";

type Props = {
  themeClass?: string
}

export default function PeriodicTable({ themeClass }: Props) {
  const { elements, groups, periods } = mediumLongForm;
  const {
    state: { emphasize, colorSign, trendData, temperature, displayProperty },
    dispatch
  } = useContext(PeriodicTableContext)

  const [currentZ, setCurrentZ] = useState(1)

  const handleClickElement = (Z: number) => {
    setCurrentZ(Z)
    Taro.navigateTo({
      url: "/pages/detail/index?Z=" + Z
    })
    reportEvent('element_detail', {
      "name": symbol[Z - 1]
    })
  };

  const calcState = useCallback((index: number) => {
    const meltingPoint = parseFloat(meltingPoints[index])
    const boilingPoint = parseFloat(boilingPoints[index])
    if (isFinite(meltingPoint) && meltingPoint > temperature) {
      return StateOfMatter.solid
    }
    if (isFinite(boilingPoint) && boilingPoint < temperature) {
      return StateOfMatter.gas
    }
    if (isFinite(meltingPoint) && isFinite(boilingPoint) && meltingPoint < temperature && boilingPoint > temperature) {
      return StateOfMatter.liquid
    }
    return StateOfMatter.unknown
  }, [temperature])

  const getDisplayProperty = useCallback((index: number) => {
    switch (displayProperty) {
      case "atomicWeight":
        return formalShortAtomicWeights[index]
      case 'pinyin':
        return pinyin[index]
      case 'zhCNName&pinyin':
        return zhCNNames[index] + ' ' + pinyin[index]
      case 'electronegativity':
        return electronegativity[index]
      case 'atomicRadius':
        return atomicRadius[index]
      case 'meltingPoint':
        return meltingPoints[index]
      case 'boilingPoint':
        return boilingPoints[index]
      case 'electronConfiguration':
        return electronConfigurations[index]
      default:
        return formalShortAtomicWeights[index]
    }
  }, [displayProperty])

  return (
    <View
      className={classNames('periodic-table medium-long-form', themeClass)}
    >
      <Groups groups={groups} />
      <Periods periods={periods} />
      <View className='main-table'>
        {elements.map((atomicNumber, index) => {
          if (!atomicNumber) return <View className='empty' key={'empty' + index} />;
          return (
            <ElementBox
              key={atomicNumber}
              className={classNames({
                [Categories[elementsCategories[atomicNumber - 1]]]: colorSign === 'classification',
                [block[atomicNumber - 1] + '-block']: colorSign === 'block',
                [StateOfMatter[calcState(atomicNumber - 1)]]: colorSign === 'state',
                trend: colorSign === 'trend',
              })}
              style={{
                '--trend-value': isFinite(trendData[atomicNumber - 1]) ? (trendData[atomicNumber - 1] * 100 + '%') : '0%'
              } as CSSProperties}
              onClick={handleClickElement}
              emphasize={emphasize}
              atomicNumber={atomicNumber}
              symbol={symbol[atomicNumber - 1]}
              zhName={zhCNNames[atomicNumber - 1]}
              bc={getDisplayProperty(atomicNumber - 1) + ""}
            />
          );
        })}
        <Legend themeClass={themeClass}>
          <ElementBox
            key={currentZ}
            className={classNames({
              [Categories[elementsCategories[currentZ - 1]]]: colorSign === 'classification',
              [block[currentZ - 1] + '-block']: colorSign === 'block',
              [StateOfMatter[calcState(currentZ - 1)]]: colorSign === 'state',
              trend: colorSign === 'trend',
            })}
            style={{
              '--trend-value': isFinite(trendData[currentZ - 1]) ? (trendData[currentZ - 1] * 100 + '%') : '0%'
            } as CSSProperties}
            onClick={handleClickElement}
            emphasize={emphasize}
            atomicNumber={currentZ}
            symbol={symbol[currentZ - 1]}
            zhName={zhCNNames[currentZ - 1]}
            bc={getDisplayProperty(currentZ - 1) + ""}
          />
        </Legend>
      </View>
    </View>
  );
}
