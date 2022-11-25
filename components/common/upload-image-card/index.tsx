/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react'
import style from './style.module.scss'
import SVGDefaultImage from '@/public/svgs/default-image.svg'
import { Button } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'
import { getNftType } from '@/constants/nft'
import { useDispatch } from 'react-redux'
import { updateFile } from '@/store/collection/createSlice'
import { toast } from 'react-toastify'
const imageType = getNftType('image')
const messageKey = (field: string, type: string) => {
    switch (field) {
        case 'bannerFile': {
            if (type === 'shape') {
                return 'COLLECTION_BANNER_MAX_SHAPPE'
            } else {
                return 'COLLECTION_BANNER_OVER_100MB'
            }
        }
        case 'iconFile': {
            if (type === 'shape') {
                return 'COLLECTION_ICON_MAX_SHAPPE'
            } else {
                return 'COLLECTION_ICON_OVER_100MB'
            }
        }
        default:
            return ''
    }
}
const UploadImageCard = ({
    title,
    maxWidth,
    maxHeight,
    name,
    value,
    error,
    onChange,
}: // file,
// onChange,
{
    title: string
    maxWidth: number
    maxHeight: number
    value: string
    // file: File
    name: 'bannerFile' | 'iconFile'
    error: string | undefined
    // eslint-disable-next-line no-unused-vars
    onChange: (value: undefined | File) => void
}) => {
    const dispatch = useDispatch()
    const ref = useRef<HTMLInputElement>(null)
    const { t } = useTransHook()
    useEffect(() => {
        if (!value && ref.current) {
            ref.current.value = ''
        }
    }, [value])

    function resetData() {
        if (ref?.current?.value) {
            ref.current.value = ''
        }
        onChange(undefined)
        dispatch(updateFile({ field: name, value: undefined }))
    }

    const onChangeImage = async (eve: any) => {
        if (ref.current) {
            const file = eve.target.files[0] as File
            if (file) {
                console.log(file, 'file')
                if (!!file && !imageType.supportTypes.includes(file.type))
                    return resetData()
                if (file.size > 100 * 1024 * 1024) {
                    toast.error(t(messageKey(name, 'size')))
                    resetData()
                    return
                }
                const url = URL.createObjectURL(file)

                // const base64 = await loadBase64(file)
                if (!url) return resetData()

                const img = await getInfoImage(url)
                if (!img || img.width > maxWidth || img.height > maxHeight) {
                    toast.error(t(messageKey(name, 'shape')))
                    return resetData()
                }
                dispatch(updateFile({ field: name, value: file }))
                onChange(file)
            }
        }
    }

    async function getInfoImage(
        base64?: string,
    ): Promise<HTMLImageElement | undefined> {
        return new Promise((res, rej) => {
            try {
                if (base64 === undefined) return res(undefined)
                const img = new Image()
                img.src = base64
                img.onload = () => res(img)
                img.onerror = () => res(undefined)
            } catch (error) {
                rej(error)
            }
        })
    }

    const select = () => {
        if (ref && ref.current) {
            ref.current.click()
        }
    }

    return (
        <div className={style['upload-card']}>
            {value ? (
                <img src={value} draggable="false" loading="lazy" alt="" />
            ) : (
                <span className="pointer" onClick={select}>
                    <SVGDefaultImage />
                </span>
            )}

            <div>
                <p className="text-btn--01">{title}</p>
                <p className="sub-text--01">
                    {t('COLLECTION_MAX_SIZE')} {maxWidth}*{maxHeight}
                </p>
                <input
                    ref={ref}
                    type="file"
                    style={{ display: 'none' }}
                    name={name}
                    id={name}
                    onChange={onChangeImage}
                    accept={imageType.supportTypes}
                />
                <label htmlFor={name}>
                    <Button className="text-btn--01" onClick={select}>
                        {value
                            ? t('COLLECTION_BTN_CHANGE')
                            : t('COLLECTION_BTN_UPLOAD')}
                    </Button>
                </label>
            </div>

            {error && (
                <p className="error-message" style={{ paddingLeft: '10px' }}>
                    {t(error)}
                </p>
            )}
        </div>
    )
}

export default UploadImageCard
