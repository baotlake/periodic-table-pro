
import { CSSProperties, PropsWithChildren, useContext } from 'react'
import classNames from 'classnames/bind'
import NavigationHeader from "../NavigationBar/NavigationHeader"
import { PermanentDrawer } from '../MenuDrawer'
import { Context } from '../state'

import styles from './menuPageLayout.module.scss'

const cx = classNames.bind(styles)


type Props = PropsWithChildren<{
  themeClass?: string
  title?: string
}>

export function MenuPageLayout({ themeClass, children, title }: Props) {

  const { state: { menuButtonClientRect: menuRect } } = useContext(Context)

  return (
    <div>
      <NavigationHeader
        themeClass={themeClass}
        title={title}
      />
      <div
        className={cx('layout', themeClass)}
        style={{
          '--margin-left': menuRect.windowWidth - menuRect.right + 'px',
          '--margin-top': menuRect.bottom + 8 + 'px'
        } as CSSProperties}
      >
        <PermanentDrawer className={cx('layout-drawer')} themeClass={themeClass} />
        <div className={cx('layout-main')}>
          <div className={cx('layout-content', themeClass)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuPageLayout