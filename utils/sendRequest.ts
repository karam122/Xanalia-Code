import { storageRefreshToken, storageToken } from '@/constants/wallet'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { refreshToken as APIRefreshToken } from '@/services/auth'

async function sendRequest(
    payload: AxiosRequestConfig,
    doesReturnHeader: boolean = false,
): Promise<AxiosResponse<any, any> | any> {
    try {
        payload.headers = payload.headers
            ? payload.headers
            : { Authorization: 'Bearer ' + accessToken() }

        if (doesReturnHeader) {
            const rest = await axiosInstance.request(payload)
            return rest
        }

        const response = await axiosInstance.request(payload)

        return Promise.resolve(response?.data)
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (err: AxiosError) => {
        const { response, config } = err
        try {
            if (response?.status === 401) {
                const rest = await APIRefreshToken()

                if (!rest || !rest.data || !rest.data.newToken) {
                    if (!!location && !!localStorage) {
                        localStorage.clear()
                        location.href = location.origin
                    }
                    return response
                }

                setAccessToken(rest.data.newToken)

                config.headers!['Authorization'] =
                    'Bearer ' + rest.data.newToken

                return axiosInstance(config)
            } else if (response?.status === 403) {
                if (!!location && !!localStorage) {
                    localStorage.clear()
                    location.href = location.origin
                }
            } else if (response?.status === 455) {
                const { data } = err.response?.data as any
                if (
                    !!err.response?.data &&
                    !!data &&
                    !!location &&
                    !location.pathname.includes('maintenance')
                ) {
                    location.href = location.origin + '/maintenance'
                }
            }

            return response
        } catch (error) {
            return response
        }
    },
)

export function accessToken() {
    if (typeof localStorage === 'undefined') return undefined
    const token = localStorage.getItem(storageToken)
    return token === null ? undefined : token
}

export function setAccessToken(value?: string) {
    if (value) {
        localStorage.setItem(storageToken, value)
    } else {
        localStorage.removeItem(storageToken)
    }

    return value
}

export function refreshToken() {
    if (typeof localStorage === 'undefined') return undefined
    const token = localStorage.getItem(storageRefreshToken)
    return token === null ? undefined : token
}

export function setRefreshToken(value?: string) {
    if (value) {
        localStorage.setItem(storageRefreshToken, value)
    } else {
        localStorage.removeItem(storageRefreshToken)
    }

    return value
}

export default sendRequest
