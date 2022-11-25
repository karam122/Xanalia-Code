import ModalPlaceBid from '@/components/common/modals/modal-place-bid-v2'
import { sendCustomTransaction } from '@/connect/ether'
import { NFT_MARKET_STATUS } from '@/constants/nft'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { useSocketDetailPage } from '@/hooks/useSocketGlobal'
import { useTransHook } from '@/locales/hooks'
import nftServices from '@/services/nft'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { selectNFTDetails, selectNFTDetailsOwner } from '@/store/nft/selectors'
import { selectWallet } from '@/store/wallet/selectors'
import { compareAddress } from '@/utils/compareAddress'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import BidInfo from './bid-info'
import styles from './style.module.scss'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import ModalConfirm from '@/components/common/modals/modal-confirm'

const OnAuctionAction = () => {
    const { t } = useTransHook()
    const { address } = useSelector(selectWallet)
    const owner = useSelector(selectNFTDetailsOwner)
    const [openPlaceBid, setOpenPlaceBid] = useState<boolean>(false)
    // confirm
    const [openConfirm, setOpenConfirm] = useState<boolean>(false)
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)

    const ownerAddress = owner?.address

    const detailsNFTs = useSelector(selectNFTDetails)
    const currentNetwork = useSelector(selectCurrentNetwork)

    const CancelAuctionButton = () => {
        const handleCancelAuction = async () => {
            try {
                setOpenTransactionPending(true)
                const auctionNFTId = detailsNFTs?.saleData?.auction?.auctionId
                const cancelAuctionRes = await nftServices.cancelAuction(
                    auctionNFTId,
                )
                if (cancelAuctionRes?.error) {
                    setOpenTransactionPending(false)
                    throw new Error(cancelAuctionRes.message)
                } else {
                    const signData = cancelAuctionRes.dataReturn?.signData
                    if (signData) {
                        const transactionParameters = {
                            nonce: signData.nonce, // ignored by MetaMask
                            // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                            // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
                            to: signData.to, // Required except during contract publications.
                            from: signData.from, // must match user's active address.
                            // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                            data: signData.data, // Optional, but used for defining smart contract creation and interaction.
                            chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                        }
                        try {
                            await sendCustomTransaction(
                                transactionParameters,
                                TRANSACTION_ACTION.cancelAuction,
                                currentNetwork?.id,
                            )
                        } catch {
                            setOpenTransactionPending(false)
                        }
                    }
                }
            } catch (error: any) {
                // toast.error(t(error.message))
                setOpenTransactionPending(false)
                if (error.code === 'INSUFFICIENT_FUNDS') {
                    toast.error(t('SALE_NFT_BALANCE_NOT_ENOUGH'))
                }
                if (error.code === 'TRANSACTION_REPLACED') {
                    toast.error(t('CANCELED_TRANSACTION'))
                } else {
                    toast.error(t(error.message))
                }
            }
        }

        const openConfirmModal = () => {
            setOpenConfirm(true)
        }

        const handleCancelAuctionAuth =
            useActionAuthNetwork(handleCancelAuction)
        useSocketDetailPage(
            SOCKET_EVENTS.cancelAuctionSuccess,
            setOpenTransactionPending,
            t('CANCEL_AUCTION_SUCCESS'),
        )

        return (
            <div
                className={`${styles['btn-group']} ${styles['cancel-auction']}`}
            >
                <button
                    className={`secondary-button btn-loading ${
                        openTransactionPending ? 'btn-disabled' : ''
                    }`}
                    onClick={openConfirmModal}
                    disabled={openTransactionPending}
                >
                    {t('CANCEL_AUCTION')}
                </button>
                <ModalConfirm
                    open={openConfirm}
                    setOpen={setOpenConfirm}
                    content={t('CANCEL_AUTION_CONTENT')}
                    callback={handleCancelAuctionAuth}
                />
            </div>
        )
    }
    const onSetOpenTransactionPending = (val: any) => {
        setOpenTransactionPending(val)
        if (val) {
            setOpenPlaceBid(false)
        }
    }

    const placeBidComponentValue = useMemo(() => {
        return (
            <>
                <ModalPlaceBid
                    open={openPlaceBid}
                    setOpen={(val) => setOpenPlaceBid(val)}
                    setOpenTransactionPending={onSetOpenTransactionPending}
                />
                <div
                    className={styles['btn-group']}
                    onClick={() => setOpenPlaceBid(true)}
                >
                    <button
                        className={`secondary-button btn-loading ${
                            openTransactionPending ? 'btn-disabled' : ''
                        }`}
                        disabled={openTransactionPending}
                    >
                        {t('PLACE_A_BID')}
                    </button>
                </div>
            </>
        )
    }, [setOpenPlaceBid, openPlaceBid, openTransactionPending])

    const renderButton = () => {
        if (compareAddress(address as string, ownerAddress)) {
            return (
                <>
                    <CancelAuctionButton />
                </>
            )
        }
        return placeBidComponentValue
    }

    return (
        <>
            <BidInfo status={NFT_MARKET_STATUS.ON_AUCTION} />
            {renderButton()}
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={setOpenTransactionPending}
            />
        </>
    )
}

export default OnAuctionAction
