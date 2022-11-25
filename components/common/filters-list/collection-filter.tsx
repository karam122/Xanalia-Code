import { useTransHook } from '@/locales/hooks'
import collectionServices from '@/services/collection'
import { selectCollectionIdFilter } from '@/store/filter/selectors'
import { onUpdateFilter } from '@/store/filter/slice'
import { useAppDispatch } from '@/store/hooks'
import { useEffect, useState } from 'react'
import { FormSelect } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'

const CollectionFilter = () => {
    const { t } = useTransHook()
    const collectionId = useSelector(selectCollectionIdFilter)
    const dispatch = useAppDispatch()

    const [collectionsList, setCollectionsList] = useState<any>()

    useEffect(() => {
        const fetchCollections = async () => {
            const collectionsList =
                await collectionServices.getCollectionsByUser()
            if (collectionsList?.length) {
                setCollectionsList(collectionsList)
            }
        }
        fetchCollections()
    }, [])

    const onUpdateCollectionId = (e: any) => {
        e.preventDefault()
        dispatch(
            onUpdateFilter({
                field: 'collectionId',
                value: e.target.value,
            }),
        )
    }

    return (
        <div className={styles['filter-item']}>
            <div
                className={`${styles['filter-item__title']} ${styles['broad']}`}
            >
                {t('COLLECTION')}
            </div>
            <div className={styles['filter-item__input']}>
                <FormSelect
                    value={collectionId}
                    name="collectionId"
                    onChange={onUpdateCollectionId}
                >
                    <option value={0} key={0}>
                        {t('CHOOSE_COLLECTION')}
                    </option>
                    {collectionsList?.map((item: any) => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </FormSelect>
            </div>
        </div>
    )
}

export default CollectionFilter
