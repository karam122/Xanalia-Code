import React, { useState } from 'react'
import Modal from '@/components/ui/modals'
import style from './style.module.scss'
import { Button, FormControl } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'
import Spinner from '../../spinner'
import { useDispatch, useSelector } from 'react-redux'
import { selectNFTDetails } from '@/store/nft/selectors'
import { AMOUNT_BID_HIGHER } from '@/constants/nft'
import { toast } from 'react-toastify'
import nftServices from '@/services/nft'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { sendCustomTransaction } from '@/connect/ether'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useSocketDetailPage } from '@/hooks/useSocketGlobal'
import SOCKET_EVENTS from '@/constants/socket'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import useValidate from '@/hooks/useValidate'
import { setModalFiat } from '@/store/fiat/fiatSlice'
import ModalFiat from '../modal-fiat'
import { handleTransactionError } from '@/utils/handleTransactionError'

type Props = {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    // eslint-disable-next-line no-unused-vars
    setOpenTransactionPending: (val: boolean) => void
}
type Data = {
    price: number | string | undefined
    error: string
}

type IModalBody = {
    // eslint-disable-next-line no-unused-vars
    setOpenTransactionPending: (val: boolean) => void
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
}

const ModalBody = ({ setOpenTransactionPending, setOpen }: IModalBody) => {
    const { t } = useTransHook()

    const [isChecking, setIsChecking] = useState<boolean>(false)

    const nftDetails = useSelector(selectNFTDetails)
    const currentNetwork = useSelector(selectCurrentNetwork)
    const auction = nftDetails?.saleData?.auction
    // const startPrice = Number(auction?.startPrice)
    const highestPrice = Number(auction?.highestPrice)
    const basePrice = auction?.tokenPrice
    const { validateNumber } = useValidate()

    const [data, setData] = useState<Data>({
        price: Number(
            Number(highestPrice + highestPrice * AMOUNT_BID_HIGHER).toFixed(6),
        ),
        error: '',
    })
    const dispatch = useDispatch()

    const validatePrice = () => {
        if (!data.price) {
            return false
        }

        if (
            data.price &&
            Number(data.price) * 10 ** 6 <
                highestPrice * 10 ** 6 * (1 + AMOUNT_BID_HIGHER)
        ) {
            return false
        }

        return true
    }

    const onChange = (e: any) => {
        if (validateNumber(e.target.value).status) {
            setData({
                ...data,
                price: e.target.value,
                error: '',
            })
        }
    }

    const onPlaceBid = () => {
        if (!validatePrice()) {
            setData({
                ...data,
                error: 'NEW_BID_HAVE_TO_BE_GREATER_HIGHEST_BID',
            })
            // toast.error(t('INVALID_DATA'))
            setOpenTransactionPending(false)
        } else {
            handlePlaceBidAuth()
        }
    }

    const handlePlaceBid = async () => {
        try {
            setIsChecking(true)
            const auctionNFTId = nftDetails?.saleData?.auction?.auctionId
            const placeBidRes = await nftServices.placeBid(auctionNFTId, {
                price: Number(data.price),
            })
            setIsChecking(false)
            if (placeBidRes?.messageCode) {
                setData({
                    ...data,
                    error: placeBidRes.messageCode,
                })
                // throw new Error(placeBidRes?.messageCode)
            } else {
                setOpenTransactionPending(true)
                const approveData = placeBidRes?.dataReturn?.approveData
                let approved = true
                let noncePlus = 0
                if (approveData) {
                    try {
                        const transactionParameters = {
                            nonce: approveData.nonce, // ignored by MetaMask
                            // gasPrice: approveData.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                            // gasLimit: approveData.gas.toString(16), // customizable by user during MetaMask confirmation.
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
                        setOpenTransactionPending(false)
                        toast.error(t('APPROVE_TOKEN_FAIL'))
                    }
                }
                const signData = placeBidRes?.dataReturn?.signData
                const isEditBit = placeBidRes?.dataReturn?.isEditBit
                if (signData && approved) {
                    try {
                        const transactionParameters = {
                            nonce: signData.nonce + noncePlus, // ignored by MetaMask
                            gasPrice: signData.gasPrice, // customizable by user during MetaMask confirmation.
                            gasLimit: signData.gas, // customizable by user during MetaMask confirmation.
                            to: signData.to, // Required except during contract publications.
                            from: signData.from, // must match user's active address.
                            // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                            data: signData.data, // Optional, but used for defining smart contract creation and interaction.
                            chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                        }

                        const transactionAction = isEditBit
                            ? TRANSACTION_ACTION.editBid
                            : TRANSACTION_ACTION.placeBid

                        await sendCustomTransaction(
                            transactionParameters,
                            transactionAction,
                            currentNetwork?.id,
                        )
                    } catch (error: any) {
                        if (error.code === 'TRANSACTION_REPLACED') {
                            toast.error(t('CANCELED_TRANSACTION'))
                        } else {
                            toast.error(t(error.message))
                        }
                        setOpenTransactionPending(false)
                    }
                }
            }
        } catch (error: any) {
            setIsChecking(false)
            handleTransactionError(error, t)
            setOpenTransactionPending(false)
        }
    }

    const handlePlaceBidAuth = useActionAuthNetwork(handlePlaceBid)

    useSocketDetailPage(
        SOCKET_EVENTS.externalPlaceBidAuctionSuccess,
        setOpenTransactionPending,
        t('PLACE_BID_SUCCESS'),
    )

    const onTopUp = () => {
        dispatch(setModalFiat(true))
        setOpen(false)
    }

    return (
        <div className={`${style['modal-place-bid__body']}`}>
            {/* <div className={style['price-section']}>
                <div>
                    <p className={style['price-number']}>{startPrice}</p>
                    <p>{t('INITIAL_AUTION_PRICE')}</p>
                </div>
                <div>
                    <p className={style['price-number']}>{highestPrice}</p>
                    <p>{t('HIGHEST_AUTION_PRICE')}</p>
                </div>
            </div> */}
            <div className={` ${style['fixed-price']}`}>
                <div className="panel__title">{t('PRICE')}</div>
                <div className={``}>
                    <div className="form-group">
                        <div className="input-group">
                            <FormControl
                                type="string"
                                min={0}
                                name="fixedPrice"
                                onChange={onChange}
                                value={data.price?.toString()}
                            />
                            <span className="input-group-text">
                                {basePrice}
                            </span>
                        </div>
                        <span className="error-message">{t(data.error)}</span>
                    </div>
                </div>
            </div>

            <div className="modal-action">
                <Button
                    size="lg"
                    className="btn-loading"
                    disabled={isChecking}
                    variant="primary"
                    onClick={onPlaceBid}
                >
                    {isChecking ? <Spinner /> : t('CONFIRM')}
                </Button>
                <Button size="lg" variant="outline-primary" onClick={onTopUp}>
                    {t('TOP_UP')}
                </Button>
            </div>
        </div>
    )
}

function ModalPlaceBid({ open, setOpen, setOpenTransactionPending }: Props) {
    const { t } = useTransHook()
    return (
        <>
            <ModalFiat />
            <Modal
                // size="lg"
                isVisible={open}
                setVisible={setOpen}
                title={t('PLACE_A_BID')}
                closeButton={true}
                closeOutSide={false}
                classHeader={''}
                classBody={''}
            >
                <ModalBody
                    setOpen={setOpen}
                    setOpenTransactionPending={setOpenTransactionPending}
                />
            </Modal>
        </>
    )
}

export default ModalPlaceBid
