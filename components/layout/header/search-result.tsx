import Loading from '@/components/common/loading'
import useOutsideClick from '@/hooks/useOutSideClick'
import { useTransHook } from '@/locales/hooks'
import {
    selectArtisSearch,
    selectCollectionSearch,
    selectIsLoadingSearch,
    selectNFTSearch,
} from '@/store/search/selectors'
import {
    artistSearchItem,
    nftSearchItem,
    collectionSearchItem,
} from '@/store/search/types'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'

interface ISearchResultItem {
    image: string | null
    defaultImage: string
    name: string
    type: 'artist' | 'nft' | 'collection' | 'collection-launchpad'
    address?: string
    collectionAddress?: string
    tokenId?: string
    network?: string
    launchpadId?: number | string
    isOfficial?: number | string
}

const DEFAULT_ARTIST_IMAGE = '/images/default-artist.webp'
const DEFAULT_NFT_IMAGE = '/images/default-nft-image.jpeg'
const DEFAULT_COLLECTION_IMAGE = '/images/default-nft-image.jpeg'

const SearchResultItem = ({
    image,
    name,
    defaultImage,
    type,
    address,
    network,
    collectionAddress,
    tokenId,
    launchpadId,
    isOfficial,
}: ISearchResultItem) => {
    const imageShow = image ? image : defaultImage
    const nameShow = name.length > 50 ? name.slice(0, 50) + '...' : name
    const linkRedirect = (): string => {
        switch (type) {
            case 'artist':
                return `/profile/${address}`
            case 'nft':
                return `/assets/${network}/${collectionAddress}/${tokenId}`
            case 'collection-launchpad':
                return `/collection-launchpad/${launchpadId}`
            default:
                return `/collection/${network}/${address}`
        }
    }
    return (
        <a href={linkRedirect()}>
            <div className={styles['search-result__item']}>
                <img src={imageShow} alt="avatar-alt" />
                <span
                    className={`${
                        (launchpadId || !!Number(isOfficial)) &&
                        styles['launchpad']
                    }`}
                >
                    {nameShow}
                </span>
            </div>
        </a>
    )
}

const SearchResult = () => {
    const { t } = useTransHook()
    const isLoading = useSelector(selectIsLoadingSearch)
    const artistResult = useSelector(selectArtisSearch)
    const collectionResult = useSelector(selectCollectionSearch)
    const nftResult = useSelector(selectNFTSearch)
    const searchResultRef = useRef<HTMLDivElement>(null)

    useOutsideClick(searchResultRef, () => {
        searchResultRef.current?.classList.remove(styles['search-result--show'])
    })

    useEffect(() => {
        if (!isLoading && artistResult && collectionResult && nftResult) {
            searchResultRef.current?.classList.add(
                styles['search-result--show'],
            )
        }
    }, [isLoading, artistResult, collectionResult, nftResult])

    return (
        <>
            {isLoading && (
                <div className={styles['search-loading']}>
                    <div className={styles['center-result']}>
                        <Loading />
                    </div>
                </div>
            )}
            <div className={styles['search-result']} ref={searchResultRef}>
                {artistResult?.length === 0 &&
                    collectionResult?.length === 0 &&
                    nftResult?.length === 0 && (
                        <div className={styles['center-result']}>
                            <span className={styles['no-data']}>
                                {t('NO_DATA_FOUND')}
                            </span>
                        </div>
                    )}
                {(artistResult as artistSearchItem[])?.length > 0 && (
                    <div className={styles['search-result__group']}>
                        <div className={styles['search-result__title']}>
                            {t('ARTIST')}
                        </div>
                        <div className={styles['search-result__list']}>
                            {artistResult?.map((item, index) => (
                                <SearchResultItem
                                    key={index}
                                    name={item.name ? item.name : item.address}
                                    image={item.avatar}
                                    defaultImage={DEFAULT_ARTIST_IMAGE}
                                    type="artist"
                                    address={item.address}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {(nftResult as nftSearchItem[])?.length > 0 && (
                    <div className={styles['search-result__group']}>
                        <div className={styles['search-result__title']}>
                            {t('NFT')}
                        </div>
                        <div className={styles['search-result__list']}>
                            {nftResult?.map((item, index) => (
                                <SearchResultItem
                                    key={index}
                                    name={item.name}
                                    image={item.smallImage}
                                    defaultImage={DEFAULT_NFT_IMAGE}
                                    type="nft"
                                    collectionAddress={item.collectionAddress}
                                    network={item.network}
                                    tokenId={item.tokenId}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {(collectionResult as collectionSearchItem[])?.length > 0 && (
                    <div className={styles['search-result__group']}>
                        <div className={styles['search-result__title']}>
                            {t('COLLECTIONS_RESULT')}
                        </div>
                        <div className={styles['search-result__list']}>
                            {collectionResult?.map((item, index) => (
                                <SearchResultItem
                                    key={index}
                                    name={item.name}
                                    image={item.iconImage}
                                    defaultImage={DEFAULT_COLLECTION_IMAGE}
                                    type={
                                        item.launchpadId
                                            ? 'collection-launchpad'
                                            : 'collection'
                                    }
                                    address={item.address}
                                    network={item.network}
                                    launchpadId={item.launchpadId}
                                    isOfficial={item.isOfficial}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchResult
