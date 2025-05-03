'use client'

import { useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'
import { Logo } from './svg'

import styles from './SplashScreen.module.scss'

const cx = classNames.bind(styles)

export default function SplashScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const div = ref.current
    setTimeout(() => {
      if (div) {
        div.style.animationPlayState = 'running'
      }
      setTimeout(() => setVisible(false), 300)
    }, 100)
  }, [])

  if (!visible) return null

  return (
    <div
      ref={ref}
      className={cx(
        'splash-screen',
        'fixed top-0 left-0 w-full h-full z-[100] bg-background-mute',
        'flex flex-col justify-center items-center pointer-events-none'
      )}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-fit p-2 rounded-full border border-solid border-border">
          <Logo className="block size-16" />
          <div
            className={cx(
              'absolute top-0 left-0 w-full h-full animate-[spin_2s_linear_infinite]',
              'before:content-[""] before:block before:absolute before:-top-1 before:left-1/2',
              'before:size-2 before:bg-border before:rounded-full'
            )}
          />
        </div>
        <h3 className="mt-6 text-lg font-bold">元素周期表 PRO</h3>
      </div>
    </div>
  )
}
