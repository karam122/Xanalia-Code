import { useTransHook } from '@/locales/hooks'
import { FormControl, InputGroup } from 'react-bootstrap'
import styles from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectNetworkInfo, selectSaleAutionInfo } from '@/store/nft/selectors'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material'
import { updateSaleInfo } from '@/store/nft/createSlice'
import { selectError } from '@/store/nft/selectors'
import useValidate from '@/hooks/useValidate'
const MIN20 = 20 * 60 * 1000
const MIN5 = 5 * 60 * 1000
import { useEffect } from 'react'

const TimeAuction = () => {
    const { t } = useTransHook()
    const aution = useSelector(selectSaleAutionInfo)
    const { basePrice } = useSelector(selectNetworkInfo)
    const error = useSelector(selectError('sale')) as {
        price: string
        openTime: string
        closeTime: string
        minPrice: string
    }
    const { validateNumber } = useValidate()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            updateSaleInfo({
                field: 'aution',
                value: {
                    ...aution,
                    openTime: new Date().getTime() + MIN5,
                    closeTime: new Date().getTime() + MIN20,
                },
            }),
        )
    }, [])

    const onChangeTime = (name: string, e: any) => {
        console.log(new Date(e).getTime())
        dispatch(
            updateSaleInfo({
                field: 'aution',
                value: { ...aution, [name]: new Date(e).getTime() },
            }),
        )
    }

    const onChangeMinPrice = (e: any) => {
        const { name, value } = e.target
        if (validateNumber(value).status) {
            dispatch(
                updateSaleInfo({
                    field: 'aution',
                    value: { ...aution, [name]: value },
                }),
            )
        }
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
                                onChange={(e) => onChangeTime('openTime', e)}
                                value={aution.openTime}
                                minDateTime={Date.now() + MIN5}
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
                                {t(error?.openTime)}
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-title">
                            <div className="main-title">{t('CLOSE_TIME')}</div>
                        </div>
                        <div className="form-input datetime-picker">
                            <MobileDateTimePicker
                                minDateTime={Date.now() + MIN20}
                                onChange={(e) => onChangeTime('closeTime', e)}
                                value={aution.closeTime}
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
                <div className="form-group"></div>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('MIN_PRICE')}</div>
                    </div>
                    <InputGroup className="form-input-group">
                        <FormControl
                            type="string"
                            name="minPrice"
                            onChange={onChangeMinPrice}
                            value={aution.minPrice}
                        />
                        <InputGroup.Text>{basePrice}</InputGroup.Text>
                    </InputGroup>
                    <span className="error-message">{t(error?.minPrice)}</span>
                </div>
            </div>
        </div>
    )
}

export default TimeAuction
