import {createContext, Dispatch} from "react";
import {formalShortAtomicWeights} from '../../data/elements'
import {relativeTrendValue} from '../../utils/trend'
import { DisplayProperty, ColorSign, Emphasize } from '../../types/element'

type State = {
  emphasize: Emphasize
  colorSign: ColorSign
  trendData: number[] | false
  temperature: number
  displayProperty: DisplayProperty
}

type Action = {
  type: 'setEmphasize'
  payload: {
    emphasize: State['emphasize']
  }
} | {
  type: 'setColorSign'
  payload: {
    colorSign: State['colorSign']
  }
} | {
  type: 'setTrendData',
  payload: {
    trendData: number[] | false,
  }
} | {
  type: 'setTemperature',
  payload: {
    temperature: number,
  }
} | {
  type: 'setDisplayProperty',
  payload: {
    displayProperty: State['displayProperty']
  }
}

const initState: State = {
  emphasize: 'symbol',
  colorSign: 'classification',
  trendData: relativeTrendValue(formalShortAtomicWeights),
  temperature: 0,
  displayProperty: 'atomicWeight'
}

function init() {
  return {
    emphasize: 'symbol',
    colorSign: 'classification',
    trendData: relativeTrendValue(formalShortAtomicWeights),
  }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setEmphasize":
      return {...state, ...action.payload}
    case 'setColorSign':
      return {...state, ...action.payload}
    case 'setTrendData':
      return {...state, ...action.payload}
    case 'setTemperature':
      return {...state, ...action.payload}
    case 'setDisplayProperty':
      return {...state, ...action.payload}
  }
}

const PeriodicTableContext = createContext<{ state: State, dispatch?: Dispatch<Action> }>({
  state: initState,
})

export {
  State,
  Action,
  initState,
  init,
  reducer,
  PeriodicTableContext
}

