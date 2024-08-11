import Taro from '../compat/Taro'
const PLATFORM = process.env.PLATFORM

export function reportEvent(eventId: string, data: TaroGeneral.IAnyObject) {
  if (PLATFORM === 'weapp') {
    Taro.reportEvent?.(eventId, data)
    // Taro.reportAnalytics(eventId, data)
  }
}
