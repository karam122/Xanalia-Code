import Loading from '@/components/common/loading'
import MultiSelectDropdown, {
    MSDValuesType,
} from '@/components/ui/multi-select-dropdown'
import Table from '@/components/ui/table'
import { FILTER_TRADING_HISTORY_OPTIONS } from '@/constants/nft'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useTransHook } from '@/locales/hooks'
import { useAppDispatch } from '@/store/hooks'
import { selectNFTDetailsId } from '@/store/nft/selectors'
import {
    clearTradingHistoryError,
    getAllTradingHistory,
    resetTradingHistory,
} from '@/store/trading-history/listSlice'
import { selectTradingHistoryList } from '@/store/trading-history/selectors'
import { artistLink } from '@/utils/addressFormat'
import {
    getFromAddress,
    getKeyEventByValue,
    getToAddress,
} from '@/utils/trading-history'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SORT_TRADING_HISTORY } from '@/constants/nft'
import style from '../style.module.scss'
const TradingHistory = () => {
    const { isLoading, current, dataShow, pageSize, errorMessage, totalPages } =
        useSelector(selectTradingHistoryList)
    const nftId = useSelector(selectNFTDetailsId)
    const [sortValues, setSortValues] = useState<number[]>([])

    const dispatch = useAppDispatch()

    const { t } = useTransHook()

    const bodyRef = useRef<HTMLTableSectionElement>(null)

    const renderItem = (item: any, index: number) => {
        let from = item?.fromUser?.userWallet?.address
        let to = item?.toUser?.userWallet?.address

        if (item.action === SORT_TRADING_HISTORY.BUY_NFT) {
            from = item?.toUser?.userWallet?.address
            to = item?.fromUser?.userWallet?.address
        }
        return (
            <tr key={index}>
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

    useEffect(() => {
        // if (dataShow.length === 0) {
        dispatch(
            getAllTradingHistory({
                page: current,
                limit: pageSize,
                nftId: nftId,
                type: 'fetch',
            }),
        )
        // }
        return () => {
            dispatch(resetTradingHistory())
        }
    }, [nftId])

    const handleLoadMore = () => {
        console.log('HANDLER LOADMORE')
        if (current < totalPages) {
            dispatch(
                getAllTradingHistory({
                    page: current + 1,
                    limit: pageSize,
                    nftId: nftId,
                    sort: sortValues,
                    type: 'loadMore',
                }),
            )
        }
    }
    // eslint-disable-next-line
    const [isFetching, setIsFetching] = useInfiniteScroll(
        bodyRef,
        handleLoadMore,
    )

    useEffect(() => {
        setIsFetching(isLoading)
        // eslint-disable-next-line
    }, [isLoading])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(clearTradingHistoryError())
        }
    }, [errorMessage])

    const onMultiSelectDropdownChange = async (options: MSDValuesType) => {
        const sortValues = options.map((option) => option.value)
        setSortValues(sortValues)
        dispatch(resetTradingHistory())
        dispatch(
            getAllTradingHistory({
                page: 1,
                limit: pageSize,
                nftId: nftId,
                sort: sortValues,
                type: 'fetch',
            }),
        )
    }

    return (
        <Accordion defaultActiveKey={'0'}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Image
                        src="/svgs/menu-icon.svg"
                        width={17}
                        height={14}
                        alt="menu-alt"
                    />
                    {t('TRADING_HISTORY')}
                </Accordion.Header>
                <Accordion.Body className="body-table">
                    <MultiSelectDropdown
                        options={FILTER_TRADING_HISTORY_OPTIONS}
                        onChange={onMultiSelectDropdownChange}
                    />
                    <Table bsPrefix="custom-table" reCalculate={isLoading}>
                        <thead>
                            <tr>
                                <th>{t('EVENT')}</th>
                                <th>{t('PRICE')}</th>
                                <th>{t('FROM')}</th>
                                <th>{t('TO')}</th>
                                <th>{t('DATE (DD/MM/YYYY)')}</th>
                            </tr>
                        </thead>
                        <tbody ref={bodyRef} className={style['link-wraper']}>
                            {!isLoading &&
                                dataShow &&
                                dataShow.length > 0 &&
                                dataShow.map((item, index) =>
                                    renderItem(item, index),
                                )}
                            {dataShow?.length === 0 && !isLoading && (
                                <tr>
                                    <td className="no-data" colSpan={5}>
                                        {t('NO_DATA_FOUND')}
                                    </td>
                                </tr>
                            )}
                            {isLoading && (
                                <tr>
                                    <td className="no-data" colSpan={5}>
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TradingHistory
