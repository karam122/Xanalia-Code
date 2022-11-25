import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/app.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { persistor, store } from '@/store'
import { SSRProvider } from 'react-bootstrap'
import { ReactElement, useEffect } from 'react'
import type { NextPage } from 'next'
import Layout from '@/components/layout'
import { Provider } from 'react-redux'
import { MoralisProvider } from 'react-moralis'
import { PersistGate } from 'redux-persist/integration/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CrispChat from '@/components/common/crisp-chat/crispChat'
import Link from 'next/link'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => typeof page
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const moralisServer = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL || ''
const moralisID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID || ''

const maintainMode = process.env.NEXT_PUBLIC_MAINTAIN
    ? Number(process.env.NEXT_PUBLIC_MAINTAIN)
    : 0
const maintainMessage = process.env.NEXT_PUBLIC_MESSAGE
const maintainTitle = process.env.NEXT_PUBLIC_TITLE
const maintainHeading = process.env.NEXT_PUBLIC_HEADING
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    const router = useRouter()

    // Crisp chat Function
    useEffect(() => {
        const path = router.pathname
        if (path !== '/marketplace') {
            localStorage.removeItem('previous-route')
            localStorage.removeItem('selectedNftId')
        }
    }, [router])

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width  initial-scale=1, maximum-scale=1 , height=device-height, initial-scale=1.0, user-scalable=no,user-scalable=0;"
                />
                <meta
                    name="description"
                    content="The Best Decentralized NFTs Marketplace for Metaverse on BSC + Polygon. Easy to Create, Trade, Collect for every NFT Collectors and NFT Artists."
                />
                <meta name="keywords" content="nft, xanalia" />
                <title>
                    XANALIA : Best NFT Marketplace for Metaverse | NFT Art for
                    Crypto
                </title>
            </Head>
            {maintainMode ? (
                <div className="maintain-page">
                    <h1>{maintainTitle}</h1>
                    <h2>{maintainHeading}</h2>
                    <p>{maintainMessage}</p>
                    <Link href="https://v1.xanalia.com/" passHref>
                        <button className="btn-primary">Go to version 1</button>
                    </Link>
                </div>
            ) : (
                <>
                    <CrispChat />
                    <MoralisProvider
                        serverUrl={moralisServer}
                        appId={moralisID}
                    >
                        <Provider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                <SSRProvider>
                                    {router.pathname ===
                                        '/xanalia_nftart_award_2021' ||
                                    router.pathname ===
                                        '/creative_x_award_2022' ? (
                                        <Component {...pageProps} />
                                    ) : (
                                        getLayout(<Component {...pageProps} />)
                                    )}
                                    {/* {getLayout(<Component {...pageProps} />)} */}
                                </SSRProvider>
                            </PersistGate>
                        </Provider>
                    </MoralisProvider>
                </>
            )}
        </>
    )
}

export default appWithTranslation(MyApp)
