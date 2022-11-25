import { toast } from 'react-toastify'
export const handleTransactionError = (error: any, t: any) => {
    console.log(
        '🚀 ~ file: handleTransactionError.ts ~ line 3 ~ handleTransactionError ~ error',
        error,
    )

    if (error.code === 'INSUFFICIENT_FUNDS') {
        toast.error(t('SALE_NFT_BALANCE_NOT_ENOUGH'))
    } else if (error.cancelled === true) {
        toast.error(t('CANCELED_TRANSACTION'))
    } else if (error.code === 'TRANSACTION_REPLACED') {
    } else if (
        error.code === 4001 &&
        error?.message ===
            'MetaMask Tx Signature: User denied transaction signature.'
    ) {
        toast.error('MetaMask Tx Signature: User denied transaction signature.')
    } else {
        // toast.error(t(error.message))
    }
}
