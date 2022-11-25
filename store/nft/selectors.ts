import { RootState } from '..'

export const selectIsOpenModalPreviewNFT = (state: RootState) =>
    state.nft.isOpenModalPreviewNFT
export const selectDataPreviewNFT = (state: RootState) =>
    state.nft.dataPreviewNFT
export const selectNFT = (state: RootState) => ({
    isLoading: state.nft.isLoading,
    errorMessage: state.nft.errorMessage,
})
export const selectNFTCreate = (state: RootState) => {
    return state.nftCreate
}

export const selectNFTCreateMedia = (state: RootState) => {
    return state.nftCreate.media
}

export const selectGeneralInfo = (state: RootState) => {
    return state.nftCreate.generalInfo
}
export const selectSaleInfo = (state: RootState) => {
    return state.nftCreate.sale
}

export const selectSaleType = (state: RootState) => {
    return state.nftCreate.sale.saleType
}

export const selectSalePrice = (state: RootState) => {
    return state.nftCreate.sale.price
}

export const selectSaleAutionInfo = (state: RootState) => {
    return state.nftCreate.sale.aution
}

export const selectNetworkInfo = (state: RootState) => {
    return state.nftCreate.network
}

export const selectFilterInfo = (state: RootState) => {
    return state.nftCreate.filter
}

export const selectError =
    (field: 'filter' | 'media' | 'generalInfo' | 'sale') =>
    (state: RootState) => {
        return state.nftCreate.error[field]
    }
export const selectErrorFormCreateNFT = (state: RootState) =>
    state.nftCreate.error

export const selectNFTList = (state: RootState) => state.nftList

export const selectNFTDetails = (state: RootState) => state.nftDetail.nftDetails
export const selectNFTDetailsError = (state: RootState) =>
    state.nftDetail.errorMessage
export const selectNFTDetailsIsLoading = (state: RootState) =>
    state.nftDetail.isLoading
export const selectNFTDetailsCreator = (state: RootState) =>
    state.nftDetail.nftDetails?.creator
export const selectNFTDetailsOwner = (state: RootState) =>
    state.nftDetail.nftDetails?.owner
export const selectNFTDetailsId = (state: RootState) =>
    state.nftDetail.nftDetails?.nftId

export const selectLikeNFT = (state: RootState) => state.likeNFT
