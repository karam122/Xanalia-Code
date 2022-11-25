import React from 'react'
import SVGArrow from '@/public/svgs/arrow-down.svg'
import style from './style.module.scss'

// eslint-disable-next-line react/display-name
export const CustomToggle = React.forwardRef(
    ({ children, onClick }: any, ref: any) => (
        <div
            className={style['custom-dropdown']}
            ref={ref}
            onClick={(e) => {
                e.preventDefault()
                onClick(e)
            }}
        >
            <div className="text-body--01">{children}</div>
            <SVGArrow />
        </div>
    ),
)

// eslint-disable-next-line react/display-name
export const CustomToggle2 = React.forwardRef(
    ({ children, onClick }: any, ref: any) => (
        <div
            className={style['custom-dropdown2']}
            ref={ref}
            onClick={(e) => {
                e.preventDefault()
                onClick(e)
            }}
        >
            <div className="text-body--01">{children}</div>
            <SVGArrow />
        </div>
    ),
)
