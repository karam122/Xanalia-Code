/* eslint-disable @next/next/no-img-element */
import styles from './style.module.scss'
import { useTransHook } from '@/locales/hooks'
import { Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store/hooks'
import {
    changePage,
    clearTradingHistoryError,
    getAllTradingHistory,
    resetTradingHistory,
} from '@/store/trading-history/listSlice'
import { selectTradingHistoryList } from '@/store/trading-history/selectors'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from '@/components/common/loading'
import {
    getFromAddress,
    getKeyEventByValue,
    getToAddress,
} from '@/utils/trading-history'
import Link from 'next/link'
import { artistLink } from '@/utils/addressFormat'
import moment from 'moment'
import PaginationComponent from '@/components/ui/pagination/pagination-component'
import { getNFTImage } from '@/containers/activity'
import { useRouter } from 'next/router'
import {
    FILTER_TRADING_HISTORY_OPTIONS,
    SORT_TRADING_HISTORY,
} from '@/constants/nft'
import MultiSelectDropdown, {
    MSDValuesType,
} from '@/components/ui/multi-select-dropdown'

const titleTable = ['NFT', 'Event', 'Price', 'From', 'To', 'Date']

const ActivityCollections = ({ collectionId }: { collectionId: number }) => {
    const { t } = useTransHook()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { isLoading, current, dataShow, pageSize, errorMessage, totalItems } =
        useSelector(selectTradingHistoryList)

    const [sortValues, setSortValues] = useState<number[]>([])

    useEffect(() => {
        dispatch(
            getAllTradingHistory({
                page: current,
                limit: pageSize,
                collectionId: collectionId || -1,
            }),
        )
        return () => {
            dispatch(resetTradingHistory())
        }
    }, [collectionId])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(clearTradingHistoryError())
        }
    }, [errorMessage])

    const setPage = (i: number) => {
        dispatch(resetTradingHistory())
        dispatch(
            getAllTradingHistory({
                page: i,
                limit: pageSize,
                collectionId: collectionId || -1,
                sort: sortValues,
            }),
        )
        dispatch(changePage(i))
    }

    const renderItem = (item: any, index: number) => {
        let from = item?.fromUser?.userWallet?.address
        let to = item?.toUser?.userWallet?.address

        if (item.action === SORT_TRADING_HISTORY.BUY_NFT) {
            from = item?.toUser?.userWallet?.address
            to = item?.fromUser?.userWallet?.address
        }
        return (
            <tr
                key={index}
                className={styles['wrapper__content-table']}
                onClick={() => {
                    router.push(
                        `/assets/${item?.nft?.network?.name}/${item?.nft?.collections?.contractAddress}/${item?.nft?.tokenId}`,
                    )
                }}
            >
                <td>
                    <img
                        src={getNFTImage(
                            item?.nft?.smallImage,
                            item?.nft?.previewImage,
                        )}
                        alt="nft-image-alt"
                        width={48}
                        height={48}
                        className={styles['wrapper__image-card']}
                    />
                    {item?.nft?.name}
                </td>
                <td>{t(getKeyEventByValue(item?.action))}</td>
                <td>
                    {item?.price && item?.receiveToken
                        ? Number(item?.price) + ' ' + item?.receiveToken
                        : ''}
                </td>
                <td>
                    {item.action === SORT_TRADING_HISTORY.MINT_NFT ? (
                        <div>{getFromAddress(from, item?.action)}</div>
                    ) : (
                        <Link href={artistLink(from)} passHref>
                            {getFromAddress(from, item?.action)}
                        </Link>
                    )}
                    {/* <Link
                    href={artistLink(item?.fromUser?.userWallet?.address)}
                    passHref
                >
                    {getFromAddress(
                        item?.fromUser?.userWallet?.address,
                        item?.action,
                    )}
                </Link> */}
                </td>
                <td>
                    <Link href={artistLink(to)} passHref>
                        {getToAddress(to, item?.action)}
                    </Link>
                </td>
                <td>{moment(item?.createdAt).format('YYYY/MM/DD hh:mm:ss')}</td>
            </tr>
        )
    }
    const onMultiSelectDropdownChange = async (options: MSDValuesType) => {
        const sortValues = options.map((option) => option.value)
        setSortValues(sortValues)
        dispatch(resetTradingHistory())
        dispatch(
            getAllTradingHistory({
                page: 1,
                limit: pageSize,
                sort: sortValues,
                collectionId: collectionId || -1,
            }),
        )
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['wrapper__filter']}>
                <MultiSelectDropdown
                    options={FILTER_TRADING_HISTORY_OPTIONS}
                    onChange={onMultiSelectDropdownChange}
                />
            </div>
            <div className={styles['wrapper__table']}>
                <Table>
                    <thead>
                        <tr className={styles['wrapper__title-table']}>
                            {titleTable?.map((item, i) => (
                                <th key={i}>{t(item)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="link-wraper">
                        {!isLoading &&
                            dataShow &&
                            dataShow.length > 0 &&
                            dataShow.map((item, index) =>
                                renderItem(item, index),
                            )}
                        {dataShow?.length === 0 && !isLoading && (
                            <tr className={styles['wrapper__content-table']}>
                                <td className="no-data" colSpan={6}>
                                    {t('NO_DATA_FOUND')}
                                </td>
                            </tr>
                        )}
                        {isLoading && (
                            <tr className={styles['wrapper__content-table']}>
                                <td className="no-data" colSpan={6}>
                                    <Loading />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            {!isLoading && dataShow && dataShow.length > 0 && (
                <div className={styles['list-nft__pagination']}>
                    <PaginationComponent
                        total={totalItems}
                        current={current}
                        pageSize={pageSize}
                        onChange={setPage}
                    />
                </div>
            )}
        </div>
    )
}

export default ActivityCollections
