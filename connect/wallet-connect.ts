/* eslint-disable no-unused-vars */
import { getProvider } from '@/blockchain/base'
import { AddEthereumChainParameter, SupportedChainId } from '@/constants/chain'
import { SupportedWallets } from '@/constants/wallet'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { numberToHexadecimal } from './utils'

function createWalletConnectProxy() {
    if (typeof window === 'undefined') return
    ;(window as any).walletconnect = new WalletConnectProvider({
        rpc: {
            [process.env.NEXT_PUBLIC_CHAINID_ETHEREUM as unknown as number]:
                process.env.NEXT_PUBLIC_RPC_ETHEREUM || '',
            [process.env.NEXT_PUBLIC_CHAINID_BINANCE as unknown as number]:
                process.env.NEXT_PUBLIC_RPC_BINANCE || '',
            [process.env.NEXT_PUBLIC_CHAINID_POLYGON as unknown as number]:
                process.env.NEXT_PUBLIC_RPC_POLYGON || '',
        },
    })
}
// createWalletConnectProxy()

/* ====== Action ====== */

function getProxy() {
    if (typeof window === 'undefined') return undefined
    const { walletconnect } = window as any

    if (typeof walletconnect !== 'undefined') {
        return walletconnect
    } else {
        createWalletConnectProxy()
        return (window as any).walletconnect
    }
}

async function getAddress() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.walletconnect)

    const accounts = await provider.listAccounts()
    if (!accounts.length) return undefined

    const signer = provider.getSigner()
    return await signer.getAddress()
}

async function getNetwork() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.walletconnect)
    return await provider.getNetwork()
}

async function isLoggedIn() {
    const proxy = getProxy()
    if (!proxy) return undefined
    return proxy.connected as Boolean
}

async function enable() {
    try {
        if (await isLoggedIn()) return true
        const proxy = getProxy()
        if (proxy === undefined) return undefined
        return await proxy.enable()
    } catch (error) {
        console.error(error)
        return false
    }
}

async function disable() {
    try {
        if (!(await isLoggedIn())) return true
        const proxy = getProxy()
        if (proxy === undefined) return undefined
        return await proxy.disconnect()
    } catch (error) {
        console.error(error)
        return false
    }
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
        if (String(error).includes('wallet_addEthereumChain') && sampleChain) {
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

    proxy.on('chainChanged', (chainId: string) =>
        callback(numberToHexadecimal(chainId)),
    )
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
    disable,
    getAddress,
    getNetwork,
    isLoggedIn,
    switchChain,
    onChainChanged,
    onAccountsChanged,
}
