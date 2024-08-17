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
  visible: boolean
  onClose?: () => void
}

export default function PersistentDrawer({ visible, onClose }: Props) {
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
        'fixed w-screen h-0 top-0 left-0 z-50'
      )}
    >
      <div
        className={cx(
          'backdrop',
          'absolute w-full h-screen -z-10 transition-none transition-opacity',
          visible ? 'opacity-100' : 'opacity-0 hidden'
        )}
        onClick={onClose}
      />
      <div
        className={cx(
          'menu-drawer',
          'transition max-w-full h-screen w-64',
          'bg-bg-soft overflow-x-hidden overflow-y-auto',
          { visible }
        )}
      >
        <div className="relative w-full h-72">
          <Image
            className={cx('background-image', 'w-full h-full object-cover')}
            mode="aspectFill"
            src={backgroundImg}
          />
          <div className="absolute bottom-0">
            <div className="flex items-center py-3 px-8">
              <Image
                className="size-10 rounded-full overflow-hidden me-3"
                src={logoImg}
              />
              <span className="text-xl font-bold truncate text-nowrap text-black/80">
                元素周期表PRO
              </span>
            </div>
          </div>
        </div>
        <div className={cx('menu-container', 'text-base')}>
          {menus.map((group) => (
            <div key={group.key}>
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
                      <Image className="size-5 me-3" src={item.icon} />
                      <span className="text-base leading-5">{item.label}</span>
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
                        className={cx('icon', 'size-5 me-3')}
                        src={item.icon}
                      ></Image>
                      <span className="text-base leading-5">{item.label}</span>
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
                      className={cx('icon', 'size-5 me-3')}
                      src={item.icon}
                    ></Image>
                    <span className="text-base leading-5">{item.label}</span>
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
