import { useTransHook } from '@/locales/hooks'
import Link from 'next/link'
import React from 'react'
import st from './style.module.scss'

const Page404 = () => {
    const { t } = useTransHook()

    return (
        <div className={st['page-404']}>
            <h1>{t('404')}</h1>
            <h5>{t('404_TITLE')}</h5>
            <p>{t('404_DESCRIPTION')}</p>
            <Link href="/">
                <a className="action-button">{t('BACK_TO_HOME')}</a>
            </Link>
        </div>
    )
}

export default Page404
