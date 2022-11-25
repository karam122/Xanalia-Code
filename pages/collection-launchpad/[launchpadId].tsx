import React from 'react'
import CollectionDetail from '@/containers/collection/detail-launchpad'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CollectionDetailPage = () => {
    return <CollectionDetail />
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default CollectionDetailPage
