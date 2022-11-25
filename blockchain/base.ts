import { SupportedWallets } from '@/constants/wallet'
import { ethers } from 'ethers'
import { getProxy, getWalletType } from '../connect/wallet'

export function getProvider(type?: SupportedWallets) {
    if (typeof type === 'undefined') type = getWalletType()
    const proxy = getProxy(type)
    return new ethers.providers.Web3Provider(proxy, 'any')
}

export async function getContractInstance(
    contractABI: any,
    contractAddress: any,
) {
    const provider = getProvider()
    const signer = provider?.getSigner()
    const userAddress = await provider.listAccounts()

    return new ethers.Contract(
        contractAddress,
        contractABI,
        userAddress.length ? signer : provider,
    )
}

export async function getSigner() {
    const provider = await getProvider()
    const signer = await provider?.getSigner()
    return signer
}
