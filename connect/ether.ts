/* eslint-disable no-unused-vars */
import { AnyAction, Dispatch } from 'redux'
import { signMessageToken, SupportedWallets } from '@/constants/wallet'
import { getProvider } from '@/blockchain/base'
import { Deferrable } from '@ethersproject/properties'
import { TransactionRequest } from '@ethersproject/abstract-provider'
import { setAddress, setChainID } from '@/store/wallet/walletSlice'

import metamask from './metamask'
import binance from './binance'
import walletConnect from './wallet-connect'
import magicLink from './magic-link'
import { getChainId, getProxy, getWalletType, setWalletType } from './wallet'
import {
    accessToken,
    setAccessToken,
    setRefreshToken,
} from '@/utils/sendRequest'
import { loginExternalWallet } from '@/services/auth'
import { getSampleChain, SupportedChainId } from '@/constants/chain'
import transactionServices from '@/services/transaction'
import { getUser, setUser } from '@/store/user/storage'
import { setDataUser } from '@/store/user/userSlice'
import { hexadecimalToNumber } from './utils'
import Web3 from 'web3'
import { BigNumber } from 'ethers'
import { nextTick } from 'process'

export async function getAddress() {
    const type = getWalletType()

    if (type === SupportedWallets.ethereum) return await metamask.getAddress()
    if (type === SupportedWallets.binance) return await binance.getAddress()
    if (type === SupportedWallets.walletconnect)
        return await walletConnect.getAddress()
    if (type === SupportedWallets.magiclink) return await magicLink.getAddress()

    return undefined
}

export async function getNetwork() {
    const type = getWalletType()

    if (type === SupportedWallets.ethereum) return await metamask.getNetwork()
    if (type === SupportedWallets.binance) return await binance.getNetwork()
    if (type === SupportedWallets.walletconnect)
        return await walletConnect.getNetwork()
    if (type === SupportedWallets.magiclink) return await magicLink.getNetwork()

    return undefined
}

export async function requestConnectToDApp(
    type: SupportedWallets,
    email?: string, // Required when logging in using the MagicLink method
) {
    setWalletType(type)

    if (type === SupportedWallets.ethereum) return await metamask.enable()
    if (type === SupportedWallets.binance) return await binance.enable()
    if (type === SupportedWallets.walletconnect)
        return await walletConnect.enable()
    if (type === SupportedWallets.magiclink && email)
        return await magicLink.enable({
            email,
            showUI: true,
        })

    return undefined
}

export async function requestDisconnectDApp() {
    const type = getWalletType()
    setWalletType(undefined)

    // if (type === SupportedWallets.ethereum) return await metamask
    // if (type === SupportedWallets.binance) return await binance
    if (type === SupportedWallets.walletconnect)
        return await walletConnect.disable()
    if (type === SupportedWallets.magiclink) return await magicLink.disable()
}

export async function isLoggedIn(): Promise<Boolean | undefined> {
    const type = getWalletType()
    if (!type) return undefined

    if (type === SupportedWallets.ethereum) return await metamask.isLoggedIn()
    if (type === SupportedWallets.binance) return await binance.isLoggedIn()
    if (type === SupportedWallets.walletconnect)
        return await walletConnect.isLoggedIn()
    if (type === SupportedWallets.magiclink) return await magicLink.isLoggedIn()

    return undefined
}

export async function signMessage(message: string) {
    const type = getWalletType()
    if (typeof getProxy(type) === 'undefined') return undefined

    const provider = getProvider()
    const accounts = await provider.listAccounts()
    if (!accounts.length) return undefined

    const signer = provider.getSigner()
    return await signer.signMessage(message)
}

export async function getBalance() {
    if (
        typeof getProxy(getWalletType()) === 'undefined' ||
        !(await isLoggedIn())
    )
        return undefined

    const provider = getProvider()
    const accounts = await provider.listAccounts()
    if (!accounts.length) return undefined

    const signer = provider.getSigner()
    return await signer.getBalance()
}

