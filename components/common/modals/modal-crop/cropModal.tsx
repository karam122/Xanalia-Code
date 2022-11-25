import React, { useState, useCallback } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './canvasUtils'
import styles from './style.module.scss'
import { useTransHook } from '@/locales/hooks'

interface IProps {
    show: boolean
    imageSrc: any
    getEdittedImg: any
    fileName: string
    fileType: string
    handleClose: () => void
    fileExtension: string
}

const CropModal = (props: IProps) => {
    const { t } = useTransHook()
    const {
        show,
        handleClose,
        imageSrc,
        getEdittedImg,
        fileName,
        fileType,
        fileExtension,
    } = props
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState()
    const onCropComplete = useCallback(
        async (croppedArea: any, croppedAreaPixels: any) => {
            // const croppedImageSize = await getCroppedImg(
            //   imageSrc,
            //   croppedAreaPixels,
            //   rotation
            // );

            setCroppedAreaPixels(croppedAreaPixels)
        },
        [],
    )

    const showCroppedImage = useCallback(async () => {
        try {
            getCroppedImg(imageSrc, fileType, croppedAreaPixels).then(
                (croppedImage: any) => {
                    fetch(croppedImage)
                        .then((r) => r.blob())
                        .then((blobFile) => {
                            const blob = new File(
                                [blobFile],
                                `${fileName}.${fileExtension}`,
                                {
                                    type: fileType,
                                },
                            )
                            getEdittedImg(blob)
                        })
                },
            )
        } catch (e) {
            return false
        }
    }, [imageSrc, croppedAreaPixels, rotation])

    const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // do the rest here
        setZoom(parseFloat(event.target.value))
    }

    return (
        <div>
            <Modal
                // size=""
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                className={styles['productImageCropModal']}
            >
                <Modal.Header closeButton className={styles['title-thumbnail']}>
                    {t('CREATE')} {t('THUMBNAIL')}
                </Modal.Header>
                <Modal.Body>
                    {imageSrc ? (
                        <React.Fragment>
                            <div className={styles['cropContainer']}>
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={1 / 1}
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>

                            <div className={styles['controls']}>
                                <div className={styles['sliderContainer']}>
                                    <label
                                        // variant={"overline"}
                                        className={styles['sliderLabel']}
                                    >
                                        {t('ZOOM')}
                                    </label>
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={10}
                                        step={0.01}
                                        aria-labelledby="Zoom"
                                        className={styles['rangSlider']}
                                        onChange={handleZoomChange}
                                    />
                                </div>
                                <div
                                    className={`${styles['sliderContainer']} d-none`}
                                >
                                    <label
                                        // variant="overline"
                                        className="sliderLabel"
                                    >
                                        Rotation
                                    </label>
                                    <input
                                        type="range"
                                        value={rotation}
                                        min={0}
                                        max={360}
                                        step={1}
                                        aria-labelledby="Rotation"
                                        className="slider"
                                    />
                                </div>
                                <Button
                                    onClick={showCroppedImage}
                                    variant="primary"
                                    color="primary"
                                    className="cropButton"
                                >
                                    {t('SAVE')}
                                </Button>
                            </div>
                        </React.Fragment>
                    ) : null}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CropModal
