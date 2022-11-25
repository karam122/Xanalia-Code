import Tab from '@/components/ui/tab'
import Tabs from '@/components/ui/tabs'
import ListCollectionPage from '@/containers/collection/collection-list'
import { useTransHook } from '@/locales/hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ListNFTPage from '../nft/list'

const listTab = ['nft', 'collection']

const MyItemsContainer = () => {
    const { t } = useTransHook()
    const router = useRouter()
    const tab = router.query.tab?.toString()
    const [activeTab, setTab] = useState(
        tab && listTab.includes(tab) ? tab : 'nft',
    )

    const onSelectTab = (e: any) => {
        if (tab && listTab.includes(String(e))) {
            router.query.tab = String(e)
            router.push(router)
        }
    }

    useEffect(() => {
        if (tab && listTab.includes(String(tab))) {
            setTab(tab)
        }
    }, [tab])

    return (
        <Tabs
            defaultActiveKey={activeTab}
            activeKey={activeTab}
            onSelect={onSelectTab}
        >
            <Tab eventKey="nft" title={t('NFT_LIST')} key="nft">
                <ListNFTPage />
            </Tab>
            <Tab
                eventKey="collection"
                title={t('COLLECTION_LIST')}
                key="collection"
            >
                <ListCollectionPage />
            </Tab>
        </Tabs>
    )
}

export default MyItemsContainer
