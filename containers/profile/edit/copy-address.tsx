import style from './style.module.scss'
import SVGCopyAlt from '@/public/svgs/copy-alt.svg'
import copyTextUtil from '@/utils/copy'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'
import { useState } from 'react'

export default function CopyAddress({ address }: { address: any }) {
    const { t } = useTransHook()
    const [isCopied, setCopied] = useState('CLICK_TO_COPY')

    function copyText(text: string) {
        copyTextUtil(text).then(() => {
            setCopied('ADDRESS_COPIED')
            setTimeout(() => setCopied('CLICK_TO_COPY'), 3000)
        })
    }
    return (
        <div className={style.field__address}>
            <label className={style.field__label}>{t('WALLET_ADDRESS')}</label>
            <div className={style.field__input}>
                <input
                    type="text"
                    defaultValue={address}
                    placeholder="Your address"
                    readOnly
                />
                <OverlayTrigger
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                        <Popover>
                            <div className={style.tooltip}>{t(isCopied)}</div>
                        </Popover>
                    }
                >
                    <span onClick={() => copyText(String(address))}>
                        <SVGCopyAlt />
                    </span>
                </OverlayTrigger>
            </div>
        </div>
    )
}
