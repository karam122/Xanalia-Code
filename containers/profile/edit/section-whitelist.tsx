import Modal from '@/components/ui/modals'
import { getSampleChain } from '@/constants/chain'
import userServices, { IUserData, IStatusData } from '@/services/user'
import { selectNetworksList } from '@/store/network/selectors'
import { selectWallet } from '@/store/wallet/selectors'
import React, { useEffect, useState } from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import style from './style.module.scss'
import SVGInfor from '@/public/svgs/icon-about-sidebar.svg'
import SVGSubmitted from '@/public/svgs/submitted.svg'
import { useTransHook } from '@/locales/hooks'

export default function SectionWhitelist({
    userData,
}: {
    userData?: IUserData
}) {
    const { t } = useTransHook()
    const [isModalConfirm, setModalConfirm] = useState(false)
    const [isModalSuccess, setModalSuccess] = useState(false)
    const { chainId } = useSelector(selectWallet)
    const networkList = useSelector(selectNetworksList)
    const [isLoading, setLoading] = useState(false)
    // The whitelist variable contains the networks the admin has accepted
    const [whiteList, setWhiteList] = useState<Array<number>>([])

    async function submit() {
        if (isLoading) return

        try {
            setLoading(true)
            const network = networkList.find((obj) => obj.chainId === chainId)
            if (!network) return
            const rest = await userServices
                .requestWhitelist(network.id)
                .catch(() => {})
            if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
                toast.error(t('WHITELIST_MODAL_ERROR'))
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

    async function getWhitelist() {
        if (!userData?.userWallet.address) return
        const rest = await userServices.getWhitelistByAddress(
            userData.userWallet.address,
        )

        if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
            setWhiteList([])
            return
        }

        const chains: number[] = []
        rest.data?.forEach((obj) => {
            const network = networkList.find((e) => e.id === obj.networkId)
            if (!network) return
            if (obj.status === IStatusData.APPROVED)
                chains.push(network.chainId)
        })
        setWhiteList(chains)
    }

    useEffect(() => {
        getWhitelist()
    }, [userData?.userWallet.address])

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img
                            src="/svgs/menu-icon-2.svg"
                            draggable="false"
                            loading="lazy"
                            className={style.whitelist_icon}
                        />{' '}
                        {t('WHITELIST_LABEL')}
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className={style.whitelist}>
                            {/* <h4 className="bold">Apply for Whitelist</h4> */}
                            <p>{t('WHITELIST_DESCRIPTION_LINE_1')}</p>

                            <p>{t('WHITELIST_DESCRIPTION_LINE_2')}</p>

                            <i>
                                <SVGInfor /> {t('WHITELIST_NOTE')}
                            </i>

                            <Button
                                disabled={
                                    !userData ||
                                    !(
                                        userData.userName &&
                                        userData.email &&
                                        !!userData.emailVerified &&
                                        !whiteList.includes(Number(chainId))
                                    )
                                }
                                onClick={() => setModalConfirm(true)}
                                className={`${style.btn}`}
                            >
                                {whiteList.includes(Number(chainId))
                                    ? t('WHITELIST_BTN_APPROVED')
                                    : t('WHITELIST_BTN_REQUEST')}
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
                <h3 className="bold">{t('WHITELIST_MODAL_TITLE')}</h3>

                <p>{t('WHITELIST_MODAL_DESCRIPTION')}</p>

                <label>
                    <h4>{t('LABEL_USERNAME')}</h4>
                    <p className="text-line">{userData?.userName}</p>
                </label>

                <label>
                    <h4>{t('WALLET_ADDRESS')}</h4>
                    <p className="text-line">{userData?.userWallet.address}</p>
                </label>

                <label>
                    <h4>{t('WHITELIST_MODAL_LABEL_NETWORK')}</h4>
                    <p className="text-line">
                        {getSampleChain(chainId as any)?.chainName}
                    </p>
                </label>

                <label>
                    <h4>{t('LABEL_EMAIL')}</h4>
                    <p className="text-line">{userData?.email}</p>
                </label>

                {!!userData?.twitterSite && (
                    <label>
                        <h4>{t('LABEL_TWITTER')}</h4>
                        <p className="text-line">{userData.twitterSite}</p>
                    </label>
                )}

                <div className={style['modal-action']}>
                    <Button
                        className={style.btn}
                        onClick={submit}
                        disabled={isLoading}
                    >
                        {t('WHITELIST_MODAL_BTN_SUBMIT')}
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
                        {t('WHITELIST_MODAL_SUCCESS_TITLE')}
                    </h3>

                    <p className={style.sm__description}>
                        {t('WHITELIST_MODAL_SUCCESS_DESCRIPTION')}
                    </p>
                </div>
            </Modal>
        </>
    )
}
