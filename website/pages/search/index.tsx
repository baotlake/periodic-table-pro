import Head from 'next/head'
import { NavigationHeader, Search } from '@periodic-table-pro/components'
import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export default function SearchPage() {
  const [themeMode] = useAtom(themeModeState)
  const router = useRouter()

  return (
    <>
      <Head>
        <title>搜索 - 元素周期表PRO 高颜值化学必备小工具</title>
      </Head>
      <div className={cx('search-page', themeMode)}>
        <NavigationHeader title="搜索" themeClass={themeMode} />
        <Search
          themeClass={themeMode}
          onSearchChange={(v) => router.replace({ search: '?q=' + v })}
        />
      </div>
    </>
  )
}
