import {
  symbol,
  enName,
  zhCNNames,
  formalShortAtomicWeights,
  pinyin,
  electronConfigurations,
  block,
  standardState,
  electronegativity,
  atomicRadius,
  electronsPerShell,
  boilingPoints,
  meltingPoints,
  density,
  heatOfFusion,
  oxidationStates,
  ionizationEnergies,
  crystalStructure,
  magneticOrdering,
  CASNumber,
  molarHeatCapacity,
  covalentRadius,
  vanDerWaals,
  speedOfSound,
  thermalConductivity,
  discovery,
  namedBy,
  ionCharge,
  CIDNumber,
  RTECNumber,
  abundanceInSun,
  abundanceInUniverse,
  abundanceInOceans,
  abundanceInHumanBody,
  abundanceInEarthCrust,
  abundanceInMeteorites,
  electricalConductivity,
  electricalType,
  volumeMagneticSusceptibility,
  massMagneticSusceptibility,
  molarMagneticSusceptibility,
  resistivity,
  superconductingPoint,
  unit,
} from './elements'

import summary from './summary.json'

import { PropertiesGroup, Property } from '../types/element'

export type DetailData = {
  symbol: string
  atomicNumber: number
  previous: {
    symbol: string
    atomicNumber: number
  } | null
  next: {
    symbol: string
    atomicNumber: number
  } | null
  properties: {
    cyclopedia?: {
      wikipedia: string
    },
    basic: {
      // group: string
      // period: string
      enName: string
      block: string
      // electronConfiguration: string
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
      electronConfiguration: string
      oxidationStates: string
      ionCharge: string
      electronegativity: string
      ionizationEnergies: string
      atomicRadius: string
      covalentRadius: string
      vanDerWaals: string
      spectralLines: string
    }
    electromagnetic: {
      electricalConductivity: string
      // electricalType: string
      volumeMagneticSusceptibility: string
      massMagneticSusceptibility: string
      molarMagneticSusceptibility: string
      resistivity: string
      superconductingPoint: string
    }
    other: {
      crystalStructure: string
      magneticOrdering: string
      speedOfSound: string
      thermalConductivity: string
      CASNumber: string
      CIDNumber: string
      RTECNumber: string
    }
    history: {
      discovery: string
      namedBy: string
    },
    abundance: {
      universe: string
      sun: string
      oceans: string
      humanBody: string
      earthCrust: string
      meteorites: string
    }
  }
}

export const propertiesGroupLabel: Record<PropertiesGroup, string> = {
  cyclopedia: '元素百科',
  basic: '概述',
  physical: '物理性质',
  atomic: '原子性质',
  other: '其他属性',
  history: '发现',
  abundance: '含量',
  electromagnetic: '电磁性质',
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
  electronsPerShell: '每层电子数',
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
  ionCharge: '离子电子量',
  CIDNumber: 'CID号',
  RTECNumber: 'RTEC号',

  universe: '宇宙中的大概含量',
  sun: '太阳中的大概含量',
  oceans: '人体中的大概含量',
  humanBody: '人体中的大概含量',
  earthCrust: '地壳中的大概含量',
  meteorites: '陨石中的大概含量',

  electricalConductivity: '电导率',
  electricalType: '导电性',
  volumeMagneticSusceptibility: '体积磁化率',
  massMagneticSusceptibility: '质量磁化率',
  molarMagneticSusceptibility: '摩尔磁化率',
  resistivity: '电阻率',
  superconductingPoint: '超导点',

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
  const i = atomicNumber - 1
  return {
    symbol: symbol[i],
    atomicNumber: atomicNumber,
    previous: atomicNumber > 1 ? {
      symbol: symbol[i - 1],
      atomicNumber: atomicNumber - 1,
    } : null,
    next: atomicNumber < 120 ? {
      symbol: symbol[i + 1],
      atomicNumber: atomicNumber + 1,
    } : null,
    properties: {
      cyclopedia: {
        wikipedia: summary[atomicNumber],
      },
      basic: {
        enName: enName[i],
        block: block[i],
        // electronConfiguration: electronConfigurations[index],
        electronsPerShell: electronsPerShell[i],
      },
      physical: {
        phaseAtSTP: stateOfMatter[standardState[i]],
        meltingPoint: meltingPoints[i] + ' °C',
        boilingPoint: boilingPoints[i] + ' °C',
        density: density[i],
        heatOfFusion: heatOfFusion[i],
        molarHeatCapacity: molarHeatCapacity[i],
      },
      atomic: {
        electronConfiguration: electronConfigurations[i],
        oxidationStates: oxidationStates[i],
        ionCharge: ionCharge[i],
        electronegativity: electronegativity[i],
        ionizationEnergies: ionizationEnergies[i],
        atomicRadius: atomicRadius[i],
        covalentRadius: covalentRadius[i],
        vanDerWaals: vanDerWaals[i],
        spectralLines: symbol[i],
      },
      electromagnetic: {
        electricalConductivity:
          electricalConductivity[i]
            ? electricalConductivity[i] + ' ' + unit.electricalConductivity
            : electricalConductivity[i],
        // electricalType: electricalType[index],
        volumeMagneticSusceptibility: volumeMagneticSusceptibility[i],
        massMagneticSusceptibility: massMagneticSusceptibility[i],
        molarMagneticSusceptibility:
          molarMagneticSusceptibility[i]
            ? molarMagneticSusceptibility[i] + ' ' + unit.molarMagneticSusceptibility
            : molarMagneticSusceptibility[i],
        resistivity: resistivity[i]
          ? resistivity[i] + ' ' + unit.resistivity
          : resistivity[i],
        superconductingPoint: superconductingPoint[i]
          ? superconductingPoint[i] + ' ' + unit.superconductingPoint
          : superconductingPoint[i],
      },
      other: {
        crystalStructure: crystalStructure[i],
        magneticOrdering: magneticOrdering[i],
        speedOfSound: speedOfSound[i],
        thermalConductivity: thermalConductivity[i],
        CASNumber: CASNumber[i],
        CIDNumber: CIDNumber[i],
        RTECNumber: RTECNumber[i],
      },
      history: {
        discovery: discovery[i],
        namedBy: namedBy[i],
      },
      abundance: {
        universe: abundanceInUniverse[i],
        sun: abundanceInSun[i],
        oceans: abundanceInOceans[i],
        humanBody: abundanceInHumanBody[i],
        earthCrust: abundanceInEarthCrust[i],
        meteorites: abundanceInMeteorites[i],
      }
    }
  }
}


