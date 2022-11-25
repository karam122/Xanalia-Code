import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { INFTDetail } from './types'
import { FetchError } from '@/store/types'
import nftServices from '@/services/nft'

const initialState: INFTDetail = {
    isLoading: true,
    nftDetails: {},
    errorMessage: undefined,
}

export const getNFTDetails = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('nftDetailSlice/getDetails', async (query, { rejectWithValue }) => {
    try {
        const nftDetails = await nftServices.getNFTDetails(query)
        return nftDetails
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const nftListSlice = createSlice({
    name: 'nftDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNFTDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNFTDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.nftDetails = action.payload
            })
            .addCase(getNFTDetails.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
    },
})

export default nftListSlice.reducer
