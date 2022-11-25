import { selectKeywordSearch } from '@/store/search/selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SearchInput from './search-input'
import SearchResult from './search-result'
import styles from './style.module.scss'
import Modal from '@/components/ui/modals'

type Props = {}

function SearchMobile({}: Props) {
    const [openSearch, setOpenSearch] = useState(false)
    const searchValue = useSelector(selectKeywordSearch)
    const onSearch = () => {
        setOpenSearch(true)
        const input = document.getElementById('search-text-input')
        if (input) {
            setTimeout(() => {
                console.log(
                    '🚀 ~ file: search-mobile.tsx ~ line 19 ~ onSearch ~ input',
                    input,
                )
                input.focus()
                console.log('Alo')
            }, 0)
        }
    }
    return (
        <div className={styles['search-mobile']}>
            {/* <button onClick={onSearch}>
                
            </button> */}
            <img
                className="search-icon"
                onClick={onSearch}
                src="/svgs/search-icon.svg"
                alt=""
                width={32}
                height={32}
            />

            <Modal
                isVisible={openSearch}
                setVisible={setOpenSearch}
                classBody={styles['modal-search-mobile']}
                centered={false}
            >
                <div className={styles['header-box-search-mobile']}>
                    <div className={styles['header-elementContainer']}>
                        <span className={styles['search-icon']}>
                            <img
                                src="/svgs/search-icon.svg"
                                alt=""
                                width={18}
                                height={24}
                            />
                        </span>
                        <SearchInput />
                    </div>
                    {searchValue.trim().length > 0 && <SearchResult />}
                </div>
            </Modal>
        </div>
    )
}

export default SearchMobile
