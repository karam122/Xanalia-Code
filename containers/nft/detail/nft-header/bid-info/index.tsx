import { NFT_MARKET_STATUS } from '@/constants/nft'
// import timeSince from '@/utils/timeSince'
import { useTransHook } from '@/locales/hooks'
import { useAppDispatch } from '@/store/hooks'
import { getNFTDetails } from '@/store/nft/detailSlice'
import { selectNFTDetails } from '@/store/nft/selectors'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Countdown from 'react-countdown'
import { useSelector } from 'react-redux'
import style from './style.module.scss'

type ICountdownTime = {
    endCoundownTime: number
    callback: () => void
}
const CountdownTime = ({ endCoundownTime, callback }: ICountdownTime) => {
    const renderer = (e: any) => {
        if (e.completed) {
            // Render a complete state
            callback()
        } else {
            // Render a countdown
            // console.log('PHUONGABC', e)
            return (
                <div className="countdown">
                    {e.days > 0 && (
                        <>
                            <div className="hour">{e.days}</div>
                            <strong>:</strong>
                        </>
                    )}
                    <div className="hour">{e.hours}</div>
                    <strong>:</strong>
                    <div className="minutes">{e.minutes}</div>
                    <strong>:</strong>
                    <div className="seconds">{e.seconds}</div>
                </div>
            )
        }
    }

    return <Countdown date={endCoundownTime} renderer={renderer} />
}

interface IBidInfo {
    status:
        | NFT_MARKET_STATUS.UPCOMMING_AUCTION
        | NFT_MARKET_STATUS.ON_AUCTION
        | NFT_MARKET_STATUS.CANCEL_AUCTION
}
const BidInfo = ({ status }: IBidInfo) => {
    // const { closeTime, startTime } = {
    //   closeTime: 1653966666012,
    //   startTime: 1653901254254
    // }

    const nftDetails = useSelector(selectNFTDetails)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const auction = nftDetails?.saleData?.auction
    const startTime = auction?.startTime
    const endTime = auction?.endTime

    const nowTimeStamp = Date.now()
    const startTimeStamp = new Date(startTime).getTime()
    const endTimeStamp = new Date(endTime).getTime()

    const endCoundownTime =
        nowTimeStamp < startTimeStamp ? startTimeStamp : endTimeStamp

    const [isWaiting, setIsWaiting] = useState<boolean>(false)
    const callbackCoundown = () => {
        setIsWaiting(true)
        setTimeout(() => {
            dispatch(getNFTDetails(router.query))
        }, 50000)
    }

    const { t } = useTransHook()

    const renderCoundown = () => {
        if (status === NFT_MARKET_STATUS.UPCOMMING_AUCTION) {
            return (
                <div className={style['bid-end-line']}>
                    {isWaiting ? (
                        <span>{t('AUCTION_IS_BEING_UPDATED_PLEASE_WAIT')}</span>
                    ) : (
                        <>
                            <span>{t('AUCTION_WILL_START_IN')}:</span>
                            <CountdownTime
                                endCoundownTime={endCoundownTime}
                                callback={callbackCoundown}
                            />
                        </>
                    )}
                </div>
            )
        }
        if (status === NFT_MARKET_STATUS.ON_AUCTION) {
            return (
                <div className={style['bid-end-line']}>
                    {isWaiting ? (
                        <span>{t('AUCTION_IS_BEING_UPDATED_PLEASE_WAIT')}</span>
                    ) : (
                        <>
                            <span>{t('AUCTION_WILL_END_IN')}:</span>
                            <CountdownTime
                                endCoundownTime={endCoundownTime}
                                callback={callbackCoundown}
                            />
                        </>
                    )}
                </div>
            )
        }
        return null
    }

    return (
        <div className={style['bid-info']}>
            {renderCoundown()}
            {auction?.highestBidder && (
                <div className="text-body">
                    <span>{t('HIGHEST_BIDDER')}:</span>{' '}
                    <span>{auction?.highestBidder.slice(0, 7) + '...'}</span>
                </div>
            )}
        </div>
    )
}

export default BidInfo
