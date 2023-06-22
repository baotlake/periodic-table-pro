import { ZoomControlInterface } from '../type'
import { getBoundingClientRect } from '../compat/dom'
import { maxPtZoom, minPtZoom } from '../config'

const PLATFORM = process.env.PLATFORM

class ZoomControl implements ZoomControlInterface {
  private wrapper: HTMLElement
  private target: HTMLElement

  private panning: boolean = false
  private clientX: number = 0
  private clientY: number = 0
  private count: number

  private wrapperRect: DOMRect | null = null
  private targetRect: DOMRect | null = null

  private focalX: number = 0
  private focalY: number = 0

  private scale1: number = 1
  private delta1: number = 0

  private offset1 = { tx: 0, ty: 0, mt: 0, ml: 0, st: 0, sl: 0 }

  private panningScale: number = 1
  private panningTX: number = 0
  private panningTY: number = 0

  private wrapperStyle1 = {} as Record<string, string>

  constructor({ wrapper, target }) {
    this.wrapper = wrapper
    this.target = target

    this.count = 0

    this.scaleTo = this.scaleTo.bind(this)
  }

  public async start(delta: number, _x?: number, _y?: number) {
    let count = ++this.count
    this.wrapperRect = await getBoundingClientRect(this.wrapper)
    this.targetRect = await getBoundingClientRect(this.target)

    if (this.count != count || !this.wrapperRect || !this.targetRect) {
      return {}
    }

    let x = _x ?? this.targetRect.left + this.targetRect.width / 2
    let y = _y ?? this.targetRect.top + this.targetRect.height / 2

    this.clientX = x
    this.clientY = y

    this.scale1 = this.parseScale(this.target)
    this.delta1 = delta

    this.offset1 = await this.parseInitalOffset(this.wrapper, this.target)
    if (this.count !== count) {
      return {}
    }
    console.log('start: ', this.offset1, this.scale1)

    const [focalX, focalY] = this.calcFocalXY(
      this.wrapperRect,
      this.targetRect,
      x,
      y,
      this.scale1
    )
    this.focalX = focalX
    this.focalY = focalY

    this.wrapperStyle1 = {
      scrollBehavior: this.wrapper.style.scrollBehavior,
      willChange: this.wrapper.style.willChange,
    }

    // this.wrapper.style.overflow = 'hidden'
    // this.wrapper.style.scrollBehavior = 'auto'
    // this.wrapper.style.willChange = 'transform, font-size'

    this.panning = true
    return {
      scale: this.scale1,
    }
  }

