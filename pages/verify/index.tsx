import AcceptEmailVerify from '@/containers/verify/email-verify/index'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function VerifyPage() {
    return <AcceptEmailVerify />
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})
