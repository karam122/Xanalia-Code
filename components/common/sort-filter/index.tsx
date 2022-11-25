import { useTransHook } from '@/locales/hooks'
import { Dropdown } from 'react-bootstrap'
import styles from './style.module.scss'

export interface SortFilterItem {
    value: number
    label: string
}

interface ISortFilter {
    sortFilterList: SortFilterItem[]
    activeItem: SortFilterItem
    /* eslint-disable no-unused-vars */
    setActive: (item: SortFilterItem) => void
}

const SortFilter = ({ activeItem, sortFilterList, setActive }: ISortFilter) => {
    const { t } = useTransHook()

    return (
        <Dropdown className={styles['dropdown']}>
            <Dropdown.Toggle className={styles['dropdown-toggle']}>
                {t(activeItem?.label)}
                <img
                    className={styles['filter-img']}
                    src="/svgs/filter-award.svg"
                    alt=""
                    width={24}
                    height={24}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles['menu-show-items']}>
                {sortFilterList?.map((item, index) => (
                    <Dropdown.Item
                        className={`${styles['filter-items']} ${
                            item.value === activeItem?.value
                                ? styles['filter-items--active']
                                : ''
                        }`}
                        key={index}
                        onClick={() => {
                            setActive(item)
                        }}
                    >
                        <div className={styles['dot-items']}></div>
                        <span>{t(item?.label)}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SortFilter
