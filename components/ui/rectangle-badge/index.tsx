import React, { HTMLAttributes } from 'react'
import styles from './style.module.scss'

interface IReactangleBadge {
    haveCloseIcon?: boolean
    title: string
}

const RectangleBadge: React.FC<
    IReactangleBadge & HTMLAttributes<HTMLDivElement>
> = ({ haveCloseIcon = false, title }) => {
    return (
        <div className={`${styles['badge-container']} text-body--03`}>
            <div className={styles['badge-title']}>{title}</div>
            {haveCloseIcon && <div className={styles['badge-icon']}></div>}
        </div>
    )
}

export default RectangleBadge
