import DetailNFT from '@/containers/nft/detail'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const DetailNFTPage = () => {
    return <DetailNFT />
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default DetailNFTPage
