import { useState } from 'react'
import { Button } from '../compat'
import { PersistentDrawer } from '../MenuDrawer'
import NavigationBar from "../NavigationBar"
import classNames from 'classnames/bind'

import styles from './menuHomeLayout.module.scss'

const cx = classNames.bind(styles)

type Props = React.PropsWithChildren<{
    themeClass?: string
}>

export function MenuHomeLayout({ children, themeClass, }: Props) {

    const [visible, setVisible] = useState(false)

    return (
        <div className={cx("menu-home-layout", themeClass)}>
            <NavigationBar>
                <div className={cx('nav-btn-wrapper')}>
                    <div
                        role="button"
                        className={cx("nav-btn")}
                        onClick={() => setVisible(!visible)}
                    >
                        <div className={cx('nav-icon', {
                            menu: !visible,
                            close: visible,
                        })} />
                    </div>
                </div>
            </NavigationBar>

            {children}

            <PersistentDrawer
                themeClass={themeClass}
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </div>
    )
}

export default MenuHomeLayout