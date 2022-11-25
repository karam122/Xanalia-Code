/* eslint-disable no-unused-vars */
import { numberToHexadecimal } from '@/connect/utils'

export enum SupportedChains {
    ethereum = 'ethereum',
    polygon = 'polygon',
    binance = 'binance',
}

export enum SupportedChainId {
    MAINNET = 1,
    RINKEBY = 4,
    POLYGON = 137,
    POLYGON_MUMBAI = 80001,
    BSC_MAINNET = 56,
    BSC_TESTNET = 97,
}

export interface AddEthereumChainParameter {
    chainId: string // A 0x-prefixed hexadecimal string
    chainName: string
    nativeCurrency: {
        name: string
        symbol: string // 2-6 characters long
        decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls?: string[]
    iconUrls?: string[] // Currently ignored.
}

export const CHAIN_TO_IMAGE: { [key: string]: string } = {
    [SupportedChains.ethereum]:
        'https://ik.imagekit.io/xanalia/Images/Ethereum-logo.svg',
    [SupportedChains.polygon]:
        'https://ik.imagekit.io/xanalia/CollectionMainData/Polygon.svg',
    [SupportedChains.binance]:
        'https://ik.imagekit.io/xanalia/CollectionMainData/BitmapLogo.svg',
}

export const getSampleChain = (
    chainID: SupportedChainId | number | string,
): AddEthereumChainParameter | undefined => {
    if (Number(chainID) === SupportedChainId.MAINNET) {
        return {
            chainId: numberToHexadecimal(1),
            chainName: 'ETHER',
            nativeCurrency: {
                name: 'ETHER',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrls: ['https://mainnet.infura.io/v3/'],
            blockExplorerUrls: ['https://etherscan.io'],
        }
    }

    if (Number(chainID) === SupportedChainId.RINKEBY) {
        return {
            chainId: numberToHexadecimal(4),
            chainName: 'Rinkeby',
            nativeCurrency: {
                name: 'Rinkeby',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrls: ['https://rinkeby.infura.io/v3/'],
            blockExplorerUrls: ['https://rinkeby.etherscan.io'],
        }
    }

    if (Number(chainID) === SupportedChainId.BSC_MAINNET) {
        return {
            chainId: numberToHexadecimal(56),
            chainName: 'BSC',
            nativeCurrency: {
                name: 'BSC',
                symbol: 'BNB',
                decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed1.binance.org'],
            blockExplorerUrls: ['https://bscscan.com'],
        }
    }

    if (Number(chainID) === SupportedChainId.BSC_TESTNET) {
        return {
            chainId: numberToHexadecimal(97),
            chainName: 'BNB Smart Chain Testnet',
            nativeCurrency: {
                name: 'BNB Smart Chain Testnet',
                symbol: 'BNB',
                decimals: 18,
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
            blockExplorerUrls: ['https://testnet.bscscan.com'],
        }
    }

    if (Number(chainID) === SupportedChainId.POLYGON) {
        return {
            chainId: numberToHexadecimal(137),
            chainName: 'POLYGON',
            nativeCurrency: {
                name: 'POLYGON',
                symbol: 'MATIC',
                decimals: 18,
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com'],
        }
    }

    if (Number(chainID) === SupportedChainId.POLYGON_MUMBAI) {
        return {
            chainId: numberToHexadecimal(80001),
            chainName: 'Polygon Testnet',
            nativeCurrency: {
                name: 'Polygon Testnet',
                symbol: 'MATIC',
                decimals: 18,
            },
            rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com'],
        }
    }

    return undefined
}
