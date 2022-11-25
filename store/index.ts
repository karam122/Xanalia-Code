import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from '@/store/app/slice'
import nftReducer from '@/store/nft/slice'
import walletReducer from '@/store/wallet/walletSlice'
import nftCreateReducer from '@/store/nft/createSlice'
import collectionCreateReducer from '@/store/collection/createSlice'
import networkReducer from '@/store/network/slice'
import filterReducer from '@/store/filter/slice'
import collectionListReducer from './collection/listSlice'
import nftListReducer from './nft/listSlice'
import nftDetailReducer from './nft/detailSlice'
import userReducer from './user/userSlice'
import offerListReducer from './offer/offerSlice'
import bidListReducer from './bid/listSlice'
import fiatReducer from './fiat/fiatSlice'
import tradingHistoryListReducer from './trading-history/listSlice'
import collectionsMarket from './collection/listMarketSlice'
import gridViewReducer from './grid-view/slice'
import sortNFTReducer from './sort-nft/slice'
import likeNFTReducer from './nft/likeNFTSlice'
import searchReducer from './search/slice'
import collectionRanking from './collection/rankingSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
    app: appReducer,
    nft: nftReducer,
    nftCreate: nftCreateReducer,
    wallet: walletReducer,
    network: networkReducer,
    collectionCreate: collectionCreateReducer,
    collectionList: collectionListReducer,
    filter: filterReducer,
    nftList: nftListReducer,
    nftDetail: nftDetailReducer,
    user: userReducer,
    offerList: offerListReducer,
    bidList: bidListReducer,
    fiat: fiatReducer,
    tradingHistoryList: tradingHistoryListReducer,
    marketCollections: collectionsMarket,
    gridView: gridViewReducer,
    sortNFT: sortNFTReducer,
    likeNFT: likeNFTReducer,
    search: searchReducer,
    collectionRanking: collectionRanking,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user', 'wallet', 'network'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

// const reducer: typeof rootReducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             ...action.payload, // apply delta from hydration
//         }
//         return nextState
//     } else {
//         return rootReducer(state, action)
//     }
// }

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    'nftSliceCreate/updateMedia',
                    'collectionSliceCreate/updateFile',
                    'nftSliceList/getAll/rejected',
                    'nftSliceList/getAllNFTsByCategory/rejected',
                    'nftSliceList/getAllNFTsByUser/rejected',
                    'nftDetailSlice/getDetails/rejected',
                    'bidSliceList/getAll/rejected',
                    'bidSliceList/fetchMore/rejected',
                    'tradingHistorySliceList/getAll/rejected',
                    'searchSlice/searchByKeyword/rejected',
                    'nftSliceList/getNFTFilterByCollection/rejected',
                    'nftSliceList/getAllNFTsByUserIncollection/rejected',
                ],
                // Ignore these field paths in all actions
                // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: [
                    'nftCreate.media.mainFile',
                    'nftCreate.media.thumbnailFile',
                    'collectionCreate.bannerFile',
                    'collectionCreate.iconFile',
                    'nftList.errorMessage',
                    'nftDetail.errorMessage',
                    'bidList.errorMessage',
                    'tradingHistoryList.errorMessage',
                    'search.errorMessage',
                ],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
