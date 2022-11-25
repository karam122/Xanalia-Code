import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IRankingCollection } from './types'
// import { FetchError } from '@/store/types'
import collectionServices from '@/services/collection'
const initialState: IRankingCollection = {
    isLoading: true,
    total: 0,
    current: 1,
    pageSize: 100,
    chain: 0,
    duration: 0,
    sort: 0,
    data: [],
}

export const getRankingCollection = createAsyncThunk<
    { total: number; collections: Array<any> },
    any
>('collection/ranking', async (data: object) => {
    const rankingCollection = await collectionServices.getRankingCollection(
        data,
    )
    return rankingCollection
})

export const collectionSliceList = createSlice({
    name: 'collectionRankingSlice',
    initialState,
    reducers: {
        changePage: (
            state: IRankingCollection,
            action: PayloadAction<number>,
        ) => {
            state.current = action.payload
        },
        changeFilter: (
            state: IRankingCollection,
            action: PayloadAction<{
                field: 'chain' | 'duration' | 'sort'
                value: number
            }>,
        ) => {
            const { field, value } = action.payload

            state[field] = value
            state.current = 1
        },
    },
    extraReducers: {
        [getRankingCollection.pending.toString()]: (
            state: IRankingCollection,
            // action: PayloadAction<any>,
        ) => {
            state.isLoading = true
        },
        [getRankingCollection.fulfilled.toString()]: (
            state: IRankingCollection,
            action: PayloadAction<any>,
        ) => {
            const total = action.payload?.meta.totalItems
            const data = action.payload?.items
            console.log('🚀 ~ file: rankingSlice.ts ~ line 62 ~ data', data)

            if (data !== undefined) {
                state.total = total
                state.data = data
            }
            state.isLoading = false
        },
        [getRankingCollection.rejected.toString()]: (
            state: IRankingCollection,
            // action: PayloadAction<any>,
        ) => {
            state.isLoading = false
        },
    },
})

export const { changePage, changeFilter } = collectionSliceList.actions
export default collectionSliceList.reducer
