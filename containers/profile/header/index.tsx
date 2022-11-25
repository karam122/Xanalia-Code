import userServices, { IUserData } from '@/services/user'
import style from './style.module.scss'
import SVGPen from '@/public/svgs/pen.svg'
import SVGCopy from '@/public/svgs/copy-alt.svg'
import SVGClose from '@/public/svgs/fa-xmark.svg'
import SVGLink from '@/public/svgs/fi-br-link.svg'
import UserAvatar from '../avatar/user-avatar'
import { addressSplice } from '@/connect/utils'
import { HTMLAttributes, useState } from 'react'
import copyText from '@/utils/copy'
import { toast } from 'react-toastify'
import { OverlayTrigger, Popover, Spinner, Tooltip } from 'react-bootstrap'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import SOCKET_EVENTS from '@/constants/socket'
import { useTransHook } from '@/locales/hooks'

interface IUserHeader {
    userData: IUserData
    editMode: boolean
    onAvatarUpdated?: () => void
    onBannerUpdated?: () => void
}

const maxSize = 100 * 1000000

const UserHeader: React.FC<HTMLAttributes<HTMLDivElement> & IUserHeader> = ({
    userData,
    editMode,
    onAvatarUpdated,
    onBannerUpdated,
    ...rest
}) => {
    const [isLoading, setLoading] = useState(false)
    const [isCopied, setCopied] = useState('CLICK_TO_COPY')
    const { t } = useTransHook()

    function editPicture() {
        if (isLoading) return
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'

        try {
            input.onchange = async (eve) => {
                setLoading(true)
                const rest = eve.target as HTMLInputElement
                const file = rest.files ? rest.files[0] : undefined
                if (!file || !file.type.includes('image/')) return

                if (!(file.size <= maxSize)) {
                    toast.error(t('FILE_SIZE_OF_BANNER_USER'))
                    setLoading(false)
                    return
                }

                await userServices.updateBanner(file)
            }
            input.click()
        } catch (error) {
            console.error(error)
        } finally {
            input.remove()
        }
    }

    async function removePicture() {
        if (isLoading) return
        try {
            setLoading(true)
            const rest = await userServices.removeBanner()
            if (!(rest.status >= 200 && rest.status <= 299)) {
                if (onBannerUpdated) onBannerUpdated()
            }
        } catch (error) {
            console.error(error)
        }
    }

    function copyLinkProfile() {
        const { origin } = location
        copyText(origin + '/profile/' + userData.userWallet.address)
        setCopied('COPIED')
        setTimeout(() => setCopied('CLICK_TO_COPY'), 1500)
    }

    useSocketGlobal(
        SOCKET_EVENTS.userUpdateBanner,
        () => {
            if (onBannerUpdated) onBannerUpdated()
            setLoading(false)
        },
        false,
    )

    return (
        <div {...rest} className={`${style.header} ${rest.className}`}>
            <div className={style.banner}>
                <div className={style.g_action}>
                    {editMode && (
                        <>
                            {!!userData.banner ? (
                                <OverlayTrigger
                                    rootClose
                                    // placement="left-end"
                                    trigger={'click'}
                                    overlay={
                                        <Popover>
                                            <div className={style.option_edit}>
                                                <div onClick={editPicture}>
                                                    <SVGPen />{' '}
                                                    {t('EDIT_BANNER')}
                                                </div>
                                                <div onClick={removePicture}>
                                                    <SVGClose />{' '}
                                                    {t('REMOVE_BANNER')}
                                                </div>
                                            </div>
                                        </Popover>
                                    }
                                >
                                    <div className={style.action}>
                                        {isLoading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            <SVGPen />
                                        )}
                                    </div>
                                </OverlayTrigger>
                            ) : (
                                <div
                                    className={style.action}
                                    onClick={editPicture}
                                >
                                    {isLoading ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        <SVGPen />
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{t(isCopied)}</Tooltip>}
                    >
                        <div className={style.action} onClick={copyLinkProfile}>
                            <SVGLink />
                        </div>
                    </OverlayTrigger>
                </div>

                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                    src={userData.banner}
                    draggable="false"
                    loading="lazy"
                    className={style.img}
                />
            </div>

            <div className={style.avatar}>
                <UserAvatar
                    editMode={editMode}
                    avatar={userData.avatar}
                    verified={userData.role === 4}
                    onAvatarUpdated={onAvatarUpdated}
                />

                <OverlayTrigger
                    overlay={
                        <Tooltip>
                            <strong>{userData.userName}</strong>
                        </Tooltip>
                    }
                >
                    <h5>
                        {String(userData.userName || 'Unnamed').substring(
                            0,
                            15,
                        )}
                    </h5>
                </OverlayTrigger>

                {!!userData.userWallet?.address && (
                    <OverlayTrigger
                        overlay={
                            <Tooltip>
                                <strong>{userData.userWallet.address}</strong>
                            </Tooltip>
                        }
                    >
                        <p>
                            {addressSplice(userData.userWallet?.address, 6, 4)}{' '}
                            <SVGCopy
                                onClick={() =>
                                    copyText(userData.userWallet.address)
                                }
                            />
                        </p>
                    </OverlayTrigger>
                )}
            </div>
        </div>
    )
}

export default UserHeader
