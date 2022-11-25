import DetailNFTHeader from '@/components/common/detail-nft-header'
import { selectNFTDetails, selectNFTDetailsError } from '@/store/nft/selectors'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import NotOnSaleAction from './not-on-sale-action'
import OnFixPriceAction from './on-fix-price-action'
import OnAuctionAction from './on-auction-action'
import { NFT_MARKET_STATUS } from '@/constants/nft'
import EndAuctionAction from './end-auction-action'
import UpCommingAuctionAction from './upcomming-auction-action'

const NFTHeader = () => {
    const nftDetails = useSelector(selectNFTDetails)

    const marketNftStatus = nftDetails?.marketNftStatus
    const errorMessage = useSelector(selectNFTDetailsError)

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
        }
    }, [errorMessage])

    const renderContentAction = useMemo(() => {
        switch (marketNftStatus) {
            case NFT_MARKET_STATUS.NOT_ON_SALE:
                return <NotOnSaleAction />
            case NFT_MARKET_STATUS.ON_FIX_PRICE:
                return <OnFixPriceAction />
            case NFT_MARKET_STATUS.ON_AUCTION:
                return <OnAuctionAction />
            case NFT_MARKET_STATUS.CANCEL_AUCTION:
            case NFT_MARKET_STATUS.END_AUCTION:
                return <EndAuctionAction />
            default:
                return <UpCommingAuctionAction />
        }
    }, [])

    return (
        <DetailNFTHeader
            isDetailPage
            dataPreviewNFT={nftDetails}
            nodeButton={renderContentAction}
        />
    )
}

export default NFTHeader
