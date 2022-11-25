import { useAppDispatch } from '@/store/hooks'
import { selectCurrentUser } from '@/store/user/selectors'
import { setModalNetwork } from '@/store/wallet/walletSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { useRouter } from 'next/router'
import { setModalWallet } from '@/store/app/slice'

const useActionAuth = (callback: any, isContinue = false) => {
    const dispatch = useAppDispatch()
    const user = useSelector(selectCurrentUser)
    const dataUser = user?.dataUser
    const currentNetwork = useSelector(selectCurrentNetwork)

    // handle reload page and action
    const [inProcess, setInProcess] = useState<boolean>(false)

    useEffect(() => {
        if (dataUser && inProcess && isContinue && currentNetwork) {
            callback()
        }
    }, [dataUser, currentNetwork])

    const actionAuth = () => {
        if (!dataUser) {
            // connect wallet
            dispatch(setModalWallet(true))
            setInProcess(true)
        } else {
            callback()
        }
    }

    return actionAuth
}

export default useActionAuth

export const useActionAuthNetwork = (callback: any, isContinue = false) => {
    const dispatch = useAppDispatch()
    const user = useSelector(selectCurrentUser)
    const dataUser = user?.dataUser
    const currentNetwork = useSelector(selectCurrentNetwork)
    const router = useRouter()
    const { networkName } = router.query

    // handle reload page and action
    const [inProcess, setInProcess] = useState<boolean>(false)

    const rightNetwork = (networkName as string)
        .toLowerCase()
        .includes(currentNetwork?.name.toLowerCase())

    useEffect(() => {
        if (dataUser && !rightNetwork && inProcess) {
            dispatch(setModalNetwork(true))
        }
        if (
            dataUser &&
            inProcess &&
            isContinue &&
            currentNetwork &&
            rightNetwork
        ) {
            dispatch(setModalNetwork(false))
            callback()
        }
    }, [dataUser, currentNetwork])

    const actionAuth = () => {
        if (!dataUser) {
            // connect wallet
            dispatch(setModalWallet(true))
            setInProcess(true)
        } else if (!rightNetwork) {
            dispatch(setModalNetwork(true))
            setInProcess(true)
        } else {
            callback()
        }
    }

    return actionAuth
}
