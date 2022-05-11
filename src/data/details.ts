import * as elements from './elements'
import { PropertiesGroup, Property } from '../types/element'

export type DetailData = {
  symbol: string
  atomicNumber: number
  properties: {
    basic: {
      // group: string
      // period: string
      enName: string
      block: string
      electronConfiguration: string
      electronsPerShell: string
    }
    physical: {
      phaseAtSTP: string
      meltingPoint: string
      boilingPoint: string
      density: string
      heatOfFusion: string
      molarHeatCapacity: string
    }
    atomic: {
      oxidationStates: string
      electronegativity: string
      ionizationEnergies: string
      atomicRadius: string
      covalentRadius: string
      vanDerWaals: string
      spectralLines: string
    }
    other: {
      crystalStructure: string
      magneticOrdering: string
      speedOfSound: string
      thermalConductivity: string
      CASNumber: string
    }
    history: {
      // discovery: string,
    }
  }
}

export const propertiesGroupLabel: Record<PropertiesGroup, string> = {
  basic: '概述',
  physical: '物理性质',
  atomic: '原子性质',
  other: '其他属性',
  history: '发现'
}

export const propertiesLabel: Record<Property, string> = {
  symbol: '元素符号',
  atomicNumber: '原子序数',
  enName: '英文名',
  zhName: '名称',
  atomicWeight: '原子量',
  pinyin: '拼音',
  group: '族',
  period: '周期',
  block: '区',
  electronConfiguration: '电子排布',
  electronsPerShell: '每层原子数',
  phaseAtSTP: '相态（标况）',
  meltingPoint: '熔点',
  boilingPoint: '沸点',
  density: '密度',
  heatOfFusion: '熔化热',
  molarHeatCapacity: '比热容',
  oxidationStates: '氧化态',
  electronegativity: '电负性',
  ionizationEnergies: '电离能',
  atomicRadius: '原子半径',
  covalentRadius: '共价半径',
  vanDerWaals: '范德华半径',
  spectralLines: '光谱线',
  crystalStructure: '晶体结构',
  magneticOrdering: '磁序',
  speedOfSound: '声速',
  thermalConductivity: '热导率',
  CASNumber: 'CAS号',
  discovery: '发现',
  namedBy: '命名',
}

const stateOfMatter = [
  '气态',
  '固态',
  '液态',
  '固态（预测值）',
  '气态（预测值）',
  '未知'
]


export function getDetailData(atomicNumber: number): DetailData {
  const index = atomicNumber - 1
  return {
    symbol: elements.symbol[index],
    atomicNumber: index,
    properties: {
      basic: {
        enName: elements.enName[index],
        block: elements.block[index],
        electronConfiguration: elements.electronConfigurations[index],
        electronsPerShell: elements.electronsPerShell[index],
      },
      physical: {
        phaseAtSTP: stateOfMatter[elements.standardState[index]],
        meltingPoint: elements.meltingPoints[index],
        boilingPoint: elements.boilingPoints[index],
        density: elements.density[index],
        heatOfFusion: elements.heatOfFusion[index],
        molarHeatCapacity: elements.molarHeatCapacity[index],
      },
      atomic: {
        oxidationStates: elements.oxidationStates[index],
        electronegativity: elements.electronegativity[index],
        ionizationEnergies: elements.ionizationEnergies[index],
        atomicRadius: elements.atomicRadius[index],
        covalentRadius: elements.covalentRadius[index],
        vanDerWaals: elements.vanDerWaals[index],
        spectralLines: elements.symbol[index],
      },
      other: {
        crystalStructure: elements.crystalStructure[index],
        magneticOrdering: elements.magneticOrdering[index],
        speedOfSound: elements.speedOfSound[index],
        thermalConductivity: elements.thermalConductivity[index],
        CASNumber: elements.CASNumber[index],
      },
      history: {
        discovery: elements.discovery[index],
        namedBy: elements.namedBy[index],
      }
    }
  }
}


