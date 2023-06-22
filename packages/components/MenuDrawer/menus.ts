import { routes } from '../utils/routes'
// import ideaIcon from '../assets/icons/idea.svg'
import ideaIcon from '../assets/icons/tips_and_updates.svg'
// import messageIcon from '../assets/icons/message.svg'
import messageIcon from '../assets/icons/chat_bubble.svg'
// import likeIcon from '../assets/icons/like.svg'
import likeIcon from '../assets/icons/like_outlined.svg'
// import wechatIcon from '../assets/icons/wechat.svg'
import shareIcon from '../assets/icons/share.svg'
import periodicTableIcon from '../assets/icons/periodic-table.svg'
import toolsIcon from '../assets/icons/tools.svg'
import settingIcon from '../assets/icons/setting.svg'
import shopIcon from '../assets/icons/shop.svg'
import buildSvg from '../assets/icons/build.svg'
import tuneSvg from '../assets/icons/tune.svg'


const menus = [
    {
        key: 'group-1',
        items: [
            {
                name: 'tools',
                icon: buildSvg,
                label: '工具栏',
                route: routes.tools,
            },
            {
                name: 'setting',
                icon: tuneSvg,
                label: '设置',
                route: routes.setting,
            },
        ]
    },
    {
        key: 'group-2',
        items: [
            {
                name: 'shop',
                icon: shopIcon,
                label: '小商店',
                route: 'wxaa73fa1b66d6f879',
            },
            {
                name: 'like',
                icon: likeIcon,
                label: '喜欢',
                route: routes.like,
            },
            {
                name: 'share',
                icon: shareIcon,
                label: '转发',
                route: '',
            },
        ]
    },
    {
        key: 'group-3',
        items: [
            {
                name: 'guide',
                icon: ideaIcon,
                label: '使用技巧',
                route: routes.guide,
            },
            {
                name: 'feedback',
                icon: messageIcon,
                label: '意见反馈',
                route: routes.feedback,
            },
            {
                name: 'about',
                icon: periodicTableIcon,
                label: '关于',
                route: routes.about,
            },
        ]
    },
]


export default menus