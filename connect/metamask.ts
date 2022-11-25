/* eslint-disable no-unused-vars */
import { getProvider } from '@/blockchain/base'
import { AddEthereumChainParameter, SupportedChainId } from '@/constants/chain'
import { SupportedWallets } from '@/constants/wallet'
import { webSiteMetamask } from '@/constants/wallet'
import { numberToHexadecimal } from './utils'

/* ====== Action ====== */

function getProxy() {
    if (typeof window === 'undefined') return undefined
    const { ethereum } = window as any

    if (typeof ethereum !== 'undefined') return ethereum
}

async function getAddress() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.ethereum)
    const accounts = await provider.listAccounts()
    if (!accounts.length) return undefined

    const signer = provider.getSigner()
    return await signer.getAddress()
}

async function getNetwork() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.ethereum)
    return await provider.getNetwork()
}

async function isLoggedIn() {
    const proxy = getProxy()
    if (!proxy) return undefined
    return await new Promise<Boolean>((resolve) => {
        setTimeout(() => resolve(proxy.isConnected()), 50)
    })
}

async function enable() {
    const proxy = getProxy()
    if (typeof proxy === 'undefined') {
        const { open } = window
        if (open) open(webSiteMetamask, '_blank')
        return undefined
    }

    return await proxy.request({ method: 'eth_requestAccounts' })
}

async function switchChain(
    chainID: number | string | SupportedChainId,
    sampleChain?: AddEthereumChainParameter,
) {
    const proxy = getProxy()
    if (!proxy) return undefined

    try {
        await proxy.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: numberToHexadecimal(chainID) }],
        })
        return true
    } catch (error: any) {
        const { code } = error
        if (code === 4902 && sampleChain) {
            try {
                await proxy.request({
                    method: 'wallet_addEthereumChain',
                    params: [sampleChain],
                })
                return true
            } catch (error) {
                return false
            }
        }
        return false
    }
}

/* ====== Events ====== */

function onChainChanged(callback: (chainId?: string) => void) {
    const proxy = getProxy()

    if (!proxy) {
        callback(undefined)
        return
    }

    proxy.on('chainChanged', (chainId: string) => callback(chainId))
}

function onAccountsChanged(callback: (accounts?: Array<string>) => void) {
    const proxy = getProxy()

    if (typeof proxy === 'undefined') {
        callback(undefined)
        return
    }

    proxy.on('accountsChanged', (accounts: Array<string>) => callback(accounts))
}

export default {
    getProxy,
    enable,
    getAddress,
    getNetwork,
    isLoggedIn,
    switchChain,
    onChainChanged,
    onAccountsChanged,
}
