import userServices from '@/services/user'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import style from './style.module.scss'
import SVGTick from '@/public/svgs/check.svg'
import SVGCross from '@/public/svgs/cross.svg'
import { useTransHook } from '@/locales/hooks'

export default function AcceptEmailVerify() {
    const { t } = useTransHook()
    const router = useRouter()
    const { token } = router.query
    const [status, setStatus] = useState<
        'loading' | 'success' | 'fall' | undefined
    >('loading')

    async function verifyEmail() {
        const accessToken =
            token || new URL(location.href).searchParams.get('token')

        if (!accessToken) {
            router.push('/')
            return
        }

        setStatus('loading')

        try {
            const rest = await userServices.acceptVerifyEmail(
                accessToken as string,
            )
            if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
                setStatus('fall')
                return
            }

            setStatus('success')
        } catch (error) {
            setStatus('fall')
        }
    }

    useEffect(() => {
        verifyEmail()
    }, [])

    return (
        <Container fluid className={style.page}>
            <div className={style.card}>
                <div className={style.status}>
                    {status === 'loading' && <Spinner animation="border" />}
                    {status === 'success' && <SVGTick />}
                    {status === 'fall' && <SVGCross />}
                </div>

                {status === 'loading' && (
                    <>
                        <h5>{t('VERIFY_EMAIL_LOADING_TITLE')}</h5>
                        <p>{t('VERIFY_EMAIL_LOADING_SUBTITLE')}</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <h5>{t('VERIFY_EMAIL_SUCCESS_TITLE')}</h5>
                        <p>{t('VERIFY_EMAIL_SUCCESS_SUBTITLE')}</p>
                    </>
                )}

                {status === 'fall' && (
                    <>
                        <h5>{t('VERIFY_EMAIL_FAIL_TITLE')}</h5>
                        <p>{t('VERIFY_EMAIL_FAIL_SUBTITLE')}</p>
                    </>
                )}
            </div>
        </Container>
    )
}
