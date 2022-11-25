import P404 from '@/containers/404'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const NotFoundPage = () => {
    return <P404 />
}
export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default NotFoundPage
