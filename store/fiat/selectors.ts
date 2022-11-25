import { RootState } from '..'
import { IFiat } from './type'

export const selectFiat = (state: RootState): IFiat => state.fiat
