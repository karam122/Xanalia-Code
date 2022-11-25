import React from 'react'
import { Pagination as BPagination, PaginationProps } from 'react-bootstrap'
import style from './style.module.scss'

const Pagination = ({ ...rest }: PaginationProps) => {
    return (
        <BPagination
            {...rest}
            className={`${style['custom-pagination']} ${rest.className}`}
        />
    )
}

export default Pagination
