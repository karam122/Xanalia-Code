import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MyItemsContainer from '@/containers/my-items'

const NFTsListPage = () => {
    return <MyItemsContainer />
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default NFTsListPage
