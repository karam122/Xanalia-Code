/* eslint-disable no-unused-vars */
// https://backend.xanalia.com/external-transactions/external-user-send-tx
import sendRequest, { accessToken } from '@/utils/sendRequest'
import { AxiosResponse } from 'axios'
import { getUser as getUserStore } from '@/store/user/storage'

export interface IUserData {
    id: number
    userName: string
    password: string | undefined
    email: string | undefined
    role: number
    emailVerificationToken: any
    emailVerified: 0 | 1
    avatar: string | undefined
    banner: string | undefined
    description: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    name: string | undefined
    phone: string | undefined
    about: string | undefined
    website: string | undefined
    facebookSite: string | undefined
    instagramSite: string | undefined
    twitterSite: string | undefined
    twitterVerified: 0 | 1
    youtubeSite: string | undefined
    discordSite: string | undefined
    zoomMail: string | undefined
    inviteCode: string | undefined
    following: number
    followers: number
    userNftRole: number
    isNonCrypto: number
    status: number
    createdAt: string
    updatedAt: string
    forgotPassword: any
    lastLogin: any
    userWallet: {
        id: number
        address: string
        type: number
        nonce: number
    }
}

export interface IUserUpdate {
    userName?: string
    website?: string
    discordSite?: string
    twitterSite?: string
    youtubeSite?: string
    instagramSite?: string
    email?: string
    password?: string
    zoomMail?: string
    description?: string
}

interface IWhitelist {
    id: number
    status: IStatusData
    networkId: number
}

export enum IStatusData {
    PENDING = 1,
    APPROVED = 2,
    DISAPPROVED = 3,
}

export const UserErrorMessage: any = {
    'USER.USER_NOT_FOUND': {
        messageCode: 'USER.USER_NOT_FOUND',
        t: 'User not found',
        key: 'USER_NOT_FOUND',
    },
    'USER.USER_ALREADY_EXIST': {
        messageCode: 'USER.USER_ALREADY_EXIST',
        t: 'User already exist',
        key: 'USER_ALREADY_EXIST',
    },
    'USER.USER_WITH_EMAIL_NOT_EXIST': {
        messageCode: 'USER.USER_WITH_EMAIL_NOT_EXIST',
        t: 'User with email not exist',
        key: 'USER_WITH_EMAIL_NOT_EXIST',
    },
    'USER.USER_WITH_EMAIL_ALREADY_EXIST': {
        messageCode: 'USER.USER_WITH_EMAIL_ALREADY_EXIST',
        t: 'User with email already exist',
        key: 'USER_WITH_EMAIL_ALREADY_EXIST',
    },
    'USER.USER_WITH_TWITTER_ALREADY_EXIST': {
        messageCode: 'USER.USER_WITH_TWITTER_ALREADY_EXIST',
        t: 'User with twitter already exist',
        key: 'USER_WITH_TWITTER_ALREADY_EXIST',
    },
    'USER.USER_ALREADY EXISTS': {
        messageCode: 'USER.USER_ALREADY EXISTS',
        t: 'User with username already exist',
        key: 'USER_ALREADY EXISTS',
    },
    'AUTH.BANNED': {
        messageCode: 'AUTH.BANNED',
        t: 'USER HAS BEEN BANNED',
        key: 'AUTH_BANNED',
    },
}

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL
const API_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL
const API_BACKEND_URL = API_BACKEND_BASE_URL + '/users/'

async function updateProfile(data: IUserUpdate) {
    return await sendRequest(
        {
            url: API_BACKEND_URL + 'update-profile',
            data,
            method: 'PUT',
        },
        true,
    )
}

async function requestArtist(firstAnswer: string, secondAnswer: string) {
    return sendRequest(
        {
            url: API_BACKEND_URL + 'request-artist',
            data: { firstAnswer, secondAnswer },
            method: 'POST',
        },
        true,
    )
}

async function requestWhitelist(networkId: number) {
    return sendRequest(
        {
            url: API_BACKEND_URL + 'request-whitelist',
            data: { networkId },
            method: 'POST',
        },
        true,
    )
}

async function getAllUser(): Promise<Array<IUserData> | undefined> {
    return await sendRequest({ url: API_BACKEND_URL, method: 'GET' })
}

async function getUser(
    address: string,
): Promise<AxiosResponse<IUserData | undefined>> {
    return await sendRequest(
        { url: API_BACKEND_URL + address, method: 'GET' },
        true,
    )
}

async function verifyEmail(email: string) {
    return await sendRequest(
        {
            url: API_BACKEND_URL + 'verify-email',
            data: { account: email },
            method: 'post',
        },
        true,
    )
}

async function verifyTwitter() {
    if (typeof window === 'undefined') return
    ;(window as any).location.href = API_BACKEND_BASE_URL + '/auth/twitter'
}

async function acceptVerifyEmail(
    accessToken: string,
): Promise<AxiosResponse<IUserData | undefined>> {
    return await sendRequest(
        {
            url: API_BACKEND_URL + 'update-verify-email',
            data: { accessToken },
            method: 'post',
        },
        true,
    )
}

async function getWhitelistByAddress(
    address: string,
): Promise<AxiosResponse<Array<IWhitelist> | undefined>> {
    return await sendRequest(
        {
            url: API_BACKEND_BASE_URL + '/admin/get-whitelist-by-address',
            method: 'GET',
            params: { address },
        },
        true,
    )
}

async function updateAvatar(file: File) {
    const { type } = file
    const extension = type.split('/')[1]

    const name = new Date().getTime()

    const token = accessToken()

    const user = getUserStore()

    try {
        const response = await sendRequest({
            method: 'put',
            url: `${API_GATEWAY_URL}/user-avatar/${user?.id}/${name}.${extension}`,
            data: file,
            headers: {
                Authorization: token as any,
                'x-amz-tagging': `token=${token}`,
                'Content-Type': type,
            },
        })
        return [response, null]
    } catch (error) {
        return [null, error]
    }
}

async function removeAvatar(): Promise<AxiosResponse> {
    return sendRequest(
        {
            url: API_BACKEND_URL,
            method: 'PUT',
            data: { avatar: '-1' },
        },
        true,
    )
}

async function updateBanner(file: File) {
    const { type } = file
    const extension = type.split('/')[1]

    const name = new Date().getTime()

    const token = accessToken()

    const user = getUserStore()

    try {
        const response = await sendRequest({
            method: 'put',
            url: `${API_GATEWAY_URL}/user-avatar/${user?.id}/${name}.${extension}`,
            data: file,
            headers: {
                Authorization: token as any,
                'x-amz-tagging': `token=${token}&type=cover`,
                'Content-Type': type,
            },
        })
        return [response, null]
    } catch (error) {
        return [null, error]
    }
}

async function removeBanner(): Promise<AxiosResponse> {
    return sendRequest(
        {
            url: API_BACKEND_URL,
            method: 'PUT',
            data: { banner: '-1' },
        },
        true,
    )
}

const userServices = {
    getWhitelistByAddress,
    updateProfile,
    getAllUser,
    getUser,
    requestArtist,
    requestWhitelist,
    verifyEmail,
    acceptVerifyEmail,
    verifyTwitter,
    updateAvatar,
    updateBanner,
    removeAvatar,
    removeBanner,
}

export default userServices
