import { SortFilterItem } from '@/components/common/sort-filter'
import { RootState } from '..'

export const selectActiveSortFilter = (state: RootState): SortFilterItem =>
    state.sortNFT.activeSortItem
