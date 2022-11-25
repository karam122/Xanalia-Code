import { sendCustomTransaction } from '@/connect/ether'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useTransHook } from '@/locales/hooks'
import offferServices from '@/services/offers'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { selectWallet } from '@/store/wallet/selectors'
import { compareAddress } from '@/utils/compareAddress'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// import {getOfferList} from '@/store/offer/offerSlice'
import ModalAcceptOffer from '@/components/common/modals/modal-accept-offer'
import ModalConfirm from '@/components/common/modals/modal-confirm'
import ModalFiat from '@/components/common/modals/modal-fiat'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import SOCKET_EVENTS from '@/constants/socket'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import { useAppDispatch } from '@/store/hooks'
import { getNFTDetails } from '@/store/nft/detailSlice'
import { getOfferList } from '@/store/offer/offerSlice'
import { useRouter } from 'next/router'

type Props = {
    offerId: number
    toUser: {
        address: string
        id: number
    }
    fromUser: {
        address: string
        id: number
    }
    expired: number
    nftOwner: string | undefined
    nftId: number | string
    status: number
    nftStatus: number
    priceOffer: number
    receiveToken: string
}

const OfferActions = (props: Props) => {
    const { t } = useTransHook()
    const {
        offerId,
        fromUser,
        expired,
        nftOwner,
        nftId,
        priceOffer,
        receiveToken,
    } = props
    // confirm
    const [openConfirm, setOpenConfirm] = useState<boolean>(false)
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)
    const handleOpenConfirm = () => {
        setOpenConfirm(true)
    }
    // accept
    const [openAccept, setOpenAccept] = useState<boolean>(false)

    const router = useRouter()
    const wallet = useSelector(selectWallet)
    const currentNetwork = useSelector(selectCurrentNetwork)
    const dispatch = useAppDispatch()

    const handleSignTransaction = async (res: any, action: number) => {
        if (res.messageCode === 'SALE_NFT_BALANCE_NOT_ENOUGH') {
            toast.error(t('SALE_NFT_BALANCE_NOT_ENOUGH'))
        } else {
            const approveData = res?.dataReturn?.approveData
            let approved = true
            if (approveData) {
                try {
                    const transactionParameters = {
                        nonce: approveData.nonce, // ignored by MetaMask
                        // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                        // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
                        to: approveData.to, // Required except during contract publications.
                        from: approveData.from, // must match user's active address.
                        // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                        data: approveData.data, // Optional, but used for defining smart contract creation and interaction.
                        chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                    }

                    const txnResult = await sendCustomTransaction(
                        transactionParameters,
                    )

                    if (txnResult) {
                        toast.success(t('APPROVE_TOKEN_SUCCESS'))
                    }
                } catch (error) {
                    approved = false
                    toast.error(t('APPROVE_TOKEN_FAIL'))
                    setOpenTransactionPending(false)
                }
            }
            const signData = res?.dataReturn?.signData
            if (signData && approved) {
                const transactionParameters = {
                    nonce: signData.nonce, // ignored by MetaMask
                    // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                    // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
                    to: signData.to, // Required except during contract publications.
                    from: signData.from, // must match user's active address.
                    // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                    data: signData.data, // Optional, but used for defining smart contract creation and interaction.
                    chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                    // gasLimit: BigNumber.from(10000000).toString()
                }

                try {
                    await sendCustomTransaction(
                        transactionParameters,
                        action,
                        currentNetwork?.id,
                    )
                } catch {
                    setOpenTransactionPending(false)
                }
            }
        }
    }

    useSocketGlobal(SOCKET_EVENTS.externalAcceptSuccess, () => {
        const { networkName, collectionAddress, nftTokenId } = router.query
        const query = {
            networkName,
            collectionAddress,
            nftTokenId,
        }
        dispatch(getNFTDetails(query))
        dispatch(getOfferList(nftId))
        toast.success(t('ACCEPT_OFFER_SUCCESS'))
        setOpenTransactionPending(false)
    })

    const isExpired = expired * 1000 < Date.now()

    useSocketGlobal(SOCKET_EVENTS.externalCanceOfferSuccess, () => {
        const { networkName, collectionAddress, nftTokenId } = router.query
        const query = {
            networkName,
            collectionAddress,
            nftTokenId,
        }
        dispatch(getNFTDetails(query))
        dispatch(getOfferList(nftId))
        let message = 'CANCELED_OFFER_SUCCESS'
        if (isExpired) {
            message = 'CLAIMED_OFFER_SUCCESS'
        }
        toast.success(t(message))
        setOpenTransactionPending(false)
    })

    const cancelOffer = async () => {
        setOpenTransactionPending(true)
        try {
            const res = await offferServices.cancelOffer(offerId)
            console.log(
                '🚀 ~ file: offer-actions.tsx ~ line 27 ~ cancelOffer ~ res',
                res,
            )
            await handleSignTransaction(res, TRANSACTION_ACTION.cancelOffer)
            // setTimeout(() => {
            //     dispatch(getOfferList(nftId))
            // }, 1000)
            // setIsLoading(false)
        } catch (error) {
            console.log(
                '🚀 ~ file: offer-actions.tsx ~ line 30 ~ cancelOffer ~ error',
                error,
            )
            setOpenTransactionPending(false)
        }
    }

    const onCancelOfferAuth = useActionAuthNetwork(cancelOffer)
    let handleAction: () => void = () => {}
    let ACTION_CONTENT = ''

    const mainRender = () => {
        if (wallet.address) {
            if (compareAddress(fromUser?.address, wallet.address)) {
                // owner of offer
                handleAction = onCancelOfferAuth
                if (isExpired) {
                    ACTION_CONTENT = 'CLAIM_OFFER_CONTENT'
                    return (
                        <div style={{ textAlign: 'center' }}>
                            <button
                                className="action-button"
                                disabled={openTransactionPending}
                                onClick={handleOpenConfirm}
                            >
                                {t('CLAIM')}
                            </button>
                        </div>
                    )
                }
                ACTION_CONTENT = 'CANCEL_OFFER_CONTENT'
                return (
                    <div style={{ textAlign: 'center' }}>
                        <button
                            className="action-button"
                            disabled={openTransactionPending}
                            onClick={handleOpenConfirm}
                        >
                            {t('CANCEL_OFFER')}
                        </button>
                    </div>
                )
            }

            if (
                nftOwner &&
                compareAddress(nftOwner, wallet.address) &&
                !isExpired
            ) {
                // nft owner
                return (
                    <>
                        <ModalAcceptOffer
                            open={openAccept}
                            setOpen={setOpenAccept}
                            setOpenTransactionPending={
                                setOpenTransactionPending
                            }
                            priceOffer={priceOffer}
                            receiveToken={receiveToken}
                            offerId={offerId}
                        />
                        <ModalFiat />
                        <div style={{ textAlign: 'center' }}>
                            <button
                                className="action-button w-fit"
                                disabled={openTransactionPending}
                                onClick={() => setOpenAccept(true)}
                            >
                                {t('ACCEPT_OFFER')}
                            </button>
                        </div>
                    </>
                )
            }
        }

        return null
    }
    // OTHER USER
    return (
        <>
            {mainRender()}
            <ModalConfirm
                open={openConfirm}
                setOpen={setOpenConfirm}
                content={t(ACTION_CONTENT)}
                callback={handleAction}
            />
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={setOpenTransactionPending}
            />
        </>
    )
}

export default OfferActions
