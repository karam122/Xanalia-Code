import styles from './style.module.scss'

interface IGridViewItem {
    value: number
    icon: string
}

interface IGridView {
    gridViewList: IGridViewItem[]
    grid: number
    /* eslint-disable no-unused-vars */
    changeView: (value: number) => void
}

export const GridView = ({ gridViewList, grid, changeView }: IGridView) => {
    return (
        <div className={styles['grid-btn-group']}>
            {gridViewList.map((gridView, index) => (
                <div
                    key={index}
                    onClick={() => changeView(gridView.value)}
                    className={`${styles['btn__wrapper']} ${
                        grid === gridView.value
                            ? styles['btn__wrapper--active']
                            : ''
                    }`}
                >
                    <div className={styles['btn__icon']}>
                        <img src={gridView.icon} alt="grid-icon-alt" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GridView
