import classNames from 'classnames/bind'
import { Search } from './Search'

import styles from './searchDrawer.module.scss'

const cx = classNames.bind(styles)

type Props = {
  themeClass?: string
}

export function SearchDrawer({ themeClass }: Props) {
  return (
    <div className={cx('search-drawer', themeClass)}>
      <Search themeClass={themeClass} />
    </div>
  )
}
