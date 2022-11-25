import { useTransHook } from '@/locales/hooks'
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import style from './style.module.scss'

const TabDefault = (props: any) => {
    const { t } = useTransHook()
    console.log(props)
    return (
        <Tabs
            defaultActiveKey="collection"
            id="uncontrolled-tab-example"
            className={style['container']}
        >
            <Tab
                className={style['content-tab']}
                eventKey="creator"
                title={t('CREATOR')}
            >
                <div>{props?.userData?.name || props?.userData?.address}</div>
                {props?.userData?.description || ''}
            </Tab>
            <Tab
                className={style['content-tab']}
                eventKey="collection"
                title={t('COLLECTION')}
            >
                <div>{props.collectionName}</div>
                {props.collectionDescription || ''}
            </Tab>
        </Tabs>
    )
}

export default TabDefault
