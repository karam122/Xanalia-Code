// import RectangleBadge from '@/components/ui/rectangle-badge'
import { useTransHook } from '@/locales/hooks'
import { useAppDispatch } from '@/store/hooks'
import {
    selectCurrentNetwork,
    selectNetworksList,
} from '@/store/network/selectors'
import { updateNetworkInfo } from '@/store/nft/createSlice'
import { selectNetworkInfo, selectSaleType } from '@/store/nft/selectors'
import { getDefaultToken, getERC20Tokens } from '@/utils/token'
import { useEffect, useMemo } from 'react'
import { FormSelect } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'
import { saleType as st } from '@/constants/nft'
const NetworkPrice = () => {
    const { t } = useTransHook()
    const network = useSelector(selectNetworkInfo)

    const networksList = useSelector(selectNetworksList)
    const dispatch = useAppDispatch()
    const currentNetwork = useSelector(selectCurrentNetwork)
    const saleType = useSelector(selectSaleType)

    useEffect(() => {
        if (currentNetwork && currentNetwork?.networkTokens?.length > 0) {
            dispatch(
                updateNetworkInfo({
                    field: 'chainId',
                    value: Number(currentNetwork?.id),
                }),
            )

            dispatch(
                updateNetworkInfo({
                    field: 'basePrice',
                    value: currentNetwork?.networkTokens[0].tokenName,
                }),
            )
        }
    }, [currentNetwork, saleType])

    useEffect(() => {
        if (currentNetwork?.name) {
            console.log(
                '🚀 ~ file: index.tsx ~ line 45 ~ useEffect ~ currentNetwork',
                currentNetwork,
            )
            dispatch(
                updateNetworkInfo({
                    field: 'basePrice',
                    value: getDefaultToken(
                        currentNetwork?.networkTokens,
                        saleType,
                        currentNetwork?.name,
                    ).tokenName,
                }),
            )
        }
    }, [saleType, currentNetwork])

    useEffect(() => {
        if ((network.chainId === 0, currentNetwork?.networkTokens.length)) {
            dispatch(
                updateNetworkInfo({
                    field: 'chainId',
                    value: Number(currentNetwork?.id),
                }),
            )

            dispatch(
                updateNetworkInfo({
                    field: 'basePrice',
                    value: currentNetwork?.networkTokens[0].tokenName,
                }),
            )
        }
    }, [network.chainId])

    const onChange = (e: any) => {
        const { name, value } = e.target
        dispatch(updateNetworkInfo({ field: name, value: value }))
    }
    const currencies = useMemo(() => {
        if (currentNetwork) {
            if (saleType === st.TIMEAUTION) {
                return getERC20Tokens(currentNetwork?.networkTokens)
            }
            return currentNetwork?.networkTokens
        }
        return []
    }, [saleType, currentNetwork])

    return (
        <div className="panel">
            <div className={styles['network-price--top']}>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('NETWORK')}</div>
                    </div>
                    <div className="form-input">
                        <FormSelect
                            disabled={true}
                            value={network.chainId}
                            name="chainId"
                            onChange={onChange}
                        >
                            {networksList?.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </FormSelect>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('BASE_PRICE')}</div>
                    </div>
                    <div className="form-input">
                        <FormSelect
                            value={network.basePrice}
                            name="basePrice"
                            onChange={onChange}
                        >
                            {currencies.map((item: any) => (
                                <option value={item.tokenName} key={item.id}>
                                    {item.tokenName}
                                </option>
                            ))}
                        </FormSelect>
                    </div>
                </div>
                {/* <div className="form-group">
                    <div className="form-title">
                        <div className="main-title">{t('ALSO_ACCEPT')}</div>
                    </div>
                    <div className="form-input">
                        <FormSelect>
                            <option>ALIA</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </FormSelect>
                    </div>
                </div> */}
            </div>
            {/* <div className={styles['network-price--bottom']}>
                {tokensData.map((token, index) => (
                    <RectangleBadge
                        title={token.title}
                        key={index}
                        haveCloseIcon={token.haveCloseIcon}
                    />
                ))}
                <Button variant="primary" size="lg">
                    {t('ADD')}
                </Button>
            </div> */}
        </div>
    )
}

export default NetworkPrice
