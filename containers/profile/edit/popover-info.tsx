import { OverlayTrigger, Popover } from 'react-bootstrap'
import SVGInfo from '@/public/svgs/info.svg'
import style from './style.module.scss'
import { HTMLAttributes } from 'react'

export default function PopoverInfo(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <OverlayTrigger
            overlay={
                <Popover className={style.popover}>{props.children}</Popover>
            }
        >
            <div className={style.svg_info}>
                <SVGInfo />
            </div>
        </OverlayTrigger>
    )
}
