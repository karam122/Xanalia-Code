import useValidate from '@/hooks/useValidate'
import { useTransHook } from '@/locales/hooks'
import React from 'react'
import { FormControl, FormSelect } from 'react-bootstrap'
import style from './style.module.scss'
import Fee from './fee'

interface Props {
    fixPrice: string
    basePrice: number
    error: string
    currencies: any[]
    // eslint-disable-next-line no-unused-vars
    onChangeFixPrice: (value: any) => void
}
// eslint-disable-next-line no-unused-vars
const FixPrice = ({
    error,
    fixPrice,
    basePrice,
    onChangeFixPrice,
    currencies,
}: Props) => {
    const { validateNumber } = useValidate()

    const { t } = useTransHook()

    const onChange = (e: any) => {
        onChangeFixPrice({
            field: [e.target.name],
            value: e.target.value,
        })
    }

    const onChangePrice = (e: any) => {
        const { name, value } = e.target
        if (validateNumber(value).status) {
            onChangeFixPrice({
                field: name,
                value: value,
            })
        }
    }

    return (
        <div className={`panel ${style['fixed-price']}`}>
            <div className="panel__title">{t('FIXED_PRICE')}</div>
            <div className={``}>
                <div className="form-group">
                    <div className="input-group">
                        <FormControl
                            type="string"
                            min={0}
                            name="fixedPrice"
                            onChange={onChangePrice}
                            value={fixPrice}
                            // value={salePrice}
                        />
                        <FormSelect
                            value={basePrice}
                            className={style['basePrice-select']}
                            name="basePrice"
                            onChange={onChange}
                        >
                            {currencies.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.tokenName}
                                </option>
                            ))}
                        </FormSelect>
                    </div>
                    <span className="error-message">{t(error)}</span>
                    <Fee />
                </div>
            </div>
        </div>
    )
}

export default FixPrice
