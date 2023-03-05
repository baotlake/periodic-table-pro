import classNames from 'classnames/bind'
import { Image, Button, previewImage } from '../compat'
import { staticUrl } from '../utils/utils'

import feedbackImg from '../assets/images/feedback.png'
import weappImg from '../assets/images/wxacode.jpg'
import officialAccountImg from '../assets/images/qrcode_for_oc.jpg'
import githubImg from '../assets/icons/github.svg'
import styles from './feedback.module.scss'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM

type Props = {
    themeClass?: string
}

export function Feedback({ themeClass }: Props) {

    const handlePreview = (current: string) => {
        previewImage({
            urls: [staticUrl(weappImg), staticUrl(officialAccountImg)],
            current: current || staticUrl(weappImg),
        })
    }

    return (
        <div className={cx('feedback', themeClass)}>
            <div className={cx('card')}>
                <div className={cx('top-container')}>
                    <Image className={cx('image')} src={feedbackImg} />
                    <div className={cx('text')}>
                        如果您在使用过程中发现了错误，或是您对我们有任何建议，您都可以在这里给我们提出反馈，我们非常愿意倾听您对「元素周期表PRO」的建议。
                    </div>
                </div>
                <div className={cx('bottom-container')}>
                    {['weapp', 'qq'].includes(PLATFORM) && (
                        <Button openType="feedback" type="primary" className={cx('button')}>
                            意见反馈
                        </Button>
                    )}
                    {['weapp'].includes(PLATFORM) && (
                        <Button openType="contact" type="default" className={cx("button")}>
                            联系客服
                        </Button>
                    )}
                    {['alipay'].includes(PLATFORM) && false}

                    {
                        PLATFORM == 'h5' || PLATFORM == 'next' && (
                            <div className={cx('contact-container')}>
                                <div
                                    className={cx("contact")}
                                    onClick={() => handlePreview(staticUrl(weappImg))}
                                >
                                    <Image className={cx("contact-img")} src={weappImg} />
                                    <div className={cx("contact-label")}>小程序</div>
                                </div>
                                <div
                                    className={cx("contact")}
                                    onClick={() => handlePreview(staticUrl(officialAccountImg))}
                                >
                                    <Image className={cx("contact-img")} src={officialAccountImg} />
                                    <div className={cx("contact-label")}>公众号</div>
                                </div>
                                <a className={cx("contact")} href="https://github.com/baotlake/periodic-table-pro" target="_blank">
                                    <Image className={cx("contact-img")} src={githubImg} />
                                    <div className={cx("contact-label")}>GitHub</div>
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Feedback
