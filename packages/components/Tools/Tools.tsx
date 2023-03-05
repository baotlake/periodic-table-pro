import classNames from 'classnames/bind'
import { Taro, Navigator, Image } from '../compat'
import { routes } from '../utils/routes'

import solubilitySvg from '../assets/illus/solubility.svg'
import wikiSvg from '../assets/illus/wiki.svg'
import deepReadingImg from '../assets/illus/deep-reading.png'
import styles from './tools.module.scss'

const PLATFORM = process.env.PLATFORM
const cx = classNames.bind(styles)

type Props = {
    themeClass?: string
}

export function Tools({ themeClass }: Props) {

    return (
        <div className={cx('tools', themeClass)}>
            <Navigator
                className={cx('item-box')}
                href={routes.solubilityTable}
                url={routes.solubilityTable}
            >
                <Image className={cx('illus')} mode="aspectFit" src={solubilitySvg}></Image>
                <div className={cx('title')}>溶解性表</div>
            </Navigator>

            <Navigator
                className={cx('item-box')}
                href={routes.elementsCyclopedia}
                url={routes.elementsCyclopedia}
            >
                <Image className={cx('illus')} mode="aspectFit" src={wikiSvg}></Image>
                <div className={cx('title')}>元素百科</div>
            </Navigator>

            {
                PLATFORM == 'next' && (
                    <a
                        className={cx("item-box")}
                        href="https://wrp.netlify.app/start"
                        target="_blank"
                    >
                        <Image className={cx('illus', 'cover')} mode="aspectFit" src={deepReadingImg} />
                        <div className={cx('title')}>秒查词秒翻译，轻松阅读英语</div>
                    </a>
                )
            }

            {/* <div className='section'>
            <Button style={{ marginRight: '10px' }} size='mini' openType='feedback'>反馈</Button>
            <Button style={{ marginRight: '10px' }} size='mini' openType='contact'>客服</Button>
            <Button style={{ marginRight: '10px' }} size='mini' openType='share'>分享</Button>
          </div> */}
        </div>
    )
}

export default Tools
