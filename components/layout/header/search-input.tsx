import useDebounce from '@/hooks/useDebounce'
import { useTransHook } from '@/locales/hooks'
import { useAppDispatch } from '@/store/hooks'
import { selectKeywordSearch } from '@/store/search/selectors'
import {
    clearSearchValue,
    searchByKeyword,
    setKeyword,
} from '@/store/search/slice'
import { ChangeEvent, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'
const id = 'search-text-input'
export const SearchInput = () => {
    const { t } = useTransHook()
    const dispatch = useAppDispatch()
    const clearIconRef = useRef<HTMLDivElement>(null)

    const searchValue = useSelector(selectKeywordSearch)

    const searchDebounceValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if (searchDebounceValue && searchDebounceValue.trim().length > 0) {
            dispatch(
                searchByKeyword({
                    keyword: searchDebounceValue,
                }),
            )
        } else {
            dispatch(clearSearchValue())
        }
    }, [searchDebounceValue])

    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        dispatch(setKeyword(value))
    }

    return (
        <div className={styles['text-input']}>
            <input
                type="text"
                placeholder={t('SEARCH_PLACE_HOLDER')}
                className={styles['search']}
                value={searchValue}
                onChange={onChangeSearchValue}
                id={id}
            ></input>
            {searchValue && searchValue.trim().length && (
                <div
                    className={styles['text-input__clear-icon']}
                    onClick={() => dispatch(setKeyword(''))}
                    ref={clearIconRef}
                >
                    <img src="/svgs/icon-close.svg" alt="close-icon-alt" />
                </div>
            )}
        </div>
    )
}

export default SearchInput
