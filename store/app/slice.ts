import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IApp } from './types'

const initialState: IApp = {
    loading: 0,
    sidebar: false,
    loadingHomePage: 4, // slider / discover / trending nft / collection ranking, launch pad
    isModalWallet: false,
    isConnectingWallet: false,
    previousRoute: '',
    selectedNftPage: '',
    selectedNftId: '',
    showAnnouncement: true,
    redirectUrl: '',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state: IApp, action: PayloadAction<boolean>) => {
            const currentLoading = state.loading
            state.loading = action.payload
                ? currentLoading + 1
                : currentLoading - 1
        },
        setSidebar: (state: IApp, action: PayloadAction<boolean>) => {
            state.sidebar = action.payload
        },

        loadingHomepageSectionDone: (state: IApp) => {
            if (state.loadingHomePage >= 1) {
                state.loadingHomePage = state.loadingHomePage - 1
            }
        },
        resetLoadingHomepage: (state: IApp) => {
            state.loadingHomePage = initialState.loadingHomePage
        },
        setModalWallet: (state: IApp, action: PayloadAction<boolean>) => {
            state.isModalWallet = action.payload
        },
        setIsConnectingWallet: (
            state: IApp,
            action: PayloadAction<boolean>,
        ) => {
            state.isConnectingWallet = action.payload
        },
        setPreviousRoute: (state: IApp, action: PayloadAction<string>) => {
            state.previousRoute = action.payload
        },
        setSelectedNftPage: (state: IApp, action: PayloadAction<string>) => {
            state.selectedNftPage = action.payload
        },
        setSelectedNftId: (state: IApp, action: PayloadAction<string>) => {
            state.selectedNftId = action.payload
        },
        setShowAnnouncement: (state: IApp, action: PayloadAction<boolean>) => {
            state.showAnnouncement = action.payload
        },
        setRedirectUrl: (state: IApp, action: PayloadAction<string>) => {
            state.redirectUrl = action.payload
        },
    },
})

export const {
    setLoading,
    setSidebar,
    loadingHomepageSectionDone,
    resetLoadingHomepage,
    setModalWallet,
    setIsConnectingWallet,
    setPreviousRoute,
    setSelectedNftPage,
    setSelectedNftId,
    setShowAnnouncement,
    setRedirectUrl,
} = appSlice.actions

export default appSlice.reducer
