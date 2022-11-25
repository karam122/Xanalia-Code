import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { Pagination as BPagination } from 'react-bootstrap'
import style from './style.module.scss'

import Pagination from '@/components/ui/pagination'

interface Props {
    total: number
    current: number
    pageSize: number
    /* eslint-disable no-unused-vars */
    onChange: (i: number) => void
}

const caculate = (current: number, perView: number, maxPage: number) => {
    if (maxPage === 1) {
        return {
            from: 1,
            to: 1,
        }
    }
    const offset = Math.floor(perView / 2)

    const rs = { from: current - offset, to: current + offset }

    if (rs.from <= 1) {
        rs.from = 2
        if (rs.from + perView - 1 >= maxPage) {
            rs.to = maxPage - 1
        } else {
            rs.to = rs.from + perView - 1
        }
    }

    if (rs.to >= maxPage) {
        rs.to = maxPage - 1
        if (rs.to - (perView - 1) <= 1) {
            rs.from = 2
        } else {
            rs.from = rs.to - (perView - 1)
        }
    }

    return rs
}

const PaginationComponent = ({ total, pageSize, current, onChange }: Props) => {
    const maxPage = Math.ceil(total / pageSize)
    const [perView] = useState(5)
    const [data, setData] = useState<{ from: number; to: number }>(
        caculate(current, perView, maxPage),
    )

    // console.log(
    //     '🚀 ~ file: pagingnation.tsx ~ line 17 ~ Pagingnation ~ data',
    //     data, current
    // )
    useEffect(() => {
        setData(caculate(current, perView, maxPage))
    }, [current, total])
    const onChangeWrap = (i: number) => {
        window.scrollTo(0, 0)
        onChange(i)
    }
    const pages = () => {
        const t = []

        for (let i = data.from; i <= data.to; i++) {
            t.push(
                <BPagination.Item
                    key={i}
                    active={i === current}
                    onClick={() => onChangeWrap(i)}
                >
                    {i}
                </BPagination.Item>,
            )
        }
        return t
    }
    if (total === 0) {
        return <></>
    }
    return (
        <div className={style['list-collection__pagination']}>
            <Pagination>
                {/* <BPagination.First disabled={current === 1} onClick={() => onChangeWrap(1)}/> */}
                <BPagination.Prev
                    disabled={current === 1}
                    onClick={() => onChangeWrap(current - 1)}
                />
                {maxPage > 1 && (
                    <BPagination.Item
                        active={1 === current}
                        onClick={() => onChangeWrap(1)}
                    >
                        {1}
                    </BPagination.Item>
                )}

                {data.from > 2 && (
                    <BPagination.Ellipsis
                        onClick={() => onChangeWrap(data.from - 1)}
                    />
                )}
                {pages()}
                {data.to < maxPage - 1 && (
                    <BPagination.Ellipsis
                        onClick={() => onChangeWrap(data.to + 1)}
                    />
                )}

                {maxPage > 1 && (
                    <BPagination.Item
                        active={maxPage === current}
                        onClick={() => onChangeWrap(maxPage)}
                    >
                        {maxPage}
                    </BPagination.Item>
                )}
                <BPagination.Next
                    disabled={current === maxPage}
                    onClick={() => onChangeWrap(current + 1)}
                />
                {/* <BPagination.Last disabled={current === maxPage} onClick={() => onChange(maxPage)}/> */}
            </Pagination>
        </div>
    )
}

export default PaginationComponent
