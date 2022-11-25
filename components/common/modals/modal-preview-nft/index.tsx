/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import DetailNFTHeader from '@/components/common/detail-nft-header'
import Loading from '@/components/common/loading'
import Modal from '@/components/ui/modals'
import { setOpenModalPreviewNFT } from '@/store/nft/slice'
import {
    selectDataPreviewNFT,
    selectIsOpenModalPreviewNFT,
    selectNFT,
} from '@/store/nft/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'

const ModalPreviewNFT = () => {
    const { isLoading } = useSelector(selectNFT)
    const isOpenModalPreviewNFT = useSelector(selectIsOpenModalPreviewNFT)
    const dataPreviewNFT = useSelector(selectDataPreviewNFT)

    const dispatch = useDispatch()

    function setVisibleModal(val: boolean) {
        dispatch(setOpenModalPreviewNFT(val))
    }

    return (
        <Modal
            isVisible={isOpenModalPreviewNFT}
            setVisible={(val) => setVisibleModal(val)}
            classBody={style['modal-body']}
            closeButton
            size="xl"
        >
            <div className={style['preview-nft-container']}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <DetailNFTHeader
                            dataPreviewNFT={dataPreviewNFT}
                            isRatio
                            nodeButton={
                                <button
                                    className={`${style['btn-buy']} heading--5 bold`}
                                >
                                    BUY PACK
                                </button>
                            }
                        />

                        <div className={style['preview-nft__footer']}>
                            <button
                                className={`${style['btn-detail']} heading--5 bold`}
                            >
                                WATCH DETAIL
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default ModalPreviewNFT
