import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Awards2021 from '@/containers/awards2021/awards2021'

const Award2021 = () => {
    return (
        <>
            <Awards2021 />
        </>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default Award2021
