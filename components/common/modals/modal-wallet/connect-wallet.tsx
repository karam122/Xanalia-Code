/* eslint-disable @next/next/no-img-element */
import {
    getAddress,
    loadEventWallet,
    loadWallet,
    requestConnectToDApp,
    requestDisconnectDApp,
    signMessage,
} from '@/connect/ether'
import { signMessageToken, SupportedWallets } from '@/constants/wallet'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'
import ModalEnterEmailOfMagicLink from './modal-enter-email-of-magiclink'
import Modal from '@/components/ui/modals'
import { loginExternalWallet } from '@/services/auth'
import { setAccessToken, setRefreshToken } from '@/utils/sendRequest'
import { setUser } from '@/store/user/storage'
import { setDataUser } from '@/store/user/userSlice'
import { useTransHook } from '@/locales/hooks'
import { toast } from 'react-toastify'
import { isMobile } from 'react-device-detect'
import { UserErrorMessage } from '@/services/user'
import {
    selectIsConnectingWallet,
    selectModalWallet,
    showRedirectUrl,
} from '@/store/app/selectors'
import {
    setIsConnectingWallet,
    setModalWallet,
    setRedirectUrl,
} from '@/store/app/slice'
import { selectDataUser } from '@/store/user/selectors'
import { useRouter } from 'next/router'
// import { selectErrorFormCreateNFT } from '@/store/nft/selectors'

const ModalConnectWallet = () => {
    const isLoading = useSelector(selectIsConnectingWallet)
    const [isModalEmail, setModalEmail] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTransHook()
    const userData = useSelector(selectDataUser)
    const isModalWallet = useSelector(selectModalWallet)
    const navigateUrl: string = useSelector(showRedirectUrl)

    const dataWallet = isMobile
        ? [
              {
                  icon: '/svgs/wallet-connect.svg',
                  title: 'WALLET_WALLET_CONNECT_TITLE',
                  label: 'WALLET_WALLET_CONNECT_LABEL',
                  action: () => collectWallet(SupportedWallets.walletconnect),
              },
              {
                  icon: (
                      <div>
                          <img
                              src="/svgs/american-express.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                          <img
                              src="/svgs/dinners-club.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                          <img
                              src="/svgs/JCB.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                          <img
                              src="/svgs/union-pay.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                      </div>
                  ),
                  title: 'WALLET_CARD_TITLE',
                  label: 'WALLET_CARD_LABEL',
                  class: 'banks',
                  action: () => setModalEmail(true),
              },
          ]
        : [
              {
                  icon: '/svgs/metmask-icon.svg',
                  title: 'WALLET_METAMASK_TITLE',
                  label: 'WALLET_METAMASK_LABEL',
                  action: () => collectWallet(SupportedWallets.ethereum),
              },
              {
                  icon: '/svgs/binance-icon.svg',
                  title: 'WALLET_BINANCE_TITLE',
                  label: 'WALLET_BINANCE_LABEL',
                  action: () => collectWallet(SupportedWallets.binance),
              },
              {
                  icon: '/svgs/wallet-connect.svg',
                  title: 'WALLET_WALLET_CONNECT_TITLE',
                  label: 'WALLET_WALLET_CONNECT_LABEL',
                  action: () => collectWallet(SupportedWallets.walletconnect),
              },
              {
                  icon: (
                      <div>
                          <img
                              src="/svgs/american-express.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                          <img
                              src="/svgs/dinners-club.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                          <img
                              src="/svgs/JCB.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                          <img
                              src="/svgs/union-pay.svg"
                              draggable="false"
                              loading="lazy"
                              alt=""
                          />
                      </div>
                  ),
                  title: 'WALLET_CARD_TITLE',
                  label: 'WALLET_CARD_LABEL',
                  class: 'banks',
                  action: () => setModalEmail(true),
              },
          ]

    async function collectWallet(type: SupportedWallets, email?: string) {
        try {
            if (isLoading) return

            dispatch(setIsConnectingWallet(true))
            setModalEmail(false)

            await requestConnectToDApp(type, email)

            const address = await getAddress()

            const signature = (await signMessage(signMessageToken).catch(
                () => {},
            )) as string | undefined

            const rest = await loginExternalWallet({
                address,
                signature,
                email,
            }).catch(() => {})

            if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
                if (!!rest && !!(rest.data as any).messageCode) {
                    const msError = UserErrorMessage[rest.data.messageCode]
                    toast.error(t(msError.key))
                } else {
                    toast.error(JSON.stringify(rest?.data))
                }
                return requestDisconnectDApp()
            }

            setAccessToken(rest.data.access_token)
            setRefreshToken(rest.data.refresh_token)
            setUser(rest.data.user)
            dispatch(setDataUser(rest.data.user))

            if (navigateUrl && navigateUrl.length > 0) {
                router.push(navigateUrl)

                setTimeout(() => {
                    dispatch(setRedirectUrl(''))
                }, 1500)
            }

            await loadWallet(dispatch)
            loadEventWallet(dispatch)

            dispatch(setModalWallet(false))
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setIsConnectingWallet(false))
            setModalEmail(false)
        }
    }

    return (
        <>
            <Modal
                isVisible={
                    isModalWallet &&
                    !userData?.userWallet.address &&
                    !isModalEmail
                }
                setVisible={(val) => {
                    if (isLoading) return
                    dispatch(setModalWallet(val))
                }}
                classBody={style['modal-body']}
                dialogClassName={`${style['modal-dialog']}`}
            >
                <div className={`${style['g-wallet']}`}>
                    {dataWallet.map((obj, i) => (
                        <div
                            className={`${style['wallet']} ${obj.class || ''}`}
                            key={i}
                        >
                            <div onClick={obj.action}>
                                {typeof obj.icon === 'string' ? (
                                    <img
                                        src={obj.icon}
                                        draggable="false"
                                        loading="lazy"
                                        alt=""
                                    />
                                ) : (
                                    obj.icon
                                )}

                                <h5>{t(obj.title)}</h5>
                                <p className="text-body">{t(obj.label)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {isLoading && <div className={style['filter-loading']} />}
            </Modal>

            <ModalEnterEmailOfMagicLink
                isVisible={isModalEmail}
                setVisibleModal={(value) => setModalEmail(value)}
                submit={(email) =>
                    collectWallet(SupportedWallets.magiclink, email)
                }
            />
        </>
    )
}

export default ModalConnectWallet
