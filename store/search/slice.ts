import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ISearch } from './types'
import { FetchError } from '@/store/types'
import searchServices from '@/services/search'

const initialState: ISearch = {
    isLoading: false,
    artistSearch: null,
    collectionSearch: null,
    nftSearch: null,
    errorMessage: undefined,
    keyword: '',
}

export const searchByKeyword = createAsyncThunk<
    any,
    any,
    {
        rejectValue: FetchError
    }
>('searchSlice/searchByKeyword', async (params, { rejectWithValue }) => {
    try {
        const searchResult = await searchServices.searchByKeyword(params)
        return searchResult
    } catch (error: any) {
        return rejectWithValue({ errorMessage: error.message } as FetchError)
    }
})

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        clearSearchValue: () => {
            return initialState
        },
        clearNFTError: (state: ISearch) => {
            state.errorMessage = ''
        },
        setKeyword: (state: ISearch, action: PayloadAction<string>) => {
            state.keyword = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchByKeyword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchByKeyword.fulfilled, (state, action) => {
                state.isLoading = false

                const artistSearch = action.payload?.artistSearch
                const collectionSearch = action.payload?.collectionSearch
                const nftSearch = action.payload?.nftSearch

                state.artistSearch = artistSearch
                state.collectionSearch = collectionSearch
                state.nftSearch = nftSearch
            })
            .addCase(searchByKeyword.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.errorMessage = action.payload.errorMessage
                } else {
                    state.errorMessage = action.error.message
                }
            })
    },
})

export const { clearSearchValue, clearNFTError, setKeyword } =
    searchSlice.actions

export default searchSlice.reducer
