import ModalConfirm from '@/components/common/modals/modal-confirm'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import { sendCustomTransaction } from '@/connect/ether'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import { useTransHook } from '@/locales/hooks'
import bidServices from '@/services/bid'
import { getAllBids } from '@/store/bid/listSlice'
import { selectBidList } from '@/store/bid/selectors'
import { useAppDispatch } from '@/store/hooks'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { getNFTDetails } from '@/store/nft/detailSlice'
import { selectNFTDetailsId } from '@/store/nft/selectors'
import { handleTransactionError } from '@/utils/handleTransactionError'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface ICancelBid {
    auctionSessionId: number
    bidId: number
}

const CancelBid = ({ auctionSessionId, bidId }: ICancelBid) => {
    const { t } = useTransHook()
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)
    const [openConfirm, setOpenConfirm] = useState<boolean>(false)

    const currentNetwork = useSelector(selectCurrentNetwork)
    const dispatch = useAppDispatch()
    const { current, pageSize, currentSort } = useSelector(selectBidList)
    const nftId = useSelector(selectNFTDetailsId)

    const router = useRouter()

    const handleCancelBid = async () => {
        try {
            setOpenTransactionPending(true)
            const cancelBidRes = await bidServices.cancelBid({
                aucctionSessionId: auctionSessionId,
                bidId: bidId,
            })
            if (cancelBidRes) {
                const signData = cancelBidRes.dataReturn?.signData
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

                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.cancelBid,
                        currentNetwork?.id,
                    )
                }
            }
        } catch (error: any) {
            setOpenTransactionPending(false)
            // toast.error(t(error.message))
            handleTransactionError(error, t)
        }
    }

    const handleCancelBidAuth = useActionAuthNetwork(handleCancelBid)

    const handleCancelBidSuccess = () => {
        setOpenTransactionPending(false)
        const { networkName, collectionAddress, nftTokenId } = router.query
        const query = {
            networkName,
            collectionAddress,
            nftTokenId,
        }
        dispatch(getNFTDetails(query))
        toast.success(t('CANCEL_BID_SUCCESS'))
        dispatch(
            getAllBids({
                page: current,
                limit: pageSize,
                nftId: nftId,
                sort: currentSort,
            }),
        )
    }

    useSocketGlobal(
        SOCKET_EVENTS.externalCancelBidSuccess,
        handleCancelBidSuccess,
    )

    return (
        <div>
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={setOpenTransactionPending}
            />
            <ModalConfirm
                open={openConfirm}
                setOpen={setOpenConfirm}
                content={t('CANCEL_BID_CONFIRM')}
                callback={handleCancelBidAuth}
            />
            <button
                className={`action-button ${
                    openTransactionPending ? 'btn-disabled' : ''
                }`}
                disabled={openTransactionPending ? true : false}
                onClick={() => setOpenConfirm(true)}
            >
                {t('CANCEL_BID')}
            </button>
        </div>
    )
}

export default CancelBid
