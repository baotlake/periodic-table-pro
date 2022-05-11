import * as elements from '../data/elements'

export function relativeTrendValue(dataList: number[] | string[]) {
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


export function getTrendData(type: string) {
  switch (type) {
    case 'atomicWeight':
      return relativeTrendValue(elements.formalShortAtomicWeights)
    case 'electronegativity':
      return relativeTrendValue(elements.electronegativity)
    case 'atomicRadius':
      return relativeTrendValue(elements.atomicRadius)
    case 'meltingPoint':
      return relativeTrendValue(elements.meltingPoints)
    case 'boilingPoint':
      return relativeTrendValue(elements.boilingPoints)
    case '':
    default:
      return relativeTrendValue(elements.formalShortAtomicWeights)
  }
}