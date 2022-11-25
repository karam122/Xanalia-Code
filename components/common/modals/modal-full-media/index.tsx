import React, { ReactNode } from 'react'
import { Modal as BModal } from 'react-bootstrap'
import style from './style.module.scss'
import IconX from '@/public/svgs/circle-x.svg'

type Props = {
    children: ReactNode
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
}

const ModalFull = ({ children, open, setOpen }: Props) => {
    return (
        <BModal
            animation={false}
            size="xl"
            show={open}
            className={''}
            onHide={() => setOpen(false)}
            dialogClassName={`${style['view-full-dialog']}`}
            closeButton={true}
            // backdropClassName={`${style['custom-modal__backdrop']} ${
            //     rest.backdropClassName || ''
            // }`}
            // backdrop={!closeOutSide ? 'static' : true}
            centered={true}
        >
            <IconX
                className={style['close-icon']}
                onClick={() => setOpen(false)}
            />

            {children}
        </BModal>
    )
}

export default ModalFull
