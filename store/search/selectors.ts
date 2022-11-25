import { RootState } from '..'

export const selectIsLoadingSearch = (state: RootState) =>
    state.search.isLoading
export const selectArtisSearch = (state: RootState) => state.search.artistSearch
export const selectCollectionSearch = (state: RootState) =>
    state.search.collectionSearch
export const selectNFTSearch = (state: RootState) => state.search.nftSearch
export const selectKeywordSearch = (state: RootState) => state.search.keyword
