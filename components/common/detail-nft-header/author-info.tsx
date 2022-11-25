import {
    collectionLaunchPadUrl,
    collectionUrl,
    profileUrl,
} from '@/constants/url'
import { useTransHook } from '@/locales/hooks'
import { selectNFTDetails } from '@/store/nft/selectors'
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import style from './style.module.scss'
const DefaultAvatar = '/images/default-user.webp'
const DefaultCollection = 'images/logo-footer.png'
// const CREATOR = '/images/default-user.webp'
// const OWNER = '/images/default-user.webp'
// const USER_ICON = '/images/default-user.webp'
type Props = {}
const imgurl = (url: string | undefined, defaul?: string) => {
    const DefaultAvt = defaul ?? '/images/default-user.webp'
    if (!url || url.endsWith('null')) {
        return DefaultAvt
    }

    return url
}
const formatName = (name: string | undefined): string => {
    if (!name) {
        return ''
    }
    return name.length > 8 ? name.slice(0, 8).trim() + '...' : name
}
type CardProps = {
    avt: string
    title: string
    href: string
    name: string
    metaClass?: string
}
const Card = ({
    avt,
    title,
    href,
    name,
    metaClass,
    ...rest
}: CardProps & HTMLAttributes<HTMLDivElement>) => {
    console.log('name', name)
    return (
        <div className={style['author-card']} {...rest}>
            <div className={metaClass}>
                <img
                    className={
                        style['author-card__img'] + ' ' + style['artist']
                    }
                    src={avt}
                    alt="avt"
                />
            </div>
            <div className={style['author-card__info']}>
                <div className={style['author-card__info__title']}>{title}</div>
                <Link
                    href={
                        name === 'Admin 01' ? 'javascript:void(0)' : href
                        // href
                    }
                    passHref
                >
                    <div className={style['author-card__info__name']}>
                        {name}
                    </div>
                </Link>
            </div>
        </div>
    )
}
function AuthorInfo({}: Props) {
    const { t } = useTransHook()
    const nft = useSelector(selectNFTDetails)
    return (
        <div className={style['author-cards']}>
            <Card
                avt={imgurl(nft.creator?.avatar, DefaultAvatar)}
                name={formatName(
                    nft.creator?.name
                        ? nft.creator?.name
                        : nft.creator?.address,
                )}
                title={t('CREATOR')}
                href={profileUrl(nft.creator?.address)}
                metaClass={nft.creator?.role === 4 ? style['artist'] : ''}
            />
            <Card
                data-collection-launchpad={
                    nft.launchpadId || !!Number(nft?.collection?.isOfficial)
                        ? 'true'
                        : 'false'
                }
                avt={imgurl(nft.collection?.avatar, DefaultCollection)}
                name={formatName(
                    nft.collection?.name
                        ? nft.collection?.name
                        : nft.collection?.address,
                )}
                title={t('COLLECTION')}
                href={
                    nft?.launchpadId
                        ? collectionLaunchPadUrl(nft?.launchpadId)
                        : collectionUrl(
                              nft.collection?.address,
                              nft.network?.networkName,
                          )
                }
            />
            <Card
                avt={imgurl(nft.owner?.avatar, DefaultAvatar)}
                name={formatName(
                    nft.owner?.name ? nft.owner?.name : nft.owner?.address,
                )}
                title={t('OWNER')}
                href={profileUrl(nft.owner?.address)}
                metaClass={nft.owner?.role === 4 ? style['artist'] : ''}
            />
        </div>
    )
    // return (
    //     <div className={style['nft-authors']}>
    //         <div className={style['nft-authors-item']}>
    //             <img src={imgurl(nft.collection?.avatar)} alt="collection" />
    //             <div className={style['nft-authors-item-tooltip']}>
    //                 <img
    //                     src={imgurl(nft.collection?.avatar)}
    //                     alt="user-icon-alt"
    //                 />
    //                 <span>{t('COLLECTION')}</span>
    //                 <Link
    //                     href={collectionUrl(
    //                         nft.collection?.address,
    //                         nft.network?.networkName,
    //                     )}
    //                 >
    //                     <a style={{ whiteSpace: 'nowrap' }}>
    //                         {formatName(
    //                             nft.collection?.name
    //                                 ? nft.collection?.name
    //                                 : nft.collection?.address,
    //                         )}
    //                     </a>
    //                 </Link>
    //             </div>
    //         </div>
    //         <div
    //             className={`${style['nft-authors-item']}  ${
    //                 nft.creator?.role === 4 ? style['artist'] : ''
    //             }`}
    //         >
    //             <img src={imgurl(nft.creator?.avatar)} alt="creator" />
    //             <div className={style['nft-authors-item-tooltip']}>
    //                 <div
    //                     className={`${
    //                         nft.creator?.role === 4 ? style['artist'] : ''
    //                     }`}
    //                 >
    //                     <img
    //                         src={imgurl(nft.creator?.avatar)}
    //                         alt="user-icon-alt"
    //                     />
    //                 </div>
    //                 <span>{t('CREATOR')}</span>
    //                 <Link href={profileUrl(nft.creator?.address)}>
    //                     <a style={{ whiteSpace: 'nowrap' }}>
    //                         {formatName(
    //                             nft.creator?.name
    //                                 ? nft.creator?.name
    //                                 : nft.creator?.address,
    //                         )}
    //                     </a>
    //                 </Link>
    //             </div>
    //         </div>
    //         <div
    //             className={`${style['nft-authors-item']} ${
    //                 nft.owner?.role === 4 ? style['artist'] : ''
    //             }`}
    //         >
    //             <img src={imgurl(nft.owner?.avatar)} alt="" />
    //             <div className={style['nft-authors-item-tooltip']}>
    //                 <div
    //                     className={`${
    //                         nft.owner?.role === 4 ? style['artist'] : ''
    //                     }`}
    //                 >
    //                     <img
    //                         src={imgurl(nft.owner?.avatar)}
    //                         alt="user-icon-alt"
    //                     />
    //                 </div>
    //                 <span>{t('Owner')}</span>
    //                 <Link href={profileUrl(nft.owner?.address)}>
    //                     <a style={{ whiteSpace: 'nowrap' }}>
    //                         {formatName(
    //                             nft.owner?.name
    //                                 ? nft.owner?.name
    //                                 : nft.owner?.address,
    //                         )}
    //                     </a>
    //                 </Link>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default AuthorInfo
