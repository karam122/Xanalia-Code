import { sendCustomTransaction } from '@/connect/ether'
import { IMAGE_TYPE_UPLOAD } from '@/constants/collection'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import useActionAuth from '@/hooks/useActionAuth'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import { useTransHook } from '@/locales/hooks'
import collectionServices from '@/services/collection'
import {
    resetCollection,
    updateInfo,
    validate,
} from '@/store/collection/createSlice'
import { selectCreateCollection } from '@/store/collection/selectors'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
// import style from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import { handleTransactionError } from '@/utils/handleTransactionError'

// import { getSigner } from '@/blockchain/base'
const CreateCollectionActions = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const collection = useSelector(selectCreateCollection)
    const { t } = useTransHook()
    const dispatch = useDispatch()
    const currentNetwork = useSelector(selectCurrentNetwork)
    console.log(
        '🚀 ~ file: create-collection-actions.tsx ~ line 32 ~ CreateCollectionActions ~ currentNetwork',
        currentNetwork,
    )

    const handleUploadMedia = async (collectionId: number) => {
        if (collection.iconFile && collection.bannerFile) {
            // upload icon
            const urlIcon = await collectionServices.getUploadData({
                mediaFile: collection.iconFile as File,
                collectionId: collectionId,
                type: IMAGE_TYPE_UPLOAD.COLLECTION,
            })

            await collectionServices.putCollectionMedia({
                mediaFile: collection.iconFile,
                uploadUrl: urlIcon?.upload_url,
                collectionId: collectionId,
                type: 'cover',
            })

            // upload banner
            const urlBanner = await collectionServices.getUploadData({
                mediaFile: collection.bannerFile as File,
                collectionId: collectionId,
                type: IMAGE_TYPE_UPLOAD.COLLECTION_COVER,
            })

            await collectionServices.putCollectionMedia({
                mediaFile: collection.bannerFile,
                uploadUrl: urlBanner?.upload_url,
                collectionId: collectionId,
                type: 'banner',
            })
        }
    }

    const mintCollection = async (signData: any) => {
        const transactionParameters = {
            nonce: signData.nonce, // ignored by MetaMask
            // gasPrice: signData.gasPrice, // customizable by user during MetaMask confirmation.
            // gasLimit: signData.gas, // customizable by user during MetaMask confirmation.
            to: signData.to, // Required except during contract publications.
            from: signData.from, // must match user's active address.
            // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
            data: signData.data, // Optional, but used for defining smart contract creation and interaction.
            chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        }
        console.log(
            '🚀 ~ file: create-collection-actions.tsx ~ line 75 ~ mintCollection ~ transactionParameters',
            transactionParameters,
        )

        try {
            const customTransaction = await sendCustomTransaction(
                transactionParameters,
                TRANSACTION_ACTION.createCollection,
                currentNetwork?.id,
            )
            if (customTransaction) return setIsLoading(false)
        } catch (error: any) {
            console.log(
                '🚀 ~ file: create-collection-actions.tsx ~ line 92 ~ mintCollection ~ error',
                error,
            )

            console.log(error.code)
            console.log(error.message)
            handleTransactionError(error, t)
            setIsLoading(false)
        }
    }
    const getData = () => {
        return {
            name: collection.name,
            description: collection.description,
            // image: '',
            // banner: '',
            symbol: collection.symbol,
            networkId: currentNetwork.id,
        }
    }

    const isValidateCreateCollection = () => {
        if (!collection.name.trim()) {
            return false
        }
        if (!collection.symbol.trim()) {
            return false
        }
        // if (!collection.description.trim()) {
        //     return false
        // }
        if (!collection.bannerFile) {
            return false
        }

        if (!collection.iconFile) {
            return false
        }

        return true
    }

    const onCreateCollection = async () => {
        if (!props.collectionExist) {
            if (isValidateCreateCollection()) {
                setIsLoading(true)
                const data = getData()
                try {
                    const res = await collectionServices.createCollection(data)
                    if (res.collection && res.dataReturn?.signData) {
                        handleUploadMedia(res.collection.id)
                        await mintCollection(res.dataReturn.signData)
                        setIsLoading(false)
                    }
                } catch (error: any) {
                    console.log(
                        '🚀 ~ file: index.tsx ~ line 54 ~ onCreateCollection ~ error',
                        error,
                        setIsLoading(false),
                    )
                    toast.error(error.message)
                } finally {
                }
            } else {
                dispatch(validate())
                // toast.error(t('INVALID_DATA'))
            }
        }
    }

    const onCreateCollectionAuth = useActionAuth(onCreateCollection)

    const handleResultMintCollection = (data: any) => {
        setIsLoading(false)
        dispatch(
            updateInfo({
                field: 'contract',
                value: data?.data?.collectionAddress,
            }),
        )
        toast.success(t('CREATE_COLLECTION_SUCCESS'))
        router.push('/my-items?tab=collection')
    }

    useSocketGlobal(
        SOCKET_EVENTS.externalCreateCollectionSuccess,
        handleResultMintCollection,
    )

    return (
        <div>
            {/* <Button
        variant="outline-primary"
        className="text-btn--01"
        disabled={isLoading}
      >
        {t('COLLECTION_BTN_SAVE_AS_DRAFT')}
      </Button> */}
            <Button
                className="text-btn--01 btn-loading"
                onClick={onCreateCollectionAuth}
                disabled={isLoading}
            >
                {t('COLLECTION_BTN_EDIT')}
            </Button>
            <Button
                variant="outline-primary"
                className="text-btn--01"
                disabled={isLoading}
                onClick={() => dispatch(resetCollection())}
            >
                {t('COLLECTION_BTN_CANCEL')}
            </Button>
            <ModalTransactionPending
                keyMessage="PROGRESS_TRANSACTION"
                open={isLoading}
                setOpen={setIsLoading}
            />
        </div>
    )
}

export default CreateCollectionActions
