import { zhCNNames, symbol } from './elements'
import { elementsCategories } from './classification'
import { summary } from './summary'
import type { WikiData } from '../types/wiki'


export function getElementsCyclopedia() {
    return symbol.map((v, i) => ({
        Z: i + 1,
        symbol: v,
        title: (zhCNNames[i] || v) + ' — ' + (i + 1) + '号元素',
        summary: summary[i + 1] /* dict */,
        category: elementsCategories[i],
    }))
}

export function getSkeletonWikiData(Z: number): WikiData {
    return {
        heading: zhCNNames[Z - 1],
        tagline: '',
        Z: Z + '',
        symbol: symbol[Z - 1],
        content: [
            {
                heading: '',
                content: [
                    {
                        type: 'p',
                        class: [],
                        html: summary[Z - 1] || '',
                    },
                ]
            }
        ],
        index: [],
        file_urls: [],
        files: [],
    }
}