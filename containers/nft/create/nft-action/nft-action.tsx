import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import { sendCustomTransaction } from '@/connect/ether'
import {
    MAX_IMAGE_SIZE,
    MAX_THUMBNAIL_SIZE,
    NFT_TYPE_TO_ID,
    saleType as SALE_TYPE,
    supportMediaType,
} from '@/constants/nft'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import useActionAuth from '@/hooks/useActionAuth'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import { useTransHook } from '@/locales/hooks'
import nftServices from '@/services/nft'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { resetCreateNft, validateNFTCreateForm } from '@/store/nft/createSlice'
import { selectError, selectNFTCreate } from '@/store/nft/selectors'
import { handleTransactionError } from '@/utils/handleTransactionError'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styles from './style.module.scss'

const NFTAction = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTransHook()
    const dispatch = useDispatch()
    const errorFilter = useSelector(selectError('filter')) as {
        nftType: string
    }
    const currentNetwork = useSelector(selectCurrentNetwork)

    const nft = useSelector(selectNFTCreate)

    const router = useRouter()

    useEffect(() => {
        return () => {
            dispatch(resetCreateNft())
        }
    }, [])

    const handleMintNFT = async () => {
        try {
            setIsLoading(true)
            // handle save nft data to DB to get NFTID
            const nftData: any = {
                name: nft.generalInfo.name.trim(),
                description: nft.generalInfo.description,
                collectionId: Number(nft.generalInfo.collectionId),
                networkId: nft.network.chainId,
                receiveToken: nft.network.basePrice,
                royalty: nft.filter.royalty,
                category: NFT_TYPE_TO_ID[nft.filter.nftType],
                type: nft.sale.saleType,
            }

            if (nft.sale.saleType === SALE_TYPE.FIXEDPRICE) {
                nftData.price = Number(nft.sale.price)
            }
            if (nft.sale.saleType === SALE_TYPE.TIMEAUTION) {
                nftData.price = Number(nft.sale.aution.minPrice)
                nftData.startPrice = Number(nft.sale.aution.minPrice)
                nftData.startTime = new Date(nft.sale.aution.openTime)
                nftData.endTime = new Date(nft.sale.aution.closeTime)
            }

            const createdNFTRes = await nftServices.createNFT(nftData)
            const nftId = createdNFTRes.savedNft.id
            const thumbnailFile = nft.media.thumbnailFile as File
            const mainFile = nft.media.mainFile as File

            // handle upload media to S3
            if (thumbnailFile) {
                // upload thumnail
                const resPreview = await nftServices.getUploadData({
                    nftId: nftId,
                    mediaFile: thumbnailFile,
                    type: 'preview',
                })

                await nftServices.putNFTMedia({
                    mediaFile: thumbnailFile,
                    nftId: nftId,
                    uploadUrl: resPreview.upload_url,
                })

                const previewMediaId = resPreview?.path?.replace(
                    'input',
                    'output',
                )

                if (supportMediaType.audio.includes(mainFile?.type)) {
                    // upload audio
                    console.log('UPLOAD AUDIO AUDIO')
                    const resAudio = await nftServices.getUploadData({
                        mediaFile: mainFile,
                        nftId: nftId,
                        type: 'audio',
                    })
                    await nftServices.putNFTMedia({
                        mediaFile: mainFile,
                        nftId: nftId,
                        uploadUrl: resAudio.upload_url,
                        previewMediaId: previewMediaId,
                    })
                } else {
                    // upload video
                    const resVideo = await nftServices.getUploadData({
                        mediaFile: mainFile,
                        nftId: nftId,
                        previewMediaId: previewMediaId,
                        type: 'video',
                    })
                    await nftServices.putNFTMedia({
                        mediaFile: mainFile,
                        nftId: nftId,
                        uploadUrl: resVideo.upload_url,
                        previewMediaId: previewMediaId,
                    })
                }
            } else {
                // upload normal image
                const resPresign = await nftServices.getUploadData({
                    mediaFile: mainFile,
                    nftId: nftId,
                })

                await nftServices.putNFTMedia({
                    nftId: nftId,
                    mediaFile: mainFile,
                    uploadUrl: resPresign?.upload_url,
                })
            }
        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error) toast.error(error.message)
        }
    }

    const isValidateCreateNFTForm = (): boolean => {
        if (
            !nft.media.mainFile ||
            ((supportMediaType.audio.includes(nft.media.type) ||
                supportMediaType.video.includes(nft.media.type)) &&
                !nft.media.thumbnailFile) ||
            !nft.generalInfo.name.trim()
        ) {
            return false
        }

        if (nft.media.mainFile && nft.media.mainFile.size > MAX_IMAGE_SIZE) {
            return false
        }

        if (
            nft.media.thumbnailFile &&
            nft.media.thumbnailFile.size > MAX_THUMBNAIL_SIZE
        ) {
            return false
        }
        if (
            nft.sale.saleType === SALE_TYPE.FIXEDPRICE &&
            !Number(nft.sale.price)
        ) {
            return false
        }

        if (errorFilter.nftType !== '') return false
        if (nft.sale.saleType === SALE_TYPE.TIMEAUTION) {
            const { closeTime, openTime, minPrice } = nft.sale.aution

            if (!openTime || openTime < Date.now()) {
                return false
            }
            if (!closeTime || closeTime < Date.now() || closeTime < openTime) {
                return false
            }
            if (!Number(minPrice)) {
                return false
            }
        }
        return true
    }

    const onMintNFT = () => {
        if (isValidateCreateNFTForm()) {
            handleMintNFT()
        } else {
            dispatch(validateNFTCreateForm())
            // toast.error(t('INVALID_DATA'))
        }
    }

    const onMintNFTAuth = useActionAuth(onMintNFT, false)

    const handleMintAndTradeNFT = async (data: any, txnType: number) => {
        try {
            const transactionParameters = {
                nonce: data.nonce, // ignored by MetaMask
                gasPrice: data.gasPrice, // customizable by user during MetaMask confirmation.
                gasLimit: data.gas, // customizable by user during MetaMask confirmation.
                to: data.to, // Required except during contract publications.
                from: data.from, // must match user's active address.
                // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                data: data.data, // Optional, but used for defining smart contract creation and interaction.
                chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
            }

            switch (txnType) {
                case 0:
                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.createNftXanalia721,
                        currentNetwork?.id,
                    )
                    break
                case 1:
                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.mintAndPutSale,
                        currentNetwork?.id,
                    )
                    break
                default:
                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.mintAndPutAuction,
                        currentNetwork?.id,
                    )
                    break
            }
        } catch (error: any) {
            // console.log("🚀 ~ file: nft-action.tsx ~ line 232 ~ handleMintAndTradeNFT ~ error", error, typeof error, error.code)
            setIsLoading(false)
            console.log(error.code)
            console.log(error.message)
            handleTransactionError(error, t)
        }
    }

    const handleSocketResultMintNFT = useCallback(
        async (data: any) => {
            console.log('SUCCESS_DATA', data)

            const signData = data?.data?.dataReturn?.signData

            // 0 mint 1 mintandputonsale 2 mintonputonauction
            const txnType = data?.data?.nftType
            console.log(signData)
            console.log(txnType)
            if (signData) {
                await handleMintAndTradeNFT(signData, txnType)
            }
        },
        [currentNetwork],
    )

    useSocketGlobal(
        SOCKET_EVENTS.sendDataSignCreateNftSuccess,
        handleSocketResultMintNFT,
    )

    const handleCreateNFTSuccess = (data: any) => {
        console.log('CREATE_SUCCESS', data)
        setIsLoading(false)
        toast.success(t('CREATE_NFT_SUCCESSFULLY'))
        router.push('/my-items?tab=nft')
    }

    useSocketGlobal(
        SOCKET_EVENTS.externalCreateNftSuccess,
        handleCreateNFTSuccess,
    )

    return (
        <div className={styles['nft-create-actions']}>
            {/* <Button size="lg" variant="outline-primary">
                {t('SAVE_AS_DRAFT')}
            </Button> */}
            <Button
                size="lg"
                className="btn-loading"
                variant="primary"
                onClick={onMintNFTAuth}
                disabled={isLoading ? true : false}
            >
                {t('MINT_NOW')}
            </Button>
            <ModalTransactionPending
                open={isLoading}
                setOpen={setIsLoading}
                keyMessage="PROGRESS_TRANSACTION"
            />
        </div>
    )
}

export default NFTAction
