export interface artistSearchItem {
    avatar: string | null
    name: string
    address: string
}

export interface collectionSearchItem {
    bannerImage: string | null
    iconImage: string | null
    name: string
    address?: string
    network?: string
    launchpadId?: number | string
    isOfficial?: number | string
}

export interface nftSearchItem {
    smallImage: string | null
    largeImage: string | null
    name: string
    collectionAddress: string
    network: string
    tokenId: string
}

export interface ISearch {
    isLoading: boolean
    artistSearch: artistSearchItem[] | null
    collectionSearch: collectionSearchItem[] | null
    nftSearch: nftSearchItem[] | null
    errorMessage: string | undefined
    keyword: string
}
