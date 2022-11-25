import sendRequest from '@/utils/sendRequest'

const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL

const getAllTradingHistory = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/sale-nft/trading-history',
        data,
        method: 'POST',
    })
    return res
}

const tradingHistoryServices = {
    getAllTradingHistory,
}

export default tradingHistoryServices
