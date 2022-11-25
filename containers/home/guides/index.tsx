import GuideCard from '@/components/common/guide-card'
import { useTransHook } from '@/locales/hooks'
import { Container, Row, Col } from 'react-bootstrap'
import style from './style.module.scss'

const guidesList = [
    {
        title: 'WHAT_IS_XANALIA',
        redirectUrl: 'https://v1.xanalia.com/about',
    },
    {
        title: 'HOW_TO_CREATE_AND_SELL_NFT',
        redirectUrl:
            'https://site.xanalia.com/how-to-create-and-sell-nft-as-a-crypto-user/?lang=ja',
    },
    {
        title: 'HOW_TO_CREATE_COLLECTION',
        redirectUrl:
            'https://site.xanalia.com/how-to-create-collection/?lang=ja',
    },
    {
        title: 'HOW_TO_RESALE_THE_OWNED_NFT',
        redirectUrl:
            'https://site.xanalia.com/how-to-resale-the-owned-nft-as-a-crypto-user-in-fixed-price-method/?lang=ja',
    },
    {
        title: 'HOW_TO_BUY_NFT',
        redirectUrl: 'https://site.xanalia.com/how-to-buy-alia/?lang=ja',
    },
]

const Guides = () => {
    const { t } = useTransHook()

    return (
        <Container fluid className={style['guides-section']}>
            <h1 className="heading--1">{t('START_GUIDE')}</h1>
            <p>{t('START_GUIDE_DESCRIPTION')}</p>

            <Row lg={5} md={4} xs={2} className="g-3 g-lg-4">
                {guidesList.map((guide, index) => (
                    <Col key={index}>
                        <GuideCard
                            title={guide.title}
                            redirectUrl={guide.redirectUrl}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Guides
