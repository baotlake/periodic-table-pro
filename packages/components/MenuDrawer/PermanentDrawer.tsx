import { Image, Button, Taro, Navigator } from '../compat'
import classNames from 'classnames/bind'
import menus from './menus'

import styles from './permanentDrawer.module.scss'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM

type Props = {
  className?: string
}

export function MenuPageDrawer({ className }: Props) {
  return (
    <div
      className={cx(
        'menu-page-drawer',
        'w-72 p-5 overflow-auto border-e border-solid border-border',
        className
      )}
    >
      {menus.map((group) => (
        <div key={group.key} className="overflow-hidden mb-5 rounded-md">
          {group.items.map((item) => {
            if (item.name == 'shop') {
              if (PLATFORM !== 'weapp') return
              return (
                <div
                  className={cx('item', 'bg-card')}
                  key={item.name}
                  onClick={() =>
                    Taro.navigateToMiniProgram({ appId: item.route })
                  }
                >
                  <Image
                    className={cx('size-5 me-3', 'shop')}
                    src={item.icon}
                  />
                  <span className="text-lg">{item.label}</span>
                </div>
              )
            }
            if (item.name === 'share') {
              if (PLATFORM == 'h5' || PLATFORM == 'next') return
              return (
                <div
                  className={cx('item', 'bg-card')}
                  key={item.name}
                  onClick={() =>
                    Taro.showShareMenu({
                      menus: ['shareAppMessage', 'shareTimeline'],
                    } as any)
                  }
                >
                  <Image
                    className={cx('icon', 'size-5 me-3')}
                    src={item.icon}
                  />
                  <span className="text-lg">{item.label}</span>
                  <Button
                    openType="share"
                    className="absolute inset-0 m-0 p-0 border-none outline-none w-full h-full opacity-0 box-border"
                  />
                </div>
              )
            }
            return (
              <Navigator
                className={cx('item', 'bg-card')}
                key={item.name}
                href={item.route}
                url={item.route}
                openType="redirect"
                replace
              >
                <Image className={cx('icon', 'size-5 me-3')} src={item.icon} />
                <span className="text-lg">{item.label}</span>
              </Navigator>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default MenuPageDrawer
