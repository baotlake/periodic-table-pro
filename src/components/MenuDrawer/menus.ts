import messageIcon from '../../assets/icons/message.svg'
import ideaIcon from '../../assets/icons/idea.svg'
import likeIcon from '../../assets/icons/like.svg'
import wechatIcon from '../../assets/icons/wechat.svg'
import periodicTableIcon from '../../assets/icons/periodic-table.svg'
import toolsIcon from '../../assets/icons/tools.svg'
import settingIcon from '../../assets/icons/setting.svg'
import shopIcon from '../../assets/icons/shop.svg'

const menus = [
    {
        key: 'group-1',
        items: [
            {
                name: 'guide',
                icon: ideaIcon,
                label: '使用说明',
                route: '/pages/guide/index',
            },
            {
                name: 'feedback',
                icon: messageIcon,
                label: '意见反馈',
                route: '/pages/feedback/index',
            },
            {
                name: 'about',
                icon: periodicTableIcon,
                label: '关于',
                route: '/pages/about/index',
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
                route: '/pages/like/index',
            },
            {
                name: 'share',
                icon: wechatIcon,
                label: '转发',
                route: '',
            },
        ]
    },
    {
        key: 'group-3',
        items: [
            {
                name: 'tools',
                icon: toolsIcon,
                label: '工具栏',
                route: '/pages/tools/index',
            },
            {
                name: 'setting',
                icon: settingIcon,
                label: '设置',
                route: '/pages/setting/index',
            },
        ]
    }
]


export default menus