import Modal from '@/components/ui/modals'
import { sendCustomTransaction } from '@/connect/ether'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { useSocketDetailPage } from '@/hooks/useSocketGlobal'
import { useTransHook } from '@/locales/hooks'
import nftServices from '@/services/nft'
import { setModalFiat } from '@/store/fiat/fiatSlice'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { selectNFTDetails } from '@/store/nft/selectors'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AgreeCheckbox from '../../agree-checkbox'
import Spinner from '../../spinner'
import styles from './style.module.scss'
import { SERVICE_FEE } from '@/constants/nft'
import { toFixCustom } from '@/utils/number'
import { handleTransactionError } from '@/utils/handleTransactionError'

interface IModalCheckout {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    // eslint-disable-next-line no-unused-vars
    setOpenTransactionPending: (val: boolean) => void
}

const ModalCheckout = ({
    open,
    setOpen,
    setOpenTransactionPending,
}: IModalCheckout) => {
    const { t } = useTransHook()
    const [tickService, setTickService] = useState<boolean>(false)
    const [isChecking, setIsChecking] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const nftDetail = useSelector(selectNFTDetails)
    const price = Number(nftDetail?.saleData?.fixPrice?.price)
    const tokenPrice = nftDetail?.saleData?.fixPrice?.tokenPrice

    const currentNetwork = useSelector(selectCurrentNetwork)

    const dispatch = useDispatch()

    const onCheckout = () => {
        if (!tickService) {
            setError(t('PLEASE_TICK_AGREE_SERVICE'))
        } else {
            handleBuyNFT()
        }
    }

    useEffect(() => {
        if (tickService) {
            setError('')
        }
    }, [tickService])

    const handleBuyNFT = async () => {
        setIsChecking(true)
        const saleNftId = nftDetail?.saleData?.fixPrice?.id
        const buyNFTRes = await nftServices.buyNFT({
            quantity: 1,
            saleNftId,
        })

        if (buyNFTRes.messageCode) {
            setIsChecking(false)
            setError(t(buyNFTRes.messageCode))
            // toast.error(t(buyNFTRes.messageCode))
        } else {
            setIsChecking(false)
            const approveAllData = buyNFTRes?.dataReturn?.approveAllData
            const approveData = buyNFTRes?.dataReturn?.approveData
            const signData = buyNFTRes?.dataReturn?.signData
            if (approveAllData) {
                console.log(approveAllData)
            }
            setOpen(false)
            setOpenTransactionPending(true)
            let approved = true
            let noncePlus = 0

            if (approveData) {
                try {
                    const transactionParameters = {
                        nonce: approveData.nonce, // ignored by MetaMask
                        // gasPrice: signData?.gasPrice, // customizable by user during MetaMask confirmation.
                        // gasLimit: signData?.gas, // customizable by user during MetaMask confirmation.
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
                        noncePlus = 1
                        toast.success(t('APPROVE_TOKEN_SUCCESS'))
                    }
                } catch (error) {
                    approved = false
                    setOpen(true)
                    setOpenTransactionPending(false)
                    toast.error(t('APPROVE_TOKEN_FAIL'))
                }
            }
            if (signData && approved) {
                try {
                    const transactionParameters: any = {
                        nonce: signData.nonce + noncePlus, // ignored by MetaMask
                        // gasPrice: signData?.gasPrice, // customizable by user during MetaMask confirmation.
                        // gasLimit: signData?.gas,
                        to: signData.to, // Required except during contract publications.
                        from: signData.from, // must match user's active address.
                        // gasPrice: signData?.gasPrice, // customizable by user during
                        // gasLimit: signData?.gas, // customizable by user during
                        // gas: signData?.gas, // customizable by user during
                        value: signData?.value, // Only required to send ether to the recipient from the initiating external account.
                        data: signData.data, // Optional, but used for defining smart contract creation and interaction.
                        chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                    }

                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.buyNft,
                        currentNetwork?.id,
                    )
                } catch (error: any) {
                    setOpen(true)
                    setOpenTransactionPending(false)
                    handleTransactionError(error, t)
                }
            }
        }
    }

    const onCheckoutAuth = useActionAuthNetwork(onCheckout)

    useSocketDetailPage(
        SOCKET_EVENTS.externalBuyNftSuccess,
        setOpenTransactionPending,
        t('BUY_NFT_SUCCESS'),
    )

    const onTopUp = () => {
        dispatch(setModalFiat(true))
    }

    return (
        <Modal
            // size="lg"
            isVisible={open}
            setVisible={setOpen}
            title={t('COMPLETE_CHECKOUT_TITLE')}
            closeButton={true}
            closeOutSide={false}
            classHeader={''}
            classBody={''}
        >
            <div className={styles['checkout-item']}>
                <div className="heading--6-2">{t('ITEM')}</div>
                <div className={styles['checkout-item__content']}>
                    <div className={styles['checkout-item__general']}>
                        <img
                            src={
                                nftDetail?.thumbnailUrl
                                    ? nftDetail.thumbnailUrl
                                    : 'images/default-nft-image.jpeg'
                            }
                            alt="nft-image-alt"
                        />
                        <span className="heading--6-2 text-1-line">
                            {nftDetail?.name}
                        </span>
                    </div>
                    <div className={styles['checkout-item__price-token']}>
                        <div className="heading--6-2">{Number(price)}</div>
                        <div className="heading--6-2">{tokenPrice}</div>
                    </div>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <div className="heading--6-2">{t('FEE')}</div>
                <div className={styles['checkout-item__content']}>
                    <span>{t('ROYALTY_FEE')}</span>
                    <span className="heading--6-3">{`${toFixCustom(
                        (price * Number(nftDetail.royalty)) / 100,
                    )} ${tokenPrice} (${Number(nftDetail.royalty)}%)`}</span>
                </div>
                <div className={styles['checkout-item__content']}>
                    <span>{t('SERVICE_FEE')}</span>
                    <span className="heading--6-3">{`${toFixCustom(
                        Number((price * SERVICE_FEE) / 100),
                    )} ${tokenPrice} (${SERVICE_FEE}%)`}</span>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <div className={styles['checkout-item__content']}>
                    <span>{t('YOU_WILL_PAY')}</span>
                    <span className="heading--6-3">{`${toFixCustom(
                        price,
                    )} ${tokenPrice}`}</span>
                </div>
            </div>
            <AgreeCheckbox tick={tickService} setTick={setTickService} />
            <div className={`${styles['checkout-error']} error-message`}>
                {error}
            </div>
            <div className="modal-action">
                <Button
                    size="lg"
                    className="btn-loading"
                    disabled={isChecking}
                    variant="primary"
                    onClick={onCheckoutAuth}
                >
                    {isChecking ? <Spinner /> : t('CONFIRM')}
                </Button>
                <Button size="lg" variant="outline-primary" onClick={onTopUp}>
                    {t('TOP_UP')}
                </Button>
            </div>
        </Modal>
    )
}

export default ModalCheckout
