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
  density,
  oxidationStates,
} from '@packages/data'
import { RichText, MaskInlineIcon } from '@packages/components'
import { DisplayProperty } from '../types/element'
import { chineseName } from './utils'

export function getDisplayProperty(property: DisplayProperty, Z: number) {
  const index = Z - 1
  switch (property) {
    case 'blank':
      return ''
    case 'atomicWeight':
      return formalShortAtomicWeights[index]
    case 'pinyin':
      return pinyin[index]
    case 'zhCNName&pinyin':
      // return zhCNNames[index] + ' ' + pinyin[index]
      const zhName = chineseName(zhCNNames[index], index + 1)
      return (
        <>
          {typeof zhName == 'string' ? (
            zhName
          ) : (
            <MaskInlineIcon src={zhName.url} />
          )}{' '}
          {pinyin[index]}
        </>
      )
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
    case 'density':
      return <RichText className="line-clamp-3" nodes={density[index]} />
    case 'oxidationStates':
      return oxidationStates[index]
    default:
      return formalShortAtomicWeights[index]
  }
}

export function getState(temperature: number, Z: number) {
  const index = Z - 1
  const meltingPoint = parseFloat(meltingPoints[index])
  const boilingPoint = parseFloat(boilingPoints[index])
  if (isFinite(meltingPoint) && meltingPoint > temperature) {
    return StateOfMatter.solid
  }
  if (isFinite(boilingPoint) && boilingPoint < temperature) {
    return StateOfMatter.gas
  }
  if (
    isFinite(meltingPoint) &&
    isFinite(boilingPoint) &&
    meltingPoint < temperature &&
    boilingPoint > temperature
  ) {
    return StateOfMatter.liquid
  }
  return StateOfMatter.unknown
}
