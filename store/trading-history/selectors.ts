import { RootState } from '..'

export const selectTradingHistoryList = (state: RootState) => {
    return state.tradingHistoryList
}
