import type { DisplayProperty } from '../types/element'

export const propertiesLabels: Record<DisplayProperty, string> = {
  'blank': '空白',
  'atomicWeight': '相对原子质量',
  'pinyin': '拼音',
  'zhCNName&pinyin': '名称+拼音',
  'electronegativity': '电负性',
  'atomicRadius': '原子半径',
  'meltingPoint': '熔点',
  'boilingPoint': '沸点',
  'electronConfiguration': '电子排布',
  'density': '密度',
  'oxidationStates': '氧化态',
}

type Property = { type: DisplayProperty, trend: boolean }[]

export const properties: Property = [
  {
    type: 'blank',
    trend: false,
  },
  {
    type: 'atomicWeight',
    trend: true,
  },
  {
    type: 'pinyin',
    trend: false,
  },
  {
    type: 'zhCNName&pinyin',
    trend: false,
  },
  {
    type: 'electronegativity',
    trend: true,
  },
  {
    type: 'atomicRadius',
    trend: true,
  },
  {
    type: 'meltingPoint',
    trend: true,
  },
  {
    type: 'boilingPoint',
    trend: true,
  },
  {
    type: 'electronConfiguration',
    trend: false,
  },
  {
    type: 'density',
    trend: false,
  },
  {
    type: 'oxidationStates',
    trend: false,
  }
  // {
  //   type: '',
  //   trend: false,
  // }
]
