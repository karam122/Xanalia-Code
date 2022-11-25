import React from 'react'
import { FormControl } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'
import { useSelector, useDispatch } from 'react-redux'
import useValidate from '@/hooks/useValidate'
import {
    selectError,
    selectNetworkInfo,
    selectSalePrice,
    // selectSalePrice,
} from '@/store/nft/selectors'
import { updateSaleInfo } from '@/store/nft/createSlice'
import style from './style.module.scss'
const FixPrice = () => {
    const { t } = useTransHook()
    const { basePrice } = useSelector(selectNetworkInfo)
    const salePrice = useSelector(selectSalePrice)

    const { validateNumber } = useValidate()
    const error = useSelector(selectError('sale')) as {
        price: string
    }

    const dispatch = useDispatch()

    const onChange = (e: any) => {
        if (validateNumber(e.target.value).status) {
            dispatch(updateSaleInfo({ field: 'price', value: e.target.value }))
        } else {
            // dispatch(updateSaleInfo({ field: 'price', value: '' }))
        }
    }

    return (
        <div className={`panel ${style['fixed-price']}`}>
            <div className="panel__title">{t('FIXED_PRICE')}</div>
            <div className={``}>
                <div className="form-group">
                    <div className="input-group">
                        <FormControl
                            type="text"
                            min={0}
                            onChange={onChange}
                            value={salePrice}
                        />
                        <span className="input-group-text">{basePrice}</span>
                    </div>
                    <span className="error-message">{t(error.price)}</span>
                </div>
            </div>
        </div>
    )
}

export default FixPrice
