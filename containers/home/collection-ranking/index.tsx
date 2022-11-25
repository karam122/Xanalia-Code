import CardCollectionRanking from '@/components/common/card-collection-ranking'
import TitleHeader from '@/components/common/title-header'
import { useTransHook } from '@/locales/hooks'
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import style from './style.module.scss'
import { DURATION } from '@/constants/collection'
import collectionServices from '@/services/collection'
import { collectionRankingUrl } from '@/constants/url'
import { useDispatch } from 'react-redux'
import { loadingHomepageSectionDone } from '@/store/app/slice'

const CollectionRanking = () => {
    const [duration, setDuration] = useState<string>('24h')
    const [collections, setCollection] = useState<any[]>([])

    const { t } = useTransHook()
    const dispatch = useDispatch()

    const dataFilter = [
        { text: '24H', key: '24h' },
        { text: '7_DAYS', key: '7days' },
        { text: '30_DAYS', key: '30days' },
        { text: 'ALL', key: 'all' },
    ]

    useEffect(() => {
        ;(async () => {
            try {
                const query = {
                    duration: DURATION.DAY,
                    page: 1,
                    limit: 15,
                }
                switch (duration) {
                    case '7days': {
                        query.duration = DURATION.WEEK
                        break
                    }
                    case '30days': {
                        query.duration = DURATION.MONTH
                        break
                    }
                    case 'all': {
                        query.duration = DURATION.ALL
                        break
                    }
                    default:
                        break
                }

                const res = await collectionServices.getRankingCollection(query)
                if (res.items) {
                    setCollection(res.items)
                }
                dispatch(loadingHomepageSectionDone())
            } catch (error) {
                dispatch(loadingHomepageSectionDone())
                console.log('🚀 ~ file: index.tsx ~ line 90 ~ error', error)
            }
        })()
    }, [duration])

    return (
        <Container fluid>
            <TitleHeader
                title={t('RANKING')}
                viewAll
                link={collectionRankingUrl()}
                childNodeRight={
                    <div className={style['collection-ranking__filter']}>
                        {dataFilter.map((obj: any, i: any) => (
                            <span
                                key={i}
                                className={duration === obj.key ? 'active' : ''}
                                onClick={() => setDuration(obj.key)}
                            >
                                {t(obj.text)}
                            </span>
                        ))}
                    </div>
                }
            />

            <div className={style['collection-ranking']}>
                {collections.map((o, i) => (
                    <CardCollectionRanking
                        key={o.collection_id}
                        index={i + 1}
                        avatar={o.iconImage}
                        name={o.collection_name}
                        price={o?.volume}
                        address={o.collection_contract_address}
                        networkName={o.collection_network_name || 'Ethereum'}
                    />
                ))}
            </div>
        </Container>
    )
}

export default CollectionRanking
