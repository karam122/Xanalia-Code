import Modal from '@/components/ui/modals'
import { sendCustomTransaction } from '@/connect/ether'
import { SERVICE_FEE } from '@/constants/nft'
import SOCKET_EVENTS from '@/constants/socket'
import { TRANSACTION_ACTION } from '@/constants/transaction'
import { useActionAuthNetwork } from '@/hooks/useActionAuth'
import { useSocketDetailPage } from '@/hooks/useSocketGlobal'
import { useTransHook } from '@/locales/hooks'
import bidServices from '@/services/bid'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { selectNFTDetails } from '@/store/nft/selectors'
import { toFixCustom } from '@/utils/number'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
import AgreeCheckbox from '../../agree-checkbox'
import styles from './style.module.scss'
import { compareAddress } from '@/utils/compareAddress'
import { selectDataUser } from '@/store/user/selectors'
import { handleTransactionError } from '@/utils/handleTransactionError'
interface IModalAcceptBid {
    open: boolean
    // eslint-disable-next-line no-unused-vars
    setOpen: (val: boolean) => void
    // eslint-disable-next-line no-unused-vars
    setOpenTransactionPending: (val: boolean) => void
    priceBid: number
    receiveToken: string
    auctionSessionId: number
    bidId: number
}

const ModalAcceptBid = ({
    open,
    setOpen,
    setOpenTransactionPending,
    priceBid,
    receiveToken,
    auctionSessionId,
    bidId,
}: IModalAcceptBid) => {
    const { t } = useTransHook()
    const [tickService, setTickService] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const nftDetail = useSelector(selectNFTDetails)

    const currentNetwork = useSelector(selectCurrentNetwork)
    const userData = useSelector(selectDataUser)

    useEffect(() => {
        if (tickService) {
            setError('')
        }
    }, [tickService])

    const handleAcceptBid = async () => {
        try {
            setOpenTransactionPending(true)
            setOpen(false)
            const acceptBidRes = await bidServices.acceptBid({
                aucctionSessionId: auctionSessionId,
                bidId: bidId,
            })
            if (acceptBidRes) {
                const signData = acceptBidRes.dataReturn?.signData
                if (signData) {
                    const transactionParameters = {
                        nonce: signData.nonce, // ignored by MetaMask
                        // gasPrice: signData?.gasPrice.toString(16), // customizable by user during MetaMask confirmation.
                        // gas: signData?.gas.toString(16), // customizable by user during MetaMask confirmation.
                        to: signData.to, // Required except during contract publications.
                        from: signData.from, // must match user's active address.
                        // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                        data: signData.data, // Optional, but used for defining smart contract creation and interaction.
                        chainId: currentNetwork?.chainId, // Used to prevent transaction reuse across b
                    }

                    await sendCustomTransaction(
                        transactionParameters,
                        TRANSACTION_ACTION.acceptBid,
                        currentNetwork?.id,
                    )
                }
            }
        } catch (error: any) {
            setOpen(true)
            setOpenTransactionPending(false)

            handleTransactionError(error, t)
        }
    }

    const handleAcceptBidAuth = useActionAuthNetwork(handleAcceptBid)

    useSocketDetailPage(
        SOCKET_EVENTS.externalAcceptBidAuctionSessionSuccess,
        setOpenTransactionPending,
        t('ACCEPT_BID_SUCCESS'),
    )

    const onAcceptBid = () => {
        if (!tickService) {
            setError(t('PLEASE_TICK_AGREE_SERVICE'))
        } else {
            handleAcceptBidAuth()
        }
    }
    const royalFee = !compareAddress(
        nftDetail.creator.address,
        userData?.userWallet?.address ? userData.userWallet?.address : '',
    )
        ? (priceBid * Number(nftDetail.royalty)) / 100
        : 0

    return (
        <Modal
            // size="lg"
            isVisible={open}
            setVisible={setOpen}
            title={t('ACCEPT_BID_TITLE')}
            closeButton={true}
            closeOutSide={false}
            classHeader={''}
            classBody={''}
        >
            <div className={styles['checkout-item']}>
                <div className="heading--6-2">{t('ITEM')}</div>
                <div className={styles['checkout-item__content']}>
                    <div className={styles['checkout-item__general']}>
                        <img
                            src={
                                nftDetail?.thumbnailUrl
                                    ? nftDetail.thumbnailUrl
                                    : 'images/default-nft-image.jpeg'
                            }
                            alt="nft-image-alt"
                        />
                        <span className="heading--6-2">{nftDetail?.name}</span>
                    </div>
                    <div className={styles['checkout-item__price-token']}>
                        <div className="heading--6-2">{Number(priceBid)}</div>
                        <div className="heading--6-2">{receiveToken}</div>
                    </div>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <div className="heading--6-2">{t('FEE')}</div>
                {!compareAddress(
                    nftDetail.creator.address,
                    userData?.userWallet?.address
                        ? userData.userWallet?.address
                        : '',
                ) && (
                    <div className={styles['checkout-item__content']}>
                        <span>{t('ROYALTY_FEE')}</span>
                        <span className="heading--6-3">{`${toFixCustom(
                            royalFee,
                        )} ${receiveToken} (${Number(
                            nftDetail.royalty,
                        )}%)`}</span>
                    </div>
                )}

                <div className={styles['checkout-item__content']}>
                    <span>{t('SERVICE_FEE')}</span>
                    <span className="heading--6-3">{`${toFixCustom(
                        (priceBid * SERVICE_FEE) / 100,
                    )} ${receiveToken} (${SERVICE_FEE}%)`}</span>
                </div>
            </div>
            <div className={styles['checkout-item']}>
                <div className={styles['checkout-item__content']}>
                    <span>{t('YOU_WILL_RECEIVE')}</span>
                    <span className="heading--6-3">{`${Number(
                        Number(
                            toFixCustom(
                                priceBid -
                                    (priceBid * SERVICE_FEE) / 100 -
                                    royalFee,
                            ),
                        ).toFixed(6),
                    )} ${receiveToken}`}</span>
                </div>
            </div>
            <AgreeCheckbox tick={tickService} setTick={setTickService} />
            <div className={`${styles['checkout-error']} error-message`}>
                {error}
            </div>
            <div className="modal-action">
                <Button
                    size="lg"
                    variant="outline-primary"
                    onClick={() => setOpen(false)}
                >
                    {t('CANCEL')}
                </Button>
                <Button
                    size="lg"
                    className="btn-loading"
                    variant="primary"
                    onClick={onAcceptBid}
                >
                    {t('CONFIRM')}
                </Button>
            </div>
        </Modal>
    )
}

export default ModalAcceptBid
