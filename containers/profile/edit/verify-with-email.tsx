import style from './style.module.scss'
import { Button, Form, FormControlProps } from 'react-bootstrap'
import userServices from '@/services/user'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTransHook } from '@/locales/hooks'

interface IVerifyWithEmail {
    label: string
    textBottom?: string
    verified?: boolean
    email?: string
    beforceEmail?: string
}

const VerifyWithEmail: React.FC<FormControlProps & IVerifyWithEmail> = ({
    label,
    textBottom,
    verified = false,
    email,
    beforceEmail,
    ...rest
}) => {
    const { t } = useTransHook()
    const [isLoading, setLoading] = useState(false)
    async function verifyEmail() {
        if (
            isLoading ||
            !email ||
            !!verified ||
            !beforceEmail ||
            email !== beforceEmail
        ) {
            return
        }

        try {
            setLoading(true)

            if (!email) return

            const res = await userServices.verifyEmail(email.trim())

            if (!res || !(res.status >= 200 && res.status <= 299)) {
                toast.error(t('LABEL_EMAIL_ERROR'))
                return
            }

            toast.success(t('LABEL_EMAIL_SUCCESS'))
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={`${style.field} ${style.field__email} ${rest.className}`}
        >
            <label className={style.field__label + ' mb-2'}>{label}</label>
            <div className={style.field__input}>
                <Form.Control {...rest} />
                {!rest.readOnly && (
                    <Button
                        className={style.btn}
                        onClick={verifyEmail}
                        disabled={
                            isLoading ||
                            !!verified ||
                            !email?.trim().length ||
                            beforceEmail !== email
                        }
                    >
                        {verified
                            ? t('BTN_EMAIL_APPROVED')
                            : t('BTN_EMAIL_REQUEST')}
                    </Button>
                )}
            </div>
            <Form.Text>{textBottom}</Form.Text>
        </div>
    )
}

export default VerifyWithEmail
