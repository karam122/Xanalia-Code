/* eslint-disable no-unused-vars */
import Tabs from '@/components/ui/tabs'
import Tab from '@/components/ui/tab'
import NFTByCategory, { categoryTypes } from './nft-by-category'
import { useTransHook } from '@/locales/hooks'
import GridSort from './grid-sort-filter'
import styles from './style.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetGridView } from '@/store/grid-view/slice'
import { resetSortFilter } from '@/store/sort-nft/slice'
import { setSelectedNftPage } from '@/store/app/slice'
export const types = [
    'all_nfts',
    'trending',
    'art',
    'image',
    'gif',
    'movie',
    'music',
]
const Marketplace = () => {
    const { t } = useTransHook()
    const router = useRouter()
    console.log(
        '🚀 ~ file: index.tsx ~ line 28 ~ Marketplace ~ router.query?.tab',
        router.query?.tab,
        router.isReady,
    )
    const isTab = useMemo(() => {
        return router.query?.tab && types.includes(String(router.query?.tab))
            ? String(router.query?.tab)
            : types[0]
    }, [router.isReady])
    console.log('🚀 ~ file: index.tsx ~ line 30 ~ isTab ~ isTab', isTab)
    const [tab, setTab] = useState(isTab)

    const dispatch = useDispatch()

    useEffect(() => {
        if (router.isReady) {
            if (
                router.query?.tab &&
                types.includes(String(router.query?.tab))
            ) {
                setTab(String(router.query?.tab))
                console.log(
                    '🚀 ~ file: index.tsx ~ line 41 ~ useEffect ~ String(router.query?.tab)',
                    String(router.query?.tab),
                )
            }
        }

        return () => {
            dispatch(resetGridView())
            dispatch(resetSortFilter())
        }
    }, [router.query?.tab])

    const onSelectTab = (eve: any) => {
        if (!!eve && types.includes(String(eve))) {
            router.query.tab = String(eve)
            router.push(router)
            dispatch(setSelectedNftPage(''))
        }
    }
    if (!router.isReady) {
        return null
    } else {
        console.log(
            '🚀 ~ file: index.tsx ~ line 41 ~ useEffect ~ String(router.query?.tab)',
            String(router.query?.tab),
            isTab,
            tab,
        )
    }

    return (
        <div className={styles['marketplace-page']}>
            <Tabs
                defaultActiveKey={isTab}
                // activeKey={router.isReady ? tab : isTab}
                unmountOnExit={true}
                onSelect={onSelectTab}
            >
                {categoryTypes.map((category, index) => (
                    <Tab
                        eventKey={category}
                        key={index}
                        title={t(category.toUpperCase())}
                    >
                        <NFTByCategory category={category} />
                    </Tab>
                ))}
            </Tabs>
            <GridSort />
        </div>
    )
}

export default Marketplace
