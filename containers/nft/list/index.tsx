import FiltersList from '@/components/common/filters-list'
import Loading from '@/components/common/loading'
import PaginationComponent from '@/components/ui/pagination/pagination-component'
import Table from '@/components/ui/table'
import { FILTER_ITEMS_KEY } from '@/constants/filters'
import { useTransHook } from '@/locales/hooks'
import { useAppDispatch } from '@/store/hooks'
import {
    changePage,
    clearNFTError,
    getAllMyNFTs,
    resetNFTList,
} from '@/store/nft/listSlice'
import { selectNFTList } from '@/store/nft/selectors'
import { selectCurrentUser } from '@/store/user/selectors'
import { toFixCustom } from '@/utils/number'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import style from './style.module.scss'

const ListNFTPage = () => {
    const { t } = useTransHook()

    const router = useRouter()
    const user = useSelector(selectCurrentUser)
    const dataUser = user?.dataUser

    const [currentQuery, setCurrentQuery] = useState<any>()

    const handleSearch = (data: any) => {
        const query: any = {}
        if (data.createdDraftType !== '') {
            query.isDraft = Number(data.createdDraftType)
                ? 0
                : Number(data.createdDraftType)
        }
        if (data.createdCollectedFilter !== '') {
            query.ownerNft = data.createdCollectedFilter
        }
        if (data.networkId !== 0) {
            query.network = data.networkId
        }
        if (data.collectionId !== 0) {
            query.collection = data.collectionId
        }

        setCurrentQuery(query)
        dispatch(
            getAllMyNFTs({ pageIndex: current, pageSize: pageSize, ...query }),
        )
    }

    const { dataShow, isLoading, pageSize, current, errorMessage, total } =
        useSelector(selectNFTList)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(
            getAllMyNFTs({
                pageIndex: current,
                pageSize: pageSize,
            }),
        )

        return () => {
            dispatch(resetNFTList())
        }
    }, [dataUser])

    const setPage = (i: number) => {
        dispatch(
            getAllMyNFTs({ pageIndex: i, pageSize: pageSize, ...currentQuery }),
        )
        dispatch(changePage(i))
    }

    const renderItem = (item: any, index: number) => (
        <tr
            key={index}
            onClick={() => {
                router.push(
                    `/assets/${item.network}/${item.collectionAddress}/${item.tokenId}`,
                )
            }}
            style={{ cursor: 'pointer', verticalAlign: 'middle' }}
        >
            <td>{pageSize * current + index + 1 - pageSize}</td>
            <td>{item.nftName}</td>
            <td>{Number(item.price)}</td>
            <td>{item?.marketStatus === 0 ? '' : item.receiveToken}</td>
            <td>{typeof item.network === 'string' && item.network}</td>

            <td>
                {' '}
                <img
                    className="token-icon"
                    src={'/svgs/eth-token-icon.svg'}
                    alt="tokenIcon"
                />{' '}
                {toFixCustom(item.totalPrice) || 0}{' '}
            </td>
        </tr>
    )

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(clearNFTError())
        }
    }, [errorMessage])

    return (
        <div className={`${style['list-nft']} container-fluid`}>
            <div className={style['list-nft__header']}>
                {/* <BreadcrumbsTitle
                    className={style['list-nft__breadcrumbs']}
                    title={t('LIST_NFT_TITLE')}
                    breadcrumbs={[{ text: t('MY_NFTS') }, { text: t('LIST') }]}
                /> */}
            </div>

            <div className={style['list-nft__content']}>
                <div className={style['list-nft__top']}>
                    <FiltersList
                        handleSearch={(data) => handleSearch(data)}
                        filterItems={[
                            FILTER_ITEMS_KEY.CREATED_COLLECTED_KEY,
                            FILTER_ITEMS_KEY.NETWORK_TYPE_KEY,
                            FILTER_ITEMS_KEY.COLLECTION_KEY,
                            FILTER_ITEMS_KEY.ACTION_SEARCH_KEY,
                            // FILTER_ITEMS_KEY.CREATED_DRAFT_KEY,
                        ]}
                        colsNum={2}
                    />
                    <Link href={'/create/nft'} passHref>
                        <Button
                            className={`${style['list-nft__add-new']} text-btn--01 bold content-center`}
                        >
                            {t('LIST_NFT_BTN_ADD_NEW')}
                        </Button>
                    </Link>
                </div>

                <div className={style['list-nft__table']}>
                    <Table className="table-list" responsive="sm">
                        <thead>
                            <tr>
                                <th>{t('LIST_NFT_TABLE_NO')}</th>
                                <th>{t('LIST_NFT_TABLE_NFT')}</th>
                                <th>{t('LIST_NFT_TABLE_PRICE')}</th>
                                <th>{t('LIST_NFT_TABLE_CURRENT_TYPE')}</th>
                                <th>{t('LIST_NFT_TABLE_NETWORK')}</th>

                                <th>{t('LIST_NFT_TABLE_EARNED')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading &&
                                dataShow &&
                                dataShow.length > 0 &&
                                dataShow.map((item, index) =>
                                    renderItem(item, index),
                                )}
                            {dataShow?.length === 0 && !isLoading && (
                                <tr>
                                    <td className="no-data" colSpan={11}>
                                        {t('NO_DATA_FOUND')}
                                    </td>
                                </tr>
                            )}
                            {isLoading && (
                                <tr>
                                    <td className="no-data" colSpan={11}>
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                <div className={style['list-nft__pagination']}>
                    <PaginationComponent
                        total={total}
                        current={current}
                        pageSize={pageSize}
                        onChange={setPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListNFTPage
