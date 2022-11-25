import { IMAGE_TYPE_UPLOAD } from '@/constants/collection'
import useActionAuth from '@/hooks/useActionAuth'
import { useTransHook } from '@/locales/hooks'
import collectionServices from '@/services/collection'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { myCollectionsUrl } from '@/constants/url'
import Spinner from '@/components/common/spinner'

// import { getSigner } from '@/blockchain/base'
type Props = {
    collection: any
    current: any
    resetCurrent: () => void
}
const CreateCollectionActions = ({
    collection,
    current,
}: // resetCurrent,
Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { t } = useTransHook()

    const router = useRouter()

    const canUpdate = () => {
        return (
            collection.bannerFile ||
            collection.iconFile ||
            collection.description !== current.description
        )
    }

    const handleUploadMedia = async (collectionId: number) => {
        if (collection.iconFile) {
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
        }

        if (collection.bannerFile) {
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
    const getData = () => {
        return {
            description: collection.description,
        }
    }

    const isValidateCreateCollection = () => {
        return true
    }

    const onUpdateCollection = async () => {
        if (isValidateCreateCollection()) {
            setIsLoading(true)
            await handleUploadMedia(current.id)
            const data = getData()
            try {
                const res = await collectionServices.updateCollection(
                    current.id,
                    data,
                )
                if (res) {
                    setTimeout(() => {
                        router.push(myCollectionsUrl)
                        toast.success('UPDATE_COLLECTION_SUCCESS')
                    }, 2000)
                }
            } catch (error: any) {
                setIsLoading(false), toast.error(error.message)
            }
        }
    }

    const onUpdateCollectionAuth = useActionAuth(onUpdateCollection)
    const cancel = () => {
        router.push('/my-items?tab=collection')
    }
    return (
        <div>
            <Button
                className="text-btn--01 btn-loading"
                onClick={onUpdateCollectionAuth}
                disabled={isLoading || !canUpdate()}
            >
                {isLoading ? <Spinner /> : t('COLLECTION_BTN_EDIT')}
            </Button>
            <Button
                variant="outline-primary"
                className="text-btn--01"
                disabled={isLoading}
                onClick={cancel}
            >
                {t('COLLECTION_BTN_CANCEL')}
            </Button>
        </div>
    )
}

export default CreateCollectionActions
