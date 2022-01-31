import { useEffect, useRef } from "react"
import { View, Canvas } from '@tarojs/components'
import Taro from "@tarojs/taro"


type Props = {
  className?: string
  value: string
}

export default function ElectronsShell({ className, value }: Props) {

  const dataRef = useRef({
    shells: [0, 0, 0, 0],
  })

  useEffect(() => {
    const isValid = /[,\d]/.test(value)
    const shells = isValid ? value.split(',').map(parseFloat) : [0, 0, 0, 0]
    dataRef.current.shells = shells
  }, [value])

  useEffect(() => {
    let w = 600
    let h = 300
    let count = 0
    let ctx: CanvasRenderingContext2D
    let requestID: number
    let wxCanvas: any

    function draw() {
      if (!ctx) return
      const { shells } = dataRef.current
      ctx.clearRect(-w / 2, -h / 2, w, h)
      ctx.rotate(count * 0.005)
      ctx.beginPath()
      ctx.arc(0, 0, 12, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(0,0,0,0.8)'
      ctx.fill()
      shells.forEach((n, i) => {
        // ctx.rotate(count * 0.001)
        ctx.beginPath()
        const shellRadius = 10 + 26 * (i + 1)
        ctx.arc(0, 0, shellRadius, 0, 2 * Math.PI)
        ctx.strokeStyle = `rgba(0,0,0,${(0.8 - i * 0.08).toFixed(2)})`
        ctx.stroke()
        // for (let j = 0; j < n; j++) {
        //   ctx.beginPath()
        //   let angle = j * (2 * Math.PI) / n
        //   const x = shellRadius * Math.cos(angle)
        //   const y = shellRadius * Math.sin(angle)
        //   ctx.arc(x, y, 5, 0, 2 * Math.PI)
        //   ctx.fillStyle = `rgba(0,0,0,0.6)`
        //   ctx.fill()
        // }
      })

      shells.forEach((n, i) => {
        ctx.rotate(count * 0.001)
        for (let j = 0; j < n; j++) {
          ctx.beginPath()
          const shellRadius = 10 + 26 * (i + 1)
          let angle = j * (2 * Math.PI) / n
          const x = shellRadius * Math.cos(angle)
          const y = shellRadius * Math.sin(angle)
          ctx.arc(x, y, 5, 0, 2 * Math.PI)
          ctx.fillStyle = `rgba(0,0,0,0.6)`
          ctx.fill()
        }
      })
    }

    function render(width = 600, height = 300) {
      w = width
      h = height

      const drawLoop = function () {
        count++
        ctx.resetTransform()
        ctx.translate(w / 2, h / 2)
        draw()

        if (process.env.TARO_ENV === 'h5') {
          requestID = window.requestAnimationFrame(drawLoop)
        }
        if (process.env.TARO_ENV === 'weapp') {
          requestID = wxCanvas.requestAnimationFrame(drawLoop)
        }
      }

      return drawLoop()
    }

    if (process.env.TARO_ENV === 'h5') {
      const canvas = document.querySelector('#electrons-shell') as HTMLCanvasElement
      if (canvas) {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx = context
        render(canvas.width, canvas.height)
      }
    }

    if (process.env.TARO_ENV === 'weapp') {
      Taro.nextTick(() => {
        const query = Taro.createSelectorQuery()
        query.select('#electrons-shell').fields({ node: true, size: true })
        query.exec((res) => {
          const canvas: HTMLCanvasElement = res[0].node
          wxCanvas = canvas
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

    return () => {
      if (process.env.TARO_ENV === 'h5') {
        window.cancelAnimationFrame(requestID)
      }

      if (process.env.TARO_ENV === 'weapp') {
        wxCanvas.cancelAnimationFrame(requestID)
      }
    }
  }, [])

  return (
    <View className={className}>
      {
        process.env.TARO_ENV === 'h5' ? (
          <canvas
            id='electrons-shell'
            width={600}
            height={300}
            style={{
              width: 300,
              height: 150,
            }}
          />
        ) : (
          <Canvas
            type='2d'
            id='electrons-shell'
            style={{
              width: 300,
              height: 150,
            }}
          />
        )
      }
    </View>
  )
}
