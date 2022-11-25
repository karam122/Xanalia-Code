/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'
import XMarkIcon from '@/public/svgs/fa-xmark.svg'
import CopyIcon from '@/public/svgs/copy.svg'
import PolygonIcon from '@/public/svgs/polygon-logo.svg'
import UserIcon from '@/public/svgs/fi-rs-user.svg'
import { addressSplice } from '@/connect/utils'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { selectWallet } from '@/store/wallet/selectors'
import { setAccessToken, setRefreshToken } from '@/utils/sendRequest'
import { requestDisconnectDApp } from '@/connect/ether'
import { setAddress } from '@/store/wallet/walletSlice'
import Modal from '@/components/ui/modals'
import { getSampleChain } from '@/constants/chain'
import { setUser } from '@/store/user/storage'
import { setDataUser } from '@/store/user/userSlice'
import { useTransHook } from '@/locales/hooks'
import { useRouter } from 'next/router'
import copyTextUtil from '@/utils/copy'
import { selectDataUser } from '@/store/user/selectors'
import { selectModalWallet } from '@/store/app/selectors'
import { setModalWallet } from '@/store/app/slice'

const ModalDisConnectWallet = () => {
    const { chainId } = useSelector(selectWallet)
    const isModalWallet = useSelector(selectModalWallet)
    const userData = useSelector(selectDataUser)
    const dispatch = useDispatch()
    const { t } = useTransHook()
    const [isCopied, setCopied] = useState('CLICK_TO_COPY')
    const router = useRouter()

    function setVisibleModal(val: boolean) {
        dispatch(setModalWallet(val))
    }

    function copyText(text: string) {
        copyTextUtil(text).then(() => {
            setCopied('ADDRESS_COPIED')
            setTimeout(() => setCopied('CLICK_TO_COPY'), 3000)
        })
    }

    function disconnectWallet() {
        setAccessToken(undefined)
        setRefreshToken(undefined)

        setUser(undefined)
        dispatch(setDataUser(undefined))

        dispatch(setAddress(undefined))

        requestDisconnectDApp()

        setVisibleModal(false)

        // I need to reload page when user disconnect wallet
        if (typeof window !== 'undefined')
            setTimeout(() => {
                window.location.reload()
            }, 2000)
    }

    function getBlockExplorerUrls(chainId: number) {
        const result = getSampleChain(chainId)?.blockExplorerUrls
        return result ? result[0] : undefined
    }

    function getchainName(chainId: number) {
        return getSampleChain(chainId)?.chainName
    }

    return (
        <Modal
            isVisible={
                isModalWallet && !!userData && !!userData.userWallet.address
            }
            setVisible={(val) => setVisibleModal(val)}
            classBody={style['modal-body']}
            dialogClassName={`${style['modal-dialog']} disconnect`}
        >
            <div className={style['disconnect']}>
                <div className={style['header-wallet']}>
                    <p className="text-body--large">{t('YOUR_WALLET')}</p>
                    <XMarkIcon onClick={() => setVisibleModal(false)} />
                </div>

                <div className={style['body-wallet']}>
                    <div className={style['body-wallet__address']}>
                        <p className="text-body--large address">
                            {addressSplice(userData?.userWallet.address!, 6, 4)}
                        </p>
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Popover>
                                    <div className={style['tooltip']}>
                                        {t(isCopied)}
                                    </div>
                                </Popover>
                            }
                        >
                            <p
                                className="copy"
                                onClick={() =>
                                    copyText(userData?.userWallet.address!)
                                }
                            >
                                <span>{t('COPY_ADDRESS')}</span>
                                <CopyIcon />
                            </p>
                        </OverlayTrigger>
                    </div>

                    {getchainName(Number(chainId || 0)) && (
                        <a
                            href={`${getBlockExplorerUrls(
                                Number(chainId || 0),
                            )}/address/${userData?.userWallet.address}`}
                            target="_blank"
                            rel="noreferrer"
                            className={style['body-wallet__open-link']}
                        >
                            <span className="text-body--none-color">
                                {t('VIEW_ON')}{' '}
                                {getchainName(Number(chainId || 0))}
                                {t('SCAN')}{' '}
                            </span>
                            <PolygonIcon />
                        </a>
                    )}

                    <div className={style['body-wallet__action']}>
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                router.push('/profile/account')
                                setVisibleModal(false)
                            }}
                        >
                            <UserIcon /> {t('PROFILE')}
                        </Button>
                        <Button onClick={disconnectWallet}>
                            {t('DISCONNECT')}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalDisConnectWallet
