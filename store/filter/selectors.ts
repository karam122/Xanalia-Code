import { RootState } from '..'

export const selectCreatedDraftType = (state: RootState) => {
    return state.filter.createdDraftType
}

export const selectNetworkFilter = (state: RootState) => {
    return state.filter.networkId
}

export const selectCollectionIdFilter = (state: RootState) => {
    return state.filter.collectionId
}

export const selectCreatedSelectedFilter = (state: RootState) => {
    return state.filter.createdCollectedFilter
}

export const selectFilterObject = (state: RootState) => {
    return state.filter
}
