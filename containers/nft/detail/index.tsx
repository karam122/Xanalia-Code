import Loading from '@/components/common/loading'
import NotFoundPage from '@/pages/404'
import { setPreviousRoute } from '@/store/app/slice'
import { useAppDispatch } from '@/store/hooks'
import { getNFTDetails } from '@/store/nft/detailSlice'
import {
    selectNFTDetails,
    selectNFTDetailsIsLoading,
} from '@/store/nft/selectors'
import { selectDataUser } from '@/store/user/selectors'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import BIDHistory from './bid-history'
import GeneralInformation from './general'
import MoreNFTs from './more-nfts/ more-nfts'
import NFTHeader from './nft-header'
import OfferList from './offer-list'
import styles from './style.module.scss'
import TradingHistory from './trading-history'

const DetailNFT = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { networkName, collectionAddress, nftTokenId } = router.query
    const user = useSelector(selectDataUser)

    const query = {
        networkName,
        collectionAddress,
        nftTokenId,
        userId: user?.id,
    }

    const nftDetails = useSelector(selectNFTDetails)

    const isLoading = useSelector(selectNFTDetailsIsLoading)

    useEffect(() => {
        dispatch(getNFTDetails(query))
    }, [router.query])

    useEffect(() => {
        return () => {
            dispatch(setPreviousRoute('nftDetails'))
        }
    }, [])

    return (
        <Container fluid className={styles['nft-detail-page']}>
            {isLoading ? (
                <div className={styles['center-page']}>
                    <Loading />
                </div>
            ) : nftDetails?.nftId ? (
                <div className={styles['detail-nft']}>
                    <div className={styles['detail-nft__item--1']}>
                        <NFTHeader />
                    </div>
                    <div className={styles['detail-nft__item--2']}>
                        <GeneralInformation />
                    </div>
                    <div className={styles['detail-nft__item--3']}>
                        <BIDHistory />
                    </div>
                    <div className={styles['detail-nft__item--4']}>
                        <OfferList />
                    </div>
                    <div className={styles['detail-nft__item--5']}>
                        <TradingHistory />
                    </div>
                    <div className={styles['detail-nft__item--6']}>
                        <MoreNFTs />
                    </div>
                </div>
            ) : (
                <NotFoundPage />
            )}
        </Container>
    )
}
export default DetailNFT
