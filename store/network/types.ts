import { INetwork } from '@/services/network'

export interface INetworkState {
    isLoading: boolean
    networksList: INetwork[]
    errorMessage: string | null
    currentNetwork: null
}
