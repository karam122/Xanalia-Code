import FiltersList from '@/components/common/filters-list'
import Loading from '@/components/common/loading'
import Table from '@/components/ui/table'
import { FILTER_ITEMS_KEY } from '@/constants/filters'
import { createCollectionsUrl } from '@/constants/url'
import { useTransHook } from '@/locales/hooks'
import { AppDispatch } from '@/store'
import {
    changePage,
    getMyCollections,
    resetColectionList,
} from '@/store/collection/listSlice'
import { selectListCollection } from '@/store/collection/selectors'
import { selectCurrentUser } from '@/store/user/selectors'
import { ellipsisText } from '@/utils/ellipsisText'
import timeSince from '@/utils/timeSince'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import PaginationComponent from '../../../components/ui/pagination/pagination-component'
import style from './style.module.scss'

const ListCollectionPage = () => {
    const [currentQuery, setCurrentQuery] = useState<any>()
    const user = useSelector(selectCurrentUser)
    const dataUser = user?.dataUser
    // const router = useRouter()
    const handleSearch = (data: any) => {
        const query: any = {}
        if (data.createdDraftType !== '') {
            query.isDraft = Number(data.createdDraftType)
                ? 0
                : Number(data.createdDraftType)
        }
        // if(data.createdCollectedFilter !== '') {
        //     query.collection =
        // }
        if (data.networkId !== 0) {
            query.networkId = data.networkId
        }
        if (data.collectionId !== 0) {
            query.collectionId = data.collectionId
        }

        setCurrentQuery(query)

        dispatch(
            getMyCollections({
                page: current,
                limit: pageSize,
                status: 1,
                ...query,
            }),
        )
    }

    const { t } = useTransHook()

    const { dataShow, isLoading, pageSize, current, total } =
        useSelector(selectListCollection)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            getMyCollections({ page: current, limit: pageSize, status: 1 }),
        )
        return () => {
            dispatch(resetColectionList())
        }
    }, [dataUser])

    const setPage = (i: number) => {
        dispatch(
            getMyCollections({
                page: i,
                limit: pageSize,
                status: 1,
                ...currentQuery,
            }),
        )
        dispatch(changePage(i))
    }

    const renderItem = (item: any, index: number) => (
        <Link
            href={`/collection/${item.network.name}/${item.contractAddress}`}
            passHref
            key={index}
        >
            <tr
                key={index}
                // onClick={(e: any) => {

                //     if (e?.target && e.tagName.toString().toLowerCase() !== 'button') {
                //         router.push(
                //             `/collection/${item.network.name}/${item.contractAddress}`,
                //         )
                //     }
                // }}
                style={{ cursor: 'pointer' }}
            >
                <td>{pageSize * current + index + 1 - pageSize}</td>
                <td title={item.name}>
                    <div className={style['list-collection__collection_name']}>
                        <img src={item.iconImage} alt="collection icon" />
                        <span>{ellipsisText(item.name, 20)}</span>
                    </div>
                </td>
                <td>{item.symbol ? ellipsisText(item.symbol, 32) : ''}</td>
                <td>{item.contractAddress ? item.contractAddress : ''}</td>
                <td>{item?.network?.name}</td>
                <td>{item.status}</td>
                <td>{timeSince(new Date(item.createdAt))}</td>
                <td>{item.totalNft || 0}</td>
                <td>
                    {item.type === 4 && (
                        <Link
                            href={`/my-items/edit-collection/${item?.network?.name}/${item.contractAddress}`}
                            passHref
                        >
                            <button className="action-button">
                                {t('UPDATE')}
                            </button>
                        </Link>
                    )}
                </td>
            </tr>
        </Link>
    )
    return (
        <div className={`${style['list-collection']} container-fluid`}>
            <div className={style['list-collection__header']}>
                {/* <BreadcrumbsTitle
                    className={style['list-collection__breadcrumbs']}
                    title={t('LIST_COLLECTION_TITLE')}
                    breadcrumbs={[
                        { text: t('COLLECTION'), href: myCollectionsUrl },
                        { text: t('LIST'), href: myCollectionsUrl },
                    ]}
                /> */}
            </div>
            <div className={style['list-collection__content']}>
                <div className={style['list-collection__top']}>
                    <FiltersList
                        handleSearch={handleSearch}
                        filterItems={[
                            // FILTER_ITEMS_KEY.CREATED_DRAFT_KEY,
                            FILTER_ITEMS_KEY.NETWORK_TYPE_KEY,
                            FILTER_ITEMS_KEY.ACTION_SEARCH_KEY,
                        ]}
                        colsNum={3}
                    />
                    <Link href={createCollectionsUrl} passHref>
                        <Button
                            className={`${style['list-collection__add-new']} text-btn--01 bold content-center`}
                        >
                            {t('LIST_COLLECTION_BTN_ADD_NEW')}
                        </Button>
                    </Link>
                </div>

                <div className={style['list-collection__table']}>
                    <Table className="table-list" responsive="xl">
                        <thead>
                            <tr>
                                <th>{t('LIST_COLLECTION_TABLE_NO')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_COLLECTION')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_SYMBOL')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_CONTRACT')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_NETWORK')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_STATUS')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_CREATED_AT')}</th>
                                <th>
                                    {t('LIST_COLLECTION_TABLE_NFT_CREATED')}
                                </th>
                                <th></th>
                                {/* <th>{t('LIST_COLLECTION_TABLE_TRAD')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_EARNED')}</th>
                                <th>{t('LIST_COLLECTION_TABLE_AUCTION')}</th>*/}
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
                                    <td className="no-data" colSpan={8}>
                                        {t('NO_DATA_FOUND')}
                                    </td>
                                </tr>
                            )}
                            {isLoading && (
                                <tr>
                                    <td className="no-data" colSpan={8}>
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                <PaginationComponent
                    total={total}
                    current={current}
                    pageSize={pageSize}
                    onChange={setPage}
                />
            </div>
        </div>
    )
}

export default ListCollectionPage
