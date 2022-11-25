import { RootState } from '..'
import { IWallet } from './type'

export const selectWallet = (state: RootState): IWallet => state.wallet
