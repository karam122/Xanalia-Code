interface IPreviewNFTCommon {
    name: string
    avatar: string
    address?: string
}

export interface IDataPreivewNFT {
    title: string
    name: string
    description: string
    price: number
    tokenPrice: string
    idNFT: string
    thumnailUrl?: string
    mediaUrl: string
    creator: IPreviewNFTCommon
    collection: IPreviewNFTCommon
    owner: IPreviewNFTCommon
    category?: number
}

export interface INFTState {
    isOpenModalPreviewNFT: boolean
    dataPreviewNFT: IDataPreivewNFT | undefined
    isLoading: boolean
    errorMessage: string | undefined
}

export interface IGetPreviewInputData {
    collectionAddress: string
    nftId: string
}

export interface ICreateNFT {
    generalInfo: {
        name: string
        description: string
        collectionId: number
    }

    categoryIds: string[]
    price: Number | string | undefined
    royalty: Number
    market: Number
    receiveToken: 'string'
    networkId: Number

    media: {
        main: string
        thumbnail: string
        type: string
        mainFile?: File
        thumbnailFile?: File
    }
    sale: {
        saleType: number
        price: number | undefined | string
        aution: {
            openTime: number
            closeTime: number
            minPrice: string
        }
    }
    network: {
        chainId: number
        basePrice: string
    }
    filter: {
        royalty: number
        nftType: string
    }

    error: {
        filter: {
            nftType: string
        }
        media: {
            mainFile: string
            thumbnailFile: string
        }
        generalInfo: {
            name: string
        }
        sale: {
            price: string
            openTime: string
            closeTime: string
            minPrice: string
        }
    }
}

export interface INFTList {
    isLoading: boolean
    total: number
    current: number
    pageSize: number
    pageSizeMarketPlace: number
    dataShow: Array<any>
    errorMessage: string | undefined
}

export interface INFTDetail {
    nftDetails: any
    isLoading: boolean
    errorMessage: string | undefined
}

export interface ILikedNFT {
    isLoading: boolean
    liked: number[]
}
