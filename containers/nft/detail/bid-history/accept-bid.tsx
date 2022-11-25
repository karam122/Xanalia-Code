import ModalAcceptBid from '@/components/common/modals/modal-accept-bid'
import ModalTransactionPending from '@/components/common/modals/modal-transaction-pending'
import { useTransHook } from '@/locales/hooks'
import { useState } from 'react'

interface ICancelBid {
    auctionSessionId: number
    bidId: number
    priceBid: number
    receiveToken: string
}

const AcceptBid = ({
    auctionSessionId,
    bidId,
    priceBid,
    receiveToken,
}: ICancelBid) => {
    const { t } = useTransHook()
    const [openTransactionPending, setOpenTransactionPending] =
        useState<boolean>(false)
    const [openAcceptBid, setOpenAcceptBid] = useState<boolean>(false)

    return (
        <div>
            <ModalTransactionPending
                open={openTransactionPending}
                setOpen={setOpenTransactionPending}
            />
            <ModalAcceptBid
                open={openAcceptBid}
                setOpen={setOpenAcceptBid}
                setOpenTransactionPending={setOpenTransactionPending}
                priceBid={priceBid}
                receiveToken={receiveToken}
                auctionSessionId={auctionSessionId}
                bidId={bidId}
            />
            <button
                className={`action-button ${
                    openTransactionPending ? 'btn-disabled' : ''
                }`}
                disabled={openTransactionPending ? true : false}
                onClick={() => setOpenAcceptBid(true)}
            >
                {t('ACCEPT_BID')}
            </button>
        </div>
    )
}

export default AcceptBid
