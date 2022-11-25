export interface IListBid {
    isLoading: boolean
    current: number
    pageSize: number
    dataShow: any[]
    errorMessage: string | undefined
    currentSort: number
    totalPages: number
}
