import Marketplace from '@/containers/marketplace'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const MarketplacePage: NextPage = () => {
    return (
        //<Layout title="This is market page">
        <Marketplace />
        //</Layout>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default MarketplacePage
