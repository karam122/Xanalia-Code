import ModalCheckout from '@/components/common/modals/modal-checkout'
import ModalConfirm from '@/components/common/modals/modal-confirm'
import ModalFiat from '@/components/common/modals/modal-fiat'
import ModalOffer from '@/components/common/modals/modal-offer-v2'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import { sendCustomTransaction } from '@/connect/ether'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { useSocketDetailPage } from '@/hooks/useSocketGlobal'
import { useTransHook } from '@/locales/hooks'
import nftServices from '@/services/nft'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { selectNFTDetails, selectNFTDetailsOwner } from '@/store/nft/selectors'
import { setOpenModal } from '@/store/offer/offerSlice'
import { selectWallet } from '@/store/wallet/selectors'
import { compareAddress } from '@/utils/compareAddress'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
import styles from './style.module.scss'
import EditPriceSection from './edit-price'
import { handleTransactionError } from '@/utils/handleTransactionError'
const OnFixPriceAction = () => {
    // const [openModalOffer, setOpenModalOffer] = useState<boolean>(false)

    const { t } = useTransHook()
    const { address } = useSelector(selectWallet)
    const owner = useSelector(selectNFTDetailsOwner)
    const currentNetwork = useSelector(selectCurrentNetwork)
    const ownerAddress = owner?.address
    const detailNFTs = useSelector(selectNFTDetails)
    const dispatch = useDispatch()

    const toggleModal = (val: boolean) => {
        dispatch(setOpenModal(val))
    }

    const openOfferModal = useActionAuthNetwork(() => toggleModal(true))
    const closeOfferModal = () => toggleModal(false)

    // confirm
    const [openConfirm, setOpenConfirm] = useState<boolean>(false)
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)
    // checkout
    const [openCheckout, setOpenCheckout] = useState<boolean>(false)

    const handleCancelSell = async () => {
        try {
            setOpenTransactionPending(true)
            const saleNftId = detailNFTs?.saleData?.fixPrice?.id
            const cancelSellRes = await nftServices.cancelSell({
                id: saleNftId,
            })
            if (cancelSellRes) {
                const signData = cancelSellRes.dataReturn?.signData
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
                        TRANSACTION_ACTION.removeSale,
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

    const handleCancelSellAuth = useActionAuthNetwork(handleCancelSell)

    useSocketDetailPage(
        SOCKET_EVENTS.externalRemoveSaleSuccess,
        setOpenTransactionPending,
        t('CANCEL_SELL_SUCCESS'),
    )

    const renderMainContent = () => {
        if (compareAddress(address as string, ownerAddress)) {
            return (
                <>
                    <ModalConfirm
                        open={openConfirm}
                        setOpen={setOpenConfirm}
                        content={t('CANCEL_SELL_CONFIRM_CONTENT')}
                        callback={handleCancelSellAuth}
                    />
                    <div className={styles['btn-group']}>
                        <button
                            className={`secondary-button btn-loading ${
                                openTransactionPending ? 'btn-disabled' : ''
                            }`}
                            disabled={openTransactionPending ? true : false}
                            onClick={() => setOpenConfirm(true)}
                        >
                            {t('CANCEL_SELL')}
                        </button>
                        <EditPriceSection />
                    </div>
                </>
            )
        }

        return (
            <>
                <ModalOffer
                    setOpen={openOfferModal}
                    setClose={closeOfferModal}
                    setOpenTransactionPending={setOpenTransactionPending}
                />
                <ModalCheckout
                    open={openCheckout}
                    setOpen={setOpenCheckout}
                    setOpenTransactionPending={setOpenTransactionPending}
                />
                <ModalFiat />
                <div className={styles['btn-group']}>
                    <button
                        className={`secondary-button btn-loading ${
                            openTransactionPending ? 'btn-disabled' : ''
                        }`}
                        disabled={openTransactionPending ? true : false}
                        onClick={() => setOpenCheckout(true)}
                    >
                        {t('BUY')}
                    </button>
                    <button
                        className="outline-secondary-button btn-loading"
                        onClick={openOfferModal}
                    >
                        {t('MAKE_OFFER')}
                    </button>
                </div>
            </>
        )
    }

    return (
        <>
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={setOpenTransactionPending}
            />
            {renderMainContent()}
        </>
    )
}

export default OnFixPriceAction
