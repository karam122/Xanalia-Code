import { IDataPreivewNFT } from '@/store/nft/types'
import { getUser } from '@/store/user/storage'
import { getFileImageName } from '@/utils/image'
import sendRequest, { accessToken } from '@/utils/sendRequest'

const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL

interface INFT {
    name: string
    collectionId: number
    description: string
    networkId: number
    receiveToken: string
    // nftType: string
    price: number
    royalty: number
}

const getPreviewNFT = async ({
    collectionAddress,
    nftId,
}: {
    collectionAddress: string
    nftId: string
}): Promise<IDataPreivewNFT> => {
    console.log(collectionAddress, nftId)
    const result = {
        _id: '6277918e3bc17cb90ba16d8e',
        thumnailUrl: 'https://ik.imagekit.io/xanalia/1652003180492.1',
        likeCounter: 1463,
        nftName: 'ASTROBOY × MIZUTORI #0002',
        description:
            'Astroboy Genesis cards for NFTDuel are the limited premiere collection with 3D Animation, which has impressive features compared to Normal cards.',
        ownerName: 'XANA',
        price1: 0.4,
        price1Address: '0x9b12345',
        price2: 0.4,
        price2Address: '0xabcdabc',
        chainName: 'ethereum',
        tokenId: '0x16aC014Ed72c7D7D4318c7fFaF168CAAA3B6FaC3',
        creator: {
            name: 'Yukinori_Tokoro',
            avatar: 'https://xanalia.s3.amazonaws.com/userProfile/1627376854412.png',
        },
        collection: {
            name: 'Yukinori_Tokoro',
            avatar: 'https://xanalia.s3.amazonaws.com/userProfile/1627376854412.png',
        },
        owner: {
            name: 'Yukinori_Tokoro',
            avatar: 'https://xanalia.s3.amazonaws.com/userProfile/1627376854412.png',
        },
    }

    const data: IDataPreivewNFT = {
        title: result.ownerName,
        name: result.nftName,
        description: result.description,
        price: result.price1,
        idNFT: result._id,
        tokenPrice: 'ETH',
        mediaUrl: result.thumnailUrl,
        creator: result.creator,
        collection: result.collection,
        owner: result.owner,
    }

    const response = new Promise<IDataPreivewNFT>((resolve) =>
        setTimeout(() => resolve(data), 1000),
    )
    return response
}

const createNFT = async (data: INFT) => {
    return sendRequest({
        url: `${API_BACKEND_URL}/nfts`,
        method: 'POST',
        data,
    })
}

const getUploadData = ({
    mediaFile,
    nftId,
    type = '',
    previewMediaId = '',
}: {
    mediaFile: File
    nftId: number
    type?: string
    previewMediaId?: string
}) => {
    const userId = getUser()?.id
    const imageId = getFileImageName(mediaFile)
    const params = type
        ? {
              imageId,
              nftId,
              preview_img_id: previewMediaId,
              type,
          }
        : {
              imageId,
              nftId,
          }

    return sendRequest({
        url: `${API_GATEWAY_URL}/nft-image/${userId}/pre-signed`,
        method: 'PUT',
        params,
        headers: {
            Authorization: `${accessToken()}`,
        },
    })
}

const putNFTMedia = async ({
    mediaFile,
    nftId,
    uploadUrl,
    previewMediaId,
}: {
    mediaFile: File
    nftId: number
    uploadUrl: string
    previewMediaId?: string
}) => {
    const token = accessToken()

    const headers = {
        'x-amz-tagging': previewMediaId
            ? `token=${token}&nft_id=${nftId}&preview_img_id=${previewMediaId}`
            : `token=${token}&nft_id=${nftId}`,
        'Content-Type': mediaFile.type,
    }

    return sendRequest({
        url: uploadUrl,
        method: 'PUT',
        data: mediaFile,
        headers,
    })
}

const getAllMyNFTs = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/nfts',
        params: data,
    })
    return res
}

const getNFTByCollection = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/nfts/nfts-by-collection',
        params: data,
    })
    return res
}

const getNFTDetails = async (query: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/nfts/details',
        params: query,
        headers: {},
    })
    return res
    // const data = {
    //     name: 'ASTROBOY × MIZUTORI #0002',
    //     description:
    //         'Astroboy Genesis cards for NFTDuel are the limited premiere collection with 3D Animation, which has impressive features compared to Normal cards.',
    //     price: 0.4,
    //     nftId: 10,
    //     tokenId: 690,
    //     tokenPrice: 'ETH',
    //     thumnailUrl: 'https://ik.imagekit.io/xanalia/1652003180492.1',
    //     network: {
    //         networkId: 3,
    //         networkName: 'BSC',
    //     },
    //     creator: {
    //         name: 'Yukinori_Tokoro',
    //         avatar: 'https://xanalia.s3.amazonaws.com/userProfile/1627376854412.png',
    //         twitterLink: 'https://twitter.com/?lang=en',
    //         facebookLink: 'https://www.facebook.com/',
    //         instagramLink: 'https://www.instagram.com/?hl=en',
    //         description:
    //             'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores iste sapiente nobis deserunt accusamus officiis facilis sed asperiores voluptatum tempore voluptates nam minus cum sit, voluptatem non delectus vero ducimus?',
    //         address: '0xb567D9Abd7c7854463a0beFD2078',
    //     },
    //     collection: {
    //         name: 'Yukinori_Tokoro',
    //         avatar: 'https://xanalia.s3.amazonaws.com/userProfile/1627376854412.png',
    //         standard: 'ERC-721',
    //         address: '0xb567D9Abd7c7854463a0beFD2078',
    //     },
    //     owner: {
    //         name: 'Yukinori_Tokoro',
    //         avatar: 'https://xanalia.s3.amazonaws.com/userProfile/1627376854412.png',
    //         address: '0xb567D9Abd7c7854463a0beFD2078',
    //     },
    // }

    // const response = new Promise<any>((resolve) =>
    //     setTimeout(() => resolve(data), 1000),
    // )
    // return response
}

const putOnSale = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/sale-nft/put-on-sale',
        method: 'POST',
        data,
    })
    return res
}

const buyNFT = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/sale-nft/buy-nft',
        method: 'POST',
        data,
    })
    return res
}

const cancelSell = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/sale-nft/cancel-put-on-sale',
        method: 'POST',
        params: data,
    })
    return res
}

const putOnAuction = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + '/auction-session',
        method: 'POST',
        data,
    })
    return res
}

const cancelAuction = async (auctionId: number) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/auction-session/cancel/${auctionId}`,
        method: 'POST',
    })

    return res
}

const reclaimNFT = async (auctionId: number) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/auction/${auctionId}/reclaim-nft`,
    })

    return res
}

const placeBid = async (auctionId: number, data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/auction/${auctionId}/place-bid`,
        method: 'POST',
        data,
    })

    return res
}

const makeOffer = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/sale-nft/make-offer`,
        method: 'POST',
        data,
    })

    return res
}

const getTrendingNFT = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/nfts/nfts-ranking`,
        method: 'GET',
        params: data,
    })

    return res
}

const getDiscoverNFT = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/nfts/nfts-discover`,
        method: 'GET',
        params: data,
    })

    return res
}

const getAllNFTsByCategory = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/nfts/all-nfts-markets`,
        params: data,
    })
    return res
}

const getAllNFTsByUser = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/nfts/nft-by-address-user`,
        params: data,
    })
    return res
}

const getSliderNFT = async (data: object) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/nfts/nfts-slider`,
        method: 'GET',
        params: data,
    })

    return res
}

const editPrice = async (saleId: number, price: number) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/sale-nft?saleId=${saleId}`,
        method: 'PUT',
        data: {
            price: price,
        },
    })

    return res
}

const likeNFT = async (data: any) => {
    const res = await sendRequest({
        url: API_BACKEND_URL + `/nfts/like`,
        method: 'POST',
        data: data,
    })

    return res
}

const getNFTFilterByCollection = async (query: any) => {
    const res = await sendRequest({
        method: 'GET',
        url: API_BACKEND_URL + '/collections/nft/collectionId',
        params: query,
    })
    return res
}

const getAllNFTsByUserIncollection = async (query: any) => {
    const res = await sendRequest({
        method: 'GET',
        url: API_BACKEND_URL + '/collections/nft/owner/collectionId',
        params: query,
    })
    return res
}

const getNFTsCollectionLaunchpad = async (query: any) => {
    console.log(
        '🚀 ~ file: nft.ts ~ line 371 ~ getNFTsCollectionLaunchpad ~ query',
        query,
    )
    const res = await sendRequest({
        method: 'GET',
        url: API_BACKEND_URL + '/launchpad/nfts',
        params: query,
    })
    return res
    // console.log("🚀 ~ file: nft.ts ~ line 376 ~ getNFTsCollectionLaunchpad ~ res", res)
    // return {
    //     list: [],
    //     count: 0,
    // }
}

const editNFT = async (id: number, data: any) => {
    const res = await sendRequest({
        method: 'PUT',
        url: API_BACKEND_URL + `/nfts/${id}`,
        data,
    })
    return res
}

const nftServices = {
    getPreviewNFT,
    createNFT,
    getUploadData,
    putNFTMedia,
    getAllMyNFTs,
    getNFTDetails,
    putOnSale,
    buyNFT,
    cancelSell,
    putOnAuction,
    cancelAuction,
    reclaimNFT,
    placeBid,
    makeOffer,
    getNFTByCollection,
    getTrendingNFT,
    getDiscoverNFT,
    getSliderNFT,
    editPrice,
    getAllNFTsByCategory,
    likeNFT,
    getNFTFilterByCollection,
    getNFTsCollectionLaunchpad,
    getAllNFTsByUser,
    getAllNFTsByUserIncollection,
    editNFT,
}
export default nftServices
