import React, { useState, useRef } from 'react'
import { useTransHook } from '@/locales/hooks'
import { Button, Overlay, Tooltip } from 'react-bootstrap'

const CopyButton = ({ value }: { value: string }) => {
    const { t } = useTransHook()
    const [show, setShow] = useState(false)
    const target = useRef(null)
    const onCopy = () => {
        navigator.clipboard.writeText(value)

        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }
    return (
        <>
            <Button
                ref={target}
                className="text-btn--01"
                onClick={onCopy}
                disabled={!value}
            >
                {t('COLLECTION_BTN_COPY')}
            </Button>

            <Overlay target={target.current} show={show} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        {t('COPIED')}
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}

export default CopyButton
