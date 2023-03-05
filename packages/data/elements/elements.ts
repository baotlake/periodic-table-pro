export {
  symbol,
  enName,
  zhCNNames,
  formalShortAtomicWeights,
  abridgedAtomicWeights,
  pinyin,
  electronConfigurations,
  block,
  standardState,
  electronegativity,    // 电负性
  atomicRadius,         // 原子半径
  electronsPerShell,    // 每层电子数
  boilingPoints,        // 沸点
  meltingPoints,        // 熔点
  density,              // 密度
  heatOfFusion,         // 熔化热
  oxidationStates,      // 氧化态
  ionizationEnergies,   // 电离能
  crystalStructure,     // 晶体结构
  magneticOrdering,     // 磁序
  CASNumber,            // CAS号
  molarHeatCapacity,    // 摩尔比热容
  covalentRadius,       // 共价半径
  vanDerWaals,          // 范德华半径
  speedOfSound,         // 声速
  thermalConductivity,  // 热导率
  discovery,            // 发现
  namedBy,              // 命名
  ionCharge,            // 离子电荷
  CIDNumber,            // CID号
  RTECNumber,           // RTE号
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
} from './elements.json'

import { abridgedAtomicWeights } from './elements.json'

export const shortAbridgedAtomicWeights = abridgedAtomicWeights.map(
  i => i.replace(/(±[\.\d]+)/, '')
)

enum StateOfMatter {
  gas,
  solid,
  liquid,
  expectedSolid,
  expectedGas,
  unknown
}

export {
  StateOfMatter,
}
