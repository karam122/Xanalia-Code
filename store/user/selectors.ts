import { RootState } from '..'
import { IUser } from './type'

export const selectCurrentUser = (state: RootState): IUser => state.user
export const selectDataUser = (state: RootState) => state.user.dataUser
