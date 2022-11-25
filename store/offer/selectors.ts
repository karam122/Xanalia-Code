import { RootState } from '..'
import { IOfferList } from './type'

export const selectOfferList = (state: RootState): IOfferList => state.offerList

export const selectMakingOffer = (state: RootState): boolean =>
    state.offerList.makingOffer

export const selectOpenMakeOfferModal = (state: RootState): boolean =>
    state.offerList.openMakeOffer
