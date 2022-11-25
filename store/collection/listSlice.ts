import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IListCollection } from './types'
// import { FetchError } from '@/store/types'
import collectionServices from '@/services/collection'
const initialState: IListCollection = {
    isLoading: true,
    total: 0,
    current: 1,
    pageSize: 5,
    data: [],
    dataShow: [],
}

export const getMyCollections = createAsyncThunk<
    { total: number; collections: Array<any> },
    any
>('collection/getMyCollection', async (data: object) => {
    const myCollection = await collectionServices.getMyCollections(data)
    return myCollection
})

export const collectionSliceList = createSlice({
    name: 'collectionSliceList',
    initialState,
    reducers: {
        changePage: (state: IListCollection, action: PayloadAction<number>) => {
            state.current = action.payload
        },
        resetColectionList: () => {
            return initialState
        },
    },
    extraReducers: {
        [getMyCollections.pending.toString()]: (
            state: IListCollection,
            // action: PayloadAction<any>,
        ) => {
            state.isLoading = true
        },
        [getMyCollections.fulfilled.toString()]: (
            state: IListCollection,
            action: PayloadAction<any>,
        ) => {
            const total = action.payload?.total
            const data = action.payload?.data

            if (total && data) {
                state.total = total
                state.data = data
                state.dataShow = data
            }
            state.isLoading = false
        },
        [getMyCollections.rejected.toString()]: (
            state: IListCollection,
            // action: PayloadAction<any>,
        ) => {
            state.isLoading = false
        },
    },
})

export const { changePage, resetColectionList } = collectionSliceList.actions
export default collectionSliceList.reducer
