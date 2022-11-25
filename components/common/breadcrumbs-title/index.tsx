import { useTransHook } from '@/locales/hooks'
import Link from 'next/link'
import React from 'react'

import style from './style.module.scss'

interface IBreadcrumbsTitle {
    title: string
    breadcrumbs: Array<{
        text: string
        href?: string
    }>
    className?: string
}

const BreadcrumbsTitle = ({
    title,
    breadcrumbs,
    className,
}: IBreadcrumbsTitle) => {
    const { t } = useTransHook()
    return (
        <div
            className={`${style['breadcrumbs-title']} ${
                className ? className : ''
            }`}
        >
            <h3 className={`${style['breadcrumbs-title__title']} heading--3-1`}>
                {t(title)}
            </h3>
            <div
                className={`${style['breadcrumbs-title__tags']} text-body--small bold`}
            >
                {breadcrumbs.map((o, i) =>
                    o.href ? (
                        <Link key={i} href={`${o.href}`}>
                            {t(o.text)}
                        </Link>
                    ) : (
                        <a key={i}>{t(o.text)}</a>
                    ),
                )}
            </div>
        </div>
    )
}

export default BreadcrumbsTitle
