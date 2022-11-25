/* eslint-disable no-unused-vars */

import Loading from '@/components/common/loading'
import NFTCard from '@/components/common/nft-card'
import PaginationComponent from '@/components/ui/pagination/pagination-component'
import { NFT_BY_USER } from '@/constants/filters'
import { nftGridClass } from '@/constants/nft'
import { useTransHook } from '@/locales/hooks'
import { selectGridValue } from '@/store/grid-view/selectors'
import { useAppDispatch } from '@/store/hooks'
import {
    changePage,
    clearNFTError,
    getAllNFTsByUser,
    resetNFTList,
} from '@/store/nft/listSlice'
import { selectNFTList } from '@/store/nft/selectors'
import { selectDataUser } from '@/store/user/selectors'
import { selectWallet } from '@/store/wallet/selectors'
import { tuple } from '@/utils/tuples'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import GridFilter from '../collection/detail/grid-filter'
import styles from './style.module.scss'

export const userCategoryTypes = tuple('created', 'owned')
type UserCategoryType = typeof userCategoryTypes[number]
interface INFTByUser {
    category: UserCategoryType
    address: string
}

const NFTByUser = ({ category, address }: INFTByUser) => {
    const grid = useSelector(selectGridValue)
    const { t } = useTransHook()
    const router = useRouter()
    const user = useSelector(selectDataUser)

    const {
        dataShow,
        isLoading,
        pageSizeMarketPlace,
        current,
        errorMessage,
        total,
    } = useSelector(selectNFTList)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const query = {
            pageIndex: 1,
            pageSize: pageSizeMarketPlace,
            address: address,
            categoryFilter: NFT_BY_USER[category],
            userId: user?.id,
        }

        dispatch(getAllNFTsByUser(query))

        return () => {
            dispatch(resetNFTList())
        }
    }, [category, address])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(clearNFTError())
        }
    }, [errorMessage])

    const setPage = (i: number) => {
        const query = {
            pageIndex: i,
            pageSize: pageSizeMarketPlace,
            address: address,
            categoryFilter: NFT_BY_USER[category],
            userId: user?.id,
        }
        dispatch(getAllNFTsByUser(query))
        dispatch(changePage(i))
    }

    return (
        <Container fluid className={styles['nft-by-category']}>
            <Row xs={2} md={grid} className={nftGridClass}>
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
            {!isLoading &&
                dataShow &&
                dataShow.length > 0 &&
                total > pageSizeMarketPlace && (
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

export default NFTByUser
