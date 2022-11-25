/* eslint-disable no-unused-vars */
import { getProvider } from '@/blockchain/base'
import { SupportedChainId } from '@/constants/chain'
import { SupportedWallets } from '@/constants/wallet'
import {
    InstanceWithExtensions,
    MagicSDKExtensionsOption,
    SDKBase,
} from '@magic-sdk/provider'
import { RPCProviderModule } from '@magic-sdk/provider/dist/types/modules/rpc-provider'
import { AbstractProvider } from 'web3-core'
import {
    EthNetworkConfiguration,
    LoginWithMagicLinkConfiguration,
    Magic,
    MagicUserMetadata,
    SupportedLocale,
} from 'magic-sdk'
import { dataSwitchChain } from '@/components/common/modals/modal-switch-chain'
import { getChainId } from './wallet'

const magicPublishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY

function getChain(chainID?: number | string | SupportedChainId) {
    if (!chainID) chainID = getChainId()
    if (!dataSwitchChain) return undefined
    const indexChain = dataSwitchChain.findIndex(
        (e) => Number(e.chainID) === Number(chainID),
    )
    if (indexChain === -1) return undefined
    return dataSwitchChain[indexChain]
}

let optionNetwork: EthNetworkConfiguration = getChain()?.rpc
    ? { rpcUrl: getChain()?.rpc || '' }
    : { rpcUrl: process.env.NEXT_PUBLIC_RPC_ETHEREUM as string }

function createMagicLinkProxy(
    network: EthNetworkConfiguration,
    locale: SupportedLocale,
) {
    if (typeof window === 'undefined' || !magicPublishableKey) return
    ;(window as any).MagicLink = new Magic(magicPublishableKey, {
        network,
        locale: locale,
    })
    ;(window as any).MagicLinkProvider = (window as any).MagicLink.rpcProvider
    return {
        MagicLink: (window as any).MagicLink,
        MagicLinkProvider: (window as any).MagicLinkProvider,
    }
}

function getLocalLanguage(): any {
    let language = 'en'

    if (window.location.href.includes('/ja')) {
        language = 'ja'
    } else if (window.location.href.includes('/ko')) {
        language = 'ko'
    } else if (window.location.href.includes('/zh_hans')) {
        language = 'zh_CN'
    } else if (window.location.href.includes('/zh')) {
        language = 'zh_TW'
    }

    return language
}

/* ====== Action ====== */

function getProxy():
    | InstanceWithExtensions<SDKBase, MagicSDKExtensionsOption<string>>
    | undefined {
    if (typeof window === 'undefined') return undefined
    const { MagicLink } = window as any

    if (typeof MagicLink !== 'undefined') {
        return MagicLink
    } else {
        const data = createMagicLinkProxy(optionNetwork, getLocalLanguage())
        return data?.MagicLink
    }
}

function getProxyProvider():
    | (RPCProviderModule & AbstractProvider)
    | undefined {
    if (typeof window === 'undefined') return undefined
    const { MagicLinkProvider } = window as any

    if (typeof MagicLinkProvider !== 'undefined') {
        return MagicLinkProvider
    } else {
        const data = createMagicLinkProxy(optionNetwork, getLocalLanguage())
        return data?.MagicLinkProvider
    }
}

async function getAddress() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.magiclink)
    const accounts = await provider.listAccounts()
    if (!accounts.length) return undefined

    const signer = provider.getSigner()
    return await signer.getAddress()
    // const userMetadata = await proxy.user.getMetadata()
    // console.log('PhuongNA', userMetadata)
    // return userMetadata.publicAddress as string | undefined
}

async function getNetwork() {
    const proxy = getProxy()
    if (!proxy) return undefined

    const provider = getProvider(SupportedWallets.magiclink)
    return await provider.getNetwork()
}

async function isLoggedIn() {
    const proxy = getProxy()
    if (!proxy) return undefined
    return await proxy.user.isLoggedIn()
}

async function enable(payload: LoginWithMagicLinkConfiguration) {
    try {
        if (await isLoggedIn()) return true
        const proxy = getProxy()
        if (proxy === undefined) return undefined
        return await proxy.auth.loginWithMagicLink(payload)
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
        await proxy.user.logout()
        ;(window as any).MagicLink = undefined
        ;(window as any).MagicLinkProvider = undefined
    } catch (error) {
        console.error(error)
        return false
    }
}

async function switchChain(chainID: number | string | SupportedChainId) {
    const chain = getChain(chainID)
    if (!chain?.rpc) return false

    const beforeOptionNetwork = JSON.parse(JSON.stringify(optionNetwork))

    try {
        const metadata = await getMetadata()
        if (!metadata?.email) return false

        optionNetwork = { rpcUrl: chain.rpc }
        createMagicLinkProxy(optionNetwork, getLocalLanguage())

        return true
    } catch (error) {
        optionNetwork = beforeOptionNetwork
        createMagicLinkProxy(optionNetwork, getLocalLanguage())
        return false
    }
}

async function getMetadata(): Promise<MagicUserMetadata | undefined> {
    const proxy = getProxy()
    const loggedIn = await isLoggedIn()
    if (!proxy || !loggedIn) return undefined
    return await proxy.user.getMetadata()
}

/* ====== Events ====== */

function onChainChanged(callback: (chainId?: string) => void) {
    const proxy = getProxyProvider()

    if (!proxy) {
        callback(undefined)
        return
    }

    proxy.on('chainChanged', (chainId: string) => callback(chainId))
}

function onAccountsChanged(callback: (accounts?: Array<string>) => void) {
    const proxy = getProxyProvider()

    if (typeof proxy === 'undefined') {
        callback(undefined)
        return
    }

    proxy.on('accountsChanged', (accounts: Array<string>) => callback(accounts))
}

export default {
    getProxy,
    getProxyProvider,
    enable,
    getAddress,
    getNetwork,
    isLoggedIn,
    onChainChanged,
    onAccountsChanged,
    disable,
    getMetadata,
    switchChain,
}
