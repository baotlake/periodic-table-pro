import {
  StateOfMatter,
  meltingPoints,
  boilingPoints,
} from '@periodic-table-pro/data'

const DEEP_READING_ORIGIN = process.env.DEEP_READING_ORIGIN

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

export function getDeepReadingWikipediaUrl(path: string) {
  const wikiEn =
    'https://en.m.wikipedia.org' + (path.startsWith('/') ? path : '/' + path)
  return `${DEEP_READING_ORIGIN}/reading?url=` + encodeURIComponent(wikiEn)
}
