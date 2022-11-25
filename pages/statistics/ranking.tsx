import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TopListPage from '@/containers/collection/top-list'

const RankingPage = () => {
    return <TopListPage />
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default RankingPage
