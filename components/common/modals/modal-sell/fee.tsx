import { useTransHook } from '@/locales/hooks'
import React from 'react'
import { SERVICE_FEE } from '@/constants/nft'
import style from './style.module.scss'
import { useSelector } from 'react-redux'
import { selectNFTDetails } from '@/store/nft/selectors'

const Fee = () => {
    const { t } = useTransHook()
    const nft = useSelector(selectNFTDetails)

    return (
        <div className={style['fee']}>
            <p>
                {t('PLATFORM_FEE')}: {SERVICE_FEE}%
            </p>
            <p>
                {t('CREATOR_FEE')}: {nft.royalty}%
            </p>
        </div>
    )
}

export default Fee
