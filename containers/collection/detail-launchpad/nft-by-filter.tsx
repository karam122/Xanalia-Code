/* eslint-disable no-unused-vars */

import Loading from '@/components/common/loading'
import NFTCard from '@/components/common/nft-card'
import PaginationComponent from '@/components/ui/pagination/pagination-component'
import { FILTER_NFT_IN_COLLECTION } from '@/constants/filters'
import { nftGridClass } from '@/constants/nft'
import { useTransHook } from '@/locales/hooks'
import { selectGridValue } from '@/store/grid-view/selectors'
import { useAppDispatch } from '@/store/hooks'
import {
    changePage,
    clearNFTError,
    getAllNFTsByUserInCollection,
    getNFTFilterByCollection,
    getNFTsCollectionLaunchpad,
    resetNFTList,
} from '@/store/nft/listSlice'
import { selectNFTList } from '@/store/nft/selectors'
import { selectDataUser } from '@/store/user/selectors'
import { tuple } from '@/utils/tuples'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import GridFilter from './grid-filter'
import styles from './style.module.scss'

export const filterTypes = tuple(
    /*'on_sale', 'not_on_sale', 'owned',*/ 'gallery',
)
type FilterType = typeof filterTypes[number]
interface INFTByFilterType {
    filter: FilterType
}

const NFTByFilter = ({ filter }: INFTByFilterType) => {
    const grid = useSelector(selectGridValue)
    const { t } = useTransHook()
    const user = useSelector(selectDataUser)

    const {
        dataShow,
        isLoading,
        pageSizeMarketPlace,
        current,
        errorMessage,
        total,
    } = useSelector(selectNFTList)

    const router = useRouter()

    // const dataUser = useSelector(selectDataUser)
    // const userAddress = dataUser?.userWallet?.address

    const { launchpadId } = router.query

    const dispatch = useAppDispatch()

    useEffect(() => {
        // if (filter === 'owned') {
        //     const query = {
        //         page: 1,
        //         limit: pageSizeMarketPlace,
        //         networkName: networkName,
        //         contractAddress: collectionAddress,
        //         userAddress: userAddress,
        //         userId: user?.id,
        //     }
        //     dispatch(getAllNFTsByUserInCollection(query))
        // } else {
        const query = {
            page: 1,
            limit: pageSizeMarketPlace,
            launchpadId: launchpadId,
            userId: user?.id,
        }

        dispatch(getNFTsCollectionLaunchpad(query))
        // }

        return () => {
            dispatch(resetNFTList())
        }
    }, [filter])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(clearNFTError())
        }
    }, [errorMessage])

    const setPage = (i: number) => {
        // if (filter === 'owned') {
        //     const query = {
        //         page: i,
        //         limit: pageSizeMarketPlace,
        //         networkName: networkName,
        //         contractAddress: collectionAddress,
        //         userAddress: userAddress,
        //         userId: user?.id,
        //     }
        //     dispatch(getAllNFTsByUserInCollection(query))
        //     dispatch(changePage(i))
        // } else {
        const query = {
            page: i,
            limit: pageSizeMarketPlace,
            launchpadId: launchpadId,
            userId: user?.id,
        }

        dispatch(getNFTsCollectionLaunchpad(query))
        dispatch(changePage(i))
        // }
    }

    return (
        <Container fluid className={styles['nft-by-filter']}>
            <Row xs={2} md={4} lg={grid} className={nftGridClass}>
                {isLoading && (
                    <div className={styles['center-page']}>
                        <Loading />
                    </div>
                )}
                {!isLoading &&
                    dataShow &&
                    dataShow.length > 0 &&
                    dataShow.map((nft, index) => (
                        <Col key={index}>
                            <NFTCard data={nft} />
                        </Col>
                    ))}
                {!isLoading && dataShow && dataShow.length === 0 && (
                    <div className={`${styles['center-page']} heading--6`}>
                        {t('NO_DATA_FOUND')}
                    </div>
                )}
            </Row>
            {!isLoading && dataShow && dataShow.length > 0 && (
                <div className={styles['list-nft__pagination']}>
                    <PaginationComponent
                        total={total}
                        current={current}
                        pageSize={pageSizeMarketPlace}
                        onChange={setPage}
                    />
                </div>
            )}
            <GridFilter />
        </Container>
    )
}

export default NFTByFilter
