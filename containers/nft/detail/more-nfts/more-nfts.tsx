/* eslint-disable no-unused-vars */

import NFTCard from '@/components/common/nft-card'
import { useTransHook } from '@/locales/hooks'
import Image from 'next/image'
import { Accordion, Col, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import nftServices from '@/services/nft'
import Loading from '@/components/common/loading'
import { selectNFTDetails } from '@/store/nft/selectors'
import Link from 'next/link'
import { selectDataUser } from '@/store/user/selectors'
import { collectionLaunchPadUrl, collectionUrl } from '@/constants/url'

const MoreNFTs = () => {
    const { t } = useTransHook()
    const [nftList, setNftList] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const nftDetail = useSelector(selectNFTDetails)
    const user = useSelector(selectDataUser)

    useEffect(() => {
        if (nftDetail?.collection?.address) {
            ;(async () => {
                try {
                    let res: any = {}
                    if (!nftDetail.launchpadId) {
                        res = await nftServices.getNFTByCollection({
                            page: 1,
                            limit: 6,
                            collectionAddress: nftDetail.collection.address,
                            currentNftId: nftDetail.nftId,
                            userId: user?.id,
                            networkId: nftDetail?.network?.networkId,
                        })
                    } else {
                        res = await nftServices.getNFTsCollectionLaunchpad({
                            page: 1,
                            limit: 6,
                            launchpadId: nftDetail.launchpadId,
                            userId: user?.id,
                        })
                    }

                    if (res.list) {
                        setNftList(res.list)
                    }

                    setIsLoading(false)
                } catch (error) {
                    setIsLoading(false)
                }
            })()
        }
    }, [nftDetail, user?.id])

    return (
        <Accordion defaultActiveKey={'0'}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Image
                        src="/svgs/menu-icon.svg"
                        width={17}
                        height={14}
                        alt="menu-alt"
                    />
                    {t('MORE_NFTS')}
                </Accordion.Header>
                <Accordion.Body>
                    {isLoading ? (
                        <div>
                            <Loading />
                        </div>
                    ) : null}
                    <Row lg={6} md={4} xs={2} className="g-3 g-lg-4">
                        {/* eslint-disable no-unused-vars */}
                        {nftList.map((nft, index) => (
                            <Col key={index}>
                                <NFTCard data={nft} />
                            </Col>
                        ))}
                    </Row>
                    {!isLoading && (
                        <div className="flex-center mt-8">
                            <Link
                                href={
                                    nftDetail?.launchpadId
                                        ? collectionLaunchPadUrl(
                                              nftDetail.launchpadId,
                                          )
                                        : collectionUrl(
                                              nftDetail?.collection.address,
                                              nftDetail.network.networkName,
                                          )
                                }
                            >
                                <a className="action-button">
                                    {t('VIEW_ALL_COLLECTION')}
                                </a>
                            </Link>
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default MoreNFTs
