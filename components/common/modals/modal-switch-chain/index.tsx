import Modal from '@/components/ui/modals'
import { selectWallet } from '@/store/wallet/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'
import { getNetwork, switchChain } from '@/connect/ether'
import { setChainID, setModalNetwork } from '@/store/wallet/walletSlice'
import { getWalletType } from '@/connect/wallet'
import { SupportedChainId } from '@/constants/chain'
import { accessToken } from '@/utils/sendRequest'
import SVGethereum from '@/public/svgs/ethereum-logo.svg'
import SVGbinance from '@/public/svgs/binance.svg'
import SVGpolygon from '@/public/svgs/polygon-logo.svg'
import { SupportedWallets } from '@/constants/wallet'
import { useTransHook } from '@/locales/hooks'

export const dataSwitchChain = [
    {
        key: Number(process.env.NEXT_PUBLIC_CHAINID_ETHEREUM),
        logo: <SVGethereum />,
        title: 'Ethereum',
        rpc: process.env.NEXT_PUBLIC_RPC_ETHEREUM,
        chainID: process.env.NEXT_PUBLIC_CHAINID_ETHEREUM,
    },
    {
        key: Number(process.env.NEXT_PUBLIC_CHAINID_BINANCE),
        logo: <SVGbinance />,
        title: 'Binance',
        rpc: process.env.NEXT_PUBLIC_RPC_BINANCE,
        chainID: process.env.NEXT_PUBLIC_CHAINID_BINANCE,
    },
    {
        key: Number(process.env.NEXT_PUBLIC_CHAINID_POLYGON),
        logo: <SVGpolygon className={style['polygon']} />,
        title: 'Polygon',
        rpc: process.env.NEXT_PUBLIC_RPC_POLYGON,
        chainID: process.env.NEXT_PUBLIC_CHAINID_POLYGON,
    },
]

export default function ModalSwitchChain() {
    const [clientOnly, setClientOnly] = useState(false)
    const { chainId, isModalNetwork } = useSelector(selectWallet)
    const [focus, setFocus] = useState<number | string | undefined>(undefined)
    const dispatch = useDispatch()
    const { t } = useTransHook()

    async function setChain(chainId: SupportedChainId) {
        if (focus !== undefined) return
        try {
            setFocus(chainId)
            const type = getWalletType()
            if (type && !!accessToken()) {
                const result = await switchChain(chainId)
                if (result) {
                    if (type === SupportedWallets.magiclink) {
                        const newChain = await getNetwork()
                        dispatch(setChainID(newChain?.chainId))
                    }

                    dispatch(setModalNetwork(false))
                }
            } else {
                dispatch(setChainID(chainId))
                dispatch(setModalNetwork(false))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setFocus(undefined)
        }
    }

    function isActiveChain(chainId?: SupportedChainId | number | string) {
        for (let i = 0; i < dataSwitchChain.length; i++) {
            if (dataSwitchChain[i].key === Number(chainId)) return true
        }

        return false
    }

    useEffect(() => setClientOnly(true), [])

    return (
        <Modal
            closeButton={isActiveChain(chainId)}
            isVisible={
                clientOnly && (isModalNetwork || !isActiveChain(chainId))
            }
            setVisible={(val) => dispatch(setModalNetwork(val))}
            classBody={style['switch-chain__modal']}
        >
            <h4
                className={`bold heading--4-1 ${style['switch-chain__modal__header']}`}
            >
                {t('SWITCH_NETWORK_TITLE')}
            </h4>

            <div className={style['switch-chain__g-chain']}>
                {dataSwitchChain.map((chain, i) => (
                    <div
                        className={`
                          ${style['switch-chain__chain']} 
                          ${chain.key === Number(focus || 0) ? 'focus' : ''}
                          ${chain.key === Number(chainId || 0) ? 'active' : ''}
                        `}
                        key={i}
                        onClick={() => setChain(chain.key)}
                    >
                        {chain.logo}
                        <p className="heading--5">{chain.title}</p>
                    </div>
                ))}
            </div>

            {!isActiveChain(chainId) && (
                <div
                    className={`${style['error-message']} nft-sale-status-error`}
                >
                    {t('SWITCH_NETWORK_ERROR', { chainId })}
                </div>
            )}
        </Modal>
    )
}
