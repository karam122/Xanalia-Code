import Modal from '@/components/ui/modals'
import { sendCustomTransaction } from '@/connect/ether'
import { SERVICE_FEE } from '@/constants/nft'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { useTransHook } from '@/locales/hooks'
import offerServices from '@/services/offers'
import { setModalFiat } from '@/store/fiat/fiatSlice'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { selectNFTDetails } from '@/store/nft/selectors'
import { toFixCustom } from '@/utils/number'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AgreeCheckbox from '../../agree-checkbox'
import Spinner from '../../spinner'
import styles from './style.module.scss'
import { compareAddress } from '@/utils/compareAddress'
import { selectDataUser } from '@/store/user/selectors'
import { handleTransactionError } from '@/utils/handleTransactionError'
interface IModalAcceptOffer {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    // eslint-disable-next-line no-unused-vars
    setOpenTransactionPending: (val: boolean) => void
    priceOffer: number
    receiveToken: string
    offerId: number
}

const ModalAcceptOffer = ({
    open,
    setOpen,
    setOpenTransactionPending,
    priceOffer,
    receiveToken,
    offerId,
}: IModalAcceptOffer) => {
    const { t } = useTransHook()
    const [tickService, setTickService] = useState<boolean>(false)
    const [isChecking, setIsChecking] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const nftDetail = useSelector(selectNFTDetails)
    const dataUser = useSelector(selectDataUser)

    const currentNetwork = useSelector(selectCurrentNetwork)

    const dispatch = useDispatch()

    useEffect(() => {
        if (tickService) {
            setError('')
        }
    }, [tickService])

    const acceptOffer = async () => {
        try {
            setIsChecking(true)
            const res = await offerServices.acceptOffer({
                quantity: 1,
                saleNftId: offerId,
            })
            console.log(
                '🚀 ~ file: index.tsx ~ line 63 ~ acceptOffer ~ res',
                res,
            )

            if (res) {
                setIsChecking(false)
            }

            if (res.messageCode) {
                toast.error(t(res.messageCode))
            }

            const signData = res?.dataReturn?.signData
            const approveAllData = res.dataReturn.approveAllData

            let approved = true
            let noncePlus = 0
            if (approveAllData) {
                try {
                    const transactionParameters = {
                        nonce: approveAllData.nonce, // ignored by MetaMask
                        // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                        // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
                        to: approveAllData.to, // Required except during contract publications.
                        from: approveAllData.from, // must match user's active address.
                        // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                        data: approveAllData.data, // Optional, but used for defining smart contract creation and interaction.
                        chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                    }
                    setOpen(false)
                    setOpenTransactionPending(true)

                    const txnResult = await sendCustomTransaction(
                        transactionParameters,
                    )
                    if (txnResult) {
                        noncePlus = 1
                        toast.success(t('APPROVE_NFT_SUCCESS'))
                    }
                } catch (error) {
                    approved = false
                    setOpen(true)
                    setOpenTransactionPending(false)
                    toast.error(t('APPROVE_NFT_FAIL'))
                }
            }
            if (signData && approved) {
                const transactionParameters = {
                    nonce: signData.nonce + noncePlus, // ignored by MetaMask
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
                    setOpen(false)
                    setOpenTransactionPending(true)
                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.acceptOffer,
                        currentNetwork?.id,
                    )
                } catch (error: any) {
                    setOpen(true)
                    handleTransactionError(error, t)
                    setOpenTransactionPending(false)
                }
            }
        } catch (error) {
            setOpen(false)
            setOpenTransactionPending(false)
        }
    }

    const onAcceptOffer = () => {
        if (!tickService) {
            setError(t('PLEASE_TICK_AGREE_SERVICE'))
        } else {
            acceptOffer()
        }
    }

    const onAcceptOfferAuth = useActionAuthNetwork(onAcceptOffer)

    const onTopUp = () => {
        dispatch(setModalFiat(true))
    }

    const royalFee = !compareAddress(
        nftDetail.creator.address,
        dataUser?.userWallet?.address ? dataUser.userWallet?.address : '',
    )
        ? (priceOffer * Number(nftDetail.royalty)) / 100
        : 0

    return (
        <Modal
            // size="lg"
            isVisible={open}
            setVisible={setOpen}
            title={t('ACCEPT_OFFER_TITLE')}
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
                        <span className="heading--6-2">{nftDetail?.name}</span>
                    </div>
                    <div className={styles['checkout-item__price-token']}>
                        <div className="heading--6-2">{Number(priceOffer)}</div>
                        <div className="heading--6-2">{receiveToken}</div>
                    </div>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <div className="heading--6-2">{t('FEE')}</div>
                {!compareAddress(
                    nftDetail.creator.address,
                    dataUser?.userWallet?.address
                        ? dataUser.userWallet?.address
                        : '',
                ) && (
                    <div className={styles['checkout-item__content']}>
                        <span>{t('ROYALTY_FEE')}</span>
                        <span className="heading--6-3">{`${toFixCustom(
                            royalFee,
                        )} ${receiveToken} (${Number(
                            nftDetail.royalty,
                        )}%)`}</span>
                    </div>
                )}

                <div className={styles['checkout-item__content']}>
                    <span>{t('SERVICE_FEE')}</span>
                    <span className="heading--6-3">{`${toFixCustom(
                        (priceOffer * SERVICE_FEE) / 100,
                    )} ${receiveToken} (${SERVICE_FEE}%)`}</span>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <div className={styles['checkout-item__content']}>
                    <span>{t('YOU_WILL_RECEIVE')}</span>
                    <span className="heading--6-3">{`${Number(
                        Number(
                            toFixCustom(
                                priceOffer -
                                    royalFee -
                                    (priceOffer * SERVICE_FEE) / 100,
                            ),
                        ).toFixed(6),
                    )} ${receiveToken}`}</span>
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
                    onClick={onAcceptOfferAuth}
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

export default ModalAcceptOffer
