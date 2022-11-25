import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGridView } from './types'

const initialState: IGridView = {
    grid: 6,
}

export const appSlice = createSlice({
    name: 'grid-view',
    initialState,
    reducers: {
        setGridView: (state: IGridView, action: PayloadAction<number>) => {
            state.grid = action.payload
        },
        resetGridView: () => {
            return initialState
        },
    },
})

export const { setGridView, resetGridView } = appSlice.actions
export default appSlice.reducer
