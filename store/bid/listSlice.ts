import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IListBid } from './types'
import { FetchError } from '@/store/types'
import bidServices from '@/services/bid'
import { SORT_BID_HISTORY } from '@/constants/nft'

const initialState: IListBid = {
    isLoading: true,
    current: 1,
    pageSize: 5,
    dataShow: [],
    errorMessage: undefined,
    currentSort: SORT_BID_HISTORY.NEWEST,
    totalPages: 0,
}

export const fetchMoreBids = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('bidSliceList/fetchMore', async (data, { rejectWithValue }) => {
    try {
        const allBids = await bidServices.fetchMoreBids(data)
        return allBids
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const getAllBids = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('bidSliceList/getAll', async (data, { rejectWithValue }) => {
    try {
        const allBids = await bidServices.fetchMoreBids(data)
        return allBids
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const bidListSlice = createSlice({
    name: 'bidListSlice',
    initialState,
    reducers: {
        clearBidError: (state: IListBid) => {
            state.errorMessage = ''
        },
        // eslint-disable-next-line
        resetHistoryBid: (state: IListBid) => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoreBids.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchMoreBids.fulfilled, (state, action) => {
                state.isLoading = false

                const listHistoryBid = action.payload?.items
                const totalPages = action.payload?.meta?.totalPages
                const currentPage = action.payload?.meta?.currentPage

                state.current = currentPage
                state.totalPages = totalPages
                state.dataShow = [...state.dataShow, ...listHistoryBid]
            })
            .addCase(fetchMoreBids.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
            .addCase(getAllBids.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBids.fulfilled, (state, action) => {
                state.isLoading = false

                const listHistoryBid = action.payload?.items
                const totalPages = action.payload?.meta?.totalPages
                const currentPage = action.payload?.meta?.currentPage

                state.current = currentPage
                state.totalPages = totalPages
                state.dataShow = listHistoryBid
            })
            .addCase(getAllBids.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
    },
})

export const { clearBidError, resetHistoryBid } = bidListSlice.actions

export default bidListSlice.reducer
