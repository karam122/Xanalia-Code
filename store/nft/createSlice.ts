import nftServices from '@/services/nft'
import { FetchError } from '@/store/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataPreivewNFT, IGetPreviewInputData, ICreateNFT } from './types'
import {
    getNftType,
    MAX_IMAGE_SIZE,
    MAX_THUMBNAIL_SIZE,
    nftTypes,
    royaltyOptions,
    saleType,
    supportMediaType,
} from '@/constants/nft'
const MIN15 = 60000 * 15
const initialState: ICreateNFT = {
    generalInfo: {
        name: '',
        description: '',
        collectionId: 0,
    },

    categoryIds: [],
    price: undefined,
    royalty: 0,
    market: 0,

    receiveToken: 'string',
    networkId: 0,
    media: {
        main: '',
        thumbnail: '',
        type: '',
        mainFile: undefined,
        thumbnailFile: undefined,
    },
    sale: {
        saleType: saleType.FIXEDPRICE,
        price: '',
        aution: {
            minPrice: '',
            openTime: new Date().getTime() + 100000,
            closeTime: new Date().getTime() + MIN15 + 160000,
        },
    },
    network: {
        chainId: 0,
        basePrice: 'ETH',
    },
    filter: {
        royalty: royaltyOptions[0].value,
        nftType: nftTypes[0].value,
    },

    error: {
        filter: {
            nftType: '',
        },
        media: {
            mainFile: '',
            thumbnailFile: '',
        },
        generalInfo: {
            name: '',
        },
        sale: {
            price: '',
            openTime: '',
            closeTime: '',
            minPrice: '',
        },
    },
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

export const nftSliceCreate = createSlice({
    name: 'nftSliceCreate',
    initialState,
    reducers: {
        // media
        updateMedia: (
            state: ICreateNFT,
            action: PayloadAction<{
                main: string
                thumbnail: string
                type: string
                mainFile?: File
                thumbnailFile?: File
            }>,
        ) => {
            state.media = action.payload
            //  validate
            if (state.media.type && state.filter.nftType) {
                const nftType = getNftType(state.filter.nftType)
                if (
                    state.media.type &&
                    !nftType.supportTypes.includes(state.media.type)
                ) {
                    state.error.filter.nftType = nftType.invalidMessageKey
                } else if (state.error.filter.nftType) {
                    state.error.filter.nftType = ''
                }
            } else if (state.error.filter.nftType) {
                state.error.filter.nftType = ''
            }

            if (state.error.media.mainFile && state.media.mainFile) {
                state.error.media.mainFile = ''
            }

            if (state.error.media.thumbnailFile && state.media.thumbnailFile) {
                state.error.media.thumbnailFile = ''
            }
        },

        // general info
        updateGeneralInfo: (
            state: ICreateNFT,
            action: PayloadAction<{
                name: string
                description: string
                collectionId: number
            }>,
        ) => {
            state.generalInfo = action.payload
            if (
                state.error.generalInfo.name.trim() &&
                action.payload.name.trim() !== ''
            ) {
                state.error.generalInfo.name = ''
            }
        },

        updateSaleInfo: (
            state: ICreateNFT,
            action: PayloadAction<{
                field: 'saleType' | 'price' | 'aution'
                value: string | number | object
            }>,
        ) => {
            const { field, value } = action.payload
            console.log('🚀 ~ file: createSlice.ts ~ line 154 ~ value', value)
            try {
                switch (field) {
                    case 'saleType': {
                        state.sale.saleType = Number(value)
                        break
                    }
                    case 'price': {
                        if (
                            value.toString().length &&
                            !value.toString().endsWith('.')
                        ) {
                            state.sale.price = value.toString()
                        } else {
                            state.sale.price = value.toString()
                        }

                        if (state.error.sale.price && Number(value) !== 0) {
                            state.error.sale.price = ''
                        }
                        break
                    }

                    case 'aution': {
                        if (typeof value === 'object') {
                            state.sale.aution =
                                value as typeof state.sale.aution
                        }
                        if (state.sale.saleType === saleType.TIMEAUTION) {
                            const { closeTime, openTime, minPrice } =
                                state.sale.aution
                            if (
                                state.error.sale.openTime &&
                                openTime > Date.now()
                            ) {
                                state.error.sale.openTime = ''
                            }
                            if (
                                state.error.sale.closeTime &&
                                closeTime > openTime + MIN15
                            ) {
                                state.error.sale.closeTime = ''
                            }
                            console.log(state.error.sale.minPrice)
                            if (state.error.sale.minPrice && minPrice) {
                                state.error.sale.minPrice = ''
                            }
                        }

                        break
                    }
                }
            } catch (error) {}
        },
        updateNetworkInfo: (
            state: ICreateNFT,
            action: PayloadAction<{
                field: 'chainId' | 'basePrice'
                value: number | string
            }>,
        ) => {
            if (action.payload.field === 'chainId') {
                state.network.chainId = Number(action.payload.value)
            } else {
                state.network.basePrice = action.payload.value.toString()
            }
        },
        updateFilterInfo: (
            state: ICreateNFT,
            action: PayloadAction<{
                field: 'nftType' | 'royalty'
                value: number | string
            }>,
        ) => {
            if (action.payload.field === 'royalty') {
                state.filter.royalty = Number(action.payload.value)
            } else {
                state.filter.nftType = action.payload.value.toString()
                //  validate
                const nftType = getNftType(action.payload.value.toString())
                if (
                    state.media.type &&
                    !nftType.supportTypes.includes(state.media.type)
                ) {
                    state.error.filter.nftType = nftType.invalidMessageKey
                } else if (state.error.filter.nftType) {
                    state.error.filter.nftType = ''
                }
            }
        },
        validateNFTCreateForm: (state: ICreateNFT) => {
            if (!state.media.mainFile) {
                state.error.media.mainFile = 'ERROR_EMPTY_NFT_MAIN_FILE'
            }
            if (
                state.media.mainFile &&
                supportMediaType.image.includes(state.media.type) &&
                state.media.mainFile.size > MAX_IMAGE_SIZE
            ) {
                console.log(state.media.mainFile.size)
                state.error.media.mainFile = 'ERROR_MAX_FILE_SIZE_MAIN_FILE'
            }

            if (
                (supportMediaType.video.includes(state.media.type) ||
                    supportMediaType.audio.includes(state.media.type)) &&
                state.media.type !== '' &&
                !state.media.thumbnailFile
            ) {
                state.error.media.thumbnailFile =
                    'ERROR_EMPTY_NFT_THUMNAIL_FILE'
            }

            if (
                state.media.thumbnailFile &&
                state.media.thumbnailFile.size > MAX_THUMBNAIL_SIZE
            ) {
                state.error.media.thumbnailFile =
                    'ERROR_MAX_FILE_SIZE_NFT_THUMNAIL_FILE'
            }

            if (!state.generalInfo.name.trim()) {
                state.error.generalInfo.name = 'ERROR_EMPTY_NFT_NAME'
            }
            if (!Number(state.sale.price)) {
                state.error.sale.price = 'ERROR_EMPTY_NFT_FIX_PRICE'
            }
            if (state.sale.saleType === saleType.TIMEAUTION) {
                const { closeTime, openTime, minPrice } = state.sale.aution

                if (!openTime || openTime < Date.now()) {
                    state.error.sale.openTime =
                        'ERROR_INVALID_OPEN_TIME_AUTION1'
                }
                if (!closeTime || (openTime && closeTime < openTime + MIN15)) {
                    state.error.sale.closeTime =
                        'ERROR_INVALID_CLOSE_TIME_AUTION2'
                }

                if (!closeTime || closeTime < Date.now()) {
                    state.error.sale.closeTime =
                        'ERROR_INVALID_CLOSE_TIME_AUTION1'
                }

                if (!Number(minPrice)) {
                    state.error.sale.minPrice = 'ERROR_INVALID_PRICE_AUTION'
                }
            } else {
                if (!state.sale.price) {
                    state.error.sale.price = 'ERROR_EMPTY_NFT_FIX_PRICE'
                }
            }
        },
        resetCreateNft: () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
        // .addCase(getPreviewNFT.pending, (state) => {
        //     state.isLoading = true
        // })
        // .addCase(getPreviewNFT.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     const previewData = action.payload
        //     state.dataPreviewNFT = previewData
        // })
        // .addCase(getPreviewNFT.rejected, (state, action) => {
        //     if (action.payload) {
        //         state.errorMessage = action.payload.errorMessage
        //     } else {
        //         state.errorMessage = action.error.message
        //     }
        // })
    },
})

export const {
    updateMedia,
    updateGeneralInfo,
    updateSaleInfo,
    updateNetworkInfo,
    updateFilterInfo,
    validateNFTCreateForm,
    resetCreateNft,
} = nftSliceCreate.actions
export default nftSliceCreate.reducer
