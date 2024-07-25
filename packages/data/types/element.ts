
export type PropertiesGroup =
    | 'cyclopedia'
    | 'basic'
    | 'physical'
    | 'atomic'
    | 'other'
    | 'history'
    | 'abundance'
    | 'electromagnetic'

export type Property =
    'symbol'
    | 'atomicNumber'
    | 'highlightTable'
    | 'enName'
    | 'zhName'
    | 'atomicWeight'
    | 'pinyin'
    | 'group'
    | 'period'
    | 'block'
    | 'electronConfiguration'
    | 'electronsPerShell'
    | 'phaseAtSTP'
    | 'meltingPoint'
    | 'boilingPoint'
    | 'density'
    | 'heatOfFusion'
    | 'molarHeatCapacity'
    | 'oxidationStates'
    | 'electronegativity'
    | 'ionizationEnergies'
    | 'atomicRadius'
    | 'covalentRadius'
    | 'vanDerWaals'
    | 'spectralLines'
    | 'crystalStructure'
    | 'magneticOrdering'
    | 'speedOfSound'
    | 'thermalConductivity'
    | 'CASNumber'
    | 'discovery'
    | 'namedBy'
    | 'ionCharge'
    | 'CIDNumber'
    | 'RTECNumber'
    | 'universe'
    | 'sun'
    | 'oceans'
    | 'humanBody'
    | 'earthCrust'
    | 'meteorites'
    | 'electricalConductivity'
    | 'electricalType'
    | 'volumeMagneticSusceptibility'
    | 'massMagneticSusceptibility'
    | 'molarMagneticSusceptibility'
    | 'resistivity'
    | 'superconductingPoint'


export type DisplayProperty =
    | 'blank'
    | 'atomicWeight'
    | 'pinyin'
    | 'zhCNName&pinyin'
    | 'electronegativity'
    | 'atomicRadius'
    | 'meltingPoint'
    | 'boilingPoint'
    | 'electronConfiguration'
    | 'density'
    | 'oxidationStates'
    | 'enName'

export type ColorSign = 'trend' | 'classification' | 'block' | 'state'

export type Emphasize = 'symbol' | 'name' | 'number'
