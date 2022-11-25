import Twitter from '@/public/svgs/twitter-brands.svg'
import Telegram from '@/public/svgs/telegram.svg'
import Discord from '@/public/svgs/discord.svg'
import Medium from '@/public/svgs/medium.svg'
import Noborderz from '@/public/svgs/noborderz-icon.svg'
import LinkedIN from '@/public/svgs/linkedIN.svg'
import Contact from '@/public/svgs/contact.svg'
import Blog from '@/public/svgs/blog.svg'

export const footerLinks = [
    {
        label: 'TEAM',
        items: [
            {
                icon: <Noborderz />,
                label: 'NOBORDERZ_GROUP',
                href: 'https://www.noborderz.com/',
            },
            {
                icon: <Noborderz />,
                label: 'XANALIA_LIMITED',
                href: 'https://v1.xanalia.com/about',
            },
            {
                icon: <Twitter />,
                label: 'TWITTER',
                href: 'https://twitter.com/NOBORDER_z',
            },
            {
                icon: <LinkedIN />,
                label: 'LINKEDLN',
                href: 'https://www.linkedin.com/company/nobordersz',
            },

            {
                icon: <Contact />,
                label: 'CONTACT',
                href: 'https://www.noborderz.com/',
            },
        ],
    },
]

export const footerSiteMapArr = [
    {
        label: 'SITE_MAP',
        items: [
            {
                icon: '',
                label: 'HOME',
                href: '/',
            },
            {
                icon: '',
                label: 'MARKETPLACE',
                href: '/marketplace',
            },
            {
                icon: '',
                label: 'CREATE_NFT',
                href: '/create/nft',
                isLogin: true,
            },
            {
                icon: '',
                label: 'FAQ',
                href: 'https://site.xanalia.com/',
            },
            {
                icon: '',
                label: 'DOC',
                href: 'https://docs.xanalia.com/xanalia/',
            },
        ],
    },
]

export const footerSocialArr = [
    {
        label: 'SOCIAL',
        items: [
            {
                icon: <Twitter />,
                label: 'TWITTER',
                href: 'https://twitter.com/xanalia_nft',
            },
            {
                icon: <Telegram />,
                label: 'TELEGRAM',
                href: 'https://t.me/xana_english',
            },
            {
                icon: <Discord />,
                label: 'DISCORD',
                href: 'https://discord.com/invite/XANA',
            },
            {
                icon: <Medium />,
                label: 'MEDIUM',
                href: 'https://xanametaverse.medium.com/',
            },
            {
                icon: <Blog />,
                label: 'BLOG',
                href: 'https://web.xanalia.com/blog/',
            },
        ],
    },
]
