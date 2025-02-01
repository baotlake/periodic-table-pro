'use client'

import classNames from 'classnames/bind'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, ReactNode, useMemo } from 'react'

const cx = classNames.bind({})

type Props = PropsWithChildren<{
  pathnames: string[]
}>

export default function KeepAlive({ children, pathnames = [] }: Props) {
  const pathname = usePathname()
  const map = useMemo<Record<string, ReactNode>>(() => ({}), [])
  const keep = pathnames.includes(pathname)
  if (keep && !map[pathname]) {
    map[pathname] = children
  }

  console.log('KeepAlive', pathname, keep, map)

  return (
    <>
      {Object.keys(map).map((key) => (
        <div
          key={key}
          data-keepalive={keep}
          data-key={key}
          className={cx({ hidden: pathname != key })}
        >
          {map[key]}
        </div>
      ))}

      {!keep && children}
    </>
  )
}
