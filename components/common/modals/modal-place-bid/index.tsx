import React, { useState } from 'react'
import Modal from '@/components/ui/modals'
import style from './style.module.scss'
import { FormControl } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'
import Spinner from '../../spinner'
import { useSelector } from 'react-redux'
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
import { handleTransactionError } from '@/utils/handleTransactionError'

type Props = {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    isLoading: boolean
    // eslint-disable-next-line no-unused-vars
    setIsLoading: (val: boolean) => void
}
type Data = {
    price: number | undefined
    error: string
}

type IModalBody = {
    isLoading: boolean
    // eslint-disable-next-line no-unused-vars
    setIsLoading: (val: boolean) => void
}

const ModalBody = ({ isLoading, setIsLoading }: IModalBody) => {
    const { t } = useTransHook()

    const nftDetails = useSelector(selectNFTDetails)
    const currentNetwork = useSelector(selectCurrentNetwork)
    const auction = nftDetails?.saleData?.auction
    const startPrice = Number(auction?.startPrice)
    const highestPrice = Number(auction?.highestPrice)
    const basePrice = auction?.tokenPrice

    const [data, setData] = useState<Data>({
        price: highestPrice + highestPrice * AMOUNT_BID_HIGHER,
        error: '',
    })

    const validatePrice = () => {
        if (!data.price) {
            return false
        }
        if (
            data.price &&
            data.price < highestPrice + highestPrice * AMOUNT_BID_HIGHER
        ) {
            return false
        }

        return true
    }

    const onChange = (e: any) => {
        setData({
            ...data,
            price: e.target.value,
            error: '',
        })
    }

    const onPlaceBid = () => {
        if (!validatePrice()) {
            setData({
                ...data,
                error: 'NEW_BID_HAVE_TO_BE_GREATER_HIGHEST_BID',
            })
            // toast.error(t('INVALID_DATA'))
            setIsLoading(false)
        } else {
            handlePlaceBidAuth()
        }
    }

    const handlePlaceBid = async () => {
        try {
            setIsLoading(true)
            const auctionNFTId = nftDetails?.saleData?.auction?.auctionId
            const placeBidRes = await nftServices.placeBid(auctionNFTId, {
                price: Number(data.price),
            })
            if (placeBidRes?.messageCode) {
                throw new Error(placeBidRes?.messageCode)
            } else {
                const approveData = placeBidRes?.dataReturn?.approveData
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
                            toast.success(t('APPROVE_TOKEN_SUCCESS'))
                        }
                    } catch (error) {
                        setIsLoading(false)
                        toast.error(t('APPROVE_TOKEN_FAIL'))
                    }
                }
                const signData = placeBidRes?.dataReturn?.signData
                const isEditBit = placeBidRes?.dataReturn?.isEditBit
                if (signData) {
                    const transactionParameters = {
                        nonce: signData.nonce, // ignored by MetaMask
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
                }
            }
        } catch (error: any) {
            setIsLoading(false)
            handleTransactionError(error, t)
        }
    }

    const handlePlaceBidAuth = useActionAuthNetwork(handlePlaceBid)

    useSocketDetailPage(
        SOCKET_EVENTS.externalPlaceBidAuctionSuccess,
        setIsLoading,
        t('PLACE_BID_SUCCESS'),
    )

    return (
        <div className={`${style['modal-place-bid__body']} panel`}>
            <div className={style['price-section']}>
                <div>
                    <p className={style['price-number']}>{startPrice}</p>
                    <p>{t('INITIAL_AUTION_PRICE')}</p>
                </div>
                <div>
                    <p className={style['price-number']}>{highestPrice}</p>
                    <p>{t('HIGHEST_AUTION_PRICE')}</p>
                </div>
            </div>
            <div className={` ${style['fixed-price']}`}>
                <div className="panel__title">{t('PRICE')}</div>
                <div className={``}>
                    <div className="form-group">
                        <div className="input-group">
                            <FormControl
                                type="number"
                                min={0}
                                name="fixedPrice"
                                onChange={onChange}
                                value={data.price}
                            />
                            <span className="input-group-text">
                                {basePrice}
                            </span>
                        </div>
                        <span className="error-message">{t(data.error)}</span>
                    </div>
                </div>
            </div>

            <button
                className={`secondary-button btn-loading ${
                    isLoading ? 'btn-disabled' : ''
                }`}
                disabled={isLoading ? true : false}
                onClick={onPlaceBid}
            >
                {isLoading ? <Spinner /> : t('PLACE_A_BID')}
            </button>
        </div>
    )
}

function ModalPlaceBid({ open, setOpen, isLoading, setIsLoading }: Props) {
    const { t } = useTransHook()
    return (
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
            <ModalBody isLoading={isLoading} setIsLoading={setIsLoading} />
        </Modal>
    )
}

export default ModalPlaceBid
