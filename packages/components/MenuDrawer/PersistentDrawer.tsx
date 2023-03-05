import { Image, Button, Taro, Navigator } from '../compat'
import classNames from 'classnames/bind'
import menus from './menus'
import logoImg from '../assets/images/logo.png'
import styles from './persistentDrawer.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM
const BUCKET_HOST = process.env.BUCKET_HOST

const host = BUCKET_HOST
const backgroundImg = host + '/images/background.jpg'

type Props = {
  themeClass?: string
  visible: boolean
  onClose?: () => void
}

export default function PersistentDrawer({
  themeClass,
  visible,
  onClose,
}: Props) {
  return (
    <div
      className={cx('menu-drawer-wrapper', { visible: visible }, themeClass)}
    >
      <div className={cx('backdrop')} onClick={onClose} />
      <div className={cx('menu-drawer')}>
        <div className={cx('profile-container')}>
          <Image
            className={cx('background-image')}
            mode="aspectFill"
            src={backgroundImg}
          />
          <div className={cx('profile')}>
            <div className={cx('user')}>
              <Image className={cx('avatar')} src={logoImg} />
              <span className={cx('nickname')}>元素周期表PRO</span>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className={cx('menu-container')}>
          {menus.map((group) => (
            <div key={group.key} className={cx('group')}>
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
                      <Image className={cx('icon', 'shop')} src={item.icon} />
                      <span className={cx('label')}>{item.label}</span>
                    </div>
                  )
                }

                if (item.name === 'share') {
                  return (
                    <div
                      key={item.name}
                      className={cx('menu-item')}
                    // onClick={() => handleClickItem(item)}
                    >
                      <Image className={cx('icon')} src={item.icon}></Image>
                      <span className={cx('label')}>{item.label}</span>
                      <Button
                        className={cx('wx-open-type-button')}
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
                    <Image className={cx('icon')} src={item.icon}></Image>
                    <span className={cx('label')}>{item.label}</span>
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
