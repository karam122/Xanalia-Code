import { SupportedChainId } from '@/constants/chain'
import { selectWallet } from '@/store/wallet/selectors'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'
import ModalSwitchChain, { dataSwitchChain } from '../modals/modal-switch-chain'
import { getChainId, setChainId } from '@/connect/wallet'
import {
    setChainID as RDSetChainID,
    setModalNetwork,
} from '@/store/wallet/walletSlice'

export default function BTNSwitchChain() {
    const { chainId } = useSelector(selectWallet)
    const dispatch = useDispatch()

    const getLogoChain = (chainId?: SupportedChainId) => {
        let result = undefined
        if (chainId) {
            for (let i = 0; i < dataSwitchChain.length; i++) {
                if (dataSwitchChain[i].key === Number(chainId)) {
                    result = dataSwitchChain[i].logo
                    break
                }
            }
        }
        return result
    }

    useEffect(() => {
        if (chainId !== undefined) {
            setChainId(chainId)
        } else {
            let chain = getChainId()
            chain = chain
                ? Number(chain)
                : Number(process.env.NEXT_PUBLIC_CHAINID_ETHEREUM)
            dispatch(RDSetChainID(chain))
        }
    }, [chainId])

    return (
        <>
            <div
                className={style['switch-chain__btn']}
                onClick={() => dispatch(setModalNetwork(true))}
            >
                {getLogoChain(chainId) || dataSwitchChain[0].logo}
            </div>

            <ModalSwitchChain />
        </>
    )
}
