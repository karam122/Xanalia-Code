import { useTransHook } from '@/locales/hooks'
import InitialSale from './initial-sale'
import SecondaryMarket from './secondary-market'

const Royalty = () => {
    const { t } = useTransHook()
    return (
        <div className="panel">
            <div className="panel__title">{t('ROYALITY')}</div>
            <InitialSale />
            <SecondaryMarket />
        </div>
    )
}

export default Royalty
