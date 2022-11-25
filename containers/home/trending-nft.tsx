import NFTCard from '@/components/common/nft-card'
import { Container, Row, Col } from 'react-bootstrap'
import TitleHeader from '@/components/common/title-header'
import ModalPreviewNFT from '@/components/common/modals/modal-preview-nft'
import { useEffect, useState } from 'react'
import nftServices from '@/services/nft'
import { selectDataUser } from '@/store/user/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { marketplaceUrl } from '@/constants/url'
import { useTransHook } from '@/locales/hooks'
import { loadingHomepageSectionDone } from '@/store/app/slice'
import { nftGridClass } from '@/constants/nft'

const TrendingNFT = () => {
    const [nfts, setNfts] = useState<any[]>([])
    const user = useSelector(selectDataUser)
    const { t } = useTransHook()
    const dispatch = useDispatch()
    useEffect(() => {
        ;(async () => {
            try {
                const res = await nftServices.getTrendingNFT({
                    page: 1,
                    limit: 12,
                    duration: 1,
                    userId: user?.id,
                })
                console.log('🚀 ~ file: trending-nft.tsx ~ line 165 ~ res', res)
                // nftsList.push(...nftsList)
                if (res.list) {
                    setNfts(res.list)
                }
                dispatch(loadingHomepageSectionDone())
            } catch (error) {
                console.log(
                    '🚀 ~ file: trending-nft.tsx ~ line 180 ~ ; ~ error',
                    error,
                )
                dispatch(loadingHomepageSectionDone())
            }
        })()
    }, [user?.id])
    return (
        <Container fluid>
            <TitleHeader
                title={t('TRENDING_NFTS')}
                viewAll
                link={marketplaceUrl('trending')}
            />

            <Row lg={6} md={4} xs={2} className={nftGridClass}>
                {nfts.map((nft, index) => (
                    <Col key={index}>
                        <NFTCard data={nft} />
                    </Col>
                ))}
            </Row>

            <ModalPreviewNFT />
        </Container>
    )
}

export default TrendingNFT
