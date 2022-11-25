import { useTransHook } from '@/locales/hooks'
import { selectNetworkFilter } from '@/store/filter/selectors'
import { onUpdateFilter } from '@/store/filter/slice'
import { useAppDispatch } from '@/store/hooks'
import { selectNetworksList } from '@/store/network/selectors'
import { FormSelect } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'

const NetworkFilter = () => {
    const { t } = useTransHook()
    const networkId = useSelector(selectNetworkFilter)
    const dispatch = useAppDispatch()

    const networksList = useSelector(selectNetworksList)

    const onUpdateNetWorkId = (e: any) => {
        e.preventDefault()
        dispatch(
            onUpdateFilter({
                field: 'networkId',
                value: e.target.value,
            }),
        )
    }

    return (
        <div className={styles['filter-item']}>
            <div
                className={`${styles['filter-item__title']} ${styles['broad']}`}
            >
                {t('NETWORK')}
            </div>
            <div className={styles['filter-item__input']}>
                <FormSelect
                    value={networkId}
                    name="networkId"
                    onChange={onUpdateNetWorkId}
                >
                    <option value={0} key={0}>
                        {t('CHOOSE_NETWORK')}
                    </option>
                    {networksList?.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </FormSelect>
            </div>
        </div>
    )
}

export default NetworkFilter
