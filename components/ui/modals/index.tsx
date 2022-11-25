/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal as BModal, ModalProps } from 'react-bootstrap'
import style from './style.module.scss'
import IconX from '@/public/svgs/circle-x.svg'

interface IModal {
    isVisible: boolean
    setVisible: (val: boolean) => void
    title?: string | React.ReactNode
    closeButton?: boolean
    children: React.ReactNode
    closeOutSide?: boolean
    classHeader?: string
    classBody?: string
    centered?: boolean
}

export const toggleModal = (id: string) => {}

const Modal: React.FC<IModal & ModalProps> = ({
    isVisible,
    setVisible,
    title,
    closeButton = false,
    closeOutSide = true,
    children,
    classHeader,
    classBody,
    centered = true,
    ...rest
}) => {
    return (
        <BModal
            {...rest}
            show={isVisible}
            className={style['custom-modal']}
            onHide={() => setVisible(false)}
            dialogClassName={`${style['custom-modal__dialog']} ${
                rest.dialogClassName || ''
            }`}
            backdropClassName={`${style['custom-modal__backdrop']} ${
                rest.backdropClassName || ''
            }`}
            backdrop={!closeOutSide ? 'static' : true}
            centered={centered}
            // {...rest}
        >
            {title && (
                <BModal.Header
                    className={`${classHeader} ${style['custom-modal__header']}`}
                >
                    <div className="heading--4">{title}</div>
                    {closeButton && (
                        <IconX
                            className={style['custom-modal__close-header']}
                            onClick={() => setVisible(false)}
                        />
                    )}
                </BModal.Header>
            )}

            <BModal.Body
                className={`${classBody} ${style['custom-modal__body']}`}
            >
                {closeButton && !title && (
                    <IconX
                        className={style['custom-modal__close-body']}
                        onClick={() => setVisible(false)}
                    />
                )}
                {children}
            </BModal.Body>
        </BModal>
    )
}

export default Modal
