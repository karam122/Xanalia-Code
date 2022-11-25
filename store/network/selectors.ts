import { RootState } from '..'

export const selectNetworksList = (state: RootState) => {
    return state.network.networksList
}

export const selectCurrentNetwork = (state: RootState) => {
    return state.network.currentNetwork as any
}
