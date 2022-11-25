import React from 'react'
import Collection from '@/containers/collection/create'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CreateCollectionPage = () => {
    return <Collection />
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default CreateCollectionPage
