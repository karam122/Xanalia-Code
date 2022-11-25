import { CREATED_COLLECTED_FILTER } from '@/constants/filters'
import { useTransHook } from '@/locales/hooks'
import { selectCreatedSelectedFilter } from '@/store/filter/selectors'
import { onUpdateFilter } from '@/store/filter/slice'
import { FormSelect } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.scss'

const CreatedCollectedFilter = () => {
    const { t } = useTransHook()
    const createdCollectedFilter = useSelector(selectCreatedSelectedFilter)
    const dispatch = useDispatch()

    const onUpdateCreatedDraftType = (e: any) => {
        e.preventDefault()
        dispatch(
            onUpdateFilter({
                field: 'createdCollectedFilter',
                value: e.target.value,
            }),
        )
    }

    return (
        <div className={styles['filter-item']}>
            <div
                className={`${styles['filter-item__title']} ${styles['broad']}`}
            >
                {t('CREATED_COLLECTED')}
            </div>
            <div className={styles['filter-item__input']}>
                <FormSelect
                    value={createdCollectedFilter}
                    name="createdCollectedFilter"
                    onChange={onUpdateCreatedDraftType}
                >
                    {CREATED_COLLECTED_FILTER.map((item, index) => (
                        <option value={item.value} key={index}>
                            {t(item.title)}
                        </option>
                    ))}
                </FormSelect>
            </div>
        </div>
    )
}

export default CreatedCollectedFilter
