
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { Search } from './Search'
import './searchDrawer.scss'


type Props = {
    themeClass?: string
}

export function SearchDrawer({ themeClass }: Props) {

    return (
        <View
            className={classNames('search-drawer', themeClass)}
        >
            <Search
                themeClass={themeClass}
            />
        </View>
    )
}