export async function sendTransaction(
    transaction: Deferrable<TransactionRequest>,
) {
    if (
        typeof getProxy(getWalletType()) === 'undefined' ||
        typeof transaction === 'undefined' ||
        !(await isLoggedIn())
    ) {
        return undefined
    }

    const provider = getProvider()
    const accounts = await provider.listAccounts()
    if (!accounts.length) return undefined

    if (typeof transaction.from === 'undefined') transaction.from = accounts[0]

    const signer = provider.getSigner()
    return signer.sendTransaction(transaction)
}

export async function switchChain(chainID: number | string | SupportedChainId) {
    const type = getWalletType()

    const sampleChain = getSampleChain(chainID)

    if (type === SupportedWallets.ethereum)
        return await metamask.switchChain(chainID, sampleChain)
    if (type === SupportedWallets.walletconnect)
        return await walletConnect.switchChain(chainID, sampleChain)
    if (type === SupportedWallets.magiclink)
        return await magicLink.switchChain(chainID)

    return undefined
}

/* Event */

export function onChainChanged(callback: (chainId?: string) => void) {
    const type = getWalletType()

    if (type === SupportedWallets.ethereum) metamask.onChainChanged(callback)
    if (type === SupportedWallets.binance) binance.onChainChanged(callback)
    if (type === SupportedWallets.walletconnect)
        walletConnect.onChainChanged(callback)
    if (type === SupportedWallets.magiclink) magicLink.onChainChanged(callback)
}

export function onAccountsChanged(
    callback: (accounts?: Array<string>) => void,
) {
    const type = getWalletType()

    if (type === SupportedWallets.ethereum) metamask.onAccountsChanged(callback)
    if (type === SupportedWallets.binance) binance.onAccountsChanged(callback)
    if (type === SupportedWallets.walletconnect)
        walletConnect.onAccountsChanged(callback)
    if (type === SupportedWallets.magiclink)
        magicLink.onAccountsChanged(callback)
}

/* ===== */

export async function loadUser(dispatch: Dispatch<AnyAction>) {
    const walletType = getWalletType()

    // Required because Wallet Connect does not connect to the DApp by itself
    if (walletType === SupportedWallets.walletconnect) {
        await requestConnectToDApp(SupportedWallets.walletconnect)
    }

    // If you are not logged in with your wallet, you will log out
    await new Promise((resolve) => setTimeout(() => resolve(true), 500))
    if (!walletType || !(await isLoggedIn()) || !(await getAddress())) {
        setAccessToken(undefined)
        setRefreshToken(undefined)
        setUser(undefined)
        dispatch(setDataUser(undefined))

        setWalletType(undefined)

        return
    }

    if (!!accessToken() && !!getUser()) {
        return
    }

    const signature = (await signMessage(signMessageToken).catch(() => {})) as
        | string
        | undefined

    const address = await getAddress()

    let email: string | undefined | null = undefined

    if (walletType === SupportedWallets.magiclink) {
        const userMetadata = await magicLink.getMetadata()
        email = userMetadata?.email
    }

    const rest = await loginExternalWallet({
        address,
        signature,
        email,
    }).catch(() => {})

    if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
        return requestDisconnectDApp()
    }

    setAccessToken(rest.data.access_token)
    setRefreshToken(rest.data.refresh_token)
    setUser(rest.data.user)
    dispatch(setDataUser(rest.data.user))
}

export async function loadWallet(dispatch: Dispatch<AnyAction>) {
    await getAddress().then((address) => dispatch(setAddress(address)))

    await getNetwork().then(async (network) => {
        const chainId = getChainId()
        if (!network?.chainId || network.chainId === chainId) return

        if (chainId) {
            const result = await switchChain(chainId).catch(() => {})
            dispatch(setChainID(result ? chainId : network?.chainId))
        } else {
            dispatch(setChainID(network?.chainId))
        }
    })
}

