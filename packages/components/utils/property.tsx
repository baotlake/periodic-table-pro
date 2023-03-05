import {
    symbol,
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
} from "@periodic-table-pro/data"
// import { DisplayProperty } from "../types/element"
import { chineseName } from "./utils"
import { MaskIcon } from "../Icon"
import { RichText } from "../compat"


export function getDisplayProperty(property: DisplayProperty, Z: number) {
    const index = Z - 1
    switch (property) {
        case 'blank':
            return ''
        case "atomicWeight":
            return shortAbridgedAtomicWeights[index]
            return formalShortAtomicWeights[index]
        case 'pinyin':
            return pinyin[index]
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
    if (isFinite(meltingPoint) && isFinite(boilingPoint) && meltingPoint < temperature && boilingPoint > temperature) {
        return StateOfMatter.liquid
    }
    return StateOfMatter.unknown
}

export function getDeepReadingWikipediaUrl(path: string) {
    const wikiEn = "https://en.m.wikipedia.org" + (path.startsWith('/') ? path : '/' + path)
    return "https://wrp.netlify.app/reading?url=" + encodeURIComponent(wikiEn)
}
