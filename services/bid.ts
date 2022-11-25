import sendRequest from '@/utils/sendRequest'

const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL

const fetchMoreBids = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/sale-nft/bid-history',
        params: data,
    })
    return res
}

const cancelBid = async ({
    aucctionSessionId,
    bidId,
}: {
    aucctionSessionId: number
    bidId: number
}) => {
    const res = await sendRequest({
        url:
            API_BACKEND_URL +
            `/auction/${aucctionSessionId}/cancel-bid/${bidId}`,
    })
    return res
}

const acceptBid = async ({
    aucctionSessionId,
    bidId,
}: {
    aucctionSessionId: number
    bidId: number
}) => {
    const res = await sendRequest({
        url:
            API_BACKEND_URL +
            `/auction/${aucctionSessionId}/accept-bid/${bidId}`,
    })
    return res
}

const bidServices = {
    fetchMoreBids,
    cancelBid,
    acceptBid,
}

export default bidServices
