import NFTCreateContainer from '@/containers/nft/create'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CreateNFTPage: NextPage = () => {
    return <NFTCreateContainer />
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export default CreateNFTPage
