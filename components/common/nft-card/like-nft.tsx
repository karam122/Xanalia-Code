import React, { useEffect, useRef } from 'react'
import styles from './style.module.scss'
import HeartIcon from '@/public/svgs/heart-icon.svg'
import { useTransHook } from '@/locales/hooks'
// import { useAppDispatch } from '@/store/hooks'
import nftServices from '@/services/nft'
// import { useSelector } from 'react-redux'
// import { selectLikeNFT } from '@/store/nft/selectors'
import useActionAuth from '@/hooks/useActionAuth'
import { useSelector } from 'react-redux'
import { selectDataUser } from '@/store/user/selectors'
type Props = {
    nftId: number
    likeCounter: number
    isLike: string | undefined
}

function LikeNFT({ likeCounter, nftId, isLike }: Props) {
    // const [count, setCount] = useState<number>(likeCounter)
    // console.log('🚀 ~ file: like-nft.tsx ~ line 15 ~ LikeNFT ~ nftId', nftId)
    const user = useSelector(selectDataUser)

    const { t } = useTransHook()
    const likeCounterRef = useRef<HTMLDivElement>(null)
    const heartRef = useRef<HTMLDivElement>(null)

    // const dispatch = useAppDispatch()
    // console.log(
    //     '🚀 ~ file: like-nft.tsx ~ line 22 ~ LikeNFT ~ dispatch',
    //     dispatch,
    // )
    // const { liked, isLoading } = useSelector(selectLikeNFT)

    const onMouseEnterHeartIcon = () => {
        if (likeCounterRef) {
            likeCounterRef.current?.classList.add(
                styles['nft-card__header-like-counter--show'],
            )
        }
    }

    const onMouseLeaveHeartIcon = () => {
        if (likeCounterRef) {
            likeCounterRef.current?.classList.remove(
                styles['nft-card__header-like-counter--show'],
            )
        }
    }

    const handleLike = async () => {
        if (heartRef.current) {
            const dt = { nftId: nftId, status: 1 }
            const counters = document.querySelectorAll(
                `span[data-id="like-nft-counter-${nftId}"]`,
            )
            if (
                heartRef.current.classList.contains(
                    styles['nft-card__header-like-liked'],
                )
            ) {
                // setCount(count - 1)
                if (counters.length) {
                    counters.forEach((item) => {
                        item.innerHTML = (Number(item.innerHTML) - 1).toString()
                    })
                }

                dt.status = 0
            } else {
                // setCount(count + 1)
                if (counters.length) {
                    counters.forEach((item) => {
                        item.innerHTML = (Number(item.innerHTML) + 1).toString()
                    })
                }
            }
            const hearts = document.querySelectorAll(
                `div[data-id="like-nft-heart-${nftId}"]`,
            )
            console.log(
                '🚀 ~ file: like-nft.tsx ~ line 76 ~ handleLike ~ hearts',
                hearts,
            )
            hearts.forEach((item) => {
                item.classList.toggle(styles['nft-card__header-like-liked'])
            })
            // heartRef.current.classList.toggle(
            //     styles['nft-card__header-like-liked'],
            // )
            await nftServices.likeNFT(dt)
        }
    }

    const handleLikeAuth = useActionAuth(handleLike)
    async function onLike(e: any) {
        e.preventDefault()
        handleLikeAuth()
    }

    useEffect(() => {
        if (heartRef.current) {
            if (isLike && Number(isLike) && user?.id) {
                heartRef.current.classList.add(
                    styles['nft-card__header-like-liked'],
                )
            } else {
                heartRef.current.classList.remove(
                    styles['nft-card__header-like-liked'],
                )
            }
        }
    }, [isLike, user?.id])

    useEffect(() => {
        if (likeCounterRef.current) {
            const span = likeCounterRef.current.querySelector('span')
            if (span) {
                span.innerHTML = likeCounter.toString()
            }
        }
    }, [])

    return (
        <div className={styles['nft-card__header-like']}>
            <div
                ref={likeCounterRef}
                className={`${styles['nft-card__header-like-counter']} heading--6-1`}
            >
                {/* {count} */}
                <span data-id={`like-nft-counter-${nftId}`}></span>
                &nbsp;
                {likeCounter > 1 ? t('LIKES') : t('LIKE')}
            </div>
            <div ref={heartRef} data-id={`like-nft-heart-${nftId}`}>
                <HeartIcon
                    onClick={onLike}
                    onMouseEnter={onMouseEnterHeartIcon}
                    onMouseLeave={onMouseLeaveHeartIcon}
                    className={styles['nft-card__header-heart-icon']}
                    alt={'header-icon-alt'}
                />
            </div>
        </div>
    )
}

export default LikeNFT
