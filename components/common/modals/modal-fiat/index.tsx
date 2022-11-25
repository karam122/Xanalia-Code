import Modal from '@/components/ui/modals'
import { useTransHook } from '@/locales/hooks'
import { setModalFiat } from '@/store/fiat/fiatSlice'
import { selectFiat } from '@/store/fiat/selectors'
import { selectDataUser } from '@/store/user/selectors'
// import { selectWallet } from '@/store/wallet/selectors'
import React, { useEffect, useRef, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'

export default function ModalFiat() {
    const elIframe = useRef<null | HTMLIFrameElement>(null)
    const [error, setError] = useState<string | undefined>(undefined)

    const { t } = useTransHook()
    const dispatch = useDispatch()
    const { Moralis } = useMoralis()
    const { isModal } = useSelector(selectFiat)
    // const { chainId } = useSelector(selectWallet)
    const userData = useSelector(selectDataUser)

    async function onVisible() {
        try {
            const fiat = Moralis.Plugins.fiat

            if (typeof fiat === 'undefined') {
                return setError('FIAT_NOT_INSTALLED')
            }
            const iframe = elIframe.current
            // const chain = getSampleChain(chainId!)
            const response = await fiat.buy(
                {
                    // coin: chain?.nativeCurrency.symbol || '',
                    receiver: userData?.userWallet.address || '',
                },
                { disableTriggers: true },
            )

            if (iframe && response?.data) {
                iframe.src = response.data + '&supportSell=false'
            } else {
                setError('FIAT_NO_DATA_RETURNED')
            }
        } catch (error) {
            console.error(error)
            setError('FIAT_ERROR')
        }
    }

    function onHidden() {
        dispatch(setModalFiat(false))
        setError(undefined)
        const iframe = elIframe.current
        iframe?.src === undefined
    }

    useEffect(() => {
        isModal ? onVisible() : onHidden()
    }, [isModal])

    return (
        <Modal
            isVisible={isModal}
            setVisible={(val) => dispatch(setModalFiat(val))}
            classBody={style['modal']}
            dialogClassName={style['dialog']}
            closeButton={true}
            closeOutSide={false}
        >
            {error ? (
                <div className={style['error-panel']}>{t(error)}</div>
            ) : (
                <div className={style['iframe']}>
                    <iframe
                        className={style['iframe']}
                        ref={elIframe}
                        src=""
                        frameBorder="0"
                    />
                </div>
            )}
        </Modal>
    )
}
