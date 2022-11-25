export interface IOfferList {
    isLoading: boolean
    current: number
    pageSize: number
    data: any[]
    errorMessage: string | undefined
    currentSort: number | undefined
    totalPages: number
    makingOffer: boolean
    openMakeOffer: boolean
}
