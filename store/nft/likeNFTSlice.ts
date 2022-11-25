import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ILikedNFT } from './types'
import { FetchError } from '@/store/types'
import nftServices from '@/services/nft'

const initialState: ILikedNFT = {
    isLoading: true,
    liked: [],
}

export const getAllLikedNFT = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('likeNFTsSice/getAllLikedNFT', async (data, { rejectWithValue }) => {
    try {
        const allNFTs = await nftServices.getAllMyNFTs(data)
        return allNFTs
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const likeNFT = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('likeNFTsSice/likeNFT', async (data, { rejectWithValue }) => {
    try {
        const allNFTs = await nftServices.getAllNFTsByCategory(data)
        return allNFTs
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const likeNFTSlice = createSlice({
    name: 'likeNFTSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLikedNFT.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllLikedNFT.fulfilled, (state, action) => {
                state.isLoading = false

                state.liked = action.payload.liked
            })
            .addCase(getAllLikedNFT.rejected, (state) => {
                state.isLoading = false
                state.liked = []
            })
            .addCase(likeNFT.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likeNFT.fulfilled, (state, action) => {
                console.log(
                    '🚀 ~ file: likeNFTSlice.ts ~ line 65 ~ .addCase ~ action',
                    action,
                )
                state.isLoading = false

                // const count = action.payload?.count
                // const list = action.payload?.list
            })
            .addCase(likeNFT.rejected, (state) => {
                state.isLoading = false
            })
    },
})

// export const { likeNFT, getAllLikedNFTs } = likeNFTSlice.actions

export default likeNFTSlice.reducer
