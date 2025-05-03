import classNames from 'classnames/bind'
import { Taro, Navigator, Image } from '../compat'
import { routes } from '../utils/routes'

import solubilityTableImg from '../assets/illus/solubility-table.jpg'
import wikiImg from '../assets/illus/wiki.jpg'
import deepReadingImg from '../assets/illus/deep-reading.png'
import styles from './tools.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM
const DEEP_READING_ORIGIN = process.env.DEEP_READING_ORIGIN

type Props = {
  className?: string
}

export function Tools({ className }: Props) {
  return (
    <div className={cx('tools', 'px-8 mt-8 sm:mt-0', className)}>
      <Navigator
        className="block mb-8 rounded-md overflow-hidden bg-card"
        href={routes.solubilityTable}
        url={routes.solubilityTable}
      >
        <Image
          className={cx('w-full aspect-video object-cover')}
          mode="aspectFit"
          src={solubilityTableImg}
        ></Image>
        <div className="text-xl px-4 pt-2 pb-4">溶解性表</div>
      </Navigator>

      <Navigator
        className="block mb-8 rounded-md overflow-hidden bg-card"
        href={routes.elementsCyclopedia}
        url={routes.elementsCyclopedia}
      >
        <Image
          className={cx('w-full aspect-video object-cover')}
          mode="aspectFit"
          src={wikiImg}
        ></Image>
        <div className="text-xl px-4 pt-2 pb-4">元素百科</div>
      </Navigator>

      {PLATFORM == 'next' && (
        <a
          className="block mb-8 rounded-md overflow-hidden bg-card"
          href={`${DEEP_READING_ORIGIN}/start`}
          target="_blank"
        >
          <Image
            className={cx('w-full aspect-video object-contain')}
            mode="aspectFit"
            src={deepReadingImg}
          />
          <div className="text-xl px-4 pt-2 pb-4">
            秒查词秒翻译，轻松阅读英语
          </div>
        </a>
      )}

      {/* <div className='section'>
            <Button style={{ marginRight: '10px' }} size='mini' openType='feedback'>反馈</Button>
            <Button style={{ marginRight: '10px' }} size='mini' openType='contact'>客服</Button>
            <Button style={{ marginRight: '10px' }} size='mini' openType='share'>分享</Button>
          </div> */}
    </div>
  )
}

export default Tools
