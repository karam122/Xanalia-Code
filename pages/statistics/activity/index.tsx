import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import DetailActivityPage from '@/containers/activity'

const ActivityPage = () => {
    const { push } = useRouter()

    useEffect(() => {
        push('/statistics/activity')
    }, [])

    return <DetailActivityPage />
}
export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default ActivityPage
