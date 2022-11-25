import { IUserData } from '@/services/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './type'

const initialState: IUser = {
    dataUser: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataUser: (
            state: IUser,
            action: PayloadAction<IUserData | undefined>,
        ) => {
            state.dataUser = action.payload
        },
    },
})

export const { setDataUser } = userSlice.actions

export default userSlice.reducer
