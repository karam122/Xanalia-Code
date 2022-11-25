import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFiat } from './type'

const initialState: IFiat = {
    isModal: false,
}

export const fiatSlice = createSlice({
    name: 'fiat',
    initialState,
    reducers: {
        setModalFiat: (state: IFiat, action: PayloadAction<boolean>) => {
            state.isModal = action.payload
        },
    },
})

export const { setModalFiat } = fiatSlice.actions

export default fiatSlice.reducer
