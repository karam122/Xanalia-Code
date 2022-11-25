import { useState, useEffect } from 'react'
import styles from './style.module.scss'
import DefaultImage from '@/public/svgs/default-image.svg'
import { useTransHook } from '@/locales/hooks'
import { Button } from 'react-bootstrap'
// @ts-ignore
import VideoThumbnail from 'react-video-thumbnail'
import { useSelector, useDispatch } from 'react-redux'
import { selectError, selectNFTCreateMedia } from '@/store/nft/selectors'
import { updateMedia } from '@/store/nft/createSlice'
import { supportMediaType } from '@/constants/nft'
import CropModal from '@/components/common/modals/modal-crop/cropModal'
import { toast } from 'react-toastify'

const mediaId = 'nft-media'
const thumbnailId = 'nft-thumbnail'
const maxSize = 104857600

const validMediaType = (type: string): boolean => {
    if (!type) return false
    return supportMediaType.combind.includes(type)
}
const mediaShow = (media: string, typeOrigin: string) => {
    const type = typeOrigin.split('/')[0]
    switch (type) {
        case 'image': {
            return (
                <img
                    src={media}
                    alt="nft image"
                    className={`${styles['media-image']}`}
                />
            )
        }

        case 'video': {
            return (
                <video
                    src={media}
                    className={`${styles['media-video']}`}
                    controls
                ></video>
            )
        }

        case 'audio': {
            return <audio src={media} controls style={{ width: '80%' }}></audio>
        }

        default:
            return ''
    }
}
const UploadMedia = () => {
    const { t } = useTransHook()
    const media = useSelector(selectNFTCreateMedia)
    const error = useSelector(selectError('media')) as {
        mainFile: string
        thumbnailFile: string
    }
    const dispatch = useDispatch()

    const [isVideo, setIsVideo] = useState<boolean>(false)
    const [showCropModal, setShowCropModal] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<any>('')
    const [imagetoCrop, setImagetoCrop] = useState<any>('')

    useEffect(() => {
        if (imagetoCrop) {
            setShowCropModal(true)
        }
    }, [imagetoCrop])

    const readFile = (file: any): any => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener(
                'load',
                (e: any) => {
                    var image = new Image()
                    image.src = e.target.result
                    image.addEventListener('load', () => {
                        resolve(reader.result)
                    })
                },
                false,
            )
            reader.readAsDataURL(file)
        })
    }

    const handleFile = async (file: any) => {
        const type = file.type.split('/')[0]
        if (validMediaType(file.type)) {
            const url = URL.createObjectURL(file)
            const thumbnail = type === 'image' ? url : ''
            dispatch(
                updateMedia({
                    main: url,
                    thumbnail: thumbnail,
                    type: file.type.toString().toLowerCase(),
                    mainFile: file,
                    // thumbnailFile: file
                }),
            )

            if (supportMediaType.video.includes(file.type)) {
                setIsVideo(true)
                setSelectedFile(file)
            }
            return true
        }
        return false
    }

    const mediaOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined

        if (file && file.size > maxSize) {
            toast.error(t('FILE_SIZE_OF_NFT_VIDEO'))
            return
        } else {
            handleFile(file)
        }
    }

    const remove = () => {
        const dom = document.getElementById(mediaId) as HTMLInputElement
        if (dom) {
            dom.value = ''
        }
        dispatch(
            updateMedia({
                main: '',
                thumbnail: '',
                type: '',
                mainFile: undefined,
                thumbnailFile: undefined,
            }),
        )
    }

    const thumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined
        if (file && supportMediaType.image.includes(file.type)) {
            const url = URL.createObjectURL(file)

            dispatch(
                updateMedia({ ...media, thumbnail: url, thumbnailFile: file }),
            )
            let imageDataUrl: any = ''
            imageDataUrl = await readFile(file)
            if (imageDataUrl) {
                setImagetoCrop(imageDataUrl)
            }
        }
    }

    const onDragStart = (e: any) => {
        e.preventDefault()
    }

    const onDrop = (ev: any) => {
        ev.preventDefault()
        const media = document.getElementById(mediaId) as HTMLInputElement

        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            const file = ev.dataTransfer.files[i]

            handleFile(file)
            media.files = ev.dataTransfer.files
            break
        }
    }

    const getEdittedImg = (file: any): void => {
        const url = URL.createObjectURL(file)
        dispatch(updateMedia({ ...media, thumbnail: url, thumbnailFile: file }))
        setSelectedFile('')
        setShowCropModal(false)
        setImagetoCrop('')
    }

    const handleVideoThumbnail = (thumbnail: string) => {
        setImagetoCrop(thumbnail)
        setIsVideo(false)
    }

    // const handleUpdateThumbnail = async () => {
    //     let imageDataUrl: any = ''
    //     imageDataUrl = await readFile(media.mainFile)
    //     if (imageDataUrl) {
    //         setImagetoCrop(imageDataUrl)
    //     }
    // }

    const handleClose = () => {
        setShowCropModal(false)
        setImagetoCrop('')
        setSelectedFile('')
    }

    return (
        <>
            <div className={styles['upload-media']}>
                {selectedFile && isVideo && (
                    <>
                        <VideoThumbnail
                            videoUrl={URL.createObjectURL(selectedFile)}
                            thumbnailHandler={(thumbnail: any) =>
                                handleVideoThumbnail(thumbnail)
                            }
                            snapshotAtTime={0}
                            // width={'100%'}
                            // height={"100%"}
                        />
                    </>
                )}
                <div
                    className={styles['upload-media__main-upload']}
                    onDragOver={onDragStart}
                    onDrop={onDrop}
                >
                    {media.main ? (
                        mediaShow(media.main, media.type)
                    ) : (
                        <div className={styles['upload-media__content-group']}>
                            <label
                                htmlFor={mediaId}
                                className={
                                    styles['upload-media__default-image']
                                }
                            >
                                <DefaultImage />
                            </label>

                            <div className={styles['upload-media__text']}>
                                <div className="text-body--02">
                                    {t('DRAG_DROP_FILE')}
                                </div>
                                <div className="text-body--02">{t('OR')}</div>
                                <div className="text-body--02">
                                    {t('BROWSE_MEDIA_ON_YOUR_DEVICE')}
                                </div>
                            </div>
                        </div>
                    )}
                    <input
                        onChange={mediaOnChange}
                        type="file"
                        name="media"
                        id={mediaId}
                        style={{ display: 'none' }}
                        accept={supportMediaType.combind}
                    />{' '}
                    {/* Keep it alway in dom */}
                </div>
                {media.main && (
                    <div className={styles['upload-media__actions']}>
                        <Button
                            size="lg"
                            variant="outline-primary"
                            onClick={remove}
                        >
                            {t('REMOVE')}
                        </Button>

                        <Button
                            size="lg"
                            variant="primary"
                            onClick={() =>
                                document.getElementById(mediaId)?.click()
                            }
                        >
                            {t('CHANGE')}
                        </Button>
                    </div>
                )}
                <span className="error-message">{t(error.mainFile)}</span>
                {media && !media.mainFile?.type.includes('image') && (
                    <div className={styles['upload-media__thumnail']}>
                        <p className="upload-media__thumnail_title">
                            {t('THUMBNAIL')}
                        </p>
                        {/* {media?.mainFile?.type.includes('image') ? (
                            <p
                                className="upload-media__thumnail_title"
                                onClick={handleUpdateThumbnail}
                            >
                                Trim Thumbnail
                            </p>
                        ) : (
                            <p
                                onClick={() =>
                                    document
                                        .getElementById('nft-thumbnail')
                                        ?.click()
                                }
                            >
                                Add Thumbnail
                            </p>
                        )} */}

                        <div className={styles['upload-media__thumnail-image']}>
                            <label
                                htmlFor={thumbnailId}
                                style={{ height: '100%' }}
                            >
                                {media.thumbnail ? (
                                    <img
                                        src={media.thumbnail}
                                        alt="thumbnail"
                                    />
                                ) : (
                                    <img
                                        src="/svgs/default-image.svg"
                                        alt=""
                                        className={styles['default-icon']}
                                    />
                                )}
                            </label>
                            <input
                                onChange={thumbnailChange}
                                type="file"
                                name="thumbnail"
                                id={thumbnailId}
                                style={{ display: 'none' }}
                                accept={supportMediaType.image}
                            />{' '}
                            {/* Keep it alway in dom */}
                        </div>
                    </div>
                )}
                <span className="error-message">{t(error.thumbnailFile)}</span>
            </div>

            {showCropModal && media?.mainFile && (
                <CropModal
                    show={showCropModal}
                    handleClose={handleClose}
                    imageSrc={imagetoCrop}
                    getEdittedImg={getEdittedImg}
                    fileName={media.mainFile.name.split('.')[0]}
                    fileType={
                        media.mainFile.type.includes('image')
                            ? media.mainFile.type
                            : 'image/png'
                    }
                    fileExtension={
                        media.mainFile.type.includes('image')
                            ? media.mainFile.name.split('.')[1]
                            : 'png'
                    }
                />
            )}
        </>
    )
}

export default UploadMedia
