import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import DetailRankingPage from '@/containers/auction-ranking'

const AuctionRankingPage = () => {
    const { push } = useRouter()

    useEffect(() => {
        push('/auction-ranking')
    }, [])

    return (
        // <Layout title={'Auction Ranking Page'}>
        <DetailRankingPage />
        // </Layout>
    )
}
export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default AuctionRankingPage
