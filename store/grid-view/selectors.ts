import { RootState } from '..'

export const selectGridValue = (state: RootState): number => state.gridView.grid
