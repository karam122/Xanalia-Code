import tradingHistoryServices from '@/services/trading-history'
import { FetchError } from '@/store/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IListTradingHistory } from './types'

const initialState: IListTradingHistory = {
    isLoading: false,
    current: 1,
    pageSize: 30,
    dataShow: [],
    errorMessage: undefined,
    currentSort: undefined,
    totalPages: 0,
    totalItems: 0,
}

export const getAllTradingHistory = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('tradingHistorySliceList/getAll', async (data, { rejectWithValue }) => {
    try {
        const dataRequest = {
            page: data.page,
            limit: data.limit,
            nftId: data.nftId,
            collectionId: data.collectionId,
            sort: data.sort,
        }
        const allTradingHistory =
            await tradingHistoryServices.getAllTradingHistory(dataRequest)
        return { allTradingHistory, type: data.type }
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const tradingHistoryListSlice = createSlice({
    name: 'tradingHistoryListSlice',
    initialState,
    reducers: {
        clearTradingHistoryError: (state: IListTradingHistory) => {
            state.errorMessage = ''
        },
        resetTradingHistory: () => {
            return initialState
        },
        changePage: (
            state: IListTradingHistory,
            action: PayloadAction<number>,
        ) => {
            state.current = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTradingHistory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllTradingHistory.fulfilled, (state, action) => {
                state.isLoading = false

                const listTradingHistory =
                    action.payload?.allTradingHistory?.items || []
                const totalPages =
                    action.payload?.allTradingHistory?.meta?.totalPages
                const currentPage =
                    action.payload?.allTradingHistory?.meta?.currentPage
                const totalItems =
                    action.payload?.allTradingHistory?.meta?.totalItems

                state.current = currentPage
                state.totalPages = totalPages
                state.dataShow =
                    action.payload?.type === 'fetch'
                        ? listTradingHistory
                        : [...state.dataShow, ...listTradingHistory]
                state.totalItems = totalItems
            })
            .addCase(getAllTradingHistory.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
    },
})

export const { clearTradingHistoryError, resetTradingHistory, changePage } =
    tradingHistoryListSlice.actions

export default tradingHistoryListSlice.reducer
