export type Data = {
    saleType: number
    fixedPrice: number | undefined
    startPrice: number | undefined
    startTime: number
    closeTime: number
    basePrice: number
    chainId: number
    error: {
        fixedPrice: string
        closeTime: string
        startTime: string
        startPrice: string
    }
}
