import { Container } from 'react-bootstrap'
import Filters from './filters'
import GeneralInformation from './general-information'
import NetworkPrice from './network-price'
import NFTAction from './nft-action/nft-action'
import SaleInfo from './sale-info'
// import Royality from './royalty'
import SaleType from './sale-type'
import styles from './style.module.scss'
// import TimeAuction from './time-auction/time-auction'
import UploadMedia from './upload-media'

const NFTCreateContainer = () => {
    return (
        <Container className="fill-background" fluid>
            {/* <BreadcrumbsTitle
                title={t('UPLOAD_NFT')}
                breadcrumbs={[{ text: t('MY_NFTS') }, { text: t('UPLOAD') }]}
            /> */}
            <div className={styles['nft-create-area']}>
                <div className={styles['nft-create-area__item--1']}>
                    <UploadMedia />
                </div>
                <div className={styles['nft-create-area__item--2']}>
                    <GeneralInformation />
                </div>
                <div className={styles['nft-create-area__item--3']}>
                    <NetworkPrice />
                </div>
                <div className={styles['nft-create-area__item--4']}>
                    <Filters />
                </div>
                <div className={styles['nft-create-area__item--5']}>
                    <SaleType />
                </div>
                <div className={styles['nft-create-area__item--6']}>
                    <SaleInfo />
                </div>
                {/* <div className={styles['nft-create-area__item--7']}>
                    <Royalty />
                </div> */}
            </div>
            <NFTAction />
        </Container>
    )
}

export default NFTCreateContainer
