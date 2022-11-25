import CollectionCard from '@/components/common/collection-hot-card'
import { Container, Row, Col } from 'react-bootstrap'
import TitleHeader from '@/components/common/title-header'
import { useEffect, useState } from 'react'
import collectionServices from '@/services/collection'
import { useDispatch } from 'react-redux'
import { loadingHomepageSectionDone } from '@/store/app/slice'
import { useTransHook } from '@/locales/hooks'
import { collectionGridClass } from '@/constants/nft'

const SectionLaunchPad = () => {
    const [collections, setCollections] = useState<any[]>([])
    const dispatch = useDispatch()
    const { t } = useTransHook()
    useEffect(() => {
        ;(async () => {
            try {
                const res = await collectionServices.getHotCollections({
                    page: 1,
                    limit: 5,
                })
                if (res.listCollectionAllUser) {
                    setCollections(res.listCollectionAllUser)
                }
                dispatch(loadingHomepageSectionDone())
            } catch (error) {
                dispatch(loadingHomepageSectionDone())
                console.log(
                    '🚀 ~ file: hot-collections.tsx ~ line 71 ~ ; ~ error',
                    error,
                )
            }
        })()
    }, [])
    return (
        <>
            {!!collections.length && (
                <Container fluid>
                    <TitleHeader title={t('HOT_COLLECTIONS')} link="/" />
                    <Row xs={2} lg={5} md={3} className={collectionGridClass}>
                        {collections.map((collection, index) => (
                            <Col key={index}>
                                <CollectionCard
                                    // artist={true}
                                    data={collection}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </>
    )
}

export default SectionLaunchPad
