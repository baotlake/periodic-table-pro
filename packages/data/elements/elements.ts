import { default as CASNumberJSON } from '../json/CASNumber.json'
import { default as atomicRadiusJSON } from '../json/atomicRadius.json'
import { default as blockJSON } from '../json/block.json'
import { default as boilingPointsJSON } from '../json/boilingPoints.json'
import { default as covalentRadiusJSON } from '../json/covalentRadius.json'
import { default as crystalStructureJSON } from '../json/crystalStructure.json'
import { default as densityJSON } from '../json/density.json'
import { default as discoveryJSON } from '../json/discovery.json'
import { default as electronConfigurationsJSON } from '../json/electronConfigurations.json'
import { default as electronegativityJSON } from '../json/electronegativity.json'
import { default as electronsPerShellJSON } from '../json/electronsPerShell.json'
import { default as enNameJSON } from '../json/enName.json'
import { default as formalShortAtomicWeightsJSON } from '../json/formalShortAtomicWeights.json'
import { default as abridgedAtomicWeightsJSON } from '../json/abridgedAtomicWeights.json'
import { default as heatOfFusionJSON } from '../json/heatOfFusion.json'
import { default as ionizationEnergiesJSON } from '../json/ionizationEnergies.json'
import { default as magneticOrderingJSON } from '../json/magneticOrdering.json'
import { default as meltingPointsJSON } from '../json/meltingPoints.json'
import { default as molarHeatCapacityJSON } from '../json/molarHeatCapacity.json'
import { default as namedByJSON } from '../json/namedBy.json'
import { default as oxidationStatesJSON } from '../json/oxidationStates.json'
import { default as pinyinJSON } from '../json/pinyin.json'
import { default as speedOfSoundJSON } from '../json/speedOfSound.json'
import { default as standardStateJSON } from '../json/standardState.json'
import { default as symbolJSON } from '../json/symbol.json'
import { default as thermalConductivityJSON } from '../json/thermalConductivity.json'
import { default as vanDerWaalsJSON } from '../json/vanDerWaals.json'
import { default as zhCNNamesJSON } from '../json/zhCNNames.json'
import { default as ionChargeJSON } from '../json/ionCharge.json'
import { default as CIDNumberJSON } from '../json/CIDNumber.json'
import { default as RTECNumberJSON } from '../json/RTECNumber.json'
import { default as abundanceInSunJSON } from '../json/abundanceInSun.json'
import { default as abundanceInUniverseJSON } from '../json/abundanceInUniverse.json'
import { default as abundanceInOceansJSON } from '../json/abundanceInOceans.json'
import { default as abundanceInHumanBodyJSON } from '../json/abundanceInHumanBody.json'
import { default as abundanceInEarthCrustJSON } from '../json/abundanceInEarthCrust.json'
import { default as abundanceInMeteoritesJSON } from '../json/abundanceInMeteorites.json'
import { default as electricalConductivityJSON } from '../json/electricalConductivity.json'
import { default as electricalTypeJSON } from '../json/electricalType.json'
import { default as volumeMagneticSusceptibilityJSON } from '../json/volumeMagneticSusceptibility.json'
import { default as massMagneticSusceptibilityJSON } from '../json/massMagneticSusceptibility.json'
import { default as molarMagneticSusceptibilityJSON } from '../json/molarMagneticSusceptibility.json'
import { default as resistivityJSON } from '../json/resistivity.json'
import { default as superconductingPointJSON } from '../json/superconductingPoint.json'
import { default as unitJSON } from '../json/unit.json'

export const CASNumber = CASNumberJSON.data
export const atomicRadius = atomicRadiusJSON.data
export const block = blockJSON.data
export const boilingPoints = boilingPointsJSON.data
export const covalentRadius = covalentRadiusJSON.data
export const crystalStructure = crystalStructureJSON
export const density = densityJSON.data
export const discovery = discoveryJSON.data
export const electronConfigurations = electronConfigurationsJSON.data
export const electronegativity = electronegativityJSON.data
export const electronsPerShell = electronsPerShellJSON.data
export const enName = enNameJSON.data
export const formalShortAtomicWeights = formalShortAtomicWeightsJSON.data
export const abridgedAtomicWeights = abridgedAtomicWeightsJSON.data
export const heatOfFusion = heatOfFusionJSON.data
export const ionizationEnergies = ionizationEnergiesJSON.data
export const magneticOrdering = magneticOrderingJSON.data
export const meltingPoints = meltingPointsJSON.data
export const molarHeatCapacity = molarHeatCapacityJSON.data
export const namedBy = namedByJSON.data
export const oxidationStates = oxidationStatesJSON.data
export const pinyin = pinyinJSON.data
export const speedOfSound = speedOfSoundJSON.data
export const standardState = standardStateJSON.data
export const symbol = symbolJSON.data
export const thermalConductivity = thermalConductivityJSON.data
export const vanDerWaals = vanDerWaalsJSON.data
export const zhCNNames = zhCNNamesJSON.data
export const ionCharge = ionChargeJSON.data
export const CIDNumber = CIDNumberJSON.data
export const RTECNumber = RTECNumberJSON.data
export const abundanceInSun = abundanceInSunJSON.data
export const abundanceInUniverse = abundanceInUniverseJSON.data
export const abundanceInOceans = abundanceInOceansJSON.data
export const abundanceInHumanBody = abundanceInHumanBodyJSON.data
export const abundanceInEarthCrust = abundanceInEarthCrustJSON.data
export const abundanceInMeteorites = abundanceInMeteoritesJSON.data
export const electricalConductivity = electricalConductivityJSON.data
export const electricalType = electricalTypeJSON.data
export const volumeMagneticSusceptibility =
  volumeMagneticSusceptibilityJSON.data
export const massMagneticSusceptibility = massMagneticSusceptibilityJSON.data
export const molarMagneticSusceptibility = molarMagneticSusceptibilityJSON.data
export const resistivity = resistivityJSON.data
export const superconductingPoint = superconductingPointJSON.data
export const unit = unitJSON.data

export const shortAbridgedAtomicWeights = abridgedAtomicWeights.map((i) =>
  i.replace(/(±[\.\d]+)/, '')
)

enum StateOfMatter {
  gas,
  solid,
  liquid,
  expectedSolid,
  expectedGas,
  unknown,
}

export { StateOfMatter }
