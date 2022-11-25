/* eslint-disable no-unused-vars */

import { FILTER_ITEMS_KEY } from '@/constants/filters'
import ActionSearch from './action-search'
import CollectionFilter from './collection-filter'
import CreatedCollectedFilter from './created-collected-filter'
import CreatedDraftType from './created-draft-type'
import NetworkFilter from './network-filter'
import styles from './style.module.scss'

interface IFiltersList {
    handleSearch: (args: any) => void
    filterItems: string[]
    colsNum: number
}

const handleFilterItems = (filterItems: any[], colsNum: number) => {
    const result = []
    while (filterItems.length > 0) {
        result.push(filterItems.splice(0, colsNum))
    }
    return result
}

const FiltersList = ({ handleSearch, filterItems, colsNum }: IFiltersList) => {
    const filterItemComponents: any = {
        [FILTER_ITEMS_KEY.CREATED_DRAFT_KEY]: <CreatedDraftType key={0} />,
        [FILTER_ITEMS_KEY.NETWORK_TYPE_KEY]: <NetworkFilter key={1} />,
        [FILTER_ITEMS_KEY.COLLECTION_KEY]: <CollectionFilter key={2} />,
        [FILTER_ITEMS_KEY.ACTION_SEARCH_KEY]: (
            <ActionSearch onClick={handleSearch} key={3} />
        ),
        [FILTER_ITEMS_KEY.CREATED_COLLECTED_KEY]: (
            <CreatedCollectedFilter key={4} />
        ),
    }

    const filterGroups = handleFilterItems(filterItems, colsNum)
    return (
        <div className={styles['filters-list-container']}>
            {filterGroups.map((group, index) => (
                <div className={styles['filter-group']} key={index}>
                    {group.map((item) => filterItemComponents[item])}
                </div>
            ))}
        </div>
    )
}

export default FiltersList
