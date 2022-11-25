/* eslint-disable @next/next/no-img-element */
import { useTransHook } from '@/locales/hooks'
import styles from './style.module.scss'
import Link from 'next/link'
import { collectionLaunchPadUrl } from '@/constants/url'

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
        networks: [
            {
                id: number
                networkName: string
                image: string
            },
        ]
        createdAt: string
        updatedAt: string
        totalNftOnSale: number
        totalNft: number
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
        <Link href={collectionLaunchPadUrl(data.id)} passHref>
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
                            // + ` ${artist && styles['artist']}`
                        }
                    >
                        <img src={data.iconImage} alt={data.name} />
                    </div>
                </div>
                <div className={`${styles['collection-card__body']}`}>
                    <div>
                        <div
                            className={`${styles['collection-card__collection-name']} `}
                            title={data.name}
                        >
                            <div
                                className={`${styles['collection-card__collection-name_name']} `}
                            >
                                {data.name}
                            </div>
                            <span
                                className={` ${artist && styles['artist']}`}
                            ></span>
                        </div>
                        <div
                            title={data.owner?.name}
                            className={`${styles['collection-card__owner-name']}`}
                        >
                            {data.owner?.address ? (
                                <Link href={`/profile/${data.owner?.address}`}>
                                    <a>
                                        by{' '}
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
                                    by{' '}
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
                    <div
                        className={styles['collection-card__footer__networks']}
                    >
                        {data.networks.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles['collection-card__chains']}`}
                            >
                                <img src={item?.image} alt="network token" />
                            </div>
                        ))}
                    </div>

                    <div
                        className={`${styles['collection-card__items-quantity']}`}
                    >
                        {data.totalNft ? data.totalNft : 0}
                        &nbsp;
                        {data.totalNft > 1 ? t('ITEMS') : t('ITEM')}
                    </div>
                    <div
                        className={`${styles['collection-card__items-status']}`}
                    >
                        Ongoing
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CollectionCard
