import React, { ReactNode, useEffect, useRef } from 'react'
import { Table as BTable, TableProps } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'

const Table = ({
    reCalculate,
    ...rest
}: TableProps & { reCalculate?: boolean }) => {
    const tableRef = useRef<HTMLTableElement>(null)
    const wrapperTableRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizeTable = () => {
            if (
                tableRef &&
                tableRef.current &&
                tableRef.current.classList.contains('custom-table')
            ) {
                const ths = tableRef.current.querySelector(
                    'thead tr:first-child',
                )?.children as HTMLCollectionOf<HTMLElement>
                const tds = tableRef.current.querySelector(
                    'tbody tr:first-child',
                )?.children as HTMLCollectionOf<HTMLElement>
                const body = tableRef.current.querySelector('tbody')

                const bodyWidth = body?.getBoundingClientRect().width || 0

                if (ths && tds && body && ths.length === tds.length) {
                    for (let i = 0; i < ths.length; i++) {
                        ths[i].style.width =
                            (wrapperTableRef.current
                                ? tds[i]?.getBoundingClientRect().width
                                : bodyWidth / ths.length) + 'px'
                        tds[i].style.width =
                            (wrapperTableRef.current
                                ? tds[i]?.getBoundingClientRect().width
                                : bodyWidth / ths.length) + 'px'
                    }
                }
                if (ths && tds && body && ths.length !== tds.length) {
                    for (let i = 0; i < ths.length; i++) {
                        ths[i].style.width =
                            (wrapperTableRef.current
                                ? tds[i]?.getBoundingClientRect().width
                                : bodyWidth / ths.length) + 'px'
                    }
                    tds[0].style.width = bodyWidth + 'px'
                }
            }
        }

        resizeTable()
    }, [tableRef, reCalculate, rest.children])

    const WrapperTable = ({ children }: { children: ReactNode }) => {
        if (isMobile) {
            return (
                <div className="custom-table__responsive" ref={wrapperTableRef}>
                    {children}
                </div>
            )
        }
        return <>{children}</>
    }

    return (
        <WrapperTable>
            <BTable
                ref={tableRef}
                className={`${
                    rest.className ? rest.className : 'table-xanalia'
                }`}
                {...rest}
            />
        </WrapperTable>
    )
}

export default Table
