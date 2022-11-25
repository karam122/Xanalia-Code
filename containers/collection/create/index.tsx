/* eslint-disable @next/next/no-img-element */
import UploadImageCard from '@/components/common/upload-image-card'
import { useTransHook } from '@/locales/hooks'
import { resetCollection, updateInfo } from '@/store/collection/createSlice'
import { selectCreateCollection } from '@/store/collection/selectors'
import { useEffect, useState } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CopyButton from './copy-button'
import CreateCollectionActions from './create-collection-actions'
import style from './style.module.scss'
import collectionServices from '@/services/collection'

const CollectionPage = () => {
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const collection = useSelector(selectCreateCollection)
    console.log(collection, 'collection')
    const [collectionExist, setCollectionExist] = useState(false)
    const { t } = useTransHook()
    const dispatch = useDispatch()

    const onChange = (e: any) => {
        if (e?.target) {
            const { name, value } = e.target
            if (e.target.name === 'name' && e.target.value.length === 0) {
                setCollectionExist(false)
            }
            dispatch(updateInfo({ field: name, value: value }))
        }
    }

    const checkCollectionName = async () => {
        const collectionList = await collectionServices.isCollectionExist({
            name: collection.name,
        })

        if (collectionList && collectionList?.id) {
            setCollectionExist(true)
        } else {
            setCollectionExist(false)
        }
    }
    useEffect(() => {
        checkCollectionName()
    }, [collection.name])

    useEffect(() => {
        return () => {
            dispatch(resetCollection())
        }
    }, [])

    return (
        <div className={`${style['collection-page']} container-fluid`}>
            {/* <BreadcrumbsTitle
                className={style['collection-page__breadcrumbs']}
                title={t('COLLECTION_TITLE')}
                breadcrumbs={[
                    { text: t('COLLECTION'), href: myCollectionsUrl },
                    { text: t('CREATE') },
                ]}
            /> */}

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
                        onChange={(e) => onChange(e)}
                        maxLength={35}
                        // className={` ${style['collection-page__panel']} ${style['demo']}`}
                    />
                    <span
                        className={`${style['collection-page__g-panel']} ${
                            collectionExist && collection.name.length > 2
                                ? style['demo']
                                : null
                        } `}
                    >
                        {t(collection.error.name)}
                    </span>
                    {collectionExist && collection.name.length > 2 && (
                        <span style={{ fontSize: '80%', color: '#dc3545' }}>
                            {t('COLLECTION_NAME_ALREADY_EXIST')}
                        </span>
                    )}
                </label>

                <label className={style['collection-page__panel']}>
                    <p className="text-body--01">{t('COLLECTION_SYMBOL')}</p>

                    <FormControl
                        name="symbol"
                        value={collection.symbol}
                        onChange={onChange}
                        maxLength={1000}
                    />
                    <span className="error-message">
                        {t(collection.error.symbol)}
                    </span>
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
                <span className="error-message">
                    {t(collection.error.description)}
                </span>
            </label>

            <label
                className={`${style['collection-page__panel']} ${style['space-y']}`}
            >
                <p className="text-body--01">{t('COLLECTION_ADDRESS')}</p>

                <div
                    className={`${style['collection-page__contract-address']}`}
                >
                    <FormControl
                        value={collection.contract}
                        name="contract"
                        disabled={true}
                    />
                    <CopyButton value={collection.contract} />
                </div>
            </label>

            <div className={`${style['collection-page__footer']}`}>
                <div>
                    <UploadImageCard
                        name="bannerFile"
                        value={collection.banner}
                        // file={collection.bannerFile}
                        title={t('COLLECTION_BANNER_IMAGE')}
                        maxWidth={1600}
                        maxHeight={300}
                        onChange={(eve) => console.log(eve)}
                        error={collection.error.banner}
                    />
                    <UploadImageCard
                        name="iconFile"
                        value={collection.icon}
                        // file={collection.iconFile}
                        title={t('COLLECTION_ICON_IMAGE')}
                        maxWidth={512}
                        maxHeight={512}
                        onChange={(eve) => console.log(eve)}
                        error={collection.error.icon}
                    />
                </div>

                <CreateCollectionActions collectionExist={collectionExist} />
            </div>
        </div>
    )
}

export default CollectionPage
