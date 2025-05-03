import { Metadata } from 'next'
import { NavigationHeader } from '@periodic-table-pro/components'
import classNames from 'classnames/bind'
import SearchPage from '@/components/SearchPage'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '搜索 - 元素周期表PRO 高颜值化学必备小工具',
  }
}

export default function Page() {
  return (
    <div className={cx('min-h-screen min-h-svh')}>
      <NavigationHeader title="搜索" />
      <SearchPage />
    </div>
  )
}
