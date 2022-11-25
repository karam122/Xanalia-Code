import Loading from '@/components/common/loading'
import Table from '@/components/ui/table'
import { useTransHook } from '@/locales/hooks'
import {
    clearBidError,
    fetchMoreBids,
    getAllBids,
    resetHistoryBid,
} from '@/store/bid/listSlice'
import { selectBidList } from '@/store/bid/selectors'
import { useAppDispatch } from '@/store/hooks'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Accordion } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import { selectNFTDetailsId } from '@/store/nft/selectors'
import { getExpirationDate } from '@/utils/date'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import BidActions from './bid-actions'
import style from '../style.module.scss'
import Link from 'next/link'
import { artistLink } from '@/utils/addressFormat'

const BIDHistory = () => {
    const {
        isLoading,
        current,
        dataShow,
        pageSize,
        errorMessage,
        currentSort,
        totalPages,
    } = useSelector(selectBidList)
    const nftId = useSelector(selectNFTDetailsId)

    const dispatch = useAppDispatch()

    const { t } = useTransHook()

    const bodyRef = useRef<HTMLTableSectionElement>(null)

    useEffect(() => {
        dispatch(
            getAllBids({
                page: current,
                limit: pageSize,
                nftId: nftId,
                sort: currentSort,
            }),
        )

        return () => {
            dispatch(resetHistoryBid())
        }
    }, [])

    // handle scroll and load more data
    const handleLoadMore = () => {
        if (current < totalPages) {
            dispatch(
                fetchMoreBids({
                    page: current + 1,
                    limit: pageSize,
                    nftId: nftId,
                    sort: currentSort,
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
        if (isLoading === false) {
            setIsFetching(false)
        }
        // eslint-disable-next-line
    }, [isLoading])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(clearBidError())
        }
    }, [errorMessage])

    const renderItem = (item: any, index: number) => (
        <tr key={index}>
            <td>
                {Number(item?.price)} {item?.receiveToken}
            </td>
            <td>
                <Link
                    href={artistLink(item?.fromUser?.userWallet?.address)}
                    passHref
                >
                    {item?.fromUser?.userWallet?.address.slice(0, 6)}
                </Link>
            </td>
            <td>{moment(item?.createdAt).format('YYYY/MM/DD hh:mm:ss')}</td>
            <td>{getExpirationDate(item?.expired)}</td>
            <td>
                <BidActions
                    bidId={item?.id}
                    auctionStatus={item?.auctionSession?.status}
                    auctionSessionId={item?.auctionSession?.id}
                    fromAddress={item?.fromUser?.userWallet?.address}
                    expired={Number(item?.expired) * 1000}
                    receiveToken={item?.receiveToken}
                    priceBid={item?.price}
                />
            </td>
        </tr>
    )

    return (
        <Accordion defaultActiveKey={'0'}>
            <Accordion.Item eventKey={'0'}>
                <Accordion.Header>
                    <Image
                        src="/svgs/list-icon.svg"
                        width={17}
                        height={14}
                        alt="list-alt"
                    />
                    {t('BID_HISTORY')}
                </Accordion.Header>
                <Accordion.Body className="body-table">
                    <Table bsPrefix="custom-table" reCalculate={isLoading}>
                        <thead>
                            <tr>
                                <th>{t('PRICE')}</th>
                                <th>{t('FROM')}</th>
                                <th>{t('DATE')}</th>
                                <th>{t('EXPIRATION')}</th>
                                <th></th>
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

export default BIDHistory
