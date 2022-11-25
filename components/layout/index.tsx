import Header from '@/components/layout/header'
import MainContent from '@/components/layout/main-content'
import Sidebar from '@/components/layout/sidebar'
import Head from 'next/head'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CommonProvider from './common-provider'

interface ILayout {
    children: ReactNode
}

const Layout = (props: ILayout) => {
    const { children } = props

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Header />
            <CommonProvider />
            <Sidebar />
            <MainContent content={children} />
            <ToastContainer position="bottom-right" />
        </>
    )
}

export default Layout
