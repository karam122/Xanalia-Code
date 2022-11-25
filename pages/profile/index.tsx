import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default function ProfilePage() {
    return <></>
}
