import { useTransHook } from '@/locales/hooks'
import styles from './style.module.scss'
const tickAction = '/svgs/tick-action.svg'

interface IAgreeCheckbox {
    tick: boolean
    // eslint-disable-next-line no-unused-vars
    setTick: (val: boolean) => void
}

const AgreeCheckbox = ({ tick, setTick }: IAgreeCheckbox) => {
    const { t } = useTransHook()
    return (
        <div className={styles['agree-checkbox']}>
            <div
                className={`${styles['agree-checkbox__tick']} ${
                    tick ? styles['agree-checkbox__tick--show'] : ''
                }`}
                onClick={() => setTick(!tick)}
            >
                {tick && <img src={tickAction} alt="tick-action-alt" />}
            </div>
            <div className={styles['agree-checkbox__title']}>
                <span className="text-body--large-02">
                    {t('AGREE_CONFIRM')}
                </span>{' '}
                <a
                    rel="noreferrer"
                    href="https://cdn.xanalia.com/XANALIATerms&Condition.pdf"
                    target={'_blank'}
                    className="text-body--large-03"
                >
                    {t('TERM_SERVICE')}
                </a>
            </div>
        </div>
    )
}

export default AgreeCheckbox
