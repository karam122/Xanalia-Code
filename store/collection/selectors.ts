import { RootState } from '..'

export const selectCreateCollection = (state: RootState) => {
    return state.collectionCreate
}
export const selectError = (state: RootState) => {
    return state.collectionCreate.error
}

export const selectListCollection = (state: RootState) => {
    return state.collectionList
}

export const selectListMarketCollection = (state: RootState) => {
    return state.marketCollections
}

export const selectCollectionRanking = (state: RootState) => {
    return state.collectionRanking
}
