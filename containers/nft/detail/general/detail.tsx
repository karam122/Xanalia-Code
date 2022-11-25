import { exploreLink } from '@/constants/collection'
import { STANDARD_TYPE } from '@/constants/nft'
import { useTransHook } from '@/locales/hooks'
import { selectNFTDetails } from '@/store/nft/selectors'
import { formatAddress } from '@/utils/addressFormat'
import Image from 'next/image'
// import Link from 'next/link'
import { Accordion } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'

const Detail = () => {
    const { t } = useTransHook()

    const nftDetails = useSelector(selectNFTDetails)
    const { collection, tokenId, network, standardType } = nftDetails

    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>
                <Image
                    src="/svgs/menu-icon.svg"
                    width={17}
                    height={14}
                    alt="menu-alt"
                />
                {t('DETAIL')}
            </Accordion.Header>
            <Accordion.Body>
                <div className={styles['detail__contract-address']}>
                    <p className="text-body">{t('CONTRACT_ADDRESS')}</p>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                        href={exploreLink(
                            collection?.address,
                            nftDetails.network.networkName,
                        )}
                    >
                        {formatAddress(collection?.address)}
                    </a>
                </div>
                <div className={styles['detail__nft-id']}>
                    <p className="text-body">{t('TOKEN_ID')}</p>

                    <span className="">{tokenId}</span>
                </div>
                <div className={styles['detail__token-standard']}>
                    <p className="text-body">{t('TOKEN_STANDARD')}</p>

                    <span className="">{STANDARD_TYPE[standardType]}</span>
                </div>
                <div className={styles['detail__blockchain-type']}>
                    <p className="text-body">{t('BLOCKCHAIN_TYPE')}</p>

                    <span className="">{network?.networkName}</span>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Detail
