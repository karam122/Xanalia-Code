// import { CHAIN_TO_IMAGE, SupportedChains } from '@/constants/chain'
// import { ADDRESS_TO_IMAGE } from '@/constants/tokens'
// import { useTransHook } from '@/locales/hooks'
// import HeartIcon from '@/public/svgs/heart-icon.svg'
// import { useAppDispatch } from '@/store/hooks'
// import { getPreviewNFT, setOpenModalPreviewNFT } from '@/store/nft/slice'
// import Image from 'next/image'
import { useEffect } from 'react'
import styles from './style.module.scss'
import Author from './author'
import { NFT_TYPE_TO_ID } from '@/constants/nft'
import { ellipsisText } from '@/utils/ellipsisText'
import SaleInfo from './sale-info'
import Link from 'next/link'
import { NFT_MARKET_STATUS } from '@/constants/nft'
import { useTransHook } from '@/locales/hooks'
import LikeNFT from './like-nft'
import { useRouter } from 'next/router'
import { previousRoute, selectedNftId } from '@/store/app/selectors'
import { useDispatch, useSelector } from 'react-redux'
import {
    setPreviousRoute,
    setSelectedNftId,
    setSelectedNftPage,
} from '@/store/app/slice'
const playIcon = '/svgs/play-icon.svg'
const headphoneIcon = '/images/headphone-icon.png'
const getSaleStatus = (
    marketplaceStatus: number,
    saleDataAuction: any,
    t: any,
) => {
    switch (marketplaceStatus) {
        case NFT_MARKET_STATUS.NOT_ON_SALE:
            return (
                <div className="nft-sale-status-error">{t('NOT_ON_SALE')}</div>
            )
        case NFT_MARKET_STATUS.ON_FIX_PRICE:
            return <div className="nft-sale-status">{t('ON_SALE')}</div>
        case NFT_MARKET_STATUS.ON_AUCTION:
        case NFT_MARKET_STATUS.CANCEL_AUCTION:
        case NFT_MARKET_STATUS.UPCOMMING_AUCTION:
        case NFT_MARKET_STATUS.END_AUCTION:
            if (
                saleDataAuction &&
                Number(saleDataAuction.startPrice) ===
                    Number(saleDataAuction.highestPrice)
            ) {
                return <div className="nft-sale-status">{t('MIN_BID')}</div>
            }
            return <div className="nft-sale-status">{t('HIGHEST_BID')}</div>
    }
}
interface INFTCard {
    data: {
        nftId: number
        name: string
        category: number
        marketNftStatus: number
        mediaUrl: string | null
        thumbnailUrl?: string
        tokenId: string
        totalLike?: number | string
        network: {
            networkName: string
            avatar: string | null
        }
        creator: {
            avatar: string | null
            name: string
            address: string
            role?: number
        }
        owner: {
            name: string
            avatar: string | null
            address: string
            role?: number
        }
        collection: {
            address: string
        }
        saleData: {
            fixPrice: {
                price: string
                tokenPrice: string
                tokenPriceIcon: string | null
            }
            auction: {
                startPrice: string
                highestPrice: string
                tokenPrice: string
                tokenPriceIcon: string | null
            }
        }
        isLike?: string
    }
}

const NFTCard = ({ data }: INFTCard) => {
    const { t } = useTransHook()
    const dispatch = useDispatch()
    const router = useRouter()

    const handleHighLight = (id: String) => {
        dispatch(setSelectedNftId(`${id}`))
    }

    const prevRoute = useSelector(previousRoute)
    const currentNftId = useSelector(selectedNftId)

    useEffect(() => {
        const nftId = currentNftId
        const path = router.pathname
        const previosRoute = prevRoute
        if (nftId && path === '/marketplace' && previosRoute === 'nftDetails') {
            setTimeout(() => {
                const elmnt = document.getElementById(`${nftId}`)
                if (elmnt) {
                    elmnt.scrollIntoView()
                    dispatch(setPreviousRoute(''))
                    dispatch(setSelectedNftPage(''))
                    dispatch(setSelectedNftId(''))
                }
            }, 1000)
        }
    }, [])

    const mediaShow = () => {
        switch (data?.category) {
            case NFT_TYPE_TO_ID.video: {
                console.log(
                    '🚀 ~ file: index.tsx ~ line 166 ~ mediaShow ~ video',
                    data,
                )
                return (
                    <div className={styles['non-image-nft']}>
                        <img
                            className={styles['thumbnail-image']}
                            src={data?.mediaUrl as string}
                            alt={data?.name}
                            // layout="fill"
                        />
                        <img
                            src={playIcon}
                            alt="play icon"
                            className={styles['play-icon']}
                        />
                    </div>
                )
            }
            case NFT_TYPE_TO_ID.audio: {
                return (
                    <div className={styles['non-image-nft']}>
                        <img
                            className={styles['thumbnail-image']}
                            src={data?.mediaUrl as string}
                            alt={data?.name}
                            // layout="fill"
                        />
                        <img
                            src={headphoneIcon}
                            alt="play icon"
                            className={styles['play-icon']}
                        />
                    </div>
                )
            }

            default: {
                return (
                    <img
                        src={
                            data?.mediaUrl && data.mediaUrl !== null
                                ? data.mediaUrl
                                : '/images/default-nft-image.jpeg'
                        }
                        alt={data?.name}
                        // layout="fill"
                    />
                )
            }
        }
    }
    return (
        <Link
            href={`/assets/${data?.network?.networkName}/${data?.collection?.address}/${data?.tokenId}`}
            passHref
        >
            <div
                className={styles['nft-card']}
                id={`nft-id-${data.nftId}`}
                onClick={() => handleHighLight(`nft-id-${data.nftId}`)}
            >
                <div className={styles['nft-card__header']}>
                    <div className={styles['nft-card__header-image']}>
                        {mediaShow()}
                    </div>
                    <LikeNFT
                        nftId={data.nftId}
                        likeCounter={Number(data.totalLike)}
                        isLike={data?.isLike}
                    />
                </div>

                <div className={styles['nft-card__body']}>
                    <div
                        className={`${styles['nft-card__nft-name']} heading--6`}
                    >
                        {ellipsisText(data.name, 130)}
                    </div>
                    <div className={styles['nft-card__owner-price']}>
                        {getSaleStatus(
                            data?.marketNftStatus,
                            data?.saleData?.auction,
                            t,
                        )}
                        {data.marketNftStatus !==
                            NFT_MARKET_STATUS.NOT_ON_SALE && (
                            <SaleInfo saleData={data.saleData} />
                        )}
                    </div>
                </div>

                <div className={styles['nft-card__footer']}>
                    <img
                        src={
                            data?.network?.avatar
                                ? data.network.avatar
                                : '/svgs/default-creator.svg'
                        }
                        alt="network token"
                        title={data.network.networkName}
                    />
                    <Author creator={data.creator} owner={data.owner} />
                </div>
            </div>
        </Link>
    )
}

export default NFTCard
