/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import ModalWallet from '@/components/common/modals/modal-wallet'
import MenuIcon from '@/public/svgs/menu.svg'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './style.module.scss'
import ToggleLocale from './toggle-locale'
import { selectSidebarstate } from '@/store/app/selectors'
import { setModalWallet, setSidebar } from '@/store/app/slice'
import { useSelector, useDispatch } from 'react-redux'
import SVGWallet from '@/public/svgs/wallet.svg'
import BTNSwitchChain from '@/components/common/btn-switch-chain'
import { useRouter } from 'next/router'
import SearchResult from './search-result'
import SearchInput from './search-input'
import { selectKeywordSearch } from '@/store/search/selectors'
import { selectDataUser } from '@/store/user/selectors'
import SearchMobile from './search-mobile'
const showHideMenu = (isOpen: boolean) => {
    const mainContent = document.getElementById('main-content')
    const sidebar = document.getElementById('mySidebar')
    if (isOpen) {
        sidebar?.classList.remove('sidebar-open')
        mainContent?.classList.remove('margin-left-sidebar-open')
    } else {
        mainContent?.classList.add('margin-left-sidebar-open')
        sidebar?.classList.add('sidebar-open')
    }
}

const Header = () => {
    const sidebarIsopen = useSelector(selectSidebarstate)
    const router = useRouter()
    const searchValue = useSelector(selectKeywordSearch)

    useEffect(() => {
        showHideMenu(!sidebarIsopen)
    }, [sidebarIsopen])

    const userData = useSelector(selectDataUser)

    const dispatch = useDispatch()

    function setVisibleModalWallet(val: boolean) {
        dispatch(setModalWallet(val))
    }

    const sidebarToggle = () => {
        showHideMenu(sidebarIsopen)
        dispatch(setSidebar(!sidebarIsopen))
    }

    useEffect(() => {
        dispatch(setSidebar(false))
    }, [router])

    return (
        <>
            <div className={styles['header']}>
                <div className={styles['logo-wrap']}>
                    <div className={styles['btn-menu']} onClick={sidebarToggle}>
                        <MenuIcon />
                    </div>
                    <div className={styles['logo-container']}>
                        <Link href="/" passHref>
                            <img
                                className={styles['logo']}
                                src="/svgs/logo-menu.svg"
                                alt=""
                                width={154}
                                height={54}
                            />
                        </Link>
                    </div>
                </div>

                <div className={styles['header-box-search']}>
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

                <div className={styles['header-logoNav']}>
                    <SearchMobile />
                    <ToggleLocale />
                    <BTNSwitchChain />
                    {/* <div className={styles['logoNav-switch-network']}>
                        <img src="/svgs/binance.svg" alt="" />
                    </div> */}
                    <div
                        className={styles['logoNav-wallet']}
                        onClick={() => setVisibleModalWallet(true)}
                    >
                        {!userData?.userWallet.address ? (
                            <SVGWallet />
                        ) : (
                            <img
                                src={
                                    userData?.avatar ||
                                    '/images/default-user.webp'
                                }
                                draggable="false"
                                loading="lazy"
                                alt=""
                            />
                        )}
                    </div>
                </div>
            </div>

            <ModalWallet />
        </>
    )
}

export default Header
