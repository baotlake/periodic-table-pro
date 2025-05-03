import { ZoomControllerInterface } from '../type'
import { getBoundingClientRect } from '../compat/dom'
import { maxPtZoom, minPtZoom } from '../config'

const PLATFORM = process.env.PLATFORM

class ZoomController implements ZoomControllerInterface {
  private container: HTMLElement
  private target: HTMLElement

  private panning: boolean = false
  private count: number

  private containerRect: DOMRect | null = null
  private targetRect: DOMRect | null = null

  /** 缩放焦点 x 坐标，不包含缩放（event 或者 DOMRect） */
  private focalX: number = 0
  /** 缩放焦点 y 坐标，不包含缩放（event 或者 DOMRect） */
  private focalY: number = 0

  private scale1: number = 1
  private delta1: number = 0

  private offset1 = { tx: 0, ty: 0, mt: 0, ml: 0, st: 0, sl: 0 }

  private panningScale: number = 0
  private panningTX: number = 0
  private panningTY: number = 0

  private containerInfo = {
    contentWidth: 0,
    contentHeight: 0,
  }

  constructor({ wrapper, target }) {
    this.container = wrapper
    this.target = target

    this.count = 0

    this.scaleTo = this.scaleTo.bind(this)
  }

  /**
   * @param delta 双指之间的距离，不考虑缩放
   * @param _x    缩放焦点 x 坐标，不包含缩放（event 或者 DOMRect）
   * @param _y    缩放焦点 y 坐标，不包含缩放（event 或者 DOMRect）
   * @returns
   */
  public async start(delta: number, _x?: number, _y?: number) {
    let count = ++this.count
    this.containerRect = await getBoundingClientRect(this.container)
    this.targetRect = await getBoundingClientRect(this.target)

    if (this.count != count || !this.containerRect || !this.targetRect) {
      return {}
    }

    let x = _x ?? this.targetRect.left + this.targetRect.width / 2
    let y = _y ?? this.targetRect.top + this.targetRect.height / 2

    this.scale1 = this.parseScale(this.target)
    this.delta1 = delta

    this.offset1 = await this.parseInitalOffset(this.container, this.target)
    if (this.count !== count) {
      return {}
    }
    console.log('start: ', this.offset1, this.scale1)

    // 以 transform-origin 为原点，计算缩放焦点坐标
    this.focalX = x - this.targetRect.left
    this.focalY = y - this.targetRect.top

    this.containerInfo = {
      // padding top & padding bottom
      contentHeight: this.containerRect.height - 60 - 80,
      contentWidth: this.containerRect.width,
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
    const wrapperRect = this.containerRect
    const rect = this.targetRect
    if (!this.panning || !rect || !wrapperRect) {
      return null
    }

    const { contentWidth, contentHeight } = this.containerInfo
    const { delta1, scale1, focalX, focalY } = this
    const rate = delta / delta1
    const scale = Math.max(Math.min(scale1 * rate, maxPtZoom), minPtZoom)

    // tx, ty 会被缩放，focalX, focalY 不包含缩放
    // let tx = this.offset1.tx / scale1 //+ focalX * (1 / scale - 1 / scale1)
    // let ty = this.offset1.ty / scale1 //+ focalY * (1 / scale - 1 / scale1)

    /**
     * 如果 x 或 y 方向出现滚动条，那么偏移值应该是 0
     * 反之，如果偏移值不是 0，那么说明没有滚动条
     * */
    const w = (rect.width / scale1) * scale
    const h = (rect.height / scale1) * scale

    let tx = focalX * (1 / scale - 1 / scale1)
    let ty = focalY * (1 / scale - 1 / scale1)

    // 避免出现滚动条时跳变：刚出现滚动条时 ty 应该刚好是 0
    ty = ty * Math.min(1, (h - contentHeight) / 100)

    // 缩小时居中，以 scale 缩放的方式计算，scale 会影响 tx, ty
    if (w < contentWidth) {
      tx = (contentWidth / scale - rect.width / scale1) / 2
    }
    if (h < contentHeight) {
      ty = (contentHeight / scale - rect.height / scale1) / 2
    }

    // console.log('move', this.offset1.tx, this.focalX, this.scale1, scale, tx)

    let { sl, st } = this.offset1

    this.panningScale = scale
    this.panningTX = tx
    this.panningTY = ty

    this.target.style.transform = `scale(${scale}) translate(${tx}px,${ty}px)`
    this.target.style.zoom = '1'

    // this.target.style.fontSize = '1em'

    return {
      scale,
      tx: tx,
      ty: ty,
      sl,
      st,
    }
  }

  public end() {
    if (!this.panning || !this.targetRect || !this.containerRect) {
      return
    }
    this.panning = false

    let tx = this.panningTX
    let ty = this.panningTY
    let scale = this.panningScale
    const wrapperRect = this.containerRect
    const rect = this.targetRect

    let { mt, ml, sl, st } = this.offset1
    const { contentWidth, contentHeight } = this.containerInfo

    console.log('end', this.offset1, { sl, st, tx, ty })

    // 将 translate 转换为 scroll (移除掉空白滚动区域)
    // translate 会受缩放影响，scroll 不会
    if (ty > 0 && st > 0) {
      ty -= st / scale
      st = 0
    }
    if (tx > 0 && sl > 0) {
      tx -= sl / scale
      sl = 0
    }
    if (ty < 0) {
      st -= ty * scale
      ty = 0
    }
    if (tx < 0) {
      sl -= tx * scale
      tx = 0
    }

    // 缩小时居中，以 zoom 缩放的方式计算，zoom 会影响 tx, ty
    if ((rect.width / this.scale1) * scale < contentWidth) {
      tx = (contentWidth / scale - rect.width / this.scale1) / 2
      sl = 0
    }
    if ((rect.height / this.scale1) * scale < contentHeight) {
      ty = (contentHeight / scale - rect.height / this.scale1) / 2
      st = 0
    }

    console.log('end', { scale, tx, ty, sl, st })
    const tscale = Math.min(scale, 1)
    const fscale = Math.max(scale, 1)
    this.container.scrollTo?.(sl, st)
    this.target.style.zoom = `${scale}`
    this.target.style.transform = `translate(${tx}px,${ty}px)`
    // this.target.style.transform = `translate(${tx}px,${ty}px) scale(${tscale})`
    // this.target.style.fontSize = `${fscale}em`
    this.container.scrollTo?.(sl, st)

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
    let zoom = parseFloat(target.style.zoom)
    if (isFinite(zoom)) {
      scale = zoom
      return scale
    }
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
    let tx = 0
    let ty = 0
    const trMatch = target.style.transform.match(
      /translate\(([-\d\.]+)px,\s*([-\d\.]+)px\)/
    )
    if (trMatch) {
      tx = parseFloat(trMatch[1])
      ty = parseFloat(trMatch[2])
    }
    let mt = 0
    let ml = 0
    const mtMatch = target.style.marginTop.match(/([-\d\.]+)px/)
    if (mtMatch) {
      mt = parseFloat(mtMatch[1])
    }
    const mlMatch = target.style.marginLeft.match(/([-\d\.]+)px/)
    if (mlMatch) {
      ml = parseFloat(mlMatch[1])
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

  public get isPanning() {
    return this.panning
  }

  public get scale() {
    return this.panningScale
  }

  private async getScrollOffset(tx: number, ty: number) {
    if (PLATFORM == 'h5' || PLATFORM == 'next') {
      return [this.container.scrollLeft, this.container.scrollTop]
    }

    let sl = this.containerRect!.left + tx - this.targetRect!.left
    let st = this.containerRect!.top + ty - this.targetRect!.top

    sl = isFinite(sl) ? sl : 0
    st = isFinite(st) ? st : 0

    return [sl, st]
  }
}

export default ZoomController
