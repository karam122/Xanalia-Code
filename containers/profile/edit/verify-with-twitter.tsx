import style from './style.module.scss'
import SVGTwitter from '@/public/svgs/twitter.svg'
import { Button, Form, FormControlProps } from 'react-bootstrap'
import userServices from '@/services/user'
import { useTransHook } from '@/locales/hooks'

interface IVerifyWithTwitter {
    label: string
    description?: string
    textBottom?: string
    twitter?: string
    beforceTwitter?: string
    verified: boolean
}

const VerifyWithTwitter: React.FC<FormControlProps & IVerifyWithTwitter> = ({
    label,
    description,
    textBottom,
    twitter,
    beforceTwitter,
    verified,
    ...rest
}) => {
    const { t } = useTransHook()
    async function clickConnect() {
        if (
            !window ||
            !twitter ||
            !!verified ||
            !twitter?.trim().length ||
            beforceTwitter !== twitter
        )
            return
        userServices.verifyTwitter()
    }

    return (
        <div
            className={`${style.field} ${style.field__twitter} ${rest.className}`}
        >
            <label className={style.field__label}>{label}</label>
            {/* <label className={style.field__label}>Social Connections</label> */}
            <span>{description}</span>

            <div
                className={`${style.field__twitter__input} ${style.field__input}`}
            >
                <SVGTwitter />

                <Form.Control {...rest} />

                {/* {userData?.twitterSite ? (
                    <OverlayTrigger overlay={<Tooltip>Disconnect</Tooltip>}>
                        <Button
                            className={`${style.btn} ${style.btn__outline} ${style.btn__disconnect_twitter}`}
                            onClick={clickDisconnect}
                        >
                            <SVGClose /> {userData.twitterSite}
                        </Button>
                    </OverlayTrigger>
                ) : (
                )} */}
                {!rest.readOnly && (
                    <Button
                        className={style.btn}
                        onClick={clickConnect}
                        disabled={
                            !twitter ||
                            !!verified ||
                            !twitter?.trim().length ||
                            beforceTwitter !== twitter
                        }
                    >
                        {verified
                            ? t('BTN_TWITTER_APPROVED')
                            : t('BTN_TWITTER_REQUEST')}
                    </Button>
                )}
            </div>
            <Form.Text>{textBottom}</Form.Text>
        </div>
    )
}

export default VerifyWithTwitter
