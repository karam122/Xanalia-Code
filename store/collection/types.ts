export interface ICreateCollection {
    name: string
    symbol: string
    description: string
    contract: string
    banner: string
    bannerFile?: File | undefined
    icon: string
    iconFile?: File | undefined

    error: {
        name: string
        symbol: string
        description: string
        banner: string
        icon: string
        contract: string
    }
}

export interface IListCollection {
    isLoading: boolean
    total: number
    current: number
    pageSize: number
    data: Array<any>
    dataShow: Array<any>
}

export interface IRankingCollection {
    isLoading: boolean
    total: number
    current: number
    pageSize: number
    data: Array<any>
    chain: number
    duration: number
    sort: number
}
