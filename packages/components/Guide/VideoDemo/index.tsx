import { Video } from '../../compat'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

type Props = {
  src: string
  ratio?: number
}

export function VideoDemo({ src, ratio = 16 / 9 }: Props) {
  return (
    <div
      className={cx('video-demo')}
      style={{
        paddingBottom: (1 / ratio) * 100 + '%',
      }}
    >
      <div className={cx('container')}>
        <Video
          loop={true}
          muted={true}
          autoPlay={true}
          autoplay={true}
          src={src}
          controls={false}
          showPlayBtn={false}
          showProgress={false}
          showCenterPlayBtn={false}
          showFullscreenBtn={false}
          autoPauseIfNavigate={false}
          autoPauseIfOpenNative={false}
          enableProgressGesture={false}
        />
      </div>
    </div>
  )
}
