import { AxiosResponse } from 'axios'
import sendRequest from 'utils/sendRequest'

const URL = process.env.NEXT_PUBLIC_API_BACKEND_URL + '/maintain'

export interface IMaintenance {
    id: number
    status: number
    updatedAt: Date
    title: string
    description: string
    endTime: Date
}

export function GetMaintenance(): Promise<
    AxiosResponse<IMaintenance> | undefined
> {
    return sendRequest({ url: URL, method: 'GET' }, true)
}
