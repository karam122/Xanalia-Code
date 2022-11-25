import Home from '@/containers/home'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Script from 'next/script'

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>
                    XANALIA: Best NFT Marketplace for Metaverse | NFT Art for
                    Crypto
                </title>
            </Head>
            <Script
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-6HS1FPPYBL"
            />
            <Script id="google-analytics" strategy="lazyOnload">
                {`  window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-6HS1FPPYBL');
                    `}
            </Script>
            <Home />
        </>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default HomePage
