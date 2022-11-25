// https://backend.xanalia.com/external-transactions/external-user-send-tx
import sendRequest from '@/utils/sendRequest'

const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL
const emitTransaction = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/external-transactions/external-user-send-tx',
        data: data,
        method: 'POST',
    })
    return res
}
const transactionServices = {
    emitTransaction,
}

export default transactionServices
