import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IOfferList } from './type'
import offerServices from '@/services/offers'
const initialState: IOfferList = {
    isLoading: false,
    current: 1,
    pageSize: 5,
    data: [],
    errorMessage: undefined,
    currentSort: undefined,
    totalPages: 0,
    makingOffer: false,
    openMakeOffer: false,
}
type Data = []
export const getOfferList = createAsyncThunk<Data, number | string>(
    'offer/getOfferOfNFT',
    async (nftId: any) => {
        const offers = await offerServices.getListOffer(nftId)
        return offers
    },
)

export const offerSlice = createSlice({
    name: 'offerList',
    initialState,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        resetOfferList: (state: IOfferList) => {
            return initialState
        },

        setMakingOffer: (state: IOfferList, action: PayloadAction<boolean>) => {
            state.makingOffer = action.payload
        },

        setOpenModal: (state: IOfferList, action: PayloadAction<boolean>) => {
            state.openMakeOffer = action.payload
        },
    },
    extraReducers: {
        [getOfferList.pending.toString()]: (state: IOfferList) => {
            state.isLoading = true
        },
        [getOfferList.fulfilled.toString()]: (
            state: IOfferList,
            action: PayloadAction<any>,
        ) => {
            state.data = action.payload
            state.isLoading = false
            state.makingOffer = false
            state.openMakeOffer = false
        },
        [getOfferList.rejected.toString()]: (state: IOfferList) => {
            state.makingOffer = false
            state.openMakeOffer = false
            state.isLoading = false
        },
    },
})

export const { resetOfferList, setMakingOffer, setOpenModal } =
    offerSlice.actions

export default offerSlice.reducer
