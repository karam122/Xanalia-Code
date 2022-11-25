import Modal from '@/components/ui/modals'
import userServices, { IUserData } from '@/services/user'
import validation from '@/utils/validation'
import React, { useState } from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import style from './style.module.scss'
import FieldComponent from './field-component'
import SVGInfor from '@/public/svgs/icon-about-sidebar.svg'
import SVGSubmitted from '@/public/svgs/submitted.svg'
import { useTransHook } from '@/locales/hooks'

export default function SectionArtist({ userData }: { userData?: IUserData }) {
    const { t } = useTransHook()
    const [isModalConfirm, setModalConfirm] = useState(false)
    const [isModalSuccess, setModalSuccess] = useState(false)

    const [isLoading, setLoading] = useState(false)
    const [dataForm, setDataForm] = useState({
        question1: undefined as undefined | string,
        question12: undefined as undefined | string,
        question13: undefined as undefined | string,
        question2: undefined as undefined | string,
    })
    const [dataValidate, setDataValidate] = useState({
        question1: undefined as undefined | string,
        question12: undefined as undefined | string,
        question13: undefined as undefined | string,
        question2: undefined as undefined | string,
    })

    async function submit() {
        if (isLoading || !validate()) return

        try {
            setLoading(true)
            const answerOne: string[] = []
            ;[
                dataForm.question1,
                dataForm.question12,
                dataForm.question13,
            ].forEach((link) => {
                if (link && link.length > 0) answerOne.push(link)
            })
            const rest = await userServices
                .requestArtist(
                    JSON.stringify(answerOne),
                    dataForm.question2 || '',
                )
                .catch(() => {})
            if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
                toast.error(t('USER_ERROR_MESSAGE'))
                return
            }
            setModalConfirm(false)
            setModalSuccess(true)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    function validate() {
        let result = true
        const ms = { ...dataValidate }

        if (
            validation.requied(dataForm.question1) &&
            !validation.link(dataForm.question1)
        ) {
            ms.question1 = t('ARTIST_ERROR_LINK')
            result = false
        }

        if (
            validation.requied(dataForm.question12) &&
            !validation.link(dataForm.question12)
        ) {
            ms.question12 = t('ARTIST_ERROR_LINK')
            result = false
        }

        if (
            validation.requied(dataForm.question13) &&
            !validation.link(dataForm.question13)
        ) {
            ms.question13 = t('ARTIST_ERROR_LINK')
            result = false
        }
        if (!validation.requied(dataForm.question2)) {
            ms.question2 = t('ARTIST_ERROR_DESCRIPTION')
            result = false
        }
        setDataValidate({ ...ms })
        return result
    }

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img
                            src="/svgs/menu-icon-2.svg"
                            draggable="false"
                            loading="lazy"
                            className={style.whitelist_icon}
                        />{' '}
                        {t('ARTIST_LABEL')}
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className={style.artist}>
                            {/* <h4 className="bold">{t('ARTIST_LABEL')}</h4> */}
                            <p>{t('ARTIST_DESCRIPTION_LINE_1')}</p>

                            <p>{t('ARTIST_DESCRIPTION_LINE_2')}</p>

                            <i>
                                <SVGInfor /> {t('ARTIST_NOTE')}
                            </i>

                            <Button
                                onClick={() =>
                                    toast.info(`${t('COMING_SOON')}`)
                                }
                                className={`${style.btn}`}
                            >
                                {userData!.role === 4
                                    ? t('ARTIST_BTN_APPROVED')
                                    : t('ARTIST_BTN_REQUEST')}
                            </Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Modal
                closeButton
                isVisible={isModalConfirm}
                setVisible={(val) => setModalConfirm(val)}
                classBody={style['modal-body']}
                dialogClassName={style['modal-dialog']}
            >
                <h3 className="bold">{t('ARTIST_MODAL_TITLE')}</h3>

                <p>{t('ARTIST_MODAL_DESCRIPTION')}</p>

                <label>
                    <h4>{t('LABEL_USERNAME')}</h4>
                    <p className="text-line">{userData?.userName}</p>
                </label>

                <label>
                    <h4>{t('WALLET_ADDRESS')}</h4>
                    <p className="text-line">{userData?.userWallet.address}</p>
                </label>

                <label>
                    <h4>{t('LABEL_EMAIL')}</h4>
                    <p className="text-line">{userData?.email}</p>
                </label>

                {!!userData?.instagramSite && (
                    <label>
                        <h4>{t('LABEL_INSTAGRAM')}</h4>
                        <p className="text-line">{userData.instagramSite}</p>
                    </label>
                )}

                {!!userData?.twitterSite && (
                    <label>
                        <h4>{t('LABEL_TWITTER')}</h4>
                        <p className="text-line">{userData.twitterSite}</p>
                    </label>
                )}

                <hr />

                <h4
                    className="mb-lg-3 mb-2"
                    dangerouslySetInnerHTML={{
                        __html: t('ARTIST_MODAL_QUESTION_1'),
                    }}
                />

                <FieldComponent
                    placeholder={t('ARTIST_MODAL_QUESTION_1_DESCRIPTION')}
                    textBottom={dataValidate.question1}
                    defaultValue={dataForm.question1}
                    onChange={(eve) => {
                        setDataForm({
                            ...dataForm,
                            question1: eve.target.value,
                        })
                        setDataValidate({
                            ...dataValidate,
                            question1: undefined,
                        })
                    }}
                />
                <FieldComponent
                    placeholder={t('ARTIST_MODAL_QUESTION_1_DESCRIPTION')}
                    textBottom={dataValidate.question12}
                    defaultValue={dataForm.question12}
                    onChange={(eve) => {
                        setDataForm({
                            ...dataForm,
                            question12: eve.target.value,
                        })
                        setDataValidate({
                            ...dataValidate,
                            question12: undefined,
                        })
                    }}
                />
                <FieldComponent
                    placeholder={t('ARTIST_MODAL_QUESTION_1_DESCRIPTION')}
                    textBottom={dataValidate.question13}
                    defaultValue={dataForm.question13}
                    onChange={(eve) => {
                        setDataForm({
                            ...dataForm,
                            question13: eve.target.value,
                        })
                        setDataValidate({
                            ...dataValidate,
                            question13: undefined,
                        })
                    }}
                />

                <h4
                    className="mt-lg-5 mt-4 mb-2 mb-lg-3"
                    dangerouslySetInnerHTML={{
                        __html: t('ARTIST_MODAL_QUESTION_2'),
                    }}
                />
                <FieldComponent
                    style={{ height: '160px' }}
                    as="textarea"
                    placeholder={t('ARTIST_MODAL_QUESTION_2_DESCRIPTION')}
                    textBottom={dataValidate.question2}
                    defaultValue={dataForm.question2}
                    onChange={(eve) => {
                        setDataForm({
                            ...dataForm,
                            question2: eve.target.value,
                        })
                        setDataValidate({
                            ...dataValidate,
                            question2: undefined,
                        })
                    }}
                />

                <div className={style['modal-action']}>
                    <Button
                        className={style.btn}
                        onClick={submit}
                        disabled={isLoading}
                    >
                        {t('ARTIST_MODAL_BTN_SUBMIT')}
                    </Button>
                </div>
            </Modal>

            <Modal
                closeButton
                isVisible={isModalSuccess}
                setVisible={(val) => setModalSuccess(val)}
                classBody={style['modal-body']}
                dialogClassName={style['modal-dialog']}
            >
                <div className={style.sm}>
                    <SVGSubmitted className={style.sm__svg} />

                    <h3 className={style.sm__title}>
                        {t('ARTIST_MODAL_SUCCESS_TITLE')}
                    </h3>

                    <p className={style.sm__description}>
                        {t('ARTIST_MODAL_SUCCESS_DESCRIPTION')}
                    </p>
                </div>
            </Modal>
        </>
    )
}
