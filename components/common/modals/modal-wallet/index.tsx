/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalConnectWallet from './connect-wallet'
import ModalDisConnectWallet from './disconnect-wallet'
import { loadEventWallet, loadUser, loadWallet } from '@/connect/ether'
import { selectDataUser } from '@/store/user/selectors'

const ModalWallet = () => {
    const userData = useSelector(selectDataUser)
    const [isConnected, setConnected] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => setConnected(!!userData?.userWallet.address), 1000)
    }, [userData?.userWallet.address])

    useEffect(() => {
        ;(async () => {
            await loadUser(dispatch)
            await loadWallet(dispatch)
            loadEventWallet(dispatch)
        })()
    }, [])

    return isConnected ? <ModalDisConnectWallet /> : <ModalConnectWallet />
}

export default ModalWallet
