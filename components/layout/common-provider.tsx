/* eslint-disable no-unused-vars */

import {
    getAddress,
    loadEventWallet,
    loadWallet,
    requestConnectToDApp,
    requestDisconnectDApp,
    signMessage,
} from '@/connect/ether'
import magicLink from '@/connect/magic-link'
import { signMessageToken, SupportedWallets } from '@/constants/wallet'
import { useTransHook } from '@/locales/hooks'
import { loginExternalWallet } from '@/services/auth'
import { UserErrorMessage } from '@/services/user'
import { setIsConnectingWallet, setModalWallet } from '@/store/app/slice'
import { useAppDispatch } from '@/store/hooks'
import { selectNetworksList } from '@/store/network/selectors'
import { getNetworksList, setCurrentNetwork } from '@/store/network/slice'
import { selectCurrentUser } from '@/store/user/selectors'
import { setUser } from '@/store/user/storage'
import { setDataUser } from '@/store/user/userSlice'
import { selectWallet } from '@/store/wallet/selectors'
import { setAccessToken } from '@/utils/sendRequest'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CommonProvider = () => {
    // handle network
    const dispatch = useAppDispatch()

    const { chainId } = useSelector(selectWallet)
    const networksList = useSelector(selectNetworksList)
    const user = useSelector(selectCurrentUser)
    const dataUser = user.dataUser

    useEffect(() => {
        dispatch(getNetworksList())
    }, [])

    useEffect(() => {
        if (chainId && networksList && networksList.length) {
            let currentNetwork = networksList.find(
                (net) => net.chainId === chainId,
            )

            currentNetwork = currentNetwork ? currentNetwork : networksList[0]

            if (currentNetwork) {
                dispatch(setCurrentNetwork(currentNetwork))
            }
        }
    }, [networksList, chainId, dataUser])

    // handle login with magic link
    // const { t } = useTransHook()
    // const router = useRouter()
    // const query = router.query
    // const magic_credential = query.magic_credential
    // useEffect(() => {
    //     const loginWithMagicLink = async () => {
    //         if (magic_credential) {
    //             dispatch(setModalWallet(true))
    //             dispatch(setIsConnectingWallet(true))

    //             const proxy = magicLink.getProxy()
    //             await proxy?.auth.loginWithCredential()

    //             const userMetadata = await magicLink.getMetadata()

    //             const address = userMetadata?.publicAddress as string
    //             const email = userMetadata?.email as string

    //             await requestConnectToDApp(SupportedWallets.magiclink, email)

    //             const signature = (await signMessage(signMessageToken).catch(
    //                 () => {},
    //             )) as string | undefined

    //             const rest = await loginExternalWallet({
    //                 address,
    //                 signature,
    //                 email,
    //             }).catch(() => {})

    //             if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
    //                 if (!!rest && !!(rest.data as any).messageCode) {
    //                     const msError = UserErrorMessage[rest.data.messageCode]
    //                     toast.error(t(msError.key))
    //                 } else {
    //                     toast.error(JSON.stringify(rest?.data))
    //                 }
    //                 return requestDisconnectDApp()
    //             }

    //             setAccessToken(rest.data.access_token)
    //             setUser(rest.data.user)
    //             dispatch(setDataUser(rest.data.user))

    //             await loadWallet(dispatch)
    //             loadEventWallet(dispatch)

    //             dispatch(setModalWallet(false))
    //             dispatch(setIsConnectingWallet(false))
    //         }
    //     }
    //     loginWithMagicLink()
    // }, [magic_credential])

    return <div></div>
}

export default CommonProvider
