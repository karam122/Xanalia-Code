import React from 'react'
import { Tab as BTab, TabProps } from 'react-bootstrap'

const Tabs = ({ ...rest }: TabProps) => {
    return <BTab {...rest}>{rest.children}</BTab>
}

export default Tabs
