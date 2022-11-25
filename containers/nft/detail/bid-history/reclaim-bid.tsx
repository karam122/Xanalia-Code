import { useTransHook } from '@/locales/hooks'
import { useState } from 'react'
import bidServices from '@/services/bid'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { useSelector } from 'react-redux'
import { sendCustomTransaction } from '@/connect/ether'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { toast } from 'react-toastify'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import SOCKET_EVENTS from '@/constants/socket'
import { useAppDispatch } from '@/store/hooks'
import { fetchMoreBids } from '@/store/bid/listSlice'
import { selectNFTDetailsId } from '@/store/nft/selectors'
import { selectBidList } from '@/store/bid/selectors'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import ModalConfirm from '@/components/common/modals/modal-confirm'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import { useRouter } from 'next/router'
import { getNFTDetails } from '@/store/nft/detailSlice'
import { handleTransactionError } from '@/utils/handleTransactionError'
interface ICancelBid {
    auctionSessionId: number
    bidId: number
}

const ReclaimBid = ({ auctionSessionId, bidId }: ICancelBid) => {
    const { t } = useTransHook()
    const [isLoading, setIsLoading] = useState(false)

    const currentNetwork = useSelector(selectCurrentNetwork)
    const dispatch = useAppDispatch()
    const { current, pageSize, currentSort } = useSelector(selectBidList)
    const nftId = useSelector(selectNFTDetailsId)
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)
    const [openConfirm, setOpenConfirm] = useState<boolean>(false)

    const router = useRouter()

    const handleReclaimBid = async () => {
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
                    try {
                        await sendCustomTransaction(
                            transactionParameters,
                            TRANSACTION_ACTION.cancelBid,
                            currentNetwork?.id,
                        )
                    } catch (error) {
                        console.log(
                            '🚀 ~ file: reclaim-bid.tsx ~ line 62 ~ handleReclaimBid ~ error',
                            error,
                        )
                        setOpenTransactionPending(false)
                    }
                }
            }
        } catch (error: any) {
            setIsLoading(false)
            // toast.error(t(error.message))
            handleTransactionError(error, t)
        }
    }

    const handleReclaimBidAuth = useActionAuthNetwork(handleReclaimBid)
    const handleReclaimBidSuccess = () => {
        // setIsLoading(false)
        toast.success(t('RECLAIM_BID_SUCCESS'))
        setOpenTransactionPending(false)
        dispatch(
            fetchMoreBids({
                page: current,
                limit: pageSize,
                nftId: nftId,
                sort: currentSort,
            }),
        )

        const { networkName, collectionAddress, nftTokenId } = router.query
        const query = {
            networkName,
            collectionAddress,
            nftTokenId,
        }
        dispatch(getNFTDetails(query))
    }

    useSocketGlobal(
        SOCKET_EVENTS.externalCancelBidSuccess,
        handleReclaimBidSuccess,
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
                content={t('RECLAIM_BID_CONFIRM')}
                callback={handleReclaimBidAuth}
            />
            <button
                className={`action-button btn-loading ${
                    isLoading ? 'btn-disabled' : ''
                }`}
                disabled={isLoading ? true : false}
                onClick={() => setOpenConfirm(true)}
            >
                {t('RECLAIM_BID')}
            </button>
        </div>
    )
}

export default ReclaimBid
