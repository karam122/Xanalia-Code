import { useTransHook } from '@/locales/hooks'
import { FormControl, InputGroup } from 'react-bootstrap'
import styles from './style.module.scss'

const SecondaryMarket = () => {
    const { t } = useTransHook()
    return (
        <div className={styles['panel-secondary-market']}>
            <div className="panel__title">{t('SECONDARY_MARKET')}</div>
            <div className={`${styles['secondary-market-container']} `}>
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
        </div>
    )
}

export default SecondaryMarket
