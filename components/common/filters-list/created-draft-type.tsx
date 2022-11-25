import { CREATED_DRAFT_TYPES } from '@/constants/filters'
import { useTransHook } from '@/locales/hooks'
import { selectCreatedDraftType } from '@/store/filter/selectors'
import { onUpdateFilter } from '@/store/filter/slice'
import { FormSelect } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.scss'

const CreatedDraftType = () => {
    const { t } = useTransHook()
    const createdDraftType = useSelector(selectCreatedDraftType)
    const dispatch = useDispatch()

    const onUpdateCreatedDraftType = (e: any) => {
        e.preventDefault()
        dispatch(
            onUpdateFilter({
                field: 'createdDraftType',
                value: e.target.value,
            }),
        )
    }

    return (
        <div className={styles['filter-item']}>
            <div className={styles['filter-item__title']}>
                {t('CREATED_DRAFT')}
            </div>
            <div className={styles['filter-item__input']}>
                <FormSelect
                    value={createdDraftType}
                    name="createdDraftType"
                    onChange={onUpdateCreatedDraftType}
                >
                    {CREATED_DRAFT_TYPES.map((item, index) => (
                        <option value={item.value} key={index}>
                            {t(item.title)}
                        </option>
                    ))}
                </FormSelect>
            </div>
        </div>
    )
}

export default CreatedDraftType
