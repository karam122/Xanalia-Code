import sendRequest, {
    accessToken,
    refreshToken as getRefreshToken,
} from '@/utils/sendRequest'
import { AxiosResponse } from 'axios'
import { IUserData } from './user'

const URL = process.env.NEXT_PUBLIC_API_BACKEND_URL + '/auth/'

interface ILoginExternalWallet {
    messageCode: any
    access_token: string
    refresh_token: string
    user: IUserData
}

export async function loginExternalWallet({
    signature,
    address,
    email,
}: {
    signature?: string
    address?: string
    email?: string | null
}): Promise<AxiosResponse<ILoginExternalWallet> | undefined> {
    if (!address || !signature) return undefined

    const data = { signature, address, email }
    return sendRequest(
        {
            url: URL + 'login-external-wallet',
            method: 'POST',
            data,
        },
        true,
    )
}

export async function refreshToken(): Promise<
    AxiosResponse<{ newToken: string } | null> | undefined
> {
    const token = accessToken()
    const refreshToken = getRefreshToken()

    if (!token || !refreshToken) return undefined

    return sendRequest(
        {
            url: URL + 'refresh-token',
            method: 'POST',
            data: { token, refreshToken },
        },
        true,
    )
}
