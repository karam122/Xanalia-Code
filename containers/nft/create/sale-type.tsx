import { useTransHook } from '@/locales/hooks'
// import { useState } from 'react'
import ToggleButtonGroup from '@/components/ui/toggle-button-group'
import { saleType as st } from '@/constants/nft'
import { useSelector, useDispatch } from 'react-redux'
import { selectSaleType } from '@/store/nft/selectors'
import { updateSaleInfo } from '@/store/nft/createSlice'
const SaleType = () => {
    const { t } = useTransHook()
    const saleType = useSelector(selectSaleType)
    const dispatch = useDispatch()
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

    const handleToggle: any = (value: string) => {
        dispatch(updateSaleInfo({ field: 'saleType', value: value }))
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
