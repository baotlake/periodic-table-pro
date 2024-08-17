import {
  symbol,
  enName,
  zhCNNames,
  formalShortAtomicWeights,
  Property,
} from '@periodic-table-pro/data'

type ResultData = {
  Z: number
  property: Property
  matching: number
}

export function search(text: string) {
  const tokens = keywordsSplit(text)
  let list = tokens.map((v) => keywordsSearch(v)).flat()

  // Exactly match atomic number
  if (/[\d\-]+/.test(text)) {
    list = tokens.map((v) => searchAtomicNumber(v)).flat()
  }

  const map: Record<number, ResultData> = {}
  list.forEach((v) => {
    if (v.Z in map) {
      map[v.Z].matching += v.matching
      return
    }
    map[v.Z] = v
  })

  const sortedList = Object.values(map).sort((a, b) => b.matching - a.matching)
  console.log('search result: ', sortedList)
  return sortedList.length > 0 ? sortedList : null
}

function keywordsSplit(text: string) {
  let tokens = text.split(/\s+/)
  tokens = tokens.map((token) => token.split(/([\d\.]+)/)).flat()

  return tokens.filter((v) => v)
}

function keywordsSearch(text: string) {
  const list: ResultData[] = []

  const symbolLike = /^[a-zA-Z]{1,3}$/.test(text)
  if (symbolLike) {
    list.push(...searchSymbol(text))
  }

  const numeric = /^[\d\.]+$/.test(text)
  if (numeric) {
    const atomicNumberLike = /^\d{1,3}$/.test(text)
    if (atomicNumberLike) {
      list.push(...searchAtomicNumber(text))
    }
    list.push(...searchNumeric(text))

    return list
  }

  list.push(...searchOther(text))

  return list
}

function searchSymbol(text: string) {
  const list: ResultData[] = []
  const entries = symbol.map((v, i) => [i, v] as [number, string])
  for (let [i, s] of entries) {
    if (s === text) {
      list.push({
        Z: i + 1,
        property: 'symbol',
        matching: 10,
      })
      continue
    }

    if (s.toLowerCase() == text.toLowerCase()) {
      list.push({
        Z: i + 1,
        property: 'symbol',
        matching: 8,
      })
      continue
    }

    if (s.toLowerCase().search(text.toLowerCase()) != -1) {
      list.push({
        Z: i + 1,
        property: 'symbol',
        matching: 2,
      })
    }
  }

  return list
}

function searchAtomicNumber(text: string) {
  const number = parseInt(text)
  const list: ResultData[] = []

  if (number > 0 && number <= symbol.length) {
    list.push({
      Z: number,
      property: 'atomicNumber',
      matching: 10,
    })
  }

  return list
}

function searchNumeric(text: string) {
  const list: ResultData[] = []
  const value = parseFloat(text)

  const entries = formalShortAtomicWeights.map((v, i) => [i, v])

  for (let [i, v] of entries) {
    const diff = Math.abs(value - v)
    if (diff < 3) {
      list.push({
        Z: i + 1,
        property: 'atomicWeight',
        matching: diff < 1 ? 8 : 5 - diff,
      })
    }
  }

  return list
}

function searchOther(text: string) {
  const list: ResultData[] = []

  text = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const zhEntries = zhCNNames.map((v, i) => [i, v] as [number, string])

  if (text.length == 1) {
    for (let [i, v] of zhEntries) {
      if (v.search(text) != -1) {
        list.push({
          Z: i + 1,
          property: 'zhName',
          matching: 10,
        })
      }
    }
  }

  const enEntries = enName.map((v, i) => [i, v] as [number, string])

  for (let [i, v] of enEntries) {
    if (v.toLowerCase().search(text.toLowerCase()) != -1) {
      list.push({
        Z: i + 1,
        property: 'enName',
        matching: text.length > 3 ? text.length : 1,
      })
    }
  }

  return list
}
