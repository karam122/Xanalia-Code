import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CreativeAwards2022 from '@/containers/creativeAwards/creative_x_award_2022'
import AwardHeader2022 from '@/containers/creativeAwards/creative_x_award_2022_header'

const Award2022 = () => {
    return (
        <>
            <AwardHeader2022 />
            <CreativeAwards2022 />
        </>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default Award2022
