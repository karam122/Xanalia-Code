/* eslint-disable @next/next/no-img-element */
import React from 'react'
import style from './style.module.scss'
// import SVGTick from '@/public/svgs/escutcheon.svg'
import EthIcon from '@/public/svgs/eth-icon.svg'
import Link from 'next/link'
import { collectionUrl } from '@/constants/url'
import { ellipsisText } from '@/utils/ellipsisText'
interface ICardCollectionRanking {
    index: number
    avatar: string
    name: string
    address: string
    price: number
    networkName: string
}

const CardCollectionRanking: React.FC<
    ICardCollectionRanking & React.HTMLAttributes<HTMLDivElement>
> = ({ index, avatar, name, price, address, networkName, ...rest }) => {
    return (
        <Link href={collectionUrl(address, networkName)} passHref>
            <div
                className={`${style['card-collection-ranking']} pointer`}
                {...rest}
            >
                <span>{index}</span>
                <div className={style['card-collection-ranking__avatar']}>
                    <div>
                        <img
                            src={avatar}
                            draggable="false"
                            loading="lazy"
                            alt=""
                        />
                    </div>
                    {/* <SVGTick /> */}
                </div>
                <div className={style['card-collection-ranking__content']}>
                    <h6 className="heading--6" title={name}>
                        {ellipsisText(name, 20)}
                    </h6>
                    <p className={style['card-collection-ranking__price']}>
                        <EthIcon />
                        <span> {price || 0}</span>
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default CardCollectionRanking
