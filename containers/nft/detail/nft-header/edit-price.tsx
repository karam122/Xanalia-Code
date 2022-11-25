import React, { useState } from 'react'
import { useTransHook } from '@/locales/hooks'
import EditPriceModal from '@/components/common/modals/modal-edit-price'
// import { useSelector } from 'react-redux'
// import { selectNFTDetails } from '@/store/nft/selectors'

const EditPriceSection = () => {
    const { t } = useTransHook()
    // const nftDetails = useSelector(selectNFTDetails)

    const [openEditPriceModal, setOpen] = useState<boolean>(false)

    return (
        <>
            <button
                className={`outline-secondary-button`}
                onClick={() => setOpen(true)}
            >
                {t('EDIT_PRICE')}
            </button>
            <EditPriceModal
                open={openEditPriceModal}
                setOpen={(val) => setOpen(val)}
            />
        </>
    )
}

export default EditPriceSection
