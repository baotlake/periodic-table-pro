import { Image, Switch } from '../compat'
import classNames from "classnames/bind"

import arrowImg from '../assets/icons/dropdown-arrow.svg'
import styles from './settingItem.module.scss'

const cx = classNames.bind(styles)

type Props<T = string | boolean | null> = {
    themeClass?: string
    icon: string
    title: string
    value?: T
    onChange?: (value: T) => void
    onClick?: () => void
    children?: React.ReactNode
}

export function SettingItem({ themeClass, icon, title, value, children, onChange, onClick }: Props) {

    return (
        <div className={cx('setting-item', themeClass)} onClick={onClick}>
            <div className={cx('title-container')}>
                <Image className={cx('icon')} src={icon} />
                <span className={cx('title')}>{title}</span>
            </div>
            <div className={cx('value-container')}>
                {
                    typeof value === 'boolean' ? (
                        <Switch
                            className={cx('switch')}
                            checked={value}
                            onChange={(e) => onChange && onChange(e.detail.value)}
                        />
                    ) : typeof value === 'string' ? (
                        <>
                            {value}
                            <Image className={cx('icon', 'arrow')} src={arrowImg} />
                        </>
                    ) : false
                }
                {children}
            </div>
        </div>
    )
}

export default SettingItem
