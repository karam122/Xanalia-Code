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
import { compareAddress } from '@/utils/compareAddress'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import BidInfo from './bid-info'
import styles from './style.module.scss'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import ModalConfirm from '@/components/common/modals/modal-confirm'
import { selectDataUser } from '@/store/user/selectors'
import { handleTransactionError } from '@/utils/handleTransactionError'

const EndAuctionAction = () => {
    const { t } = useTransHook()
    const userData = useSelector(selectDataUser)
    const owner = useSelector(selectNFTDetailsOwner)
    const ownerAddress = owner?.address
    const detailsNFTs = useSelector(selectNFTDetails)
    const currentNetwork = useSelector(selectCurrentNetwork)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // confirm
    const [openConfirm, setOpenConfirm] = useState<boolean>(false)
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)

    const handleClaimNFT = async () => {
        try {
            setOpenTransactionPending(true)
            const auctionNFTId = detailsNFTs?.saleData?.auction?.auctionId
            const claimNFTRes = await nftServices.reclaimNFT(auctionNFTId)
            if (claimNFTRes.messageCode) {
                setIsLoading(false)
                toast.error(claimNFTRes.messageCode)
                setOpenTransactionPending(false)
            }

            if (claimNFTRes) {
                const signData = claimNFTRes.dataReturn?.signData
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
                            TRANSACTION_ACTION.reclaimNft,
                            currentNetwork?.id,
                        )
                    } catch {
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

    const handleClaimNFTAuth = useActionAuthNetwork(handleClaimNFT)

    useSocketDetailPage(
        SOCKET_EVENTS.externalReclaimNftAuctionSuccess,
        setOpenTransactionPending,
        t('RECLAIM_NFT_SUCCESS'),
    )

    const renderButton = () => {
        if (
            compareAddress(
                userData?.userWallet?.address as string,
                ownerAddress,
            )
        ) {
            return (
                <div className={styles['btn-group']}>
                    <button
                        className={`secondary-button btn-loading ${
                            isLoading ? 'bt-disabled' : ''
                        }`}
                        onClick={() => setOpenConfirm(true)}
                        disabled={isLoading}
                    >
                        {t('RECLAIM_NFT')}
                    </button>
                </div>
            )
        }
        return (
            <div className={styles['btn-group']}>
                <button className="secondary-button btn-disabled">
                    {t('AUCTION_END')}
                </button>
            </div>
        )
    }

    return (
        <>
            <BidInfo status={NFT_MARKET_STATUS.CANCEL_AUCTION} />
            {renderButton()}
            <ModalConfirm
                open={openConfirm}
                setOpen={setOpenConfirm}
                content={t('RECLAIM_ACTION_CONTENT')}
                callback={handleClaimNFTAuth}
            />
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={setOpenTransactionPending}
            />
        </>
    )
}

export default EndAuctionAction
