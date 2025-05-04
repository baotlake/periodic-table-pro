import { elements, DisplayProperty } from '@packages/data'
import { TrendData } from '../type'

export function parseTrendValue(dataList: number[] | string[]): TrendData[] {
  const numberList = dataList.map(value => {
    if (typeof value === 'number') return value

    return parseFloat(value)
  })
  // console.log('numberList', numberList, dataList)
  const finiteData = numberList.map(i => isFinite(i) ? i : 0)
  const max = Math.max(...finiteData)
  const min = Math.min(...finiteData)
  // console.log('finiteData', finiteData)

  return numberList.map(value => value / (max - min))
}


export function getTrendData(type: DisplayProperty) {
  switch (type) {
    case 'atomicWeight':
      return parseTrendValue(elements.formalShortAtomicWeights)
    case 'electronegativity':
      return parseTrendValue(elements.electronegativity)
    case 'atomicRadius':
      return parseTrendValue(elements.atomicRadius)
    case 'meltingPoint':
      return parseTrendValue(elements.meltingPoints)
    case 'boilingPoint':
      return parseTrendValue(elements.boilingPoints)
    // case 'density':
    //   return parseTrendValue(elements.density)
    default:
      return parseTrendValue(elements.formalShortAtomicWeights)
  }
}

export function trendBg(value: TrendData) {
  return `rgba(255,0,0,${value})`
}