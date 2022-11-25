/* eslint-disable @next/next/no-img-element */
import BreadcrumbsTitle from '@/components/common/breadcrumbs-title'
import UploadImageCard from '@/components/common/upload-image-card'
import { useTransHook } from '@/locales/hooks'
import React, { useEffect, useState } from 'react'
import { FormControl } from 'react-bootstrap'
import style from './style.module.scss'
import CopyButton from './copy-button'
import UpdateCollectionActions from './update-collection-actions'
import collectionServices from '@/services/collection'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectDataUser } from '@/store/user/selectors'
import { resetCollection } from '@/store/collection/createSlice'
import NotFoundPage from '@/containers//404'
import Loading from '@/components/common/loading'

const CollectionPage = () => {
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const user = useSelector(selectDataUser)
    const [isLoading, setLoading] = useState(true)
    const [current, setCurrent] = useState<any>({})
    const [collection, setCollection] = useState<any>({
        name: '',
        symbol: '',
        description: '',
        bannerImage: '',
        contractAddress: '',
        iconImage: '',
        bannerFile: undefined,
        iconFile: undefined,
    })
    const [error] = useState({
        description: '',
        banner: '',
        icon: '',
    })

    const router = useRouter()
    const dispatch = useDispatch()

    const { networkName, collectionAddress } = router.query

    useEffect(() => {
        ;(async () => {
            try {
                const res = await collectionServices.getCollectionDetail({
                    networkName: networkName,
                    contractAddress: collectionAddress,
                    isUpdate: 1,
                })

                if (res?.id) {
                    console.log(res.type, user?.id, res.userId)
                    if (res?.userId === user?.id && res?.type === 4) {
                        setCurrent(res)
                    }
                    setLoading(false)
                }
            } catch {
                setLoading(false)
            } finally {
                // setLoading(false)
            }
        })()
    }, [])

    const resetCurrent = () => {
        if (current.id) {
            setCollection({
                ...collection,
                description: current.description,
                name: current.name,
                symbol: current.symbol,
                contractAddress: current.contractAddress,
                bannerImage: current.bannerImage,
                iconImage: current.iconImage,
                bannerFile: undefined,
                iconFile: undefined,
            })
        }
    }
    useEffect(() => {
        resetCurrent()
    }, [current])

    const { t } = useTransHook()

    const onChange = (e: any) => {
        if (e?.target) {
            const { name, value } = e.target
            setCollection({
                ...collection,
                [name]: value,
            })
        }
    }

    const onChangeBanner = (file: File | undefined) => {
        let url = ''
        if (file) {
            url = URL.createObjectURL(file)
        }
        setCollection({
            ...collection,
            bannerImage: url,
            bannerFile: file,
        })
    }

    const onChangeIcon = (file: File | undefined) => {
        let url = ''
        if (file) {
            url = URL.createObjectURL(file)
        }
        setCollection({
            ...collection,
            iconImage: url,
            iconFile: file,
        })
    }

    useEffect(() => {
        return () => {
            dispatch(resetCollection())
        }
    }, [])
    if (isLoading) {
        return (
            <div className="content-center min-h-[60vh]">
                <Loading />
            </div>
        )
    }
    if (!isLoading && !current.id) {
        return <NotFoundPage />
    }

    return (
        <div className={`${style['collection-page']} container-fluid`}>
            <BreadcrumbsTitle
                className={style['collection-page__breadcrumbs']}
                title={collection.name}
                breadcrumbs={[
                    {
                        text: t('COLLECTION'),
                        href: '/my-items?tab=collection',
                    },
                    { text: t('Update') },
                ]}
            />

            {/* <div className={style['collection-page__time-zone']}>
                <p className="text-body--01">
                    {t('COLLECTION_TIME_ZONE')} : Dubai time (UTC+4;00)
                </p>
            </div> */}

            <div
                className={`${style['collection-page__g-panel']} ${style['space-y']}`}
            >
                <label className={style['collection-page__panel']}>
                    <p className="text-body--01">{t('COLLECTION_NAME')}</p>

                    <FormControl
                        name="name"
                        value={collection.name}
                        disabled
                        onChange={onChange}
                        maxLength={1000}
                    />
                </label>

                <label className={style['collection-page__panel']}>
                    <p className="text-body--01">{t('COLLECTION_SYMBOL')}</p>

                    <FormControl
                        name="symbol"
                        value={collection.symbol}
                        onChange={onChange}
                        disabled
                        maxLength={1000}
                    />
                </label>
            </div>

            <label
                className={`${style['collection-page__panel']} ${style['space-y']}`}
            >
                <div>
                    <p className="text-body--01">
                        {t('COLLECTION_DESCRIPTION')}
                    </p>
                    <span className="sub-text--01">
                        {collection.description.length || 0}/1000
                    </span>
                </div>
                <FormControl
                    as="textarea"
                    rows={6}
                    name="description"
                    value={collection.description}
                    placeholder={t('COLLECTION_TYPE_SOMETHING')}
                    onChange={onChange}
                    maxLength={1000}
                />
                <span className="error-message">{t(error.description)}</span>
            </label>

            <label
                className={`${style['collection-page__panel']} ${style['space-y']}`}
            >
                <p className="text-body--01">{t('COLLECTION_ADDRESS')}</p>

                <div
                    className={`${style['collection-page__contract-address']}`}
                >
                    <FormControl
                        value={collection.contractAddress}
                        name="contract"
                        disabled={true}
                    />
                    <CopyButton value={collection.contractAddress} />
                </div>
            </label>

            <div className={`${style['collection-page__footer']}`}>
                <div>
                    <UploadImageCard
                        name="bannerFile"
                        value={collection.bannerImage}
                        title={t('COLLECTION_BANNER_IMAGE')}
                        maxWidth={1600}
                        maxHeight={300}
                        onChange={onChangeBanner}
                        error={error.banner}
                    />
                    <UploadImageCard
                        name="iconFile"
                        value={collection.iconImage}
                        title={t('COLLECTION_ICON_IMAGE')}
                        maxWidth={512}
                        maxHeight={512}
                        onChange={onChangeIcon}
                        error={error.icon}
                    />
                </div>

                <UpdateCollectionActions
                    collection={collection}
                    current={current}
                    resetCurrent={resetCurrent}
                />
            </div>
        </div>
    )
}

export default CollectionPage
