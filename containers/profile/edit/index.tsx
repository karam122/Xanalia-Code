import { useRouter } from 'next/router'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import FieldComponent from './field-component'
import FieldLinkComponent from './field-link-component'
import style from './style.module.scss'
import VerifyWithTwitter from './verify-with-twitter'
import SVGInstagram from '@/public/svgs/instagram-2.svg'
import VerifyWithEmail from './verify-with-email'
import SectionArtist from './section-artist'
// import SectionWhitelist from './section-whitelist'
import { useEffect, useState } from 'react'
import userServices, { IUserData, UserErrorMessage } from '@/services/user'
import { toast } from 'react-toastify'
import validation from '@/utils/validation'
import { useSelector } from 'react-redux'
import { useTransHook } from '@/locales/hooks'
import { selectDataUser } from '@/store/user/selectors'

export default function EditProfile({
    beforceUserData,
    setBeforceUserData,
}: {
    beforceUserData: IUserData
    // eslint-disable-next-line no-unused-vars
    setBeforceUserData: (val: IUserData) => void
}) {
    const { t } = useTransHook()
    const router = useRouter()
    const userDatac = useSelector(selectDataUser)
    const addressStore = userDatac?.userWallet.address
    const [userData, setUserData] = useState<undefined | IUserData>()
    const [msError, setMsError] = useState({
        userName: undefined as undefined | string,
        bio: undefined as undefined | string,
        email: undefined as undefined | string,
        twiiter: undefined as undefined | string,
        instagram: undefined as undefined | string,
    })

    const [isLoading, setLoading] = useState(false)

    const maxLenghOfDescription = 200

    async function updateUser() {
        if (isLoading || !userData || !validate()) return
        setLoading(true)

        try {
            const rest = await userServices
                .updateProfile({
                    userName: userData.userName || '',
                    email: userData.email || undefined,
                    twitterSite: userData.twitterSite || '',
                    instagramSite: userData.instagramSite || '',
                    description: userData.description || '',
                })
                .catch(() => {})

            if (!rest || !(rest.status >= 200 && rest.status <= 299)) {
                if (typeof rest.data.message === 'object') {
                    const value = rest.data.message[0].errorDetail
                    if (value.IsEmailNormalUserNotExistConstraint)
                        toast.error(t('USER_EMAIL_EXISTED'))
                    if (value.IsEmailCustomConstraint)
                        toast.error(t('USER_EMAIL_INVALID'))
                } else if (!!rest.data.messageCode) {
                    const msError = UserErrorMessage[rest.data.messageCode]
                    if (msError) toast.error(t(msError.key))
                } else {
                    toast.error(t('USER_ERROR_MESSAGE'))
                }
                return
            }

            const newUserData = { ...userData }
            if (beforceUserData.email !== newUserData.email) {
                newUserData.emailVerified = 0
            }
            if (beforceUserData.twitterSite !== newUserData.twitterSite) {
                newUserData.twitterVerified = 0
            }

            setBeforceUserData({ ...userData })
            setUserData({ ...newUserData })
            toast.success(t('USER_SUCCESSFUL_UPDATE'))
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    function validate() {
        const ms = { ...msError }
        let result = true

        const min = 6
        const max = 100
        if (!validation.requied(userData?.userName)) {
            ms.userName = t('REQUIRED_USERNAME')
            result = false
        } else if (!validation.userName(userData?.userName, { min, max })) {
            const username = ms.userName || ''
            if (!(username.length >= min && username.length <= max)) {
                ms.userName = t('LENGTH_OF_USERNAME', { min, max })
            } else {
                // ms.userName = t('CHECK_YOUR_USERNAME')
                ms.userName = t('VALIDATE_USERNAME')
            }
            result = false
        }

        if (
            validation.requied(userData?.description) &&
            (userData?.description?.length || 0) > maxLenghOfDescription
        ) {
            ms.bio = t('USER_MAX_DESCRIPTION', {
                maxLengh: maxLenghOfDescription,
            })
            result = false
        }

        if (
            !userData?.isNonCrypto &&
            validation.requied(userData?.email) &&
            !validation.email(userData?.email)
        ) {
            ms.email = t('CHECK_YOUR_EMAIL')
            result = false
        }

        if (
            validation.requied(userData?.twitterSite) &&
            !validation.userName(userData?.twitterSite, {})
        ) {
            ms.twiiter = t('CHECK_YOUR_TWITTER')
            result = false
        }

        if (
            validation.requied(userData?.instagramSite) &&
            !validation.link(userData?.instagramSite)
        ) {
            ms.instagram = t('CHECK_YOUR_INSTAGRAM')
            result = false
        }

        setMsError({ ...ms })

        return result
    }

    useEffect(() => {
        setUserData({ ...beforceUserData })
    }, [beforceUserData?.userWallet.address])

    useEffect(() => {
        if (!addressStore || !beforceUserData?.userWallet.address) return
        if (
            String(addressStore).toUpperCase() !==
            String(beforceUserData?.userWallet.address).toUpperCase()
        ) {
            router.push('/')
        }
    }, [addressStore, beforceUserData?.userWallet.address])

    return (
        <>
            {!!userData && !!beforceUserData && (
                <Row className={style.body}>
                    <Col lg={6} xl={5} xxl={4}>
                        <div className={style.header}>
                            <h1 className="bold">{t('PROFILE_SETTING')}</h1>
                        </div>

                        <FieldComponent
                            label={t('LABEL_USERNAME')}
                            placeholder={t('PLACEHOLDER_USERNAME')}
                            defaultValue={userData.userName}
                            disabled={isLoading}
                            textBottom={msError.userName}
                            maxLength={100}
                            onChange={(eve) => {
                                setUserData({
                                    ...userData,
                                    userName: eve.target.value,
                                })
                                setMsError({
                                    ...msError,
                                    userName: undefined,
                                })
                            }}
                        />

                        <FieldComponent
                            label={t('LABEL_DESCRIPTION')}
                            labelRight={
                                (userData.description?.length || 0) +
                                '/' +
                                maxLenghOfDescription
                            }
                            placeholder={t('PLACEHOLDER_DESCRIPTION')}
                            as="textarea"
                            style={{ height: '100px' }}
                            disabled={isLoading}
                            textBottom={msError.bio}
                            defaultValue={userData.description}
                            onChange={(eve) => {
                                setUserData({
                                    ...userData,
                                    description: eve.target.value,
                                })
                                setMsError({
                                    ...msError,
                                    bio: undefined,
                                })
                            }}
                        />

                        <VerifyWithEmail
                            label={t('LABEL_EMAIL')}
                            placeholder={t('PLACEHOLDER_EMAIL')}
                            readOnly={!!userData.isNonCrypto}
                            defaultValue={userData.email}
                            verified={!!userData.emailVerified}
                            email={userData.email}
                            beforceEmail={beforceUserData.email}
                            disabled={isLoading}
                            textBottom={msError.email}
                            onChange={(eve) => {
                                setUserData({
                                    ...userData,
                                    email: eve.target.value,
                                })
                                setMsError({
                                    ...msError,
                                    email: undefined,
                                })
                            }}
                        />

                        <VerifyWithTwitter
                            label={t('LABEL_TWITTER')}
                            placeholder={t('PLACEHOLDER_TWITTER')}
                            // description={t('DESCRIPTION_TWITTER')}
                            defaultValue={userData.twitterSite}
                            verified={!!userData.twitterVerified}
                            twitter={userData.twitterSite}
                            beforceTwitter={beforceUserData.twitterSite}
                            disabled={isLoading}
                            textBottom={msError.twiiter}
                            onChange={(eve) => {
                                setUserData({
                                    ...userData,
                                    twitterSite: eve.target.value,
                                })
                                setMsError({
                                    ...msError,
                                    twiiter: undefined,
                                })
                            }}
                        />

                        <div className={style.field}>
                            <label className={style.field__label + ' mb-2'}>
                                {t('LABEL_INSTAGRAM')}
                            </label>
                            <div>
                                <FieldLinkComponent
                                    iconLeft={<SVGInstagram />}
                                    placeholder={t('PLACEHOLDER_INSTAGRAM')}
                                    disabled={isLoading}
                                    defaultValue={userData.instagramSite}
                                    textBottom={msError.instagram}
                                    onChange={(eve) => {
                                        setUserData({
                                            ...userData,
                                            instagramSite: eve.target.value,
                                        })
                                        setMsError({
                                            ...msError,
                                            instagram: undefined,
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        {/* <CopyAddress address={userData.userWallet.address} /> */}

                        <Button
                            className={`${style.btn} ${style.btn__save}`}
                            disabled={isLoading}
                            onClick={updateUser}
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                t('BTN_SAVE_CHANGE')
                            )}
                        </Button>
                    </Col>

                    <Col lg={6} xl={7} xxl={6}>
                        <div className={style.apply}>
                            <SectionArtist userData={beforceUserData} />
                            {/* <SectionWhitelist userData={beforceUserData} /> */}
                        </div>
                    </Col>
                </Row>
            )}
        </>
    )
}
