import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MyCollectionList from '@/containers/collection/collection-list'

const CollectionsListPage = () => {
    return (
        <>
            <MyCollectionList />
        </>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default CollectionsListPage
