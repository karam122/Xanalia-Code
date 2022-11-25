import { SupportedChainId } from '@/constants/chain'

export interface IWallet {
    isModalNetwork: boolean
    address?: string
    chainId?: SupportedChainId | undefined
}
