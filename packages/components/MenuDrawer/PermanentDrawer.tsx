import { Image, Button, Taro, Navigator } from '../compat'
import classNames from 'classnames/bind'
import menus from './menus'

import styles from './permanentDrawer.module.scss'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM

type Props = {
    className?: string
    themeClass?: string
}

export function MenuPageDrawer({ className, themeClass }: Props) {

    return (
        <div className={cx('menu-page-drawer', className, themeClass)}>
            {
                menus.map((group) => (
                    <div key={group.key} className={cx('group')}>
                        {
                            group.items.map((item) => {
                                if (item.name == 'shop') {
                                    if (PLATFORM !== 'weapp') return
                                    return <div
                                        className={cx('item')}
                                        key={item.name}
                                        onClick={() => Taro.navigateToMiniProgram({ appId: item.route })}
                                    >
                                        <Image className={cx('icon', 'shop')} src={item.icon} />
                                        <span className={cx('title')}>{item.label}</span>
                                    </div>
                                }
                                if (item.name === 'share') {
                                    if (PLATFORM == 'h5' || PLATFORM == 'next') return
                                    return <div
                                        className={cx('item')}
                                        key={item.name}
                                        onClick={() => Taro.showShareMenu({
                                            menus: ['shareAppMessage', 'shareTimeline']
                                        } as any)}
                                    >
                                        <Image className={cx('icon')} src={item.icon} />
                                        <span className={cx('title')}>{item.label}</span>
                                        <Button className={cx('wx-open-type-button')} openType='share' />
                                    </div>
                                }
                                return (
                                    <Navigator
                                        className={cx('item')}
                                        key={item.name}
                                        href={item.route}
                                        url={item.route}
                                        openType='redirect'
                                        replace
                                    >
                                        <Image className={cx('icon')} src={item.icon} />
                                        <span className={cx('title')}>{item.label}</span>
                                    </Navigator>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default MenuPageDrawer
