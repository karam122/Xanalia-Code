import Link from 'next/link'
import React from 'react'

import style from './style.module.scss'

interface INavPage {
    breadcrumbs: Array<{
        text: String
        href: String
    }>
    className?: String
}

const NavPage = ({ breadcrumbs, className }: INavPage) => {
    return (
        <div className={`${style['nav-page']} ${className}`}>
            <ul>
                {breadcrumbs.map((o, i) => (
                    <li key={i}>
                        <Link href={`${o.href}`}>{o.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavPage
