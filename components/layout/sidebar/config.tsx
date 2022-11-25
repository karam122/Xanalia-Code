import Blog from '@/public/svgs/blog-sidebar.svg'
import Discord from '@/public/svgs/discord-sidebar.svg'
import AboutXANALIA from '@/public/svgs/icon-about-sidebar.svg'
// import Award from '@/public/svgs/icon-award-sidebar.svg'
import Collections from '@/public/svgs/icon-collections-sidebar.svg'
import Create from '@/public/svgs/icon-create-sidebar.svg'
import Home from '@/public/svgs/icon-home-sidebar.svg'
import ExploreNFTs from '@/public/svgs/icon-market-sidebar.svg'
import ProfileActive from '@/public/svgs/icon-profile-active.svg'
import Profile from '@/public/svgs/icon-profile.svg'
import Medium from '@/public/svgs/medium-sidebar.svg'
import Twitter from '../../../public/svgs/twitter-sidebar.svg'
// import Activity from '@/public/svgs/icon-activity-sidebar.svg'
// import Farm from '@/public/svgs/icon-farm-sidebar.svg'
// import Ranking from '@/public/svgs/icon-ranking.svg'
import AboutXanaActive from '@/public/svgs/icon-about-xanalia-active.svg'
// import AwardActive from '@/public/svgs/icon-award-active.svg'
import CollectionActive from '@/public/svgs/icon-collections-active.svg'
import CommunityActive from '@/public/svgs/icon-community-active.svg'
import Community from '@/public/svgs/icon-community-sidebar.svg'
import CreateActive from '@/public/svgs/icon-create-active.svg'
import Doc from '@/public/svgs/icon-doc-sidebar.svg'
import HomeActive from '@/public/svgs/icon-home-active.svg'
import MarketActive from '@/public/svgs/icon-marketplace-active.svg'
import MyItemActive from '@/public/svgs/icon-my-item-active.svg'
import MyItem from '@/public/svgs/icon-my-items.svg'
import StatisticActive from '@/public/svgs/icon-statistic-active.svg'
import Statistics from '@/public/svgs/icon-statistic.svg'
// import MyItemActive from '@/public/svgs/icon-my-item-active.svg'

export const itemsSidebar: Array<{
    icon: any
    iconActive?: any
    label: string
    href: string
    isOpenNewTab?: boolean
    isLogin?: boolean
    items?: Array<{
        icon?: any
        label: string
        href: string
        isOpenNewTab?: boolean
        isLogin?: boolean
    }>
}> = [
    {
        icon: <Home />,
        iconActive: <HomeActive />,
        label: 'HOME',
        href: '/',
    },
    {
        icon: <ExploreNFTs />,
        iconActive: <MarketActive />,
        label: 'MARKETPLACE',
        href: '/marketplace',
    },
    {
        icon: <Collections />,
        iconActive: <CollectionActive />,
        label: 'COLLECTIONS',
        href: '/collections',
    },
    // {
    //     icon: <Launchpad />,
    //     iconActive: <LaunchPadActive />,
    //     label: 'LAUNCHPAD',
    //     href: '/launchpad',
    // },
    {
        icon: <Create />,
        iconActive: <CreateActive />,
        label: 'CREATE',
        href: '/create',
        items: [
            {
                label: 'COLLECTION',
                href: '/create/collection',
                isLogin: true,
            },
            {
                label: 'NFT',
                href: '/create/nft',
                isLogin: true,
            },
        ],
    },
    {
        icon: <MyItem />,
        iconActive: <MyItemActive />,
        label: 'MY_ITEMS',
        href: '/my-items?tab=nft',
        isLogin: true,
    },
    {
        icon: <Profile />,
        iconActive: <ProfileActive />,
        label: 'MY_PROFILE',
        href: '/profile/account',
        isLogin: true,
    },
    // {
    //     icon: <Ranking />,
    //     label: 'MY_COLLECTIONS',
    //     href: '/my-collection',
    //     items: [
    //         {
    //             label: 'CREATE_COLLECTION',
    //             href: '/my-collections/create-collection',
    //         },
    //         {
    //             label: 'COLLECTIONS_LIST',
    //             href: '/my-collections/collections-list',
    //         },
    //     ],
    // },

    // {
    //     icon: <Award />,
    //     iconActive: <AwardActive />,
    //     label: 'AWARDS',
    //     href: '/award-1',
    // },
    {
        icon: <AboutXANALIA />,
        iconActive: <AboutXanaActive />,
        label: 'ABOUT_XANALIA',
        isOpenNewTab: true,
        href: 'https://v1.xanalia.com/about',
    },
    // {
    //     icon: <Activity />,
    //     label: 'ACTIVITY',
    //     href: '/activity',
    // },
    // {
    //     icon: <Farm />,
    //     label: 'Farm',
    //     href: '/farm',
    // },

    {
        icon: <Statistics />,
        iconActive: <StatisticActive />,
        label: 'STATISTICS',
        href: '/statistics',
        items: [
            {
                label: 'RANKING',
                href: '/statistics/ranking',
            },
            {
                label: 'ACTIVITY',
                href: '/statistics/activity',
            },
        ],
    },

    {
        icon: <Doc />,
        label: 'DOC',
        href: 'https://docs.xanalia.com/xanalia/',
        isOpenNewTab: true,
    },
]

export const communityArr: Array<{
    icon: any
    iconActive?: any
    label: string
    href: string
    isOpenNewTab?: boolean
    isLogin?: boolean
    items?: Array<{
        icon?: any
        label: string
        href: string
        isOpenNewTab?: boolean
        isLogin?: boolean
    }>
}> = [
    {
        icon: <Community />,
        iconActive: <CommunityActive />,
        label: 'COMMUNITY',
        href: '/community',
        items: [
            {
                icon: <Discord />,
                label: 'DISCORD',
                href: 'https://discord.com/invite/XANA',
                isOpenNewTab: true,
            },
            {
                icon: <Twitter />,
                label: 'TWITTER',
                href: 'https://twitter.com/xanalia_nft',
                isOpenNewTab: true,
            },
            {
                icon: <Medium />,
                label: 'MEDIUM',
                href: 'https://xanametaverse.medium.com/',
                isOpenNewTab: true,
            },
            {
                icon: <Blog />,
                label: 'BLOG',
                href: 'https://web.xanalia.com/blog/',
                isOpenNewTab: true,
            },
        ],
    },
]
