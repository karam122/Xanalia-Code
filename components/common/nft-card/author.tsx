import { imgurl, profileUrl } from '@/constants/url'
import { useTransHook } from '@/locales/hooks'
import Link from 'next/link'
import React, { useRef } from 'react'
// const USER_ICON = '/svgs/user-icon.svg'
import st from './style.module.scss'

type Props = {
    creator: {
        address: string
        avatar: null | string | undefined
        name: string
        role?: number
    }

    owner: {
        address: string
        avatar: null | string | undefined
        name: string
        role?: number
    }
}
const formatName = (name: string) => {
    if (name === undefined) {
        return 'undefined'
    }
    return name?.length > 8 ? name?.slice(0, 8) + '...' : name
}
const Author = ({ creator, owner }: Props) => {
    const { t } = useTransHook()
    const creatorTooltipRef = useRef<HTMLDivElement>(null)
    const ownerTooltipRef = useRef<HTMLDivElement>(null)

    const onCreatorEnter = () => {
        console.log('MMAAMMAM')
        if (creatorTooltipRef) {
            creatorTooltipRef.current?.classList.add(
                st['author-info__creator--show'],
            )
        }
    }

    const onCreatorLeave = () => {
        if (creatorTooltipRef) {
            creatorTooltipRef.current?.classList.remove(
                st['author-info__creator--show'],
            )
        }
    }

    const onOwnerEnter = () => {
        if (ownerTooltipRef) {
            ownerTooltipRef.current?.classList.add(
                st['author-info__owner--show'],
            )
        }
    }

    const onOwnerLeave = () => {
        if (ownerTooltipRef) {
            ownerTooltipRef.current?.classList.remove(
                st['author-info__owner--show'],
            )
        }
    }
    return (
        <div className={st['author-images']}>
            <span className={creator?.role === 4 ? st['artist'] : ''}>
                <img
                    src={imgurl(creator?.avatar)}
                    alt="creator"
                    onMouseEnter={onCreatorEnter}
                    onMouseLeave={onCreatorLeave}
                />
            </span>
            <span className={owner?.role === 4 ? st['artist'] : ''}>
                <img
                    src={imgurl(owner?.avatar)}
                    alt="owner"
                    onMouseEnter={onOwnerEnter}
                    onMouseLeave={onOwnerLeave}
                />
            </span>
            <div
                className={st['author-info']}
                ref={creatorTooltipRef}
                onMouseEnter={onCreatorEnter}
                onMouseLeave={onCreatorLeave}
            >
                <div
                    className={`${st['author-info__detail']} ${st['author-info__detail--creator']}`}
                >
                    <div className={creator?.role === 4 ? st['artist'] : ''}>
                        <img
                            src={imgurl(creator?.avatar)}
                            alt="user-icon-alt"
                        />
                    </div>
                    <label>{t('CREATOR')}</label>
                    <Link href={profileUrl(creator?.address)}>
                        <a style={{ whiteSpace: 'nowrap' }}>
                            {formatName(
                                creator?.name
                                    ? creator?.name
                                    : creator?.address,
                            )}
                        </a>
                    </Link>
                </div>
            </div>
            <div
                className={st['author-info']}
                ref={ownerTooltipRef}
                onMouseEnter={onOwnerEnter}
                onMouseLeave={onOwnerLeave}
            >
                <div
                    className={`${st['author-info__detail']} ${st['author-info__detail--owner']}`}
                >
                    <div className={owner?.role === 4 ? st['artist'] : ''}>
                        <img src={imgurl(owner?.avatar)} alt="user-icon-alt" />
                    </div>
                    <label>{t('OWNER')}</label>
                    <Link href={profileUrl(owner?.address)}>
                        <a style={{ whiteSpace: 'nowrap' }}>
                            {formatName(
                                owner?.name ? owner?.name : owner?.address,
                            )}
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Author
