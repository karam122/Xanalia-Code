import { useTransHook } from '@/locales/hooks'
import { FormControl, InputGroup, FormSelect } from 'react-bootstrap'
import styles from './style.module.scss'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material'
import useValidate from '@/hooks/useValidate'
import Fee from './fee'

interface Props {
    closeTime: number
    openTime: number
    startPrice: string
    basePrice: number
    currencies: any[]
    error: {
        closeTime: string
        startTime: string
        startPrice: string
    }

    onChange: ({}: { field: string; value: string | object | number }) => void
}
const TimeAuction = ({
    closeTime,
    startPrice,
    openTime,
    error,
    basePrice,
    onChange,
    currencies,
}: Props) => {
    console.log(
        '🚀 ~ file: time-auction.tsx ~ line 31 ~ currencies',
        currencies,
    )
    const { t } = useTransHook()
    const { validateNumber } = useValidate()

    const onChangeTime = (name: string, e: any) => {
        onChange({
            field: name,
            value: new Date(e).getTime(),
        })
    }

    const onChangeMinPrice = (e: any) => {
        const { name, value } = e.target
        if (validateNumber(value).status) {
            onChange({
                field: name,
                value: value,
            })
        }
    }

    const onChangeBasePrice = (e: any) => {
        onChange({
            field: 'basePrice',
            value: Number(e.target.value),
        })
    }

    return (
        <div className="panel">
            <div className="panel__title">{t('TIME_AUCTION')}</div>
            <div className={`${styles['time-auction-container']} `}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="form-group">
                        <div className="form-title">
                            <div className="main-title">{t('OPEN_TIME')}</div>
                        </div>
                        <div className="form-input datetime-picker">
                            <MobileDateTimePicker
                                onChange={(e) => onChangeTime('startTime', e)}
                                value={openTime}
                                minDateTime={Date.now()}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        inputProps={{
                                            className: 'form-control',
                                        }}
                                        {...params}
                                    />
                                )}
                            />
                            <span className="error-message">
                                {t(error?.startTime)}
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-title">
                            <div className="main-title">{t('CLOSE_TIME')}</div>
                        </div>
                        <div className="form-input datetime-picker">
                            <MobileDateTimePicker
                                minDateTime={Date.now()}
                                onChange={(e) => onChangeTime('closeTime', e)}
                                value={closeTime}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        inputProps={{
                                            className: 'form-control',
                                        }}
                                        {...params}
                                    />
                                )}
                            />
                            {/* <FormControl type="datetime" value={Date.now()}/> */}
                            <span className="error-message">
                                {t(error?.closeTime)}
                            </span>
                        </div>
                    </div>
                </LocalizationProvider>
                {/* <div className="form-group"></div> */}
                <div
                    className="form-group"
                    style={{ gridColumn: '1 / span 2' }}
                >
                    <div className="form-title">
                        <div className="main-title">{t('MIN_PRICE')}</div>
                    </div>
                    <InputGroup className="form-input-group">
                        <FormControl
                            value={startPrice}
                            type="text"
                            name="startPrice"
                            onChange={onChangeMinPrice}
                        />
                        {/* <InputGroup.Text>{basePrice}</InputGroup.Text> */}
                        <FormSelect
                            value={basePrice}
                            className={styles[`basePrice-select`]}
                            name="basePrice"
                            onChange={onChangeBasePrice}
                        >
                            {currencies.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.tokenName}
                                </option>
                            ))}
                        </FormSelect>
                    </InputGroup>
                    <span className="error-message">
                        {t(error?.startPrice)}
                    </span>
                    <Fee />
                </div>
            </div>
        </div>
    )
}

export default TimeAuction
