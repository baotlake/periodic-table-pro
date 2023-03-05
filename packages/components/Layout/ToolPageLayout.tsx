import { useContext, PropsWithChildren } from 'react'
import classnames from 'classnames/bind'
import { Context } from '../state'
import { NavigationHeader } from "../NavigationBar"

import styles from './toolPageLayout.module.scss'

const cx = classnames.bind(styles)

type Props = PropsWithChildren<{
    title: string
}>

export function ToolPageLayout({ title, children }: Props) {

    const { state: { menuButtonClientRect: rect, theme: { mode: themeMode } } } = useContext(Context)

    return (
        <div
            className={cx('layout', themeMode)}
            style={{
                paddingTop: rect.bottom + 8 + 'px',
            }}
        >
            <NavigationHeader
                background
                themeClass={themeMode}
                title={title}
            />

            {children}
        </div>
    )
}