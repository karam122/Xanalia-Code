/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import FilterSection from './filter'
import style from './style.module.scss'
// import SVGEscutcheon from '@/public/svgs/escutcheon.svg'
import { useTransHook } from '@/locales/hooks'
import Pagination from '@/components/ui/pagination/pagination-component'
import { useSelector } from 'react-redux'
import { selectCollectionRanking } from '@/store/collection/selectors'
import { useAppDispatch } from '@/store/hooks'
import {
    changeFilter,
    changePage,
    getRankingCollection,
} from '@/store/collection/rankingSlice'
import { collectionUrl } from '@/constants/url'
import Link from 'next/link'
import Loading from '@/components/common/loading'
import { CollectionSort } from '@/constants/collection'
import { ellipsisText } from '@/utils/ellipsisText'
const arrow = '/svgs/arrow-fill-down.svg'

// const priceVolume = 355738.97 / dataTable[0].volume
// const priceFloorPrice = 243.65 / dataTable[0].floorPrice
const ETH_ICON = '/svgs/ethereum-icon.svg'
const TopListPage = () => {
    const { t } = useTransHook()
    // const [data, setData] = useState<any[]>([])
    const { data, pageSize, current, total, chain, duration, sort, isLoading } =
        useSelector(selectCollectionRanking)
    const dispatch = useAppDispatch()

    const sortClass = (start: number, end: number) => {
        if (sort <= end && sort >= start) {
            if (sort % 2 === 0) {
                return ' ' + style['desc']
            }
            return ' ' + style['asc']
        }
        return ''
    }

    useEffect(() => {
        dispatch(
            getRankingCollection({
                duration: duration,
                page: current,
                limit: pageSize,
                chain: chain,
                sort: sort,
            }),
        )
    }, [current, duration, chain, sort])

    const onChangePage = (i: number) => {
        dispatch(changePage(i))
    }

    function formatNumber(value: number) {
        // return Intl.NumberFormat().format(value)
        return Number(Number(value).toFixed(6))
    }

    function statusPercent(value?: boolean) {
        if (typeof value === 'undefined') return ''
        if (value) return 'green'
        if (!value) return 'red'
    }
    const handleNumber = (n: number | string) => {
        if (Number(n) < 1000) {
            return n
        }
        return Number(Number(Number(n) / 1000).toFixed(1)) + 'K'
    }

    const onSort = (start: number, end: number) => {
        if (sort === start) {
            dispatch(
                changeFilter({
                    field: 'sort',
                    value: end,
                }),
            )
        } else {
            dispatch(
                changeFilter({
                    field: 'sort',
                    value: start,
                }),
            )
        }
    }

    return (
        <div className={style['top-list']}>
            <div className={style['top-list__header']}>
                <h1 className={'heading--1'}>{t('TOP_NFTS')}</h1>
                <p className="text-body--large">{t('TOP_NFTS_DESCRIPTION')}</p>

                <FilterSection />
            </div>

            <Table hover responsive="sm" className={style['top-list__table']}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{t('COLLECTION')}</th>
                        <th>
                            <div
                                onClick={() =>
                                    onSort(
                                        CollectionSort.VOLUME_DESC,
                                        CollectionSort.VOLUME_ASC,
                                    )
                                }
                                className={
                                    style['can-sort'] +
                                    sortClass(
                                        CollectionSort.VOLUME_DESC,
                                        CollectionSort.VOLUME_ASC,
                                    )
                                }
                            >
                                {t('VOLUME')}
                                <span className={style['sort']}>
                                    <img src={arrow} alt="" />
                                </span>
                            </div>
                        </th>
                        <th>
                            <div
                                className={
                                    style['can-sort'] +
                                    ' ' +
                                    sortClass(
                                        CollectionSort.PRICE_CHANGE_DAY_DESC,
                                        CollectionSort.PRICE_CHANGE_DAY_ASC,
                                    )
                                }
                                onClick={() =>
                                    onSort(
                                        CollectionSort.PRICE_CHANGE_DAY_DESC,
                                        CollectionSort.PRICE_CHANGE_DAY_ASC,
                                    )
                                }
                            >
                                <span>{t('24H') + '%'}</span>
                                <span className={style['sort']}>
                                    <img src={arrow} alt="" />
                                </span>
                            </div>
                        </th>
                        <th>
                            <div
                                onClick={() =>
                                    onSort(
                                        CollectionSort.PRICE_CHANGE_WEEK_DESC,
                                        CollectionSort.PRICE_CHANGE_WEEK_ASC,
                                    )
                                }
                                className={
                                    style['can-sort'] +
                                    sortClass(
                                        CollectionSort.PRICE_CHANGE_WEEK_DESC,
                                        CollectionSort.PRICE_CHANGE_WEEK_ASC,
                                    )
                                }
                            >
                                <span>{t('7D') + '%'}</span>
                                <span className={style['sort']}>
                                    <img src={arrow} alt="" />
                                </span>
                            </div>
                        </th>
                        <th>
                            <div
                                onClick={() =>
                                    onSort(
                                        CollectionSort.FLOOR_DESC,
                                        CollectionSort.FLOOR_ASC,
                                    )
                                }
                                className={
                                    style['can-sort'] +
                                    sortClass(
                                        CollectionSort.FLOOR_DESC,
                                        CollectionSort.FLOOR_ASC,
                                    )
                                }
                            >
                                {t('FLOOR_PRICE')}
                                <span className={style['sort']}>
                                    <img src={arrow} alt="" />
                                </span>
                            </div>
                        </th>
                        <th>
                            <div
                                onClick={() =>
                                    onSort(
                                        CollectionSort.OWNERS_DESC,
                                        CollectionSort.OWNERS_ASC,
                                    )
                                }
                                className={
                                    style['can-sort'] +
                                    sortClass(
                                        CollectionSort.OWNERS_DESC,
                                        CollectionSort.OWNERS_ASC,
                                    )
                                }
                            >
                                {t('OWNERS')}
                                <span className={style['sort']}>
                                    <img src={arrow} alt="" />
                                </span>
                            </div>
                        </th>
                        <th>
                            <div
                                onClick={() =>
                                    onSort(
                                        CollectionSort.ITEMS_DESC,
                                        CollectionSort.ITEMS_ASC,
                                    )
                                }
                                className={
                                    style['can-sort'] +
                                    sortClass(
                                        CollectionSort.ITEMS_DESC,
                                        CollectionSort.ITEMS_ASC,
                                    )
                                }
                            >
                                {t('ITEMS')}
                                <span className={style['sort']}>
                                    <img src={arrow} alt="" />
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((obj, i) => (
                        <tr
                            key={obj.collection_id}
                            className={obj?.active ? 'active' : ''}
                        >
                            <td>
                                <span>{(current - 1) * pageSize + i + 1}</span>
                            </td>
                            <td>
                                <Link
                                    href={collectionUrl(
                                        obj.collection_contract_address,
                                        obj.collection_network_name,
                                    )}
                                    passHref
                                >
                                    <div
                                        className={style['top-list__avatar']}
                                        title={
                                            obj.collection_name.length >= 32
                                                ? obj.collection_name
                                                : ''
                                        }
                                    >
                                        <div>
                                            <div>
                                                <img
                                                    src={obj.iconImage}
                                                    draggable="false"
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </div>
                                            {/* <SVGEscutcheon /> */}
                                        </div>
                                        <p>
                                            {ellipsisText(
                                                obj.collection_name,
                                                32,
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            </td>
                            <td>
                                <div className={style['top-list__balance']}>
                                    {/* <span>
                                        $
                                        {formatNumber(priceVolume * obj.volume)}
                                    </span> */}
                                    <span
                                        className={`text-body ${style['eth-price']}`}
                                        title={obj.volume}
                                    >
                                        <img
                                            src={ETH_ICON}
                                            alt=""
                                            title="ETH"
                                        />
                                        {formatNumber(obj.volume)}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div
                                    className={`${
                                        style['top-list__percent']
                                    } ${statusPercent(
                                        Number(obj['priceChanged24h']) >= 0,
                                    )}`}
                                >
                                    {obj['priceChanged24h']
                                        ? formatNumber(obj['priceChanged24h']) +
                                          '%'
                                        : '-'}
                                </div>
                            </td>
                            <td>
                                <div
                                    className={`${
                                        style['top-list__percent']
                                    } ${statusPercent(
                                        Number(obj['priceChanged7day']) >= 0,
                                    )}`}
                                >
                                    {obj['priceChanged7day']
                                        ? formatNumber(
                                              obj['priceChanged7day'],
                                          ) + '%'
                                        : '-'}
                                </div>
                            </td>
                            <td>
                                <div className={style['top-list__balance']}>
                                    {/* <span>
                                        
                                        {formatNumber(
                                            priceFloorPrice * obj.floorPrice,
                                        )}
                                    </span> */}
                                    <span
                                        className={`text-body ${style['eth-price']}`}
                                        title={obj.floorPrice}
                                    >
                                        <img
                                            src={ETH_ICON}
                                            alt=""
                                            title="ETH"
                                        />

                                        {handleNumber(
                                            formatNumber(obj.floorPrice),
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span title={obj.owners}>
                                    {handleNumber(obj.owners)}
                                </span>
                            </td>
                            <td>
                                <span title={obj.items}>
                                    {handleNumber(obj.items)}
                                </span>
                            </td>
                        </tr>
                    ))}

                    {isLoading && data.length === 0 && (
                        <tr>
                            <td className="no-data " colSpan={8}>
                                <div className="min-h-[60vh] flex-center">
                                    <Loading />
                                </div>
                            </td>
                        </tr>
                    )}
                    {!isLoading && data.length === 0 && (
                        <tr>
                            <td className="no-data" colSpan={8}>
                                {t('NO_DATA_FOUND')}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className={style['top-list__pagination']}>
                <Pagination
                    total={total}
                    pageSize={pageSize}
                    current={current}
                    onChange={onChangePage}
                />
            </div>
        </div>
    )
}

export default TopListPage
