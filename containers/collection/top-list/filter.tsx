import React, { useEffect, useState } from 'react'
import { useTransHook } from '@/locales/hooks'

import style from './style.module.scss'
import { Dropdown } from 'react-bootstrap'
import { CustomToggle2 } from '@/components/ui/dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { selectNetworksList } from '@/store/network/selectors'
import { changeFilter } from '@/store/collection/rankingSlice'
import { DURATION } from '@/constants/collection'
const ALL_CHAIN = '/svgs/oval-link.svg'
const FilterSection = () => {
    const { t } = useTransHook()
    const networks = useSelector(selectNetworksList)

    const [duration, setDuration] = useState({
        text: 'ALL',
        key: DURATION.ALL,
    })
    const [chain, setChain] = useState({
        text: 'All chains',
        icon: ALL_CHAIN,
        id: 0,
    })

    const timeDataOption = [
        {
            text: '24H',
            key: DURATION.DAY,
        },
        {
            text: '7_DAYS',
            key: DURATION.WEEK,
        },
        {
            text: '30_DAYS',
            key: DURATION.MONTH,
        },
        {
            text: 'ALL',
            key: DURATION.ALL,
        },
    ]
    const dispatch = useDispatch()

    const onChangeFilter = (
        field: 'duration' | 'sort' | 'chain',
        value: number,
    ) => {
        dispatch(
            changeFilter({
                field: field,
                value: value,
            }),
        )
    }
    useEffect(() => {
        onChangeFilter('chain', chain.id)
    }, [chain])

    useEffect(() => {
        onChangeFilter('duration', duration.key)
    }, [duration])

    return (
        <div className={style['filter']}>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle2}>
                    <span className="heading--6" style={{ lineHeight: '24px' }}>
                        {t(duration.text)}
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {timeDataOption.map((d, i) => (
                        <Dropdown.Item key={i} onClick={() => setDuration(d)}>
                            {t(d.text)}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle as={CustomToggle2}>
                    <div className={style['top-list__select-item']}>
                        <img src={chain.icon} alt="" />
                        <span className="heading--6">{chain.text}</span>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        className="font-600"
                        onClick={() =>
                            setChain({
                                text: 'All chains',
                                icon: ALL_CHAIN,
                                id: 0,
                            })
                        }
                    >
                        <div className={style['top-list__select-item']}>
                            <img src={ALL_CHAIN} alt="" />
                            <span>All chains</span>
                        </div>
                    </Dropdown.Item>
                    {networks.map((obj, i) => (
                        <Dropdown.Item
                            key={i}
                            onClick={() =>
                                setChain({
                                    id: obj.id,
                                    icon: obj.image,
                                    text: obj.name,
                                })
                            }
                        >
                            <div className={style['top-list__select-item']}>
                                <img src={obj.image} alt="" />
                                <span>{obj.name}</span>
                            </div>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default FilterSection
