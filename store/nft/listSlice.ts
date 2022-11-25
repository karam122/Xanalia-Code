import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { INFTList } from './types'
import { FetchError } from '@/store/types'
import nftServices from '@/services/nft'

const initialState: INFTList = {
    isLoading: true,
    total: 0,
    current: 1,
    pageSize: 5,
    pageSizeMarketPlace: 30,
    dataShow: [],
    errorMessage: undefined,
}

export const getAllMyNFTs = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('nftSliceList/getAll', async (data, { rejectWithValue }) => {
    try {
        const allNFTs = await nftServices.getAllMyNFTs(data)
        return allNFTs
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const getAllNFTsByCategory = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('nftSliceList/getAllNFTsByCategory', async (data, { rejectWithValue }) => {
    try {
        const allNFTs = await nftServices.getAllNFTsByCategory(data)
        return allNFTs
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const getAllNFTsByUser = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('nftSliceList/getAllNFTsByUser', async (data, { rejectWithValue }) => {
    try {
        const allNFTs = await nftServices.getAllNFTsByUser(data)
        return allNFTs
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const getAllNFTsByUserInCollection = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>(
    'nftSliceList/getAllNFTsByUserIncollection',
    async (data, { rejectWithValue }) => {
        try {
            const allNFTs = await nftServices.getAllNFTsByUserIncollection(data)
            return allNFTs
        } catch (error: any) {
            return rejectWithValue({
                errorMessage: error.message,
            } as FetchError)
        }
    },
)

export const getNFTFilterByCollection = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>(
    'nftSliceList/getNFTFilterByCollection',
    async (data, { rejectWithValue }) => {
        try {
            console.log('CACLLCLCALCLCL')
            const allNFTs = await nftServices.getNFTFilterByCollection(data)
            console.log('DADSADADD', allNFTs)
            return allNFTs
        } catch (error: any) {
            return rejectWithValue({
                errorMessage: error.message,
            } as FetchError)
        }
    },
)

export const getNFTsCollectionLaunchpad = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>(
    'nftSliceList/getNFTsCollectionLaunchpad',
    async (data, { rejectWithValue }) => {
        try {
            const allNFTs = await nftServices.getNFTsCollectionLaunchpad(data)
            // console.log('DADSADADD', allNFTs)
            return allNFTs
        } catch (error: any) {
            return rejectWithValue({
                errorMessage: error.message,
            } as FetchError)
        }
    },
)

export const nftListSlice = createSlice({
    name: 'nftListSlice',
    initialState,
    reducers: {
        changePage: (state: INFTList, action: PayloadAction<number>) => {
            state.current = action.payload
        },
        clearNFTError: (state: INFTList) => {
            state.errorMessage = ''
        },
        resetNFTList: () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMyNFTs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllMyNFTs.fulfilled, (state, action) => {
                state.isLoading = false

                const count = action.payload?.count
                const list = action.payload?.list

                state.total = count || 0
                state.dataShow = list || []
            })
            .addCase(getAllMyNFTs.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
            .addCase(getAllNFTsByCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllNFTsByCategory.fulfilled, (state, action) => {
                state.isLoading = false

                const count = action.payload?.count
                const list = action.payload?.list

                state.total = count
                state.dataShow = list || []
            })
            .addCase(getAllNFTsByCategory.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
            .addCase(getNFTFilterByCollection.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNFTFilterByCollection.fulfilled, (state, action) => {
                state.isLoading = false

                const count = action.payload?.count
                const list = action.payload?.list

                state.total = count
                state.dataShow = list || []
            })
            .addCase(getNFTFilterByCollection.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })

            .addCase(getNFTsCollectionLaunchpad.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNFTsCollectionLaunchpad.fulfilled, (state, action) => {
                console.log(
                    '🚀 ~ file: listSlice.ts ~ line 206 ~ .addCase ~ action',
                    action,
                )
                state.isLoading = false

                const count = action.payload?.count
                const list = action.payload?.list

                state.total = count
                state.dataShow = list || []
            })
            .addCase(getNFTsCollectionLaunchpad.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })

            .addCase(getAllNFTsByUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllNFTsByUser.fulfilled, (state, action) => {
                state.isLoading = false

                const count = action.payload?.count
                const list = action.payload?.list

                state.total = count
                state.dataShow = list || []
            })
            .addCase(getAllNFTsByUser.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
            .addCase(getAllNFTsByUserInCollection.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                getAllNFTsByUserInCollection.fulfilled,
                (state, action) => {
                    state.isLoading = false

                    const count = action.payload?.count
                    const list = action.payload?.list

                    state.total = count
                    state.dataShow = list || []
                },
            )
            .addCase(getAllNFTsByUserInCollection.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
    },
})

export const { changePage, clearNFTError, resetNFTList } = nftListSlice.actions

export default nftListSlice.reducer
