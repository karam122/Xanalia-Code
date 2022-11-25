import { SupportedChainId } from '@/constants/chain'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWallet } from './type'

const initialState: IWallet = {
    isModalNetwork: false,
    address: undefined,
    chainId: undefined,
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setModalNetwork: (state: IWallet, action: PayloadAction<boolean>) => {
            state.isModalNetwork = action.payload
        },
        setAddress: (
            state: IWallet,
            action: PayloadAction<string | undefined>,
        ) => {
            state.address = action.payload
        },
        setChainID: (
            state: IWallet,
            action: PayloadAction<SupportedChainId | undefined>,
        ) => {
            state.chainId = action.payload
        },
    },
})

export const { setAddress, setChainID, setModalNetwork } = walletSlice.actions

export default walletSlice.reducer
