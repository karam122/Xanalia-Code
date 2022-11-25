import style from './user-avatar.module.scss'
import SVGPen from '@/public/svgs/pen.svg'
import SVGDefaultAvatar from '@/public/svgs/default-avatar.svg'
import SVGTick from '@/public/svgs/escutcheon.svg'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { getFileSize } from '@/utils/image'
import { toast } from 'react-toastify'
import userServices from '@/services/user'
import { useSocketGlobal } from '@/hooks/useSocketGlobal'
import SOCKET_EVENTS from '@/constants/socket'
import { useTransHook } from '@/locales/hooks'

interface IUserAvatar {
    avatar?: string
    // eslint-disable-next-line no-unused-vars
    onUpdate?: (base64: string | ArrayBuffer | null | undefined) => void
    editMode?: boolean
    className?: string
    verified?: boolean
    onAvatarUpdated?: () => void
}

const maxSize = 100 * 1000000
const ImageWidthSize = 350
const ImageHeightSize = 350

export default function UserAvatar({
    avatar,
    editMode = false,
    className,
    verified = false,
    onAvatarUpdated,
}: IUserAvatar) {
    const [isLoading, setLoading] = useState(false)
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
                if (!file || !file.type.includes('image/')) {
                    setLoading(false)
                    return
                }

                if (!(file.size <= maxSize)) {
                    toast.error(t('FILE_SIZE_OF_AVATAR_USER'))
                    setLoading(false)
                    return
                }

                const [width, height] = await getFileSize(file)
                if (!(width <= ImageWidthSize && height <= ImageHeightSize)) {
                    toast.error(t('SIZE_OF_USER_AVATAR_IMAGE'))
                    setLoading(false)
                    return
                }

                await userServices.updateAvatar(file)
            }
            input.click()
        } catch (error) {
            console.error(error)
        } finally {
            input.remove()
        }
    }

    useSocketGlobal(
        SOCKET_EVENTS.userUpdateAvatar,
        () => {
            if (onAvatarUpdated) onAvatarUpdated()
            setLoading(false)
        },
        false,
    )

    return (
        <div className={style.avatar + ' ' + className}>
            <img
                src={avatar || ''}
                draggable="false"
                loading="lazy"
                alt=""
                className={style.image}
            />

            <SVGDefaultAvatar className={style.defaultAvatar} />

            {verified && (
                <div className={style.verified}>
                    <SVGTick />
                </div>
            )}

            {editMode && !isLoading && (
                <div className={style.overlay} onClick={editPicture}>
                    <SVGPen />
                </div>
            )}

            {isLoading && (
                <div className={style.loading}>
                    <Spinner animation={'border'} />
                </div>
            )}
        </div>
    )
}
