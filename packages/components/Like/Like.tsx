import classNames from 'classnames/bind'
import { Image, Button, previewImage } from '../compat'
import styles from './like.module.scss'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM
const BUCKET_HOST = process.env.BUCKET_HOST

const host = BUCKET_HOST
const base =
    PLATFORM === 'alipay'
        ? host + '/alipay'
        : PLATFORM === 'qq'
            ? host + '/qq'
            : host

const posterImg = base + '/images/poster.png'

type Props = {
    themeClass?: string
}

export function Like({ themeClass }: Props) {

    const previewQR = () => {
        previewImage({
            current: posterImg,
            urls: [posterImg],
            showmenu: true,
        })
    }

    return (
        <div className={cx("like", themeClass)}>
            <div className={cx("text")}>
                喜欢我们的元素周期表PRO吗？请分享给您的朋友和同事吧！
            </div>
            <div className={cx("text")}>
                帮助我们让更多人发现元素周期表PRO。请分享给您的社交网络。
            </div>

            <div className={cx("qr-wrapper")}>
                <div className={cx("qr-block")}>
                    <Image
                        className={cx("qr")}
                        src={posterImg}
                        onClick={previewQR}
                        showMenuByLongpress
                    />
                </div>
            </div>
            <div className={cx("text")}>
                感谢您使用我们的元素周期表PRO。如果您认为它很棒，请在小程序给我们评个五星好评，让更多人看到它！
            </div>
            <div className={cx("text")}>
                {/* 分享转发「元素周期表Pro」给需要的人 */}
            </div>
            {/* <Button className={cx("share-button")} openType="share" type="primary">
                转发给朋友
            </Button> */}
        </div>
    )
}

export default Like
