import nftServices from '@/services/nft'
import { FetchError } from '@/store/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataPreivewNFT, IGetPreviewInputData, INFTState } from './types'

const initialState: INFTState = {
    isOpenModalPreviewNFT: false,
    dataPreviewNFT: undefined,
    isLoading: false,
    errorMessage: undefined,
}

export const getPreviewNFT = createAsyncThunk<
    IDataPreivewNFT,
    IGetPreviewInputData,
    {
        rejectValue: FetchError
    }
>('nft/getPreviewNFT', async (nftData, { rejectWithValue }) => {
    try {
        const { collectionAddress, nftId } = nftData
        const previewData = await nftServices.getPreviewNFT({
            collectionAddress,
            nftId,
        })
        return previewData
    } catch (error) {
        return rejectWithValue(error as FetchError)
    }
})

export const nftSlice = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        setOpenModalPreviewNFT: (
            state: INFTState,
            action: PayloadAction<boolean>,
        ) => {
            state.isOpenModalPreviewNFT = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPreviewNFT.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPreviewNFT.fulfilled, (state, action) => {
                state.isLoading = false
                const previewData = action.payload
                state.dataPreviewNFT = previewData
            })
            .addCase(getPreviewNFT.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
    },
})

export const { setOpenModalPreviewNFT } = nftSlice.actions
export default nftSlice.reducer
