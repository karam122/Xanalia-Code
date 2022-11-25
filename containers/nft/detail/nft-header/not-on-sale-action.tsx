import ModalSell from '@/components/common/modals/modal-sell-v2'
import { useTransHook } from '@/locales/hooks'
import { selectNFTDetailsOwner } from '@/store/nft/selectors'
import { compareAddress } from '@/utils/compareAddress'
import { useState } from 'react'
// import Spinner from '@/components/common/spinner'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.scss'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import ModalOffer from '@/components/common/modals/modal-offer-v2'
import { setOpenModal } from '@/store/offer/offerSlice'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import ModalFiat from '@/components/common/modals/modal-fiat'
import { selectDataUser } from '@/store/user/selectors'

const NotOnSaleAction = () => {
    const { t } = useTransHook()
    const userData = useSelector(selectDataUser)
    const owner = useSelector(selectNFTDetailsOwner)
    const ownerAddress = owner?.address

    const [openSellmodal, setOpenSellModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dispatch = useDispatch()

    const openSellModal = useActionAuthNetwork(() => {
        setOpenSellModal(true)
    })

    const toggleModal = (val: boolean) => {
        dispatch(setOpenModal(val))
    }

    const openModal = useActionAuthNetwork(() => toggleModal(true))
    const closeModal = () => toggleModal(false)

    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)

    if (compareAddress(userData?.userWallet?.address as string, ownerAddress)) {
        return (
            <>
                <ModalSell
                    // nftDetails={{ nftDetails }}
                    open={openSellmodal}
                    setOpen={(val) => setOpenSellModal(val)}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <div className={styles['btn-group']} onClick={openSellModal}>
                    <button
                        className={`secondary-button btn-loading ${
                            isLoading ? 'btn-disabled' : ''
                        }`}
                        disabled={isLoading ? true : false}
                    >
                        {t('SELL')}
                    </button>
                </div>
            </>
        )
    }

    return (
        <div className={styles['btn-group']}>
            <ModalFiat />
            <ModalOffer
                setOpen={openModal}
                setClose={closeModal}
                setOpenTransactionPending={setOpenTransactionPending}
            />
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={setOpenTransactionPending}
            />
            {/* <button className="secondary-button btn-disabled">
                {t('SOLD_OUT')}
            </button> */}
            <button
                className="outline-secondary-button btn-loading"
                onClick={openModal}
            >
                {t('MAKE_OFFER')}
            </button>
        </div>
    )
}

export default NotOnSaleAction
