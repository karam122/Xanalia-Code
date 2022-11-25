import Modal from '@/components/ui/modals'
import { sendCustomTransaction } from '@/connect/ether'
import { SERVICE_FEE } from '@/constants/nft'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useSocketDetailPage } from '@/hooks/useSocketGlobal'
import useValidate from '@/hooks/useValidate'
import { useTransHook } from '@/locales/hooks'
import nftServices from '@/services/nft'
import { setModalFiat } from '@/store/fiat/fiatSlice'
import { useAppDispatch } from '@/store/hooks'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { selectNFTDetails } from '@/store/nft/selectors'
import { selectOpenMakeOfferModal } from '@/store/offer/selectors'
import { handleTransactionError } from '@/utils/handleTransactionError'
import { getTokenNameFromId } from '@/utils/nft'
import { toFixCustom } from '@/utils/number'
import { getERC20Tokens } from '@/utils/token'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { useEffect, useState } from 'react'
import { Button, FormControl, FormSelect } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AgreeCheckbox from '../../agree-checkbox'
import Spinner from '../../spinner'
import styles from './style.module.scss'

interface IModalOffer {
    // eslint-disable-next-line no-unused-vars
    setOpen: () => void
    setClose: () => void
    // eslint-disable-next-line no-unused-vars
    setOpenTransactionPending: (val: boolean) => void
}

const DAY14 = 86400000 * 14

const ModalOffer = ({
    setOpen,
    setClose,
    setOpenTransactionPending,
}: IModalOffer) => {
    const { t } = useTransHook()

    const [tickService, setTickService] = useState<boolean>(false)
    const [isChecking, setIsChecking] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const nftDetail = useSelector(selectNFTDetails)
    const dispatch = useAppDispatch()
    const [data, setData] = useState({
        totalPrice: '',
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
        setClose()
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

    useEffect(() => {
        if (tickService) {
            setError('')
        }
    }, [tickService])

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
        setData({
            ...data,
            networkTokenId: Number(e.target.value),
            receiveToken: getTokenNameFromId(
                Number(e.target.value),
                currentNetwork.networkTokens,
            ),
        })
    }

    const onChangeOfferPrice = (e: any) => {
        const value = e.target.value
        const error = { ...data.error }
        error.totalPrice = ''

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
            console.log('VAOOVAOVOV VALIDATE')
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

        if (Number(data.totalPrice) > 0 && data.expried > Date.now()) {
            error.totalPrice = ''
            isSuccess = true
        }
        if (!data.receiveToken) {
            isSuccess = true
        }

        setData({
            ...data,

            error: error,
        })
        return isSuccess
    }

    const handleMakeOffer = async () => {
        setIsChecking(true)
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
        if (res?.messageCode) {
            setIsChecking(false)
            setError(t(res?.messageCode))
        } else {
            setIsChecking(false)
            setClose()
            setOpenTransactionPending(true)
            const approveData = res?.dataReturn?.approveData
            let approved = true
            let noncePlus = 0
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
                    console.log(
                        '🚀 ~ file: index.tsx ~ line 205 ~ handleMakeOffer ~ txnResult',
                        txnResult,
                    )

                    if (txnResult) {
                        noncePlus = 1
                        toast.success(t('APPROVE_TOKEN_SUCCESS'))
                    }
                } catch (error) {
                    console.log(
                        '🚀 ~ file: index.tsx ~ line 201 ~ handleMakeOffer ~ error',
                        error,
                    )
                    approved = false
                    setOpen()
                    toast.error(t('APPROVE_TOKEN_FAIL'))
                    setOpenTransactionPending(false)
                }
            }
            const signData = res?.dataReturn?.signData
            console.log(
                '🚀 ~ file: index.tsx ~ line 219 ~ handleMakeOffer ~ signData',
                signData,
            )
            if (signData && approved) {
                try {
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

                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.makeOffer,
                        currentNetwork?.id,
                    )
                } catch (error: any) {
                    console.log(
                        '🚀 ~ file: index.tsx ~ line 230 ~ handleMakeOffer ~ error',
                        error,
                    )
                    setOpen()
                    handleTransactionError(error, t)
                    setOpenTransactionPending(false)
                }
            }
        }
    }

    const onMakeOffer = () => {
        console.log(isValidate())
        if (!isValidate()) {
            // toast.error('INVALID_OFFER_DATA')
            return
        } else if (!tickService) {
            setError(t('PLEASE_TICK_AGREE_SERVICE'))
        } else {
            handleMakeOffer()
        }
    }

    const onTopUp = () => {
        dispatch(setModalFiat(true))
    }

    const openModal = useSelector(selectOpenMakeOfferModal)

    // useSocketGlobal(SOCKET_EVENTS.externalMakeOfferSuccess, () => {
    //     dispatch(getOfferList(nftDetail.nftId))
    //     setOpenTransactionPending(false)
    //     toast.success(t('MAKE_OFFER_SUCCESSFULLY'))
    //     setData({
    //         ...data,

    //         totalPrice: '',
    //         quantity: 1,
    //         nftId: nftDetail.nftId,
    //         expried: Date.now() + DAY14,
    //         networkTokenId: getERC20Tokens(currentNetwork.networkTokens)[0].id,
    //         receiveToken: getTokenNameFromId(
    //             Number(getERC20Tokens(currentNetwork.networkTokens)[0].id),
    //             currentNetwork.networkTokens,
    //         ),
    //         error: {
    //             totalPrice: '',
    //             expried: '',
    //         },
    //     })
    //     setTickService(false)
    // })

    useSocketDetailPage(
        SOCKET_EVENTS.externalMakeOfferSuccess,
        setOpenTransactionPending,
        t('MAKE_OFFER_SUCCESSFULLY'),
    )

    const setOfferModal = (val: boolean) => {
        if (val) {
            setOpen()
        } else {
            setClose()
        }
    }

    return (
        <Modal
            // size="lg"
            isVisible={openModal}
            setVisible={setOfferModal}
            title={t('MAKE_AN_OFFER')}
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
                        <span
                            className="heading--6-2 text-1-line"
                            title={nftDetail?.name}
                        >
                            {nftDetail?.name}
                        </span>
                    </div>
                    <div className={styles['checkout-item__price-token']}>
                        <div className="form-group">
                            <div className="input-group">
                                <FormControl
                                    type="text"
                                    min={0}
                                    name="price"
                                    className="heading--6-2"
                                    onChange={onChangeOfferPrice}
                                    value={data.totalPrice}
                                />
                                <FormSelect
                                    value={data.networkTokenId}
                                    onChange={onChangeToken}
                                    className="m-w-100"
                                >
                                    {getERC20Tokens(
                                        currentNetwork?.networkTokens,
                                    ).map((item: any) => (
                                        <option value={item.id} key={item.id}>
                                            {item.tokenName}
                                        </option>
                                    ))}
                                </FormSelect>
                            </div>
                            {/* <span className="error-message">
                                {data.error.totalPrice}
                            </span> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="form-group">
                        <div className="form-title">
                            <div className="main-title">
                                {t('OFFER_EXPIRATION')}
                            </div>
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
                        {/* <span className="error-message">
                            {data.error.expried}
                        </span> */}
                    </div>
                </LocalizationProvider>
                <div className="heading--6-2">{t('FEE')}</div>
                <div className={styles['checkout-item__content']}>
                    <span>{t('ROYALTY_FEE')}</span>
                    <span className="heading--6-3">{`${toFixCustom(
                        ((Number(data.totalPrice) || 0) *
                            Number(nftDetail.royalty)) /
                            100,
                    )} ${data.receiveToken} (${Number(
                        nftDetail.royalty,
                    )}%)`}</span>
                </div>
                <div className={styles['checkout-item__content']}>
                    <span>{t('SERVICE_FEE')}</span>
                    <span className="heading--6-3">{`${toFixCustom(
                        ((Number(data.totalPrice) || 0) * SERVICE_FEE) / 100,
                    )} ${data.receiveToken} (${SERVICE_FEE}%)`}</span>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <div className={styles['checkout-item__content']}>
                    <span>{t('YOU_WILL_PAY')}</span>
                    <span className="heading--6-3">{`${
                        toFixCustom(data.totalPrice) || 0
                    } ${data.receiveToken}`}</span>
                </div>
            </div>
            <AgreeCheckbox tick={tickService} setTick={setTickService} />
            <div className={`${styles['checkout-error']} error-message`}>
                {data.error.totalPrice
                    ? data.error.totalPrice
                    : data.error.expried
                    ? data.error.expried
                    : error}
            </div>
            <div className="modal-action">
                <Button
                    size="lg"
                    className="btn-loading"
                    disabled={isChecking}
                    variant="primary"
                    onClick={onMakeOffer}
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

export default ModalOffer
