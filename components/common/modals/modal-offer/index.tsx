import React, { useState, useEffect } from 'react'
import Modal from '@/components/ui/modals'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material'

import { useTransHook } from '@/locales/hooks'
import { Button, FormControl, FormSelect } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { selectNFTDetails } from '@/store/nft/selectors'
import nftServices from '@/services/nft'
import { sendCustomTransaction } from '@/connect/ether'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import Spinner from '@/components/common/spinner'
import useValidate from '@/hooks/useValidate'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import {
    selectMakingOffer,
    selectOpenMakeOfferModal,
} from '@/store/offer/selectors'
import { setMakingOffer } from '@/store/offer/offerSlice'
import { getTokenNameFromId } from '@/utils/nft'
import { getERC20Tokens } from '@/utils/token'

type Props = {
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
}

const DAY14 = 86400000 * 14
// eslint-disable-next-line no-unused-vars
const ModalBody = () => {
    const { t } = useTransHook()
    const nftDetail = useSelector(selectNFTDetails)
    const makingOffer = useSelector(selectMakingOffer)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        totalPrice: undefined,
        quantity: 1,
        receiveToken: '',
        networkTokenId: 0,
        nftId: nftDetail.nftId,
        expried: Date.now() + DAY14,

        error: {
            totalPrice: '',
            expried: '',
        },
    })
    const currentNetwork = useSelector(selectCurrentNetwork)
    const { validateNumber } = useValidate()
    useEffect(() => {
        if (currentNetwork && currentNetwork.networkTokens?.length > 0) {
            setData({
                ...data,
                networkTokenId: getERC20Tokens(currentNetwork.networkTokens)[0]
                    .id,
                receiveToken: getTokenNameFromId(
                    Number(getERC20Tokens(currentNetwork.networkTokens)[0].id),
                    currentNetwork.networkTokens,
                ),
            })
        }
    }, [currentNetwork])

    const onChangeTime = (e: any) => {
        const error = { ...data.error }
        const timeValue = new Date(e).getTime()
        if (timeValue > Date.now()) {
            error.expried = ''
        }

        setData({
            ...data,
            expried: timeValue,
            error: error,
        })
    }

    const onChangeToken = (e: any) => {
        console.log(
            '🚀 ~ file: index.tsx ~ line 67 ~ onChangeToken ~ e',
            e.target.value,
        )
        setData({
            ...data,
            networkTokenId: Number(e.target.value),
            receiveToken: getTokenNameFromId(
                Number(e.target.value),
                currentNetwork.networkTokens,
            ),
        })
    }

    console.log('PHUONGKKK', data)

    const onChangeOfferPrice = (e: any) => {
        const value = e.target.value
        const error = { ...data.error }
        if (validateNumber(value).status) {
            setData({
                ...data,
                error: error,
                totalPrice: value,
            })
        }
        // if (value <= 0 || value === '') {
        //     error.totalPrice = t('PRICE_OFFER_ERROR')
        // } else {
        //     error.totalPrice = ''
        // }
    }

    const isValidate = () => {
        const error = { ...data.error }
        let isSuccess = true
        if (data.expried < Date.now()) {
            error.expried = t('TIME_EXPIRED_OFFER_ERROR')
            isSuccess = false
        }
        if (Number(data.totalPrice) <= 0) {
            error.totalPrice = t('PRICE_OFFER_ERROR')
            isSuccess = false
        }
        if (data.totalPrice === undefined) {
            error.totalPrice = t('ERROR_EMPTY_NFT_FIX_PRICE')
            isSuccess = false
        }

        if (!isSuccess) {
            setData({
                ...data,

                error: error,
            })
        }
        return isSuccess
    }

    const onMakeOffer = async () => {
        if (!isValidate()) {
            // toast.error('INVALID_OFFER_DATA')
        } else {
            dispatch(setMakingOffer(true))
            const submitData = {
                ...data,
                expried: Math.floor(data.expried / 1000), // to second
                totalPrice: Number(data.totalPrice),
                error: undefined,
            }
            console.log(
                '🚀 ~ file: index.tsx ~ line 123 ~ onMakeOffer ~ submitData',
                submitData,
            )
            const res = await nftServices.makeOffer(submitData)
            if (res?.messageCode === 'SALE_NFT_BALANCE_NOT_ENOUGH') {
                toast.error(t('SALE_NFT_BALANCE_NOT_ENOUGH'))
                dispatch(setMakingOffer(false))
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
                        dispatch(setMakingOffer(false))
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
                        TRANSACTION_ACTION.makeOffer,
                        currentNetwork?.id,
                    )
                }
            }
        }
    }

    const onMakeOfferAuth = useActionAuthNetwork(onMakeOffer)

    console.log('PHUONGNANANAA', getERC20Tokens(currentNetwork?.networkTokens))

    return (
        <div className={'modal-offer__body'}>
            <div className="form-group">
                <div className="form-title">
                    <div className="main-title">{t('PRICE')}</div>
                </div>
                <div className="input-group">
                    <FormControl
                        type="text"
                        min={0}
                        name="price"
                        onChange={onChangeOfferPrice}
                        value={data.totalPrice}
                    />
                    {/* <span className="input-group-text">{'ETH'}</span> */}
                    <FormSelect
                        value={data.networkTokenId}
                        onChange={onChangeToken}
                        className="m-w-100"
                    >
                        {getERC20Tokens(currentNetwork?.networkTokens).map(
                            (item: any) => (
                                <option value={item.id} key={item.id}>
                                    {item.tokenName}
                                </option>
                            ),
                        )}
                    </FormSelect>
                </div>
                <span className="error-message">{data.error.totalPrice}</span>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('TIME_EXPIRED')}</div>
                    </div>
                    <div className="form-input datetime-picker">
                        <MobileDateTimePicker
                            minDateTime={Date.now()}
                            onChange={onChangeTime}
                            value={data.expried}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    inputProps={{
                                        className: 'form-control',
                                    }}
                                    {...params}
                                />
                            )}
                        />
                    </div>
                    <span className="error-message">{data.error.expried}</span>
                </div>
            </LocalizationProvider>
            <Button
                onClick={onMakeOfferAuth}
                className="secondary-button"
                disabled={makingOffer}
            >
                {makingOffer ? <Spinner /> : t('MAKE_OFFER')}
            </Button>
        </div>
    )
}

function ModalOffer({ setOpen }: Props) {
    const { t } = useTransHook()
    const openModal = useSelector(selectOpenMakeOfferModal)
    return (
        <Modal
            // size="lg"
            isVisible={openModal}
            setVisible={setOpen}
            title={t('MAKE_AN_OFFER')}
            closeButton={true}
            classHeader={''}
            closeOutSide={false}
            classBody={''}
        >
            <ModalBody />
        </Modal>
    )
}

export default ModalOffer
