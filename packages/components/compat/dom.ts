// 小程序不能同步获取元素尺寸
export async function getBoundingClientRect(element: Element) {
  return element?.getBoundingClientRect()
}
