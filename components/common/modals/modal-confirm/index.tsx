import Modal from '@/components/ui/modals'
import { useTransHook } from '@/locales/hooks'
import { Button } from 'react-bootstrap'
const ConfirmIcon = '/images/confirm-icon.png'
import styles from './style.module.scss'

interface IModalConfirm {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    content: string
    callback: () => void
}

interface IModalBody {
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    content: string
    callback: () => void
}

const ModalBody = ({ setOpen, content, callback }: IModalBody) => {
    const { t } = useTransHook()

    const handleConfirm = () => {
        setOpen(false)
        callback()
    }

    return (
        <div className={styles['modal-body']}>
            <img src={ConfirmIcon} alt="confirm-icon-alt" />
            <div className={`${styles['confirm-title']} heading--3`}>
                {t('CONFIRM_TITLE')}
            </div>
            <div className="text-body--large-01">{content}</div>
            <div className={'modal-action'}>
                <Button
                    size="lg"
                    className="btn-loading"
                    variant="outline-primary"
                    onClick={() => setOpen(false)}
                >
                    {t('CANCEL')}
                </Button>
                <Button
                    size="lg"
                    className="btn-loading"
                    variant="primary"
                    onClick={handleConfirm}
                >
                    {t('CONFIRM')}
                </Button>
            </div>
        </div>
    )
}

const ModalConfirm = ({ open, setOpen, content, callback }: IModalConfirm) => {
    return (
        <Modal
            isVisible={open}
            setVisible={setOpen}
            title={''}
            closeButton={true}
            closeOutSide={false}
            classHeader={''}
            classBody={''}
        >
            <ModalBody
                setOpen={setOpen}
                content={content}
                callback={callback}
            />
        </Modal>
    )
}

export default ModalConfirm