export function loadEventWallet(dispatch: Dispatch<AnyAction>) {
    const walletType = getWalletType()
    if (!walletType) return

    onAccountsChanged(async (accounts) => {
        const userData = getUser()
        const account =
            !!accounts && !!accounts.length ? accounts[0] : undefined
        if (
            !!userData &&
            String(account).toUpperCase() ===
                String(userData.userWallet.address).toUpperCase()
        ) {
            return
        }

        // Reset all user data when changing accounts
        setAccessToken(undefined)
        setRefreshToken(undefined)
        dispatch(setAddress(undefined))
        setUser(undefined)
        dispatch(setDataUser(undefined))

        if (!!accounts && !accounts.length) {
            // I need to reload page when user locks wallet or disconnect wallet
            if (typeof window !== 'undefined')
                nextTick(() => window.location.reload())
            return
        }

        const address = (await getAddress().catch(() => {})) as
            | string
            | undefined

        const signature = (await signMessage(signMessageToken).catch(
            () => {},
        )) as string | undefined

        let email: string | undefined | null = undefined

        if (walletType === SupportedWallets.magiclink) {
            const userMetadata = await magicLink.getMetadata()
            email = userMetadata?.email
        }

        const rest = await loginExternalWallet({
            address,
            signature,
            email,
        }).catch(() => {})

        if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
            return requestDisconnectDApp()
        }

        const result =
            !!accounts && accounts.length > 0 ? accounts[0] : undefined

        setAccessToken(rest.data.access_token)
        setRefreshToken(rest.data.refresh_token)
        dispatch(setAddress(result))
        setUser(rest.data.user)
        dispatch(setDataUser(rest.data.user))

        // I need to reload the DApp when done
        // if (typeof window !== 'undefined') window.location.reload()
        if (typeof window !== 'undefined')
            nextTick(() => window.location.reload())
    })

    onChainChanged((chainId) => {
        const result = !!chainId ? hexadecimalToNumber(chainId) : undefined

        dispatch(setChainID(result))
    })
}

const getGasPrice = async () => {
    const type = getWalletType()

    const provider = getProvider(type)

    return provider.getGasPrice()
}

const getGasLimit = async (data: any) => {
    const type = getWalletType()

    const provider = getProvider(type)

    return provider.estimateGas(data)
}

const estimateGasTransactions = async (transaction: any) => {
    const data: any = {
        from: transaction.from,
        to: transaction.to,
        data: transaction.data,
        nonce: transaction.nonce,
    }
    if (transaction.value) {
        data.value = transaction.value
    }

    const gasLimit = await getGasLimit(data)

    const gasPrice = await getGasPrice()

    return {
        gasLimit: Number(gasLimit),
        gasPrice: Number(gasPrice),
    }
}

export const sendCustomTransaction = async (
    transaction: any,
    action?: number,
    networkId?: number,
) => {
    const { gasLimit, gasPrice } = await estimateGasTransactions(transaction)
    transaction.gasLimit = gasLimit
    transaction.gasPrice = gasPrice
    console.log('🚀 ~ file: ether.ts ~ line 359 ~ transaction', transaction)

    const tx = await sendTransaction(transaction)
    // if (!action) {
    // console.log('CALL APPROVEED')
    const receipt = await tx?.wait()
    console.log('🚀 ~ file: ether.ts ~ line 368 ~ receipt', receipt)
    // }
    return tx

    // console.log("🚀 ~ file: ether.ts ~ line 371 ~ tx", tx)

    // // if (tx) {
    // //     if (networkId) {
    // //         const handleSaveTransaction =
    // //             await transactionServices.emitTransaction({
    // //                 txHash: tx.hash,
    // //                 action: action,
    // //                 networkId: networkId,
    // //             })

    // //         if (handleSaveTransaction) {
    // //             return handleSaveTransaction
    // //         }
    // //     } else {
    // //         return tx
    // //     }
    // // }
}
