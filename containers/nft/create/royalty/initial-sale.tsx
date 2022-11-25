import { useTransHook } from '@/locales/hooks'
import { FormControl, InputGroup } from 'react-bootstrap'
import styles from './style.module.scss'

const InitialSale = () => {
    const { t } = useTransHook()
    return (
        <>
            <div className="panel__title">{t('INITIAL_SALE')}</div>
            <div className={`${styles['initial-sale-container']} `}>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('MEMO')}</div>
                    </div>
                    <div className="form-input">
                        <FormControl type="text" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('ADDRESS')}</div>
                    </div>
                    <div className="form-input">
                        <FormControl type="text" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('ALLOCATION')}</div>
                    </div>
                    <InputGroup className="form-input-group">
                        <FormControl type="text" />
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                </div>
            </div>
        </>
    )
}

export default InitialSale
