import summary from './summary.json'
import { zhCNNames, symbol } from './elements'
import { elementsCategories } from './classification'


export function getElementsCyclopedia() {
    return symbol.map((v, i) => ({
        Z: i + 1,
        symbol: v,
        title: (zhCNNames[i] || v) + ' — ' + (i + 1) + '号元素',
        summary: summary[i + 1] /* dict */,
        category: elementsCategories[i],
    }))
}
