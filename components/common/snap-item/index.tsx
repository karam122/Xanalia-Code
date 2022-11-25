/* eslint-disable @next/next/no-img-element */
import React from 'react'
import style from './style.module.scss'
import Link from 'next/link'

interface ISnapItem {
    owner: string
    title: string
    image: string
    link: string
}

const SnapItem: React.FC<ISnapItem & React.HTMLAttributes<HTMLDivElement>> = ({
    owner,
    title,
    image,
    link,
    ...rest
}) => {
    return (
        <Link href={link} passHref>
            <div {...rest} className={style['snap-item']}>
                <img src={image} draggable="false" alt="" />

                <div className={style['info']}>
                    <span>{owner}</span>
                    <p>{title}</p>
                </div>
            </div>
        </Link>
    )
}

export default SnapItem
