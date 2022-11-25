import { selectNFTDetails } from '@/store/nft/selectors'
// import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import style from './style.module.scss'
// import {ellipsisText} from '@/utils/ellipsisText'
import { formatAddress } from '@/utils/addressFormat'
import Link from 'next/link'
import { profileUrl } from '@/constants/url'
type Props = {}

function General({}: Props) {
    const nft = useSelector(selectNFTDetails)
    return (
        <div className={style['general-info']}>
            <Link passHref href={profileUrl(nft.creator.address)}>
                <h4 className={style['content__creator-name']}>
                    {nft?.creator?.name || formatAddress(nft.creator.address)}
                </h4>
            </Link>
            <h1
                className={`${style['content__name']} heading--3`}
                title={nft?.name}
            >
                {nft?.name}
            </h1>
            <p className={`text-desc ${style['content__description']}`}>
                {nft?.description}
            </p>
        </div>
    )
}

export default General
