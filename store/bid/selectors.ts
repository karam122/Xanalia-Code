import { RootState } from '..'

export const selectBidList = (state: RootState) => {
    return state.bidList
}
