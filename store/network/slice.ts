import networkServices, { INetwork } from '@/services/network'
import { FetchError } from '@/store/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INetworkState } from './types'

const initialState: INetworkState = {
    isLoading: false,
    networksList: [],
    errorMessage: null,
    currentNetwork: null,
}

export const getNetworksList = createAsyncThunk<
    any,
    void,
    {
        rejectValue: FetchError
    }
>('network/getNetworksList', async (args, { rejectWithValue }) => {
    // console.log(args)
    try {
        const networksList = await networkServices.getNetworksList()
        return networksList
    } catch (error) {
        return rejectWithValue(error as FetchError)
    }
})

export const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        networksReceived: (
            state: INetworkState,
            action: PayloadAction<Array<INetwork>>,
        ) => {
            state.networksList = action.payload
        },
        setCurrentNetwork: (
            state: INetworkState,
            action: PayloadAction<any>,
        ) => {
            state.currentNetwork = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNetworksList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNetworksList.fulfilled, (state, action) => {
                state.isLoading = false
                state.networksList = action.payload
            })
            .addCase(getNetworksList.rejected, (state, action) => {
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message as string
                }
            })
    },
})

export const { networksReceived, setCurrentNetwork } = networkSlice.actions

export default networkSlice.reducer
