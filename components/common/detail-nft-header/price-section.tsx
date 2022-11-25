import React from 'react'
import style from './style.module.scss'

import { useSelector } from 'react-redux'
import { selectNFTDetails } from '@/store/nft/selectors'
import { NFT_MARKET_STATUS } from '@/constants/nft'
import { useTransHook } from '@/locales/hooks'
const usdPrice = (usd: number | string | undefined) => {
    if (usd) {
        return (
            <span className={style['usd-price']}>
                (${Number(Number(usd).toFixed(2))})
            </span>
        )
    }
    return ''
}
const PriceSection = () => {
    const nftDetails = useSelector(selectNFTDetails)
    const { t } = useTransHook()

    if (nftDetails.marketNftStatus === NFT_MARKET_STATUS.NOT_ON_SALE) {
        return null
    }

    if (
        nftDetails.marketNftStatus === NFT_MARKET_STATUS.ON_AUCTION ||
        nftDetails.marketNftStatus === NFT_MARKET_STATUS.UPCOMMING_AUCTION ||
        nftDetails.marketNftStatus === NFT_MARKET_STATUS.CANCEL_AUCTION ||
        nftDetails.marketNftStatus === NFT_MARKET_STATUS.END_AUCTION
    ) {
        let label = 'HIGHEST_BID'
        if (
            nftDetails?.saleData?.auction?.highestPrice ===
            nftDetails?.saleData?.auction?.startPrice
        ) {
            label = 'MINIMUM_BID'
        }
        return (
            <div>
                <span className={style['price-label']}>{t(label)}</span>
                <h2 className={`${style['content__price']} heading--3-2`}>
                    <img
                        src={nftDetails?.saleData?.auction?.tokenIcon}
                        alt=""
                    />
                    <div>
                        {Number(nftDetails?.saleData?.auction?.highestPrice)}{' '}
                        <span>{nftDetails?.saleData?.auction?.tokenPrice}</span>
                        {usdPrice(nftDetails?.saleData?.auction?.priceToUsd)}
                    </div>
                </h2>
            </div>
        )
    }
    return (
        <div>
            {/* <span className={style['price-label']}>{t('PRICE')}</span> */}
            <h2 className={`${style['content__price']} heading--3-2`}>
                <img src={nftDetails?.saleData?.fixPrice?.tokenIcon} alt="" />
                <div>
                    {Number(nftDetails?.saleData?.fixPrice?.price)}{' '}
                    <span>{nftDetails?.saleData?.fixPrice?.tokenPrice}</span>
                    {usdPrice(nftDetails?.saleData?.fixPrice?.priceToUsd)}
                </div>
            </h2>
        </div>
    )
}

export default PriceSection
