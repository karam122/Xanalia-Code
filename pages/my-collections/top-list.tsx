import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TopListPage from '@/containers/collection/top-list'

const CollectionPage = () => {
    return (
        //  <Layout title="This is ranking page">
        <TopListPage />
        //</Layout>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default CollectionPage
