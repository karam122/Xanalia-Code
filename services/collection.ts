import sendRequest from '@/utils/sendRequest'
import { getFileImageName } from '@/utils/image'
import { getUser } from '@/store/user/storage'

const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL

const getCollections = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/actual-collections',
        params: data,
    })
    console.log(
        '🚀 ~ file: collection.ts ~ line 12 ~ getCollections ~ res',
        res,
    )
    return res
}

const getMyCollections = async (data: object) => {
    // console.log(
    //     '🚀 ~ file: collection.ts ~ line 20 ~ getMyCollections ~ data',
    //     data,
    // )

    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/actual-collections',
        params: data,
    })
    // console.log(
    //     '🚀 ~ file: collection.ts ~ line 12 ~ getCollections ~ res',
    //     res,
    // )
    return res
}

const getSelfCollections = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/self',
        params: data,
    })
    return res
}
const isCollectionExist = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/CollectionName',
        params: data,
    })
    return res
}

const createCollection = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections',
        method: 'POST',
        data: data,
    })

    return res
}

const getRankingCollection = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/ranking-collections',
        method: 'POST',
        data: data,
    })
    return res
}

// getPresignUrlCollectionAvatar: async data => {
//         const { imgFile } = data
//         const accessToken = localStorage.getItem('accessToken')
//         const userId = getUser()?.id
//         let imageId = getNFTImageName(imgFile)
//         try {
//             const res = await customAxios({
//                 method: 'put',
//                 url: `${awsEndpoint}/nft-image/${userId}/pre-signed`,
//                 params: {
//                     imageId,
//                     type: IMAGE_TYPE_UPLOAD.COLLECTION,
//                     collectionId: data?.collectionId
//                 },
//                 headers: {
//                     Authorization: `${accessToken}`
//                 }
//             })
//             return [res.data, null]
//         } catch (error) {
//             return [null, error]
//         }
//     },

const getUploadData = ({
    mediaFile,
    collectionId,
    type = '',
}: {
    mediaFile: File
    collectionId: number
    type?: string
}) => {
    const accessToken = localStorage.getItem('accessToken')
    const userId = getUser()?.id
    const imageId = getFileImageName(mediaFile)
    const params = type
        ? {
              imageId,
              collectionId,
              type,
          }
        : {
              imageId,
              collectionId,
          }

    return sendRequest({
        url: `${API_GATEWAY_URL}/nft-image/${userId}/pre-signed`,
        method: 'PUT',
        params,
        headers: {
            Authorization: `${accessToken}`,
        },
    })
}

const putCollectionMedia = async ({
    mediaFile,
    collectionId,
    uploadUrl,
    type,
}: {
    mediaFile: File
    collectionId: number
    uploadUrl: string
    previewMediaId?: string
    type: string
}) => {
    const accessToken = localStorage.getItem('accessToken')

    const headers = {
        'x-amz-tagging': `token=${accessToken}&collectionId=${collectionId}&type=${type}`,
        'Content-Type': mediaFile.type,
    }

    return sendRequest({
        url: uploadUrl,
        method: 'PUT',
        data: mediaFile,
        headers,
    })
}

export const getCollectionsByUser = async () => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/get-collection-with-nft',
    })
    return res
}

const getHotCollections = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/hot',
        params: data,
    })
    return res
}

const getLauchPadCollections = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/launchpad',
        params: data,
    })
    return res
}

const getMaketCollection = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections',
        params: data,
    })
    return res
}

const getCollectionDetail = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/collections/collectionId',
        params: data,
    })
    return res
}

const getCollectionInfo = async (query: any) => {
    const res = await sendRequest({
        method: 'GET',
        url: API_BACKEND_URL + '/collections/collectionId',
        params: query,
    })
    return res
}

const getCollectionLaunchPadInfo = async (query: any) => {
    // console.log(
    //     '🚀 ~ file: collection.ts ~ line 189 ~ getCollectionLaunchPadInfo ~ query',
    //     query,
    // )
    const res = await sendRequest({
        method: 'GET',
        url: API_BACKEND_URL + '/launchpad/detail',
        params: query,
    })
    return res

    // return {
    //     id: 97,
    //     name: 'Trang Princess',
    //     description: 'Trang Trangggg',
    //     contractAddress: '0xAb943D14dE294Ac12ba0E7C8269AfA14827dC7cC',
    //     createdAt: '2022-07-12T03:58:35.400Z',
    //     updatedAt: '2022-07-12T03:58:35.400Z',
    //     hashTransaction:
    //         '0xfc8fbb805f35330a588287f85fcbbf5dff2ce7d048168b15e2ef576544087a13',
    //     status: 1,
    //     symbol: 'trang',
    //     type: 4,
    //     isBlindbox: 0,
    //     iconImage:
    //         'https://prod-storage.rafaelsolutions.net/output/user-collective/114151/1657598316414.jpeg',
    //     bannerImage:
    //         'https://prod-storage.rafaelsolutions.net/output/collection-cover/114151/1657598319988.png',
    //     floorPrice: 0,
    //     volumeTraded: 0,
    //     totalNft: 0,
    //     totalOwner: 0,
    //     totalOnSale: 0,
    //     network: {
    //         image: 'https://storage.xanalia.com/icon/polygon_icon.svg',
    //         networkId: 2,
    //         networkName: 'Polygon',
    //     },
    //     user: {
    //         address: '0x26bbf5817219abc0e973e50b3694f59165a08a30',
    //         avatar: 'https://prod-storage.rafaelsolutions.net/output/user-avatar/114151/1657278503389.png',
    //         description: 'Princess :>',
    //         name: 'Trang_Lyss',
    //         userId: 114151,
    //     },
    // }
}

const updateCollection = async (id: number, data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/collections/${id}`,
        data: data,
        method: 'PUT',
    })
    return res
}
const getListNftOfCollection = async (query: any) => {
    const res = await sendRequest({
        method: 'GET',
        url: API_BACKEND_URL + '/collections/nft/collectionId',
        params: query,
        headers: {},
    })
    return res
}

const getMyNftInCollection = async (query: any) => {
    const res = await sendRequest({
        method: 'GET',
        url: API_BACKEND_URL + '/collections/nft/owner/collectionId',
        params: query,
        headers: {},
    })
    return res
}

const getCollectionActivity = async (payload: any) => {
    const res = await sendRequest({
        method: 'POST',
        url: API_BACKEND_URL + '/sale-nft/trading-history',
        data: { ...payload },
        headers: {},
    })
    return res
}

const collectionServices = {
    getCollectionLaunchPadInfo,
    getCollections,
    createCollection,
    putCollectionMedia,
    getUploadData,
    getMyCollections,
    getSelfCollections,
    getCollectionsByUser,
    getRankingCollection,
    getHotCollections,
    getMaketCollection,
    getCollectionDetail,
    updateCollection,
    getCollectionInfo,
    getListNftOfCollection,
    getMyNftInCollection,
    getCollectionActivity,
    getLauchPadCollections,
    isCollectionExist,
}

export default collectionServices
