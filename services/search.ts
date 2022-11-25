import sendRequest from '@/utils/sendRequest'

const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL

const searchByKeyword = (keyword: string) => {
    const res = sendRequest({
        url: `${API_BACKEND_URL}/users/search`,
        params: keyword,
    })

    return res
}

const searchServices = {
    searchByKeyword: searchByKeyword,
}

export default searchServices
