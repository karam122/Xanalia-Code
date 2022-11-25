/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useState } from 'react'
import style from './style.module.scss'
import ImageDefault from '@/public/svgs/default-image.svg'
import { IDataPreivewNFT } from '@/store/nft/types'
// import { useTransHook} from '@/locales/hooks'
import PriceSection from './price-section'
// import Link from 'next/link'
import AuthorInfo from './author-info'
import GeneralInfo from './general'
import { useSelector } from 'react-redux'
import { selectNFTDetails } from '@/store/nft/selectors'
import LikeNFT from '@/components/common/nft-card/like-nft'
import ModalViewFull from '@/components/common/modals/modal-full-media'
const zoomIcon = '/images/zoom-out-icon.png'
interface IHeaderNftDetail {
    isRatio?: boolean
    isDetailPage?: boolean
    nodeButton?: ReactNode
    dataPreviewNFT: IDataPreivewNFT | undefined
}

const mediaShow = (media: string, category: number, thumbnail?: string) => {
    switch (category) {
        case 1:
        case 2:
        case 3: {
            return (
                <img
                    src={media || '/images/default-nft-image.jpeg'}
                    alt="nft image"
                />
            )
        }

        case 4: {
            return (
                <video src={media} controls controlsList="nodownload"></video>
            )
        }

        case 5: {
            if (thumbnail) {
                return (
                    <div className={style['nft-audio']}>
                        <img src={thumbnail} alt="" />
                        <audio
                            src={media}
                            controls
                            style={{ width: '100%' }}
                            controlsList="nodownload"
                        ></audio>
                    </div>
                )
            }
            // return <audio src={media} controls style={{ width: '100%', margin: 'auto 0' }}></audio>
        }

        default:
            return ''
    }
}

const DetailNFTHeader: React.FC<IHeaderNftDetail> = ({
    isRatio = false,
    nodeButton,
    // dataPreviewNFT,
}) => {
    // function convertNumber(value: number) {
    //     return Intl.NumberFormat().format(value)
    // }
    // const {t} = useTransHook()
    const nftDetail = useSelector(selectNFTDetails)
    const [openViewFull, setOpenViewFull] = useState(false)

    const viewFull = () => {
        setOpenViewFull(true)
    }
    return (
        <div className={style['section-nft-header']}>
            <div className={`${style['image']} ${isRatio ? 'ratio' : ''}`}>
                <div className={style['image__background']}>
                    <ImageDefault />
                </div>
                {mediaShow(
                    nftDetail?.mediaUrl as string,
                    nftDetail?.category as number,
                    nftDetail?.thumbnailUrl as string,
                )}
                <div className={style['like-nft']}>
                    <LikeNFT
                        likeCounter={Number(nftDetail.totalLike)}
                        isLike={nftDetail.isLike}
                        nftId={nftDetail.nftId}
                    />
                </div>
                {nftDetail?.category !== 5 && (
                    <>
                        <div
                            className={style['view-full-icon']}
                            onClick={viewFull}
                        >
                            <img src={zoomIcon} alt="" />
                        </div>
                        <ModalViewFull
                            open={openViewFull}
                            setOpen={setOpenViewFull}
                        >
                            <div className={style['view-full-media']}>
                                {mediaShow(
                                    nftDetail?.mediaUrl as string,
                                    nftDetail?.category as number,
                                    nftDetail?.thumbnailUrl as string,
                                )}
                            </div>
                        </ModalViewFull>
                    </>
                )}
            </div>

            <div className={style['content']}>
                <AuthorInfo />
                <GeneralInfo />

                <div className={style['content__space']} />
                <div className={style['nft-header-actions']}>
                    <PriceSection />
                    {nodeButton && nodeButton}
                </div>
            </div>
        </div>
    )
}

export default DetailNFTHeader
