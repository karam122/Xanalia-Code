import Modal from '@/components/ui/modals'
import { useTransHook } from '@/locales/hooks'
import Loading from '../../loading'
import styles from './style.module.scss'

interface IModalTransactionPending {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    keyMessage?: string
}
export const idModalTransactionPending = 'modal-transaction-pending'

const ModalTransactionPending = ({
    keyMessage = 'TRANSACTION_PENDING_CONTENT',
    open,
    setOpen,
}: IModalTransactionPending) => {
    const { t } = useTransHook()
    return (
        <Modal
            id={idModalTransactionPending}
            isVisible={open}
            setVisible={setOpen}
            title={t('TRANSACTION_PENDING_TITLE')}
            closeButton={false}
            closeOutSide={false}
            classHeader={styles['header-center']}
            classBody={styles['modal-body']}
        >
            <Loading />
            <div
                className={`${styles['transaction-pending__content']} text-body--large-01`}
            >
                {t(keyMessage)}
            </div>
        </Modal>
    )
}

export default ModalTransactionPending
