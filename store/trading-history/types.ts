export interface IListTradingHistory {
    isLoading: boolean
    current: number
    pageSize: number
    dataShow: any[]
    errorMessage: string | undefined
    currentSort: number | undefined
    totalPages: number
    totalItems: number
}
