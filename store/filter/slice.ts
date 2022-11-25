import {
    CREATED_DRAFT_TYPES,
    CREATED_COLLECTED_FILTER,
} from '@/constants/filters'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterState } from './types'

const initialState: IFilterState = {
    createdDraftType: CREATED_DRAFT_TYPES[0].value,
    networkId: 0,
    collectionId: 0,
    createdCollectedFilter: CREATED_COLLECTED_FILTER[0].value,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        onUpdateFilter: (
            state: IFilterState,
            action: PayloadAction<{
                field:
                    | 'createdDraftType'
                    | 'createdCollectedFilter'
                    | 'networkId'
                    | 'collectionId'
                value: string | number
            }>,
        ) => {
            const { field, value } = action.payload
            switch (field) {
                case 'createdDraftType':
                    state.createdDraftType = value
                    break
                case 'createdCollectedFilter':
                    state.createdCollectedFilter = value
                    break
                case 'networkId':
                    state.networkId = Number(value)
                    break
                case 'collectionId':
                    state.collectionId = Number(value)
                default:
                    break
            }
        },
    },
})

export const { onUpdateFilter } = filterSlice.actions

export default filterSlice.reducer
