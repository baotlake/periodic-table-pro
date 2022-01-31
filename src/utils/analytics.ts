import Taro from '@tarojs/taro'


export function reportEvent(eventId: string, data: Taro.General.IAnyObject) {
    if (process.env.TARO_ENV === 'weapp') {
        Taro.reportAnalytics(eventId, data)
    }
}