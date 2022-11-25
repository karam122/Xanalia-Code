import { ReactNode } from 'react'
import Footer from './footer'

interface IMainContent {
    content: ReactNode
}

const MainContent = ({ content }: IMainContent) => {
    return (
        <div id="main-content">
            {content}
            <Footer />
        </div>
    )
}

export default MainContent
