import { SortFilterItem } from '@/components/common/sort-filter'
import { sortFilterList } from '@/constants/filters'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISortNFT } from './types'

const initialState: ISortNFT = {
    activeSortItem: sortFilterList[0],
}

export const sortNFTFilter = createSlice({
    name: 'sort-nft',
    initialState,
    reducers: {
        setActiveSortFilter: (
            state: ISortNFT,
            action: PayloadAction<SortFilterItem>,
        ) => {
            state.activeSortItem = action.payload
        },
        resetSortFilter: () => {
            return initialState
        },
    },
})

export const { setActiveSortFilter, resetSortFilter } = sortNFTFilter.actions
export default sortNFTFilter.reducer
