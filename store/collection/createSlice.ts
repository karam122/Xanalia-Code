import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICreateCollection } from './types'

const initialState: ICreateCollection = {
    name: '',
    symbol: '',
    description: '',
    banner: '',
    contract: '',
    icon: '',
    bannerFile: undefined,
    iconFile: undefined,
    error: {
        name: '',
        symbol: '',
        description: '',
        banner: '',
        icon: '',
        contract: '',
    },
}

type fieldType =
    | 'name'
    | 'symbol'
    | 'description'
    | 'banner'
    | 'icon'
    | 'contract'
export const collectionSliceCreate = createSlice({
    name: 'collectionSliceCreate',
    initialState,
    reducers: {
        updateInfo: (
            state: ICreateCollection,
            action: PayloadAction<{ field: fieldType; value: string }>,
        ) => {
            const { field, value } = action.payload
            state[field] = value.toString()
            if (state.error[field] && value.trim()) {
                state.error[field] = ''
            }
        },
        updateFile: (
            state: ICreateCollection,
            action: PayloadAction<{
                field: 'bannerFile' | 'iconFile'
                value: File | undefined
            }>,
        ) => {
            const { field, value } = action.payload
            console.log('🚀 ~ file: createSlice.ts ~ line 34 ~ value', value)
            state[field] = value
            switch (field) {
                case 'bannerFile': {
                    if (value) {
                        state.banner = URL.createObjectURL(value)
                    } else {
                        state.banner = ''
                    }

                    if (state.error.banner) {
                        state.error.banner = ''
                    }
                    break
                }
                case 'iconFile': {
                    if (value) {
                        state.icon = URL.createObjectURL(value)
                    } else {
                        state.icon = ''
                    }

                    if (state.error.icon) {
                        state.error.icon = ''
                    }
                    break
                }

                default:
                    break
            }
            if (value) {
            }
        },
        resetCollection: (state: ICreateCollection) => {
            console.log('🚀 ~ file: createSlice.ts ~ line 36 ~ state', state)
            return initialState
        },

        validate: (state: ICreateCollection) => {
            if (!state.name.trim()) {
                state.error.name = 'ERROR_EMPTY_COLLECTION_NAME'
            }
            if (!state.symbol.trim()) {
                state.error.symbol = 'ERROR_EMPTY_COLLECTION_SYMBOL'
            }
            // if (!state.description.trim()) {
            //     state.error.description = 'ERROR_EMPTY_COLLECTION_DESCRIPTION'
            // }
            if (!state.bannerFile) {
                state.error.banner = 'ERROR_EMPTY_COLLECTION_BANNER'
            }

            if (!state.iconFile) {
                state.error.icon = 'ERROR_EMPTY_COLLECTION_ICON'
            }
        },
    },
    extraReducers: (builder) => {
        builder
    },
})

export const { updateFile, updateInfo, resetCollection, validate } =
    collectionSliceCreate.actions
export default collectionSliceCreate.reducer
