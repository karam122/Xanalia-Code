import { RootState } from '..'
// import { IApp } from './types'

export const selectSidebarstate = (state: RootState): boolean =>
    state.app.sidebar

export const selectLoadingHomepage = (state: RootState): number => {
    return state.app.loadingHomePage
}

export const selectModalWallet = (state: RootState): boolean => {
    return state.app.isModalWallet
}
export const selectIsConnectingWallet = (state: RootState): boolean => {
    return state.app.isConnectingWallet
}
export const previousRoute = (state: RootState): string => {
    return state.app.previousRoute
}
export const selectedNftPage = (state: RootState): string => {
    return state.app.selectedNftPage
}
export const selectedNftId = (state: RootState): string => {
    return state.app.selectedNftId
}
export const showAnnouncement = (state: RootState): boolean => {
    return state.app.showAnnouncement
}
export const showRedirectUrl = (state: RootState): string => {
    return state.app.redirectUrl
}
