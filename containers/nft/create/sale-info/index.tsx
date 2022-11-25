import { selectSaleType } from '@/store/nft/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { saleType as st } from '@/constants/nft'
import TimeAuction from '../time-auction/time-auction'
import FixPrice from '../fixed-price'

const SaleInfo = () => {
    const saleType = useSelector(selectSaleType)

    if (saleType === st.FIXEDPRICE) {
        return <FixPrice />
    }
    return <TimeAuction />
}

export default SaleInfo
