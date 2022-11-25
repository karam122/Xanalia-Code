import ExploreCollections from '@/containers/explore-collections'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ExploreCollectionsPage: NextPage = () => {
    return (
        //<Layout title="This is market page">
        <ExploreCollections />
        //</Layout>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default ExploreCollectionsPage
