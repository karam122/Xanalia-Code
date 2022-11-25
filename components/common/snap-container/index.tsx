import React, { useEffect, useRef } from 'react'
import style from './style.module.scss'

interface ISnapContainer {
    spaceItem?: string
    duration?: string
}

const SnapContainer: React.FC<
    ISnapContainer & React.HTMLAttributes<HTMLDivElement>
> = ({ spaceItem, duration, children, ...rest }) => {
    const elDiv = useRef<any>(null)

    const customStyle: any = {
        '--space-item': spaceItem,
        '--duration': duration,
    }

    useEffect(() => {
        if (!elDiv.current || elDiv.current.childNodes.length > 1) return
        const cloneEl = (elDiv.current.firstChild as HTMLDivElement).cloneNode(
            true,
        )
        ;(elDiv.current as HTMLDivElement).appendChild(cloneEl)
    }, [])

    return (
        <div
            {...rest}
            ref={elDiv}
            className={style['snap-container']}
            style={customStyle}
        >
            <div>{children}</div>
        </div>
    )
}

export default SnapContainer
