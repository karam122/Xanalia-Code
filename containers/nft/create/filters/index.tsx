import { useTransHook } from '@/locales/hooks'
import { FormSelect } from 'react-bootstrap'
import styles from './style.module.scss'
import { royaltyOptions } from '@/constants/nft'
import { nftTypes } from '@/constants/nft'
import { useSelector, useDispatch } from 'react-redux'
import { selectError, selectFilterInfo } from '@/store/nft/selectors'
import { updateFilterInfo } from '@/store/nft/createSlice'
const Filters = () => {
    const { t } = useTransHook()
    const filter = useSelector(selectFilterInfo)
    const error = useSelector(selectError('filter')) as { nftType: string }

    const dispatch = useDispatch()
    const onChange = (e: any) => {
        const { name, value } = e.target

        dispatch(updateFilterInfo({ field: name, value: value }))
    }
    return (
        <div className={`panel`}>
            <div className="panel__title">{t('FILTERS')}</div>
            <div className={`${styles['filter-container']} `}>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('NFT_TYPES')}</div>
                    </div>
                    <div className="form-input">
                        <FormSelect
                            value={filter.nftType}
                            name="nftType"
                            onChange={onChange}
                        >
                            {nftTypes.map((item) => (
                                <option value={item.value} key={item.value}>
                                    {t(item.name)}
                                </option>
                            ))}
                        </FormSelect>
                        <span className="error-message">
                            {t(error.nftType)}
                        </span>
                    </div>
                </div>
                {/* <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('NFT_TYPES')}</div>
                    </div>
                    <div className="form-input">
                        <FormControl type="text" maxLength={150} />
                    </div>
                </div> */}
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('ROYALITY')}</div>
                    </div>
                    <div className="form-input">
                        <FormSelect
                            value={filter.royalty}
                            name="royalty"
                            onChange={onChange}
                        >
                            {royaltyOptions.map((item) => (
                                <option value={item.value} key={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </FormSelect>
                        <div className="main-title">
                            {t('PLATFORM_FEE_MSG')}
                        </div>
                    </div>
                </div>
                {/* <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('ATTACK')}</div>
                    </div>
                    <div className="form-input">
                        <FormControl type="text" maxLength={150} />
                    </div>
                </div> */}

                {/* <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('MOUTH')}</div>
                    </div>
                    <div className="form-input">
                        <FormControl type="text" maxLength={150} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('MOUTH')}</div>
                    </div>
                    <div className="form-input">
                        <FormSelect>
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </FormSelect>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Filters