  public move(delta: number) {
    if (!this.panning || !this.targetRect || !this.wrapperRect) {
      return null
    }

    const rate = delta / this.delta1
    let scale = this.scale1 * rate

    if (scale < minPtZoom) {
      scale = minPtZoom
    }
    if (scale > maxPtZoom) {
      scale = maxPtZoom
    }

    let tx = this.offset1.tx - this.focalX * (scale / this.scale1 - 1)
    let ty = this.offset1.ty - this.focalY * (scale / this.scale1 - 1)

    // console.log('move', this.offset1.tx, this.focalX, this.scale1, scale, tx)

    let { sl, st } = this.offset1

    this.panningScale = scale
    this.panningTX = tx
    this.panningTY = ty

    this.target.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`
    this.target.style.fontSize = '1em'

    return {
      scale,
      tx: tx,
      ty: ty,
      sl,
      st,
    }
  }

  public end() {
    // console.log('end: ', this.panning, this.targetRect, this.wrapperRect)
    if (!this.panning) {
      return
    }
    this.panning = false
    if (!this.targetRect || !this.wrapperRect) {
      return null
    }

    let tx = this.panningTX,
      ty = this.panningTY
    let scale = this.panningScale

    let { mt, ml, sl, st } = this.offset1
    // let mt = 0, ml = 0, pr = 0, pb = 0
    let dt = 0,
      dl = 0,
      dr = 0,
      db = 0

    dt = ty
    dl = tx
    dr = this.targetRect.width * (scale - 1) + dl
    db = this.targetRect.height * (scale - 1) + dt

    // console.log('d-> ', { dt, dl, dr, db })

    if (dt > 0 && st > 0) {
      ty += -st
      st = 0
    }
    if (dl > 0 && sl > 0) {
      tx += -sl
      sl = 0
    }

    if (ty < 0) {
      st += -ty
      ty = 0
    }

    if (tx < 0) {
      sl += -tx
      tx = 0
    }

    // 缩小时居中
    if (
      (this.targetRect.width * scale) / this.scale1 <
      this.wrapperRect.width
    ) {
      const x =
        (this.wrapperRect.width -
          (this.targetRect.width * scale) / this.scale1) /
        2
      tx = x
      sl = 0
    }
    if (
      (this.targetRect.height * scale) / this.scale1 <
      this.wrapperRect.height
    ) {
      const y =
        (this.wrapperRect.height -
          (this.targetRect.height * scale) / this.scale1) /
        2
      ty = y
      st = 0
    }

    // console.log({ scale, tx, ty, sl, st })
    const tscale = Math.min(scale, 1)
    const fscale = Math.max(scale, 1)
    this.wrapper.scrollTo?.(sl, st)
    this.target.style.transform = `translate(${tx}px,${ty}px) scale(${tscale})`
    this.target.style.fontSize = `${fscale}em`
    this.wrapper.scrollTo?.(sl, st)

    // this.wrapper.style.overflow = 'auto'
    // this.wrapper.style.scrollBehavior = this.wrapperStyle1.scrollBehavior
    // this.wrapper.style.willChange = this.wrapperStyle1.willChange

    return {
      scale,
      tx,
      ty,
      mt,
      ml,
      sl,
      st,
    }
  }

  public moveTo(value: number) {
    this.move(value / this.scale1)
  }

  public async scaleTo(value: number, x: number, y: number) {
    const { scale } = await this.start(1, x, y)
    if (typeof scale !== 'number') {
      return
    }
    this.move(value / scale)
    this.end()
  }

  private parseScale(target: HTMLElement) {
    let scale = 1
    let match = target.style.transform.match(/scale\(([-\d\.]+)\)/)
    let tscale = 1
    if (match) {
      tscale = parseFloat(match[1])
    }
    let fscale = 1
    match = target.style.fontSize.match(/([-\d\.]+)em/)
    if (match) {
      fscale = parseFloat(match[1])
    }
    scale = tscale * fscale
    return scale
  }

  private async parseInitalOffset(wrapper: HTMLElement, target: HTMLElement) {
    let tx = 0,
      ty = 0
    let match = target.style.transform.match(
      /translate\(([-\d\.]+)px,\s*([-\d\.]+)px\)/
    )
    if (match) {
      tx = parseFloat(match[1])
      ty = parseFloat(match[2])
    }
    let mt = 0,
      ml = 0
    match = target.style.marginTop.match(/([-\d\.]+)px/)
    if (match) {
      mt = parseFloat(match[1])
    }
    match = target.style.marginLeft.match(/([-\d\.]+)px/)
    if (match) {
      ml = parseFloat(match[1])
    }

    let [sl, st] = await this.getScrollOffset(tx, ty)

    return {
      tx,
      ty,
      mt,
      ml,
      sl,
      st,
    }
  }

  // 以 transform-origin 为原点，计算缩放焦点坐标
  private calcFocalXY(
    wrapperRect: DOMRect,
    rect: DOMRect,
    x: number,
    y: number,
    scale: number
  ) {
    let focalX = x - rect.left
    let focalY = y - rect.top
    return [focalX, focalY]
  }

  public get isPanning() {
    return this.panning
  }

  public get scale() {
    return this.panningScale
  }

  private async getScrollOffset(tx: number, ty: number) {
    if (PLATFORM == 'h5' || PLATFORM == 'next') {
      return [this.wrapper.scrollLeft, this.wrapper.scrollTop]
    }

    let sl = this.wrapperRect!.left + tx - this.targetRect!.left
    let st = this.wrapperRect!.top + ty - this.targetRect!.top

    sl = isFinite(sl) ? sl : 0
    st = isFinite(st) ? st : 0

    return [sl, st]
  }
}

export default ZoomControl
