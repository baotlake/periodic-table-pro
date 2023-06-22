// import { View } from "@tarojs/components"
import classNames from 'classnames/bind'
import useAddGuide from './useAddGuide'
import styles from './index.module.scss'
import { useRecoilState } from 'recoil'
import { menuButtonClientRect } from '../../recoil/atom'

const cx = classNames.bind(styles)

type Props = {
    themeClass?: string
}

export function AddGuide({ themeClass }: Props) {
    const [rect] = useRecoilState(menuButtonClientRect)
    const [visible, handleClose] = useAddGuide()

    return (
        <>
            {visible && (
                <div
                    className={cx('add-guide', themeClass)}
                    style={{
                        top: rect.top + rect.height + 8 + 'px',
                        left: rect.left + rect.width / 4 + 'px',
                    }}
                >
                    <div className={cx('box')}>
                        <div className={cx('arrow')} />
                        <div>“添加”后使用更方便！</div>
                        <div className={cx('close')} onClick={handleClose} />
                    </div>
                </div>
            )}
        </>
    )
}
