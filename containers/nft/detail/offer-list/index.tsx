import Table from '@/components/ui/table'
import { useTransHook } from '@/locales/hooks'
import { selectNFTDetails } from '@/store/nft/selectors'
import Image from 'next/image'
import { Accordion } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'
import timeSince from '@/utils/timeSince'
import OfferActions from './offer-actions'
import { artistLink, formatAddress } from '@/utils/addressFormat'
import { selectOfferList } from '@/store/offer/selectors'
import { getOfferList, resetOfferList } from '@/store/offer/offerSlice'
import { getDateString } from '@/utils/date'
import Link from 'next/link'
import style from '../style.module.scss'

const OfferList = () => {
    const { t } = useTransHook()
    const nftDetail = useSelector(selectNFTDetails)
    const { data, isLoading } = useSelector(selectOfferList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (nftDetail.nftId) {
            dispatch(getOfferList(nftDetail.nftId))
        }

        return () => {
            dispatch(resetOfferList())
        }
    }, [nftDetail.nftId])

    return (
        <Accordion defaultActiveKey={'0'}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Image
                        src="/svgs/exchange.svg"
                        width={20}
                        height={20}
                        alt="list-alt"
                    />
                    {t('OFFER_LIST')}
                </Accordion.Header>
                <Accordion.Body className="body-table">
                    <Table bsPrefix="custom-table" reCalculate={isLoading}>
                        <thead>
                            <tr>
                                <th>{t('PRICE')}</th>
                                <th>{t('FROM')}</th>
                                <th>{t('DATE')}</th>
                                <th>{t('EXPIRATION')}</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={style['link-wraper']}>
                            {data && data?.length > 0 ? (
                                data.map((item: any) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="flex items-center">
                                                <img
                                                    style={{
                                                        borderRadius: '50%',
                                                    }}
                                                    className="token-icon"
                                                    src={item.networkTokenIcon}
                                                    alt="tokenIcon"
                                                />
                                                <span>
                                                    {Number(item.price)}{' '}
                                                    {item.receiveToken}
                                                </span>
                                            </div>
                                        </td>
                                        <td title={item.fromUser?.address}>
                                            <Link
                                                href={artistLink(
                                                    item.fromUser?.address,
                                                )}
                                            >
                                                {formatAddress(
                                                    item.fromUser?.address,
                                                )}
                                            </Link>
                                        </td>
                                        <td>
                                            {getDateString(
                                                item.createdAt
                                                    ? item.createdAt
                                                    : Date.now(),
                                            )}
                                        </td>
                                        <td>
                                            {item.expired * 1000 > Date.now()
                                                ? timeSince(
                                                      new Date(
                                                          item.expired * 1000,
                                                      ),
                                                  )
                                                : 'Expired'}
                                        </td>

                                        <td>
                                            <OfferActions
                                                offerId={item.id}
                                                fromUser={item.fromUser}
                                                toUser={item.toUser}
                                                expired={item.expired}
                                                nftOwner={
                                                    nftDetail.owner.address
                                                }
                                                nftId={nftDetail.nftId}
                                                status={item.status}
                                                nftStatus={
                                                    nftDetail.marketNftStatus
                                                }
                                                priceOffer={Number(item.price)}
                                                receiveToken={item.receiveToken}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="no-data" colSpan={11}>
                                        {t('NO_DATA_FOUND')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default OfferList
