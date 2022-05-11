import Taro from '@tarojs/taro'


export function reportEvent(eventId: string, data: TaroGeneral.IAnyObject) {
    if (process.env.TARO_ENV === 'weapp') {
        Taro.reportEvent(eventId, data)
        // Taro.reportAnalytics(eventId, data)
    }
}