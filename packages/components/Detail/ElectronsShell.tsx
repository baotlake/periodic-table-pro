'use client'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { Canvas, Image, Taro } from '../compat'

import styles from './electronsShell.module.scss'

const cx = classNames.bind(styles)

type Props = {
  className?: string
  value: string
}

const PLATFORM = process.env.PLATFORM

const w = 600
const h = 600

export default function ElectronsShell({ className, value }: Props) {
  const [imgUrl, setImgUrl] = useState('')

  const dataRef = useRef({
    shells: [0, 0, 0, 0],
    rate: 1,
  })

  useEffect(() => {
    const isValid = /[,\d]/.test(value)
    const shells = isValid ? value.split(',').map(parseFloat) : [0, 0, 0, 0]
    dataRef.current.shells = shells
  }, [value])

  useEffect(() => {
    let rotate = 0
    let ctx: CanvasRenderingContext2D | Taro.CanvasContext
    let requestID: number = 0
    let canvas: any
    let mount = true

    function draw(shells: number[]) {
      if (!ctx) return

      ctx.clearRect(-w / 2, -h / 2, w, h)
      ctx.rotate(rotate)
      ctx.beginPath()
      ctx.arc(0, 0, 16, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(0,0,0,0.85)'
      ctx.fill()

      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        const shellRadius = 10 + 30 * (i + 1)
        ctx.arc(0, 0, shellRadius, 0, 2 * Math.PI)
        ctx.strokeStyle = `rgba(0,0,0,${(0.85 - i * 0.08).toFixed(2)})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      shells.forEach((n, i) => {
        // ctx.rotate(rotate * 0.001 * rate)
        ctx.rotate(rotate / 10)
        for (let j = 0; j < n; j++) {
          ctx.beginPath()
          const shellRadius = 10 + 30 * (i + 1)
          let angle = (j * (2 * Math.PI)) / n
          const x = shellRadius * Math.cos(angle)
          const y = shellRadius * Math.sin(angle)
          ctx.arc(x, y, 8, 0, 2 * Math.PI)
          ctx.fillStyle = `rgba(0,0,0,1)`
          ctx.fill()
        }
      })
    }

    function render(width: number, height: number) {
      console.log('render', width, height, ctx)

      let requestAnimationFrame = globalThis.requestAnimationFrame || (() => 0)
      if (PLATFORM == 'weapp' && canvas) {
        requestAnimationFrame = canvas.requestAnimationFrame
      }

      const drawLoop = function () {
        const { shells, rate } = dataRef.current
        rotate += 0.001 * rate
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.translate(width / 2, height / 2)

        draw(shells)
        if (PLATFORM === 'qq') {
          ;(ctx as any).draw()
        }

        if (!mount) {
          return
        }

        requestAnimationFrame(drawLoop)
      }

      drawLoop()
    }

    if (PLATFORM == 'h5' || PLATFORM == 'next') {
      const canvas = document.querySelector(
        '#electrons-shell'
      ) as HTMLCanvasElement
      if (canvas) {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx = context
        render(canvas.width, canvas.height)
      }
    }

    if (PLATFORM == 'weapp' && Taro) {
      Taro.nextTick(() => {
        const query = Taro.createSelectorQuery()
        query
          .select?.('.page >>> .unique-electrons-shell')
          .fields({ node: true, size: true })
        query
          .select?.('.unique-electrons-shell')
          .fields({ node: true, size: true })
        query.exec?.((res) => {
          canvas = res.find((n) => n)?.node
          const context = canvas.getContext('2d') as CanvasRenderingContext2D
          ctx = context
          const dpr = Taro.getSystemInfoSync().pixelRatio
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale(dpr, dpr)
          render(res[0].width * dpr, res[0].height * dpr)
        })
      })
    }

    if (PLATFORM === 'qq') {
      Taro.nextTick(() => {
        const query = Taro.createSelectorQuery()
        query.select('#electrons-shell').fields({ node: true, size: true })
        query.exec((res) => {
          canvas = res[0].node
          const context = Taro.createCanvasContext('electrons-shell')
          ctx = context
          render(w, h)
          Taro.nextTick(() => {
            Taro.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: w,
              height: h,
              destWidth: w,
              destHeight: h,
              canvasId: 'electrons-shell',
              success: (res) => {
                setImgUrl(res.tempFilePath)
              },
            })
          })
        })
      })
    }

    return () => {
      mount = false
      let cancelAnimationFrame = globalThis.cancelAnimationFrame
      if (['weapp', 'qq'].includes(PLATFORM) && canvas) {
        // cancelAnimationFrame = canvas?.cancelAnimationFrame
      }
      cancelAnimationFrame?.(requestID)
    }
  }, [])

  const handleClick = () => {
    switch (dataRef.current.rate) {
      case 1:
        dataRef.current.rate = 0.2
        break
      case 0.2:
        dataRef.current.rate = 2
        break
      case 2:
        dataRef.current.rate = 1
        break
      default:
        dataRef.current.rate = 1
        break
    }
  }

  return (
    <div className={cx('electrons-shell', className)} onClick={handleClick}>
      {(PLATFORM == 'h5' || PLATFORM == 'next') && (
        <canvas
          id="electrons-shell"
          width={w}
          height={h}
          style={{
            width: 300,
            height: 300,
          }}
        />
      )}
      {PLATFORM == 'weapp' && (
        <Canvas
          type="2d"
          id="electrons-shell"
          className="unique-electrons-shell"
          canvasId="electrons-shell"
          style={{
            width: 300,
            height: 300,
          }}
        />
      )}
      {PLATFORM == 'qq' && (
        <>
          <Image
            className={cx('img')}
            src={imgUrl}
            style={{
              width: 300,
              height: 300,
            }}
          />
          <Canvas
            type="2d"
            id="electrons-shell"
            canvasId="electrons-shell"
            style={{
              width: w,
              height: h,
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              transform: 'translate(-1000000px, -10000000px)',
            }}
          />
        </>
      )}
    </div>
  )
}
