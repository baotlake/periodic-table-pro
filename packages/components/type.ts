export type ThemeMode = 'dark' | 'light'

export interface ZoomControllerInterface {
  isPanning: boolean

  start: (
    delta: number,
    x?: number,
    y?: number
  ) => Promise<{ scale: number } | {}>
  move: (delta: number) => any
  end: () => any
  moveTo: (value: number) => void
}

export type TrendData =
  | number
  | { min: number; max: number }
  | number[]
  | { min: number; max: number }[]
