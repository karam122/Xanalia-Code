import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProfileUser from '@/containers/profile'

const ProfileUserPage = () => {
    return <ProfileUser />
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default ProfileUserPage
