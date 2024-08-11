'use client'
import {
  symbol,
  enName,
  zhCNNames,
  formalShortAtomicWeights,
  shortAbridgedAtomicWeights,
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
  DisplayProperty,
} from '@periodic-table-pro/data'
import classNames from 'classnames/bind'
import { chineseName } from '../utils/utils'
import { MaskIcon } from '../Icon'
import { RichText } from '../compat'

// const cx = classNames.bind({})

type Props = {
  Z: number
  property: DisplayProperty
}

export function BottomProperty({ property, Z }: Props) {
  const index = Z - 1
  switch (property) {
    case 'blank':
      return null
    case 'atomicWeight':
      return <div>{shortAbridgedAtomicWeights[index]}</div>
    case 'pinyin':
      return <div>{pinyin[index]}</div>
    case 'zhCNName&pinyin':
      // return zhCNNames[index] + ' ' + pinyin[index]
      const zhName = chineseName(zhCNNames[index], index + 1)
      return (
        <>
          {typeof zhName == 'string' ? zhName : <MaskIcon url={zhName.url} />}{' '}
          {pinyin[index]}
        </>
      )
    case 'electronegativity':
      return <div>{electronegativity[index]}</div>
    case 'atomicRadius':
      return <div>{atomicRadius[index]}</div>
    case 'meltingPoint':
      return <div>{meltingPoints[index]}</div>
    case 'boilingPoint':
      return <div>{boilingPoints[index]}</div>
    case 'electronConfiguration':
      return (
        <RichText
          className="line-clamp-3"
          nodes={electronConfigurations[index]}
        />
      )
    case 'density':
      return <RichText className="line-clamp-3" nodes={density[index]} />
    case 'oxidationStates':
      return <div className="line-clamp-3">{oxidationStates[index]}</div>
    case 'enName':
      return <div className="truncate">{enName[index]}</div>
    default:
      return <div>{shortAbridgedAtomicWeights[index]}</div>
  }
}
