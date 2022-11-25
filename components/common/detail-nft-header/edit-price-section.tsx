import React, { useState } from 'react'
import style from './style.module.scss'
import { useTransHook } from '@/locales/hooks'
import EditPriceModal from '@/components/common/modals/modal-edit-price'
import { useSelector } from 'react-redux'
import { selectNFTDetails } from '@/store/nft/selectors'
import { compareAddress } from '@/utils/compareAddress'
import { NFT_MARKET_STATUS } from '@/constants/nft'
import { selectDataUser } from '@/store/user/selectors'

type Props = {
    owner: {
        address: string | undefined
    }
    price: string | undefined
}

const EditPriceSection = (props: Props) => {
    const { t } = useTransHook()
    const nftDetails = useSelector(selectNFTDetails)
    const owner = nftDetails.owner?.address
    const userData = useSelector(selectDataUser)
    console.log(
        '🚀 ~ file: edit-price-section.tsx ~ line 20 ~ EditPriceSection ~ nftDetails',
        nftDetails,
    )

    const [openEditPriceModal, setOpen] = useState<boolean>(false)
    if (
        !!userData?.userWallet?.address &&
        compareAddress(owner, userData.userWallet?.address) &&
        nftDetails.marketNftStatus === NFT_MARKET_STATUS.ON_FIX_PRICE
    ) {
        return (
            <div className={`${style['edit-price-action']}`}>
                <div className={`${style['current-price']}`}>
                    {`${props.price} `}
                    <span>{nftDetails.saleData.fixPrice.tokenPrice}</span>
                </div>
                <button
                    className={`text-body-none-color secondary-button ${style['edit-price__button']}`}
                    onClick={() => setOpen(true)}
                >
                    {t('EDIT_PRICE')}
                </button>
                <EditPriceModal
                    open={openEditPriceModal}
                    setOpen={(val) => setOpen(val)}
                />
            </div>
        )
    }

    return null
}

export default EditPriceSection
