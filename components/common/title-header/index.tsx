import Link from 'next/link'
import React, { ReactNode } from 'react'
import { useTransHook } from '@/locales/hooks'
import SVGArrow from '@/public/svgs/long-arrow-alt-right.svg'
import style from './style.module.scss'

interface ITitleHeader {
    title: string
    viewAll?: string | boolean
    link?: string
    childNodeLeft?: ReactNode
    childNodeRight?: ReactNode
}

const TitleHeader: React.FC<
    ITitleHeader & React.HTMLAttributes<HTMLDivElement>
> = ({ title, viewAll, link, childNodeLeft, childNodeRight, ...rest }) => {
    const { t } = useTransHook()

    return (
        <div className={`${rest.className} ${style['title-header']}`} {...rest}>
            <div className={style['title-header__left']}>
                <h4 className={'heading--4'}>{title}</h4>
                {childNodeLeft}
            </div>
            <div className={style['title-header__right']}>
                {childNodeRight}
                {viewAll && link && (
                    <Link href={link}>
                        <a
                            className={`${style['title-header__right__view-all']} text-body--large bold`}
                        >
                            <span>
                                {viewAll === true ? t('VIEW_ALL') : viewAll}
                            </span>
                            <SVGArrow />
                        </a>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default TitleHeader
