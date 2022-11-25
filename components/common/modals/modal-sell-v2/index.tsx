import React, { useState, useEffect } from 'react'
import Modal from '@/components/ui/modals'
// import { useSelector } from 'react-redux'
import style from './style.module.scss'
import { saleType } from '@/constants/nft'
import SaleType from './sale-type'
import { Data } from './type'
import FixedPrice from './fixed-price'
import TimeAuction from './time-auction'
import { useTransHook } from '@/locales/hooks'
import { useSelector } from 'react-redux'
import { selectCurrentNetwork } from '@/store/network/selectors'
// import { toast } from 'react-toastify'
import nftServices from '@/services/nft'
import { selectNFTDetails } from '@/store/nft/selectors'
import { sendCustomTransaction } from '@/connect/ether'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useSocketDetailPage } from '@/hooks/useSocketGlobal'
import SOCKET_EVENTS from '@/constants/socket'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { getDefaultToken, getERC20Tokens } from '@/utils/token'
import { toast } from 'react-toastify'
import ModalTransactionPending from '../modal-transaction-pending'
type Props = {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    isLoading: boolean
    // eslint-disable-next-line no-unused-vars
    setIsLoading: (val: boolean) => void
}

type IModalBody = {
    isLoading: boolean
    // eslint-disable-next-line no-unused-vars
    setIsLoading: (val: boolean) => void
}
const MIN15 = 15 * 60000
const ModalBody = ({ isLoading, setIsLoading }: IModalBody) => {
    const { t } = useTransHook()
    const currentNetwork = useSelector(selectCurrentNetwork)
    // console.log(
    //     '🚀 ~ file: index.tsx ~ line 42 ~ ModalBody ~ currentNetwork',
    //     currentNetwork,
    // )
    const nftDetails = useSelector(selectNFTDetails)

    const [data, setData] = useState<Data>({
        saleType: saleType.FIXEDPRICE,
        fixedPrice: '',
        startPrice: '',
        basePrice: 0,
        startTime: Date.now() + 5 * 60000,
        closeTime: Date.now() + 20 * 60000,
        chainId: 0,
        error: {
            fixedPrice: '',
            closeTime: '',
            startTime: '',
            startPrice: '',
        },
    })
    console.log('🚀 ~ file: index.tsx ~ line 63 ~ ModalBody ~ data', data)

    useEffect(() => {
        if (currentNetwork && currentNetwork.networkTokens?.length > 0) {
            setData({
                ...data,
                chainId: currentNetwork.chainId,
                basePrice: getDefaultToken(
                    getERC20Tokens(currentNetwork?.networkTokens),
                    data.saleType,
                    currentNetwork.name,
                ).id,
            })
        }
    }, [currentNetwork])

    const onChangeSaleType = (value: number) => {
        setData({
            ...data,
            saleType: value,
        })
    }

    const onChangeFixedPriceSection = ({
        field,
        value,
    }: {
        field: string
        value: number | undefined
    }) => {
        const error = { ...data.error }

        switch (field) {
            case 'fixedPrice': {
                if (value && value > 0) {
                    error.fixedPrice = ''
                }
                break
            }
        }
        setData({
            ...data,
            [field]: value,
            error: error,
        })
    }

    const onChangeAuction = ({
        field,
        value,
    }: {
        field: string
        value: string | object | number
    }) => {
        const error = { ...data.error }
        switch (field) {
            case 'fixedPrice': {
                if (value > 0) {
                    error.fixedPrice = ''
                }
                break
            }
            case 'startPrice': {
                if (Number(value) > 0) {
                    error.startPrice = ''
                }
                break
            }
            case 'startTime': {
                if (Number(value) >= Date.now()) {
                    error.startTime = ''
                }
                break
            }
            case 'closeTime': {
                if (
                    Number(value) >= Date.now() &&
                    data.startTime < Number(value)
                ) {
                    error.startTime = ''
                }
                break
            }
        }
        setData({
            ...data,
            [field]: value,
            error: error,
        })
    }

    const isValidate = () => {
        const error = {
            fixedPrice: '',
            closeTime: '',
            startTime: '',
            startPrice: '',
        }

        let isSuccess = true
        if (!data.basePrice) {
            isSuccess = false
        }
        if (data.saleType === saleType.TIMEAUTION) {
            const { closeTime, startTime, startPrice } = data
            // closeTime = Number(closeTime)
            // startTime = Number(startTime)

            // if (!openTime || openTime < Date.now()) {
            //     state.error.sale.openTime =
            //         'ERROR_INVALID_OPEN_TIME_AUTION1'
            // }
            // if (!closeTime || (openTime && closeTime < openTime + MIN15)) {
            //     state.error.sale.closeTime =
            //         'ERROR_INVALID_CLOSE_TIME_AUTION2'
            // }

            // if (!closeTime || closeTime < Date.now()) {
            //     state.error.sale.closeTime =
            //         'ERROR_INVALID_CLOSE_TIME_AUTION2'
            // }

            if (!startTime || startTime <= Date.now()) {
                error.startTime = 'ERROR_INVALID_OPEN_TIME_AUTION1'
                isSuccess = false
            }
            if (!closeTime || (startTime && closeTime < startTime + MIN15)) {
                error.closeTime = 'ERROR_INVALID_CLOSE_TIME_AUTION2'
                isSuccess = false
            }

            if (!closeTime || closeTime < Date.now()) {
                error.closeTime = 'ERROR_INVALID_CLOSE_TIME_AUTION1'
            }
            if (!startPrice || Number(startPrice) < 0) {
                error.startPrice = 'ERROR_INVALID_PRICE_AUTION'
                isSuccess = false
            }
        } else {
            if (!data.fixedPrice || Number(data.fixedPrice) <= 0) {
                error.fixedPrice = 'ERROR_EMPTY_NFT_FIX_PRICE'
                isSuccess = false
            }
        }
        setData({
            ...data,
            error: error,
        })

        return isSuccess
    }

    const handlePutOnsale = async () => {
        setIsLoading(true)
        const resPutOnsale = await nftServices.putOnSale({
            price: Number(data.fixedPrice),
            quantity: 1,
            networkTokenId: Number(data.basePrice),
            nftId: nftDetails.nftId,
        })
        console.log(
            '🚀 ~ file: index.tsx ~ line 203 ~ handlePutOnsale ~ resPutOnsale',
            resPutOnsale,
        )

        const approveAllData = resPutOnsale?.dataReturn?.approveAllData
        console.log(
            '🚀 ~ file: index.tsx ~ line 206 ~ handlePutOnsale ~ approveAllData',
            approveAllData,
        )
        const signData = resPutOnsale?.dataReturn?.signData
        // const approveAllData = resPutOnsale?.approveAllData
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

                const txnResult = await sendCustomTransaction(
                    transactionParameters,
                )
                if (txnResult) {
                    noncePlus = 1
                    toast.success(t('APPROVE_NFT_SUCCESS'))
                }
            } catch (error) {
                approved = false
                setIsLoading(false)
                toast.error(t('APPROVE_NFT_FAIL'))
            }
        }
        if (signData && approved) {
            try {
                const transactionParameters = {
                    nonce: signData.nonce + noncePlus, // ignored by MetaMask
                    // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                    // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
                    to: signData.to, // Required except during contract publications.
                    from: signData.from, // must match user's active address.
                    gasPrice: signData?.gasPrice, // customizable by user during
                    gasLimit: signData?.gas, // customizable by user during
                    // gas: signData?.gas, // customizable by user during
                    // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                    data: signData.data, // Optional, but used for defining smart contract creation and interaction.
                    chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                }
                await sendCustomTransaction(
                    transactionParameters,
                    TRANSACTION_ACTION.putOnSale,
                    currentNetwork?.id,
                )
            } catch (error: any) {
                setIsLoading(false)
                // toast.error(error.message)
            }
        }
    }

    const handlePutOnSaleAuth = useActionAuthNetwork(handlePutOnsale)

    const getTokenNameFromId = (id: number) => {
        let result = ''
        if (currentNetwork) {
            const currentToken = currentNetwork.networkTokens.find(
                (item: any) => item.id === id,
            )
            result = currentToken?.tokenName
        }
        return result
    }

    const handlePutOnAuction = async () => {
        setIsLoading(true)
        const dataCreateAuction = {
            startPrice: Number(data.startPrice),
            receiveToken: getTokenNameFromId(data.basePrice),
            startTime: new Date(data.startTime),
            endTime: new Date(data.closeTime),
            nftId: nftDetails.nftId,
        }
        console.log(
            '🚀 ~ file: index.tsx ~ line 254 ~ handlePutOnAuction ~ dataCreateAuction',
            dataCreateAuction,
        )

        const resPutOnAuction = await nftServices.putOnAuction(
            dataCreateAuction,
        )
        console.log(
            '🚀 ~ file: index.tsx ~ line 300 ~ handlePutOnAuction ~ resPutOnAuction',
            resPutOnAuction,
        )

        const approveAllData = resPutOnAuction?.approveAllData
        const signData = resPutOnAuction?.signData
        // const approveAllData = resPutOnsale?.approveAllData
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

                const txnResult = await sendCustomTransaction(
                    transactionParameters,
                )
                if (txnResult) {
                    noncePlus = 1
                    toast.success(t('APPROVE_NFT_SUCCESS'))
                }
            } catch (error) {
                approved = false
                setIsLoading(false)
                toast.error(t('APPROVE_NFT_FAIL'))
            }
        }
        if (signData && approved) {
            try {
                const transactionParameters = {
                    nonce: signData.nonce + noncePlus, // ignored by MetaMask
                    // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                    // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
                    to: signData.to, // Required except during contract publications.
                    from: signData.from, // must match user's active address.
                    gasPrice: signData?.gasPrice, // customizable by user during
                    gasLimit: signData?.gas, // customizable by user during
                    // gas: signData?.gas, // customizable by user during
                    // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                    data: signData.data, // Optional, but used for defining smart contract creation and interaction.
                    chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                }
                await sendCustomTransaction(
                    transactionParameters,
                    TRANSACTION_ACTION.createAuction,
                    currentNetwork?.id,
                )
            } catch (error: any) {
                setIsLoading(false)
                // toast.error(error.message)
            }
        }
    }

    const handlePutOnAuctionAuth = useActionAuthNetwork(handlePutOnAuction)

    const onSell = () => {
        console.log(data)
        if (!isValidate()) {
            // toast.error(t('INVALID_DATA'))
        } else {
            if (data.saleType === 1) {
                handlePutOnSaleAuth()
            } else {
                handlePutOnAuctionAuth()
            }
        }
    }

    useSocketDetailPage(
        SOCKET_EVENTS.externalPutOnSaleSuccess,
        setIsLoading,
        t('PUT_ON_SALE_SUCCESS'),
    )

    useSocketDetailPage(
        SOCKET_EVENTS.createAuctionSuccess,
        setIsLoading,
        t('PUT_ON_AUCTION_SUCCESS'),
    )

    return (
        <div className={style['modal-sell__body']}>
            <SaleType saleType={data.saleType} onChange={onChangeSaleType} />
            {data.saleType === saleType.FIXEDPRICE ? (
                <FixedPrice
                    fixPrice={data.fixedPrice}
                    basePrice={data.basePrice}
                    onChangeFixPrice={onChangeFixedPriceSection}
                    currencies={
                        currentNetwork?.networkTokens
                            ? currentNetwork?.networkTokens
                            : []
                    }
                    error={data.error.fixedPrice}
                />
            ) : (
                <TimeAuction
                    startPrice={data.startPrice}
                    openTime={data.startTime}
                    closeTime={data.closeTime}
                    error={data.error}
                    basePrice={data.basePrice}
                    onChange={onChangeAuction}
                    currencies={
                        currentNetwork?.networkTokens
                            ? getERC20Tokens(currentNetwork?.networkTokens)
                            : []
                    }
                />
            )}
            <div className="panel">
                <button
                    onClick={onSell}
                    className="secondary-button btn-loading"
                    disabled={isLoading}
                >
                    {t('SELL_ITEM')}
                </button>
            </div>
        </div>
    )
}

function ModalSell({ open, setOpen, isLoading, setIsLoading }: Props) {
    const { t } = useTransHook()

    useEffect(() => {
        if (isLoading) {
            setOpen(false)
        }
    }, [isLoading])
    return (
        <>
            <Modal
                // size="xm"
                isVisible={open}
                setVisible={setOpen}
                title={t('SELL_NFT')}
                closeButton={true}
                classHeader={''}
                classBody={''}
                closeOutSide={false}
            >
                <ModalBody isLoading={isLoading} setIsLoading={setIsLoading} />
            </Modal>
            <ModalTransactionPending open={isLoading} setOpen={setIsLoading} />
        </>
    )
}

export default ModalSell
