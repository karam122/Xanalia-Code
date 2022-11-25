import GridView from '@/components/common/grid-view'
import { selectGridValue } from '@/store/grid-view/selectors'
import { setGridView } from '@/store/grid-view/slice'
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

export const GridFilter = () => {
    const grid = useSelector(selectGridValue)
    const dispatch = useDispatch()
    const changeView = (value: number) => {
        dispatch(setGridView(value))
    }

    return (
        <div className={styles['grid-filter']}>
            <GridView
                changeView={changeView}
                grid={grid}
                gridViewList={gridViewsList}
            />
        </div>
    )
}

export default GridFilter
