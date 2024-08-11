import { Image, Button, Taro, Navigator } from '../compat'
import classNames from 'classnames/bind'
import menus from './menus'
import logoImg from '../assets/images/logo.png'
import styles from './persistentDrawer.module.scss'
import { STATIC_BASE } from '../config'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM

const backgroundImg = STATIC_BASE + '/img/ui/background.jpg'

type Props = {
  className?: string
  visible: boolean
  onClose?: () => void
}

export default function PersistentDrawer({
  className,
  visible,
  onClose,
}: Props) {
  const handleShare = () => {
    if (PLATFORM === 'next') {
      try {
        navigator?.share({
          url: location.href,
          title: document.title,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
  return (
    <div
      className={cx(
        'menu-drawer-wrapper',
        'fixed w-screen h-screen top-0 left-0 transition z-[99] transform-gpu',
        visible ? 'translate-x-0' : '-translate-x-full',
        className
      )}
    >
      <div
        className={cx(
          'backdrop',
          ' absolute h-full bg-black/30 z-[-1] transition-opacity',
          visible ? 'opacity-100 w-[200%] ' : 'opacity-0 w-full delay-300'
        )}
        onClick={onClose}
      />
      <div
        className={cx(
          'menu-drawer',
          'bg-bg-soft w-[260px] h-full overflow-x-hidden overflow-y-auto'
        )}
      >
        <div className="relative w-full h-[280px] max-h-[50vh]">
          <Image
            className={cx('background-image', 'w-full h-full')}
            mode="aspectFill"
            src={backgroundImg}
          />
          <div className="absolute bottom-0">
            <div className="flex items-center py-2.5 px-8">
              <Image
                className="size-10 rounded-full overflow-hidden me-2.5"
                src={logoImg}
              />
              <span className="text-xl font-bold truncate text-nowrap text-black/80">
                元素周期表PRO
              </span>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className={cx('menu-container', 'text-base')}>
          {menus.map((group) => (
            <div key={group.key} className="*:mt-px *:py-4 *:px-8 *:relative">
              {group.items.map((item) => {
                if (item.name === 'shop') {
                  if (PLATFORM !== 'weapp') return
                  return (
                    <div
                      key={item.name}
                      className={cx('menu-item')}
                      onClick={() =>
                        Taro.navigateToMiniProgram({ appId: item.route })
                      }
                    >
                      <Image className="size-[22px] me-3" src={item.icon} />
                      <span className="text-lg leading-5">{item.label}</span>
                    </div>
                  )
                }

                if (item.name === 'share') {
                  return (
                    <div
                      key={item.name}
                      className={cx('menu-item')}
                      onClick={handleShare}
                    >
                      <Image
                        className={cx('icon', 'size-[22px] me-3')}
                        src={item.icon}
                      ></Image>
                      <span className="text-lg leading-5">{item.label}</span>
                      <Button
                        className="absolute inset-0 w-full h-full border-none outline-none opacity-0 box-border"
                        openType="share"
                      />
                    </div>
                  )
                }

                return (
                  <Navigator
                    key={item.name}
                    className={cx('menu-item')}
                    url={item.route}
                    href={item.route}
                  >
                    <Image
                      className={cx('icon', 'size-[22px] me-3')}
                      src={item.icon}
                    ></Image>
                    <span className="text-lg leading-5">{item.label}</span>
                  </Navigator>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
