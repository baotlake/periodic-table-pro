import classNames from 'classnames/bind'
import { Button } from '../compat'
import { VideoDemo } from './VideoDemo'
import styles from './guide.module.scss'
import { STATIC_BASE } from '../config'

const cx = classNames.bind(styles)

const videosPath = STATIC_BASE + '/videos/'

export function Guide() {

    return (
        <div className={cx('guide')}>
            <div className={cx('paragraph')}>
                新版「元素周期表PRO」来啦！
            </div>
            <div className={cx('paragraph')}>
                全新的设计，更好的屏幕适配，手机、平板iPad和桌面(Windows、Mac)都有更好的使用体验！
            </div>

            <div className={cx('paragraph')}>
                <span>1.切换元素中央的属性</span>
                <VideoDemo src={videosPath + 'emphasize_guide.mp4'} ratio={600 / 440} />
            </div>
            <div className={cx('paragraph')}>
                <span>2.切换元素底部的属性</span>
                <VideoDemo src={videosPath + 'properties_guide.mp4'} ratio={720 / 932} />
            </div>
            <div className={cx('paragraph')}>
                <span>3.切换元素颜色标识</span>
                <VideoDemo src={videosPath + 'color_guide.mp4'} ratio={960 / 1000} />
            </div>

            <div className={cx('paragraph')}>
            感谢您使用我们的元素周期表工具APP。如果您认为它很棒，请在小程序给我们评个五星好评，让更多人看到它！
            </div>
        </div>
    )
}

export default Guide
