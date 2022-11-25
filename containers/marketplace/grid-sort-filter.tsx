import GridView from '@/components/common/grid-view'
import SortFilter, { SortFilterItem } from '@/components/common/sort-filter'
import { sortFilterList } from '@/constants/filters'
import { setSelectedNftPage } from '@/store/app/slice'
import { selectGridValue } from '@/store/grid-view/selectors'
import { setGridView } from '@/store/grid-view/slice'
import { selectActiveSortFilter } from '@/store/sort-nft/selectors'
import { setActiveSortFilter } from '@/store/sort-nft/slice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.scss'

const gridViewsList = [
    {
        value: 6,
        icon: '/svgs/view-btn-second.svg',
    },
    {
        value: 5,
        icon: '/svgs/view-btn-first.svg',
    },
]

export const GridSort = () => {
    const grid = useSelector(selectGridValue)
    const dispatch = useDispatch()
    const changeView = (value: number) => {
        dispatch(setGridView(value))
    }

    const sortActiveValue = useSelector(selectActiveSortFilter)
    const changeSortActiveValue = (value: SortFilterItem) => {
        dispatch(setSelectedNftPage(`1`))
        dispatch(setActiveSortFilter(value))
    }

    return (
        <div className={styles['grid-sort-filter']}>
            <GridView
                changeView={changeView}
                grid={grid}
                gridViewList={gridViewsList}
            />
            <SortFilter
                activeItem={sortActiveValue}
                sortFilterList={sortFilterList}
                setActive={changeSortActiveValue}
            />
        </div>
    )
}

export default GridSort
