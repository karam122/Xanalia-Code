import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import UpdateCollection from '@/containers/collection/update'

const CollectionUpdatePage = () => {
    return <UpdateCollection />
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default CollectionUpdatePage
