/* eslint-disable no-unused-vars */
import { getProvider } from '@/blockchain/base'
import { SupportedWallets } from '@/constants/wallet'
import { webSiteBinance } from '@/constants/wallet'

/* ====== Action ====== */

function getProxy() {
    if (typeof window === 'undefined') return undefined
    const { BinanceChain } = window as any

    if (typeof BinanceChain !== 'undefined') return BinanceChain
}

async function getAddress() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.binance)
    const accounts = await provider.listAccounts()
    if (!accounts.length) return undefined

    const signer = provider.getSigner()
    return await signer.getAddress()
}

async function getNetwork() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.binance)
    return await provider.getNetwork()
}

async function isLoggedIn() {
    const proxy = getProxy()
    if (!proxy) return undefined
    return (await proxy.isConnected()) as Boolean
}

async function enable() {
    const proxy = getProxy()
    if (typeof proxy === 'undefined') {
        const { open } = window
        if (open) open(webSiteBinance, '_blank')
        return undefined
    }

    return await proxy.request({ method: 'eth_requestAccounts' })
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
    onChainChanged,
    onAccountsChanged,
    getAddress,
    getNetwork,
    isLoggedIn,
}
