import { View } from "@tarojs/components"
import classNames from "classnames"
import { mediumLongForm } from '../../data/table'
import { Categories, elementsCategories } from "../../data/classification"
import type { search } from '../../utils/search'

import './highlightTable.scss'

type ResultData = NonNullable<ReturnType<typeof search>>[0]

type Props = {
    highlight: ResultData[],
}

const { elements } = mediumLongForm

export function HighlightTable({ highlight }: Props) {

    const map = highlight.reduce((a, c) => ({ ...a, [c.Z]: c }), {} as Record<number, ResultData>)

    return (
        <View className={classNames("highlight-table")}>
            <View className={classNames("table")}>
                {
                    elements.map((Z, index) => {
                        if (!Z) return <View className="item empty" key={'empty-' + index} />
                        return (
                            <View
                                className={classNames("item element",
                                    [Categories[elementsCategories[Z - 1]]],
                                    {
                                        highlight: Z in map,
                                    })}
                                key={Z}
                            >
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}