'use client'

import {
  useInitialization,
  useMenuClientRect,
  usePageMeta,
  useTheme,
} from '../hooks'
// import { PageMeta } from '../compat/components'

export function Initialization() {
  useTheme()
  useInitialization()
  useMenuClientRect()
  usePageMeta()

  return null

  // return (
  //   <PageMeta
  //     rootBackgroundColor={theme === 'dark' ? '#272829' : '#FFFFFF'}
  //     backgroundColor={theme === 'dark' ? '#272829' : '#FFFFFF'}
  //     backgroundTextStyle={theme === 'dark' ? 'dark' : 'light'}
  //     pageOrientation="auto"
  //   />
  // )
}
