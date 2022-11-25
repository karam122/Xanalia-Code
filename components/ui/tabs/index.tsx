import React from 'react'
import { Tabs as BTabs, TabsProps } from 'react-bootstrap'
import style from './style.module.scss'

const Tabs = ({ ...rest }: TabsProps) => {
    const mountOnEnter =
        typeof rest.mountOnEnter === 'undefined' ? true : rest.mountOnEnter
    return (
        <BTabs
            {...rest}
            mountOnEnter={mountOnEnter}
            className={`${style['nav-tabs']} ${rest.className}`}
        >
            {rest.children}
        </BTabs>
    )
}

export default Tabs
