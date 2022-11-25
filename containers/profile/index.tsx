import Tabs from '@/components/ui/tabs'
import userServices, { IUserData } from '@/services/user'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Container, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import EditProfile from './edit'
import UserHeader from './header'
import style from './style.module.scss'
import Loading from '@/components/common/loading'
import NFTByUser, { userCategoryTypes } from './nft-by-user'
import { useTransHook } from '@/locales/hooks'
import { setDataUser } from '@/store/user/userSlice'
import NotFoundPage from '@/pages/404'
import { setUser } from '@/store/user/storage'
import { selectDataUser } from '@/store/user/selectors'

const ProfileUser = () => {
    const router = useRouter()
    const { address: addressParam, tab } = router.query
    const userDatac = useSelector(selectDataUser)
    const addressStore = userDatac?.userWallet?.address
    const [userData, setUserData] = useState<IUserData | undefined>()
    const [isLoading, setLoading] = useState(true)
    const [isOwner, setIsOwner] = useState(false)
    const [isTab, setTab] = useState<string | undefined>(tab as any)
    const { t } = useTransHook()
    const dispatch = useDispatch()

    async function loadUserData() {
        let address = addressParam
        if (addressParam === 'account') {
            if (!!addressStore) {
                address = addressStore
            } else {
                router.push('/')
                return
            }
        }

        if (!address) return

        try {
            setLoading(true)
            setUserData(undefined)

            const rest = await userServices.getUser(address as string)
            if (
                !rest ||
                !(rest.status >= 200 && rest.status <= 299) ||
                !rest.data
            ) {
                return
            }

            setUserData({ ...rest.data })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function loadImage() {
        let address = addressParam
        if (addressParam === 'account' && !!addressStore) address = addressStore
        if (!userData || !address) return
        const rest = await userServices.getUser(address as string)
        if (
            !rest ||
            !(rest.status >= 200 && rest.status <= 299) ||
            !rest.data
        ) {
            return
        }
        setUserData({
            ...userData,
            avatar: rest.data.avatar,
            banner: rest.data.banner,
        })
        dispatch(setDataUser({ ...rest.data }))
        setUser({ ...rest.data })
    }

    useEffect(() => {
        loadUserData()
    }, [addressParam])

    useEffect(() => {
        setIsOwner(
            userData
                ? String(addressStore).toUpperCase() ===
                      String(userData.userWallet?.address).toUpperCase()
                : false,
        )
    }, [isOwner, addressParam, addressStore, userData?.userWallet?.address])

    useEffect(() => {
        setTab(userCategoryTypes[0])
    }, [isOwner])

    return (
        <Container fluid className={style.page}>
            {isLoading && (
                <div className={style['page--center']}>
                    <Loading />
                </div>
            )}

            {!isLoading && !userData && <NotFoundPage />}

            {!isLoading && !!userData && (
                <>
                    <UserHeader
                        userData={userData}
                        className={style['page__header']}
                        editMode={isOwner}
                        onAvatarUpdated={loadImage}
                        onBannerUpdated={loadImage}
                    />
                    <div className={style['page__body']}>
                        <Tabs
                            className={style['page__tabs']}
                            defaultActiveKey={isTab || userCategoryTypes[0]}
                            activeKey={isTab}
                            onSelect={(e) => setTab(e as any)}
                            unmountOnExit={true}
                        >
                            {userCategoryTypes.map((category, index) => (
                                <Tab
                                    eventKey={category}
                                    key={index}
                                    title={t(category.toUpperCase())}
                                >
                                    <NFTByUser
                                        category={category}
                                        address={userData.userWallet?.address}
                                    />
                                </Tab>
                            ))}

                            {isOwner && (
                                <Tab
                                    eventKey="my-profile"
                                    title={t('MY_PROFILE')}
                                >
                                    <EditProfile
                                        beforceUserData={userData}
                                        setBeforceUserData={(val) =>
                                            setUserData(val)
                                        }
                                    />
                                </Tab>
                            )}
                        </Tabs>
                    </div>
                </>
            )}
        </Container>
    )
}

export default ProfileUser
