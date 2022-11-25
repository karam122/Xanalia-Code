import { compareAddress } from '@/utils/compareAddress'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectNFTDetailsOwner } from '@/store/nft/selectors'
import { AUCTION_SESSION_STATUS } from '@/constants/nft'
import CancelBid from './cancel-bid'
import AcceptBid from './accept-bid'
import ReclaimBid from './reclaim-bid'
import { selectDataUser } from '@/store/user/selectors'
type Props = {
    bidId: number
    auctionStatus: number
    auctionSessionId: number
    fromAddress: string
    expired: number
    priceBid: number
    receiveToken: string
}

const BidActions = (props: Props) => {
    const {
        bidId,
        fromAddress,
        expired,
        auctionStatus,
        auctionSessionId,
        priceBid,
        receiveToken,
    } = props

    const userData = useSelector(selectDataUser)
    const owner = useSelector(selectNFTDetailsOwner)

    if (
        compareAddress(owner?.address, userData?.userWallet?.address as string)
    ) {
        if (
            expired > Date.now() &&
            auctionStatus !== AUCTION_SESSION_STATUS.DONE
        )
            return (
                <AcceptBid
                    auctionSessionId={auctionSessionId}
                    bidId={bidId}
                    priceBid={priceBid}
                    receiveToken={receiveToken}
                />
            )
    }

    if (compareAddress(fromAddress, userData?.userWallet?.address as string)) {
        if (
            expired < Date.now() ||
            auctionStatus === AUCTION_SESSION_STATUS.DONE
        )
            return (
                <ReclaimBid auctionSessionId={auctionSessionId} bidId={bidId} />
            )
        return <CancelBid auctionSessionId={auctionSessionId} bidId={bidId} />
    }
    return null
}

export default BidActions
