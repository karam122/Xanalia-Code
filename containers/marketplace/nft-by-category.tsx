/* eslint-disable no-unused-vars */

import Loading from '@/components/common/loading'
import NFTCard from '@/components/common/nft-card'
import PaginationComponent from '@/components/ui/pagination/pagination-component'
import { CATEGORY_FILTER_LIST } from '@/constants/filters'
import { nftGridClass } from '@/constants/nft'
import { useTransHook } from '@/locales/hooks'
import { selectedNftPage } from '@/store/app/selectors'
import { setSelectedNftPage } from '@/store/app/slice'
import { selectGridValue } from '@/store/grid-view/selectors'
import { useAppDispatch } from '@/store/hooks'
import {
    changePage,
    clearNFTError,
    getAllNFTsByCategory,
    resetNFTList,
} from '@/store/nft/listSlice'
import { selectNFTList } from '@/store/nft/selectors'
import { selectActiveSortFilter } from '@/store/sort-nft/selectors'
import { selectDataUser } from '@/store/user/selectors'
import { tuple } from '@/utils/tuples'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styles from './style.module.scss'

const nftsList = [
    {
        nftId: 10,
        name: 'NFT 022 toi la nft hahahhahhaahahahahhahahah',
        category: 1,
        marketNftStatus: 0,
        mediaUrl: '',
        tokenId: '1',
        network: {
            networkName: 'BSC',
            avatar: 'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
        },
        creator: {
            avatar: null,
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        owner: {
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            avatar: null,
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        collection: {
            address: '0xa1b1d056192f0a04f7aeffe44f5ed0ec8d746af9',
        },
        saleData: {
            fixPrice: {
                price: '10322.300000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
            auction: {
                startPrice: '12.0000000000',
                highestPrice: '12.0000000000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
        },
    },
    {
        nftId: 10,
        name: 'NFT 022',
        category: 1,
        marketNftStatus: 1,
        mediaUrl:
            'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
        tokenId: '1',
        network: {
            networkName: 'BSC',
            avatar: 'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
        },
        creator: {
            avatar: null,
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        owner: {
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            avatar: null,
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        collection: {
            address: '0xa1b1d056192f0a04f7aeffe44f5ed0ec8d746af9',
        },
        saleData: {
            fixPrice: {
                price: '10322.300000',
                tokenPrice: 'MAR',
                tokenPriceIcon: null,
            },
            auction: {
                startPrice: '12.0000000000',
                highestPrice: '13.0000000000',
                tokenPrice: 'MAR',
                tokenPriceIcon: null,
            },
        },
    },
]

export const categoryTypes = tuple(
    'all_nfts',
    'trending',
    'art',
    'image',
    'gif',
    'movie',
    'music',
)
type CategoryType = typeof categoryTypes[number]
interface INFTByCategory {
    category: CategoryType
}

const NFTByCategory = ({ category }: INFTByCategory) => {
    console.log(
        '🚀 ~ file: nft-by-category.tsx ~ line 127 ~ NFTByCategory ~ category',
        category,
    )
    const sortActiveFilter = useSelector(selectActiveSortFilter)
    const grid = useSelector(selectGridValue)
    const sortValue = sortActiveFilter.value
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
    const currentNftPage = useSelector(selectedNftPage)

    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        console.log(
            '🚀 ~ file: nft-by-category.tsx ~ line 147 ~ useEffect ~ router.isReady',
            router.isReady,
            CATEGORY_FILTER_LIST[category],
        )
        if (router.isReady) {
            const page = currentNftPage
            const query = {
                pageIndex: page ? page : 1,
                pageSize: pageSizeMarketPlace,
                sortFilter: sortValue,
                categoryFilter: CATEGORY_FILTER_LIST[category],
                userId: user?.id,
            }

            dispatch(getAllNFTsByCategory(query))
            if (page) {
                dispatch(changePage(Number(page)))
            }
        }

        return () => {
            dispatch(resetNFTList())
        }
    }, [category, sortValue, user?.id])

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
            sortFilter: sortValue,
            categoryFilter: CATEGORY_FILTER_LIST[category],
            userId: user?.id,
        }
        dispatch(getAllNFTsByCategory(query))
        dispatch(changePage(i))
        // localStorage.setItem('selectedNftPage', `${i}`)
        dispatch(setSelectedNftPage(`${i}`))
    }

    return (
        <Container fluid className={styles['nft-by-category']}>
            <Row lg={grid} md={4} xs={2} className={nftGridClass}>
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
        </Container>
    )
}

export default NFTByCategory
