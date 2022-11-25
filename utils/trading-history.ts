import { SORT_TRADING_HISTORY } from '@/constants/nft'
import { formatAddress } from './addressFormat'
export const getKeyEventByValue = (value: number) => {
    const key = SORT_TRADING_HISTORY[value]
    return key
}

export const getFromAddress = (from: string, action: number) => {
    switch (action) {
        case SORT_TRADING_HISTORY.MINT_NFT:
            return 'Null Address'
        default:
            return formatAddress(from)
    }
}

export const getToAddress = (to: string, action: number) => {
    switch (action) {
        case SORT_TRADING_HISTORY.PUT_ON_SALE:
        case SORT_TRADING_HISTORY.PUT_AUCTION:
        case SORT_TRADING_HISTORY.CANCEL_AUCTION:
        case SORT_TRADING_HISTORY.CANCEL_SALE_NFT:
        case SORT_TRADING_HISTORY.NFT_RECLAIMED:
            return ''
        default:
            return formatAddress(to)
    }
}
