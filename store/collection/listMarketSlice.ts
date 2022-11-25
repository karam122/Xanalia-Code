import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IListCollection } from './types'
// import { FetchError } from '@/store/types'
import collectionServices from '@/services/collection'
const initialState: IListCollection = {
    isLoading: true,
    total: 0,
    current: 1,
    pageSize: 30,
    data: [],
    dataShow: [],
}

export const getMarketCollections = createAsyncThunk<
    { total: number; collections: Array<any> },
    any
>('collection/getMarketCollection', async (data: object) => {
    const collections = await collectionServices.getMaketCollection(data)
    return collections
})

export const collectionSliceList = createSlice({
    name: 'marketCollectionSliceList',
    initialState,
    reducers: {
        changePage: (state: IListCollection, action: PayloadAction<number>) => {
            state.current = action.payload
        },
    },
    extraReducers: {
        [getMarketCollections.pending.toString()]: (
            state: IListCollection,
            // action: PayloadAction<any>,
        ) => {
            state.isLoading = true
        },
        [getMarketCollections.fulfilled.toString()]: (
            state: IListCollection,
            action: PayloadAction<any>,
        ) => {
            const total = action.payload?.count
            const data = action.payload?.listCollectionAllUser
            console.log(
                '🚀 ~ file: listMarketSlice.ts ~ line 43 ~ action.payload',
                action.payload,
            )

            if (total && data) {
                state.total = total
                state.data = data
                state.dataShow = data
            }
            state.isLoading = false
        },
        [getMarketCollections.rejected.toString()]: (
            state: IListCollection,
            // action: PayloadAction<any>,
        ) => {
            state.isLoading = false
        },
    },
})

export const { changePage } = collectionSliceList.actions
export default collectionSliceList.reducer
