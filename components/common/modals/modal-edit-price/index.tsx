import React, { useState } from 'react'
import Modal from '@/components/ui/modals'
// import { useSelector } from 'react-redux'
import style from './style.module.scss'
import { Button, FormControl } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'
import { useSelector } from 'react-redux'
import { selectCurrentNetwork } from '@/store/network/selectors'

import useValidate from '@/hooks/useValidate'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'

import { selectNFTDetails } from '@/store/nft/selectors'
import nftServices from '@/services/nft'
import { sendCustomTransaction } from '@/connect/ether'
import { toast } from 'react-toastify'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import SOCKET_EVENTS from '@/constants/socket'
import { useAppDispatch } from '@/store/hooks'
import { getNFTDetails } from '@/store/nft/detailSlice'
import { useRouter } from 'next/router'
import ModalTransactionPending from '../modal-transaction-pending'
type Props = {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
}

type BodyProp = {
    // eslint-disable-next-line no-unused-vars
    setOpenTransactionPending: (val: boolean) => void
}

const ModalBody = ({ setOpenTransactionPending }: BodyProp) => {
    const { t } = useTransHook()
    const currentNetwork = useSelector(selectCurrentNetwork)
    const nftDetail = useSelector(selectNFTDetails)
    const [isLoading] = useState(false)
    const { validateNumber } = useValidate()
    const [data, setData] = useState<{
        price: string
        priceError: string
    }>({
        price: '',
        priceError: '',
    })

    const isValid = () => {
        if (
            !data.price ||
            Number(data.price) === 0 ||
            Number(data.price) === Number(nftDetail?.saleData?.fixPrice?.price)
        ) {
            return false
        }

        return true
    }

    const onChange = (e: any) => {
        const { name, value } = e.target
        if (validateNumber(value).status) {
            setData({
                ...data,
                [name]: value,
            })
        }
    }
    const handleSignTransaction = async (res: any, action: number) => {
        if (res.messageCode === 'SALE_NFT_BALANCE_NOT_ENOUGH') {
            toast.error(t('SALE_NFT_BALANCE_NOT_ENOUGH'))
        } else {
            const approveData = res?.dataReturn?.approveData
            if (approveData) {
                try {
                    const transactionParameters = {
                        nonce: approveData.nonce, // ignored by MetaMask
                        // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                        // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
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
                    toast.error(t('APPROVE_TOKEN_FAIL'))
                }
            }
            const signData = res?.dataReturn?.signData
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
                    // gasLimit: BigNumber.from(10000000).toString()
                }

                await sendCustomTransaction(
                    transactionParameters,
                    action,
                    currentNetwork?.id,
                )
            }
        }
    }

    const onEditPrice = useActionAuthNetwork(async () => {
        try {
            setOpenTransactionPending(true)
            const res = await nftServices.editPrice(
                nftDetail.saleData?.fixPrice.id,
                Number(data.price),
            )
            await handleSignTransaction(res, TRANSACTION_ACTION.editOrder)
        } catch {
            setOpenTransactionPending(false)
        }
    })

    return (
        <div className={style['modal-edit-price__body']}>
            <div className="panel">
                <div className="form-group">
                    <div className="input-group">
                        <FormControl
                            type="text"
                            name="price"
                            onChange={onChange}
                            value={data.price}
                        />
                        <span className="input-group-text">
                            {nftDetail.saleData.fixPrice.tokenPrice}
                        </span>
                    </div>
                    <span className="error-message">{t(data.priceError)}</span>
                </div>

                <Button
                    className="secondary-button"
                    disabled={!isValid() || isLoading}
                    onClick={onEditPrice}
                >
                    {t('CHANGE')}
                </Button>
            </div>
        </div>
    )
}

function ModalEditPrice({ open, setOpen }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)

    const onSetOpenTransactionPending = (val: boolean) => {
        setOpenTransactionPending(val)
        if (val) {
            setOpen(false)
        }
    }

    useSocketGlobal(SOCKET_EVENTS.externalEditOrderSuccess, () => {
        const { networkName, collectionAddress, nftTokenId } = router.query
        const query = {
            networkName,
            collectionAddress,
            nftTokenId,
        }
        dispatch(getNFTDetails(query))
        setOpen(false)
        onSetOpenTransactionPending(false)
    })

    return (
        <>
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={onSetOpenTransactionPending}
            />
            <Modal
                // size="xm"
                isVisible={open}
                setVisible={setOpen}
                title="Edit Price"
                closeButton={true}
                closeOutSide={false}
                classHeader={''}
                classBody={''}
            >
                <ModalBody
                    setOpenTransactionPending={onSetOpenTransactionPending}
                />
            </Modal>
        </>
    )
}

export default ModalEditPrice
