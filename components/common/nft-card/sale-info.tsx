import React from 'react'
import st from './style.module.scss'

type Props = {
    saleData: {
        fixPrice: any
        auction: any
    }
}

function SaleInfo({ saleData }: Props) {
    return (
        <div className={st['price']}>
            <img
                src={
                    saleData?.fixPrice?.tokenPriceIcon
                        ? saleData?.fixPrice?.tokenPriceIcon
                        : saleData?.auction?.tokenPriceIcon
                        ? saleData?.auction?.tokenPriceIcon
                        : '/svgs/eth-icon.svg'
                }
                alt="token icon"
            />
            <span className="nft-price">
                {Number(
                    saleData?.fixPrice
                        ? saleData?.fixPrice?.price
                        : saleData?.auction
                        ? saleData?.auction?.highestPrice
                        : 0,
                )}
            </span>
        </div>
    )
}

export default SaleInfo
