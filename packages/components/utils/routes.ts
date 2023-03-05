import { isTaro } from "../compat"
import { symbol } from "@periodic-table-pro/data"

export const weappRoutes = {
    home: '/pages/index/index',
    detail: '/pages/detail/index',
    wiki: '/pages/wiki/index',
    search: '/pages/search/index',
    tools: '/pages/tools/index',
    setting: '/pages/setting/index',
    like: '/pages/like/index',
    guide: '/pages/guide/index',
    feedback: '/pages/feedback/index',
    about: '/pages/about/index',
    solubilityTable: '/pages/solubility-table/index',
    elementsCyclopedia: '/pages/elements-cyclopedia/index',
}

export const webRoutes = {
    home: '/',
    detail: '/element',
    wiki: '/wiki',
    search: '/search',
    tools: '/tools',
    setting: '/setting',
    like: '/like',
    guide: '/guide',
    feedback: '/feedback',
    about: '/about',
    solubilityTable: '/solubility-table',
    elementsCyclopedia: '/elements-cyclopedia',
}

export const routes = isTaro ? weappRoutes : webRoutes

export function getDetailPath(Z: number, weapp = isTaro) {

    if (weapp) {
        return routes.detail + '?Z=' + Z
    }

    return routes.detail + '/' + symbol[Z - 1]
}

export function getWikiPath(Z: number, weapp = isTaro) {
    if (weapp) {
        return routes.wiki + '?Z=' + Z
    }

    return routes.wiki + '/' + symbol[Z - 1]
}

export function weappPath2Web(path: string) {
    const url = new URL(path, 'http://periodic-table-pro.netlify.app')
    let name: keyof typeof routes = 'home'
    let Z = parseInt(url.searchParams.get('Z') || '1')
    if (!isFinite(Z)) Z = 1

    for (let [k, v] of Object.entries(weappRoutes)) {
        if (url.pathname.startsWith(v)) {
            name = k as keyof typeof routes
            break
        }
    }

    switch (name) {
        case 'detail':
            return getDetailPath(Z, false)
        case 'wiki':
            return getWikiPath(Z, false)
        default:
            return webRoutes[name]
    }
}