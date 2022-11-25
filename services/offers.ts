// https://backend.xanalia.com/external-transactions/external-user-send-tx
import sendRequest from '@/utils/sendRequest'

const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL
const getListOffer = async (nftId: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/sale-nft/offer-list/${nftId}`,
        method: 'GET',
    })
    return res
}

const cancelOffer = async (offerId: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/sale-nft/cancel-make-offer?id=${offerId}`,
        method: 'POST',
    })
    return res
}

const acceptOffer = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/sale-nft/accept-nft`,
        method: 'POST',
        data: data,
    })
    return res
}

const offerServices = {
    getListOffer,
    cancelOffer,
    acceptOffer,
}

export default offerServices
