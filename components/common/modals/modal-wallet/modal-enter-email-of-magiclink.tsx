import Modal from '@/components/ui/modals'
import { useTransHook } from '@/locales/hooks'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import style from './style.module.scss'
import validationUtil from '@/utils/validation'

interface IModalEnterEmailOfMagicLink {
    isVisible: boolean
    // eslint-disable-next-line no-unused-vars
    setVisibleModal: (value: boolean) => void
    // eslint-disable-next-line no-unused-vars
    submit: (value: string) => void
}

export default function ModalEnterEmailOfMagicLink({
    isVisible,
    setVisibleModal,
    submit,
}: IModalEnterEmailOfMagicLink) {
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [validation, setValidation] = useState(false)
    const { t } = useTransHook()

    function validateEmail(email?: string) {
        return validationUtil.email(email)
    }

    function Submit() {
        if (!email || !validateEmail(email.trim())) return
        submit(email.trim())
    }

    useEffect(() => {
        setValidation(validateEmail(email?.trim()))
    }, [email])

    useEffect(() => {
        setEmail(undefined)
    }, [isVisible])

    return (
        <Modal isVisible={isVisible} setVisible={(val) => setVisibleModal(val)}>
            <div className={style['modal-email']}>
                <h2 className="bold heading--2-1">{t('LOGIN_WITH_EMAIL')}</h2>

                <Form.Control
                    autoFocus
                    type="email"
                    placeholder={t('EMAIL_ADDRESS')}
                    onChange={(eve: any) =>
                        setEmail(String(eve.target.value).trim())
                    }
                    onKeyDown={(eve: any) => {
                        if (eve.key === 'Enter') Submit()
                    }}
                />

                <Button disabled={!validation} onClick={Submit}>
                    {t('LOGIN_IN_SIGN_UP')}
                </Button>
            </div>
        </Modal>
    )
}
