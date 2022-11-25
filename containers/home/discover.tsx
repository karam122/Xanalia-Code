/* eslint-disable no-unused-vars */

import NFTCard from '@/components/common/nft-card'
import { Container, Row, Col } from 'react-bootstrap'
import TitleHeader from '@/components/common/title-header'
import ModalPreviewNFT from '@/components/common/modals/modal-preview-nft'
import { useEffect, useState } from 'react'
import nftServices from '@/services/nft'
import { useDispatch, useSelector } from 'react-redux'
import { selectDataUser } from '@/store/user/selectors'
import { marketplaceUrl } from '@/constants/url'
import { loadingHomepageSectionDone } from '@/store/app/slice'
import { useTransHook } from '@/locales/hooks'
import { nftGridClass } from '@/constants/nft'

const Discover = () => {
    const [nfts, setNfts] = useState<any[]>([])
    const user = useSelector(selectDataUser)
    const dispatch = useDispatch()
    const { t } = useTransHook()

    useEffect(() => {
        ;(async () => {
            try {
                const res = await nftServices.getDiscoverNFT({
                    page: 1,
                    limit: 12,
                    userId: user?.id,
                })

                if (res.list) {
                    setNfts(res.list)
                }
                dispatch(loadingHomepageSectionDone())
            } catch (error) {
                dispatch(loadingHomepageSectionDone())
                console.log(
                    '🚀 ~ file: discover.tsx ~ line 27 ~ ; ~ error',
                    error,
                )
            }
        })()
    }, [user])
    return (
        <Container fluid>
            <TitleHeader
                title={t('DISCOVER')}
                viewAll
                link={marketplaceUrl()}
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

export default Discover
