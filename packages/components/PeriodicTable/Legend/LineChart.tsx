import { useEffect, useState } from 'react'
import { Image, Canvas, Taro } from '../../compat'
import useReady from './useReady'
import classNames from 'classnames'
import { parseTrendValue } from '../../utils/trend'
import type { CanvasContext } from '@tarojs/taro'

const PLATFORM = process.env.PLATFORM

type TrendData = ReturnType<typeof parseTrendValue>[0]

type Props = {
  className?: string
  width: number
  height: number
  data: TrendData[]
}

export default function LineChart({ className, width, height, data }: Props) {
  const [imgUrl, setImgUrl] = useState('')
  const [ready, setReady] = useState(true)

  useReady(() => {
    setReady(true)
    console.log('useReady', PLATFORM)
  })

  useEffect(() => {
    const simpleValue = data.map((i) => {
      if (typeof i === 'number') return i
      if (i instanceof Array) {
        if (i.length && typeof i[0] === 'number') return i[0]
        if (i.length && typeof i[0] === 'object') return i[0].max
        return 0
      }
      if (i.max) return i.max
      return 0
    })
    let ctx: CanvasRenderingContext2D | CanvasContext

    function drawData(x: number, y: number, w: number, h: number) {
      const series = simpleValue.map(
        (value) => height * 0.9 - value * height * 0.8
      )
      const dx = w / (series.length + 1)

      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(0,0,0,1)'
      ctx.lineCap = 'round'

      // // x 轴
      // ctx.moveTo(x, y + h)
      // ctx.lineTo(x + w, y + h)

      // // y 轴
      // ctx.moveTo(x, y + h)
      // ctx.lineTo(x, y)
      // ctx.stroke()

      const gradient = ctx.createLinearGradient(0, height, 0, 0)
      gradient.addColorStop(1, 'rgba(255,0,0,0.2)')
      gradient.addColorStop(0, 'rgba(255,0,0,0)')

      // gradient background
      ctx.fillStyle = gradient
      ctx.strokeStyle = 'rgba(0,0,0,0)'
      ctx.beginPath()
      ctx.moveTo(x + dx, y + h)
      series.forEach((py, i) => {
        const px = x + dx * (i + 1)
        if (!isFinite(py)) py = y + h
        // console.log(px, py)
        ctx.lineTo(px, py)
      })
      ctx.lineTo(x + w - dx, y + h)
      ctx.closePath()
      ctx.fill()

      // curve
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255,0,0,0.5)'
      series.forEach((py, i) => {
        const px = x + dx * (i + 1)
        if (!isFinite(py)) py = y + h
        ctx.lineTo(px, py)
      })
      ctx.stroke()
      ctx.closePath()

      // points
      series.forEach((py, i) => {
        const px = x + dx * (i + 1)
        if (!isFinite(py)) py = y + h
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(255,0,0,1)'
        ctx.fill()
        ctx.arc(px, py, 6, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(255,0,0,0.3)'
        ctx.fill()
        ctx.closePath()
      })
    }

    function render() {
      ctx.clearRect(0, 0, width, height)
      drawData(20, 20, width - 40, height - 40)
      console.log('render line chart')
    }

    if (PLATFORM == 'weapp') {
      const { nextTick, createSelectorQuery, getSystemInfoSync } = Taro
      // Canvas
      if (0) {
        nextTick(() => {
          const query = createSelectorQuery()
          query.select('#canvas').fields({ node: true, size: true })
          query.exec((res) => {
            // console.log(res)
            const canvas: HTMLCanvasElement = res[0].node
            const context = canvas.getContext('2d') as CanvasRenderingContext2D
            ctx = context

            const dpr = getSystemInfoSync().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale(dpr, dpr)
            render()
          })
        })
      }
      // OfflineCanvas -> Image
      if (0) {
        nextTick(() => {
          // @ts-ignore
          const canvas = wx.createOffscreenCanvas(width, height)
          // console.log('canvas', canvas)
          const context = canvas.getContext('2d')
          ctx = context
          render()
          const url = canvas.toDataURL('image/png')
          setImgUrl(url)
        })
      }
      // Canvas -> Image
      if (1) {
        nextTick(() => {
          const query = createSelectorQuery()
          query.select('#canvas').fields({ node: true, size: true })
          query.exec((res) => {
            console.log(res)
            const canvas: HTMLCanvasElement = res[0].node
            const context = canvas.getContext('2d') as CanvasRenderingContext2D
            ctx = context

            const dpr = getSystemInfoSync().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale(dpr, dpr)
            render()

            const dataUrl = canvas.toDataURL('image/png')
            setImgUrl(dataUrl)
          })
        })
      }
    }

    if (PLATFORM === 'qq') {
      const { nextTick, createCanvasContext, canvasToTempFilePath } = Taro
      console.log('ready')
      nextTick(() => {
        console.log('ready nextTick')

        ctx = createCanvasContext('canvas')

        // const dpr = Taro.getSystemInfoSync().pixelRatio
        const dpr = 1
        // canvas.width = res[0].width * dpr
        // canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        render()

        const _ctx = ctx as CanvasContext
        new Promise<void>((resolve) => {
          _ctx.draw(false, resolve)
        }).then(() => {
          console.log('ctx', ctx)
          canvasToTempFilePath({
            x: 0,
            y: 0,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            canvasId: 'canvas',
            success: function (res) {
              console.log('path res', res)
              setImgUrl(res.tempFilePath)
            },
            fail: (e) => console.error('fail', e),
            complete: (e) => console.log('complete', e),
          })
        })
      })
    }

    if (PLATFORM === 'alipay') {
      const { nextTick, createSelectorQuery, getSystemInfoSync } = Taro
      nextTick(() => {
        const query = createSelectorQuery()
        query.select('#canvas').fields({ node: true, size: true })
        query.exec((res) => {
          // console.log(res)
          const canvas: HTMLCanvasElement = res[0].node
          const context = canvas.getContext('2d') as CanvasRenderingContext2D
          ctx = context

          const dpr = getSystemInfoSync().pixelRatio
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale(dpr, dpr)
          render()
        })
      })
    }

    if (PLATFORM === 'h5' || PLATFORM == 'next') {
      const canvas = document.querySelector('#canvas') as HTMLCanvasElement
      // console.log('canvas', canvas)
      if (canvas) {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx = context
        render()
      }
    }
  }, [width, height, data, ready])

  if (PLATFORM == 'h5' || PLATFORM == 'next') {
    return (
      <canvas
        className={classNames(className)}
        id="canvas"
        width={width}
        height={height}
      />
    )
  }

  if (PLATFORM == 'weapp' || PLATFORM == 'qq') {
    return (
      <>
        <Image className={classNames(className)} src={imgUrl} />
        <Canvas
          className={classNames(className)}
          id="canvas"
          canvasId="canvas"
          type="2d"
          style={{
            position: 'absolute',
            width: width + 'px',
            height: height + 'px',
            opacity: 0,
            transform: 'translate(-1000000px, -10000000px)',
            pointerEvents: 'none',
          }}
        />
      </>
    )
  }

  return (
    <Canvas
      className={classNames(className)}
      id="canvas"
      type="2d"
      // style={{ width: width + 'px', height: height + 'px' }}
    />
  )
}
