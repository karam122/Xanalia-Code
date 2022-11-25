/* eslint-disable no-unused-vars */

import { useTransHook } from '@/locales/hooks'
import { selectFilterObject } from '@/store/filter/selectors'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'

interface IActionSearch {
    onClick: (args: any) => void
}

export const ActionSearch = ({ onClick }: IActionSearch) => {
    const filterObject = useSelector(selectFilterObject)
    const handleOnClick = () => {
        onClick(filterObject)
    }
    const { t } = useTransHook()
    return (
        <div className={styles['filter-item']}>
            <div className={styles['filter-item__title']}>
                <Button size="lg" variant="primary" onClick={handleOnClick}>
                    {t('SEARCH')}
                </Button>
            </div>
            <div className={styles['filter-item__input']}></div>
        </div>
    )
}

export default ActionSearch
