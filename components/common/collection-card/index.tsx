/* eslint-disable @next/next/no-img-element */
import { useTransHook } from '@/locales/hooks'
import styles from './style.module.scss'
import Link from 'next/link'
import { collectionUrl } from '@/constants/url'

interface ICollectionCard {
    data: {
        id: number
        name: string
        description: string
        symbol: string
        type: number
        iconImage: string
        bannerImage: string
        contractAddress: string
        status: number
        hashTransaction: string
        owner?: {
            address: string
            name: string
            avatar: string
        }
        creator?: {
            address: string
            name: string
            avatar: string
        }
        network: {
            id: number
            networkName: string
            image: string
        }
        createdAt: string
        updatedAt: string
        totalNftOnSale: number
        totalNft: number
        isOfficial: number
    }
    artist?: boolean
}

const CollectionCard = ({ data, artist }: ICollectionCard) => {
    const { t } = useTransHook()
    console.log('data', data)
    if (!data) {
        return null
    }
    return (
        <Link
            href={collectionUrl(
                data.contractAddress,
                data?.network?.networkName,
            )}
            passHref
        >
            <div className={styles['collection-card']}>
                <div className={styles['collection-card__header']}>
                    <div
                        className={
                            styles['collection-card__header-collection-image']
                        }
                    >
                        <img
                            className={
                                styles[
                                    'collection-card__header-collection-fill'
                                ]
                            }
                            src={data?.bannerImage}
                            alt={data.name}
                        />
                    </div>
                    <div
                        className={
                            styles['collection-card__header-owner-image']
                            // + ` ${
                            //     (artist || data.isOfficial === 1) &&
                            //     styles['artist']
                            // }`
                        }
                    >
                        <img src={data.iconImage} alt={data.name} />
                    </div>
                </div>
                <div className={`${styles['collection-card__body']}`}>
                    <div>
                        <div
                            className={`${styles['collection-card__collection-name']} heading--5`}
                            title={data.name}
                        >
                            <div
                                className={`${styles['collection-card__collection-name_name']} `}
                            >
                                {data.name}
                            </div>
                            {data.isOfficial === 1 && (
                                <span
                                    className={` ${
                                        (artist || data.isOfficial === 1) &&
                                        styles['artist']
                                    }`}
                                ></span>
                            )}
                        </div>
                        <div
                            title={data.owner?.name}
                            className={`${styles['collection-card__owner-name']} heading--6-1 `}
                        >
                            {data.owner?.address ? (
                                <Link href={`/profile/${data.owner?.address}`}>
                                    <a>
                                        {data.owner?.name
                                            ? data.owner?.name
                                            : data.owner?.address.slice(0, 6) +
                                              '...' +
                                              data.owner?.address.slice(
                                                  data.owner?.address.length -
                                                      4,
                                              )}
                                    </a>
                                </Link>
                            ) : (
                                <a>
                                    {data.owner?.name
                                        ? data.owner?.name
                                        : data.owner?.address.slice(0, 6) +
                                          '...' +
                                          data.owner?.address.slice(
                                              data.owner?.address.length - 4,
                                          )}
                                </a>
                            )}
                            {/* <Link href={`/profile/${data.owner?.address}`}>
                                <a>
                                    {data.owner?.name
                                        ? data.owner?.name
                                        : data.owner?.address.slice(0, 6) +
                                          '...' +
                                          data.owner?.address.slice(
                                              data.owner?.address.length - 4,
                                          )}
                                </a>
                            </Link> */}
                        </div>
                    </div>
                </div>
                <div className={styles['collection-card__footer']}>
                    <div className={`${styles['collection-card__chains']}`}>
                        <img src={data?.network?.image} alt="network token" />
                    </div>
                    <div
                        className={`${styles['collection-card__items-quantity']} text-body--small`}
                    >
                        {data.totalNft ? data.totalNft : 0}
                        &nbsp;
                        {data.totalNft > 1 ? t('ITEMS') : t('ITEM')}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CollectionCard
