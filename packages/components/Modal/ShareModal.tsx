import classNames from 'classnames/bind'
import styles from './shareModal.module.scss'

const cx = classNames.bind(styles)

type Props = {
  visible: boolean
}

export default function ShareModal({ visible }: Props) {
  return (
    <div className={cx('')}>
      <div></div>
    </div>
  )
}
