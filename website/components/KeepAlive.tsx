'use client'

import classNames from 'classnames/bind'
import { usePathname } from 'next/navigation'
import {
  PropsWithChildren,
  ReactNode,
  Suspense,
  useLayoutEffect,
  useState,
} from 'react'

const cx = classNames.bind({})

const map = new Map<string, ReactNode>()
let update = () => {}

export function KeepProvider({ children }: PropsWithChildren) {
  const [counter, setCounter] = useState(0)
  update = () => setCounter((c) => c + 1)

  return (
    <div>
      {children}

      <Suspense>
        <Keeper counter={counter} />
      </Suspense>
    </div>
  )
}

function Keeper({ counter }: { counter: number }) {
  const pathname = usePathname()

  return Array.from(map.keys()).map((path, i) => (
    <div key={path} style={{ display: pathname === path ? 'block' : 'none' }}>
      {map.get(path)}
    </div>
  ))
}

type Props = PropsWithChildren<{
  pathname: string
}>

export function KeepAlive({ pathname, children }: Props) {
  map.set(pathname, children)

  useLayoutEffect(() => {
    update()
  })

  return null
}
