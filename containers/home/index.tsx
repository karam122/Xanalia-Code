import Guides from './guides'
import Discover from './discover'
// import LaunchPad from './launch-pad'
import Snap from './snap'
// import CollectionRanking from './collection-ranking'
import TrendingNFT from './trending-nft'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoadingHomepage, showAnnouncement } from '@/store/app/selectors'
import Loading from '@/components/common/loading'
import { useEffect } from 'react'
import { resetLoadingHomepage, setShowAnnouncement } from '@/store/app/slice'
import LaunchPad from './launch-pad'
import HotCollections from './hot-collections'
import { Button, Modal } from 'react-bootstrap'

const Home = () => {
    const isLoading = useSelector(selectLoadingHomepage)
    const dispatch = useDispatch()

    const announcement = useSelector(showAnnouncement)

    useEffect(() => {
        return () => {
            dispatch(resetLoadingHomepage())
        }
    }, [])

    const hideAnnouncement = () => {
        dispatch(setShowAnnouncement(false))
    }
    return (
        <>
            {isLoading > 0 && (
                <div className="flex-center loading-homepage">
                    <Loading />
                </div>
            )}
            <div id="main-layout">
                {/* announcement pop up; to be removed soon from production */}
                <Modal show={announcement} className="announcment-modal">
                    <Modal.Body>
                        <div className="modal-body-inner">
                            <div className="alert-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="#6D75F3"
                                    className="bi bi-exclamation-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                </svg>
                            </div>

                            <h1 className="modal-title">ANNOUNCEMENT</h1>
                            <p>
                                We are currently undergoing a major update of
                                XANALIA and are in the process of migrating some
                                NFTs and collections. Due to this, there are
                                some cases where NFTs are displayed in xanalia
                                V1, but not in the Owned tab in xanalia V2.
                                <div className="inner-text">
                                    Old site：{' '}
                                    <a href="https://v1.xanalia.com/">
                                        v1.xanalia.com
                                    </a>{' '}
                                    （Xanalia V1）
                                    <br />
                                    New site：{' '}
                                    <a href="https://www.xanalia.com/">
                                        xanalia.com
                                    </a>{' '}
                                    （Xanalia V2）
                                </div>
                                Thank you for your patience, however, as this
                                will be resolved once the migration process is
                                complete.If you have any inquiries, you may
                                contact our customer support team, and we will
                                be happy to assist you.
                            </p>
                        </div>
                        <Button onClick={() => hideAnnouncement()}>OK</Button>
                    </Modal.Body>
                </Modal>

                <Snap />
                <br className="br-home-page" />
                <LaunchPad />
                <br className="br-home-page" />
                <HotCollections />
                {/* <br /> */}
                {/* <CollectionRanking /> */}
                <br className="br-home-page" />
                <TrendingNFT />
                <br className="br-home-page" />
                <Discover />

                <br className="br-home-page" />
                <Guides />
            </div>
        </>
    )
}

export default Home
