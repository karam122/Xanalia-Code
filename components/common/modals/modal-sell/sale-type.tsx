import { useTransHook } from '@/locales/hooks'
// import { useState } from 'react'
import ToggleButtonGroup from '@/components/ui/toggle-button-group'
import { saleType as st } from '@/constants/nft'

interface Props {
    saleType: number
    // eslint-disable-next-line no-unused-vars
    onChange: (val: number) => void
}
const SaleType = ({ saleType, onChange }: Props) => {
    const { t } = useTransHook()

    const saleTypesData = [
        {
            value: st.FIXEDPRICE,
            content: t('FIXED_PRICE'),
        },
        // {
        //     value: 'welcome_offer',
        //     content: t('WELCOME_OFFER'),
        // },
        {
            value: st.TIMEAUTION,
            content: t('TIME_AUCTION'),
        },
    ]

    const handleToggle: any = (value: number) => {
        onChange(value)
    }

    return (
        <div className={`panel`}>
            <div className="panel__title">{t('SALE_TYPE')}</div>
            <ToggleButtonGroup
                items={saleTypesData}
                defaultActiveValue={saleType}
                handleToggle={handleToggle}
            />
        </div>
    )
}

export default SaleType
