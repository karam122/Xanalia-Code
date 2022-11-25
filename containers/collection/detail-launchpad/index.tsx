/* eslint-disable @next/next/no-img-element */
/* eslint-disable */

import Tab from '@/components/ui/tab'
import Tabs from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { SSRProvider } from 'react-bootstrap'
import style from './style.module.scss'
import { useTransHook } from '@/locales/hooks'
import collectionServices from '@/services/collection'
import { roundNumber } from '@/utils/number'
import { useRouter } from 'next/router'
import NFTByFilter, { filterTypes } from './nft-by-filter'
import TabDefault from './tab-default'
import Loading from '@/components/common/loading'
import { toast } from 'react-toastify'
// import ActivityCollections from './activity'

const CollectionsPage = () => {
    const { t } = useTransHook()

    const [collectionInfo, setCollectionInfo] = useState<any>({})

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()
    const { launchpadId } = router.query

    const query = {
        launchpadId: launchpadId,
    }

    useEffect(() => {
        const fetchCollectionDetail = async () => {
            try {
                setIsLoading(true)
                const collectionInfo =
                    await collectionServices.getCollectionLaunchPadInfo(query)
                if (collectionInfo.id) {
                    setCollectionInfo(collectionInfo)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    // router.push('/404')
                }
            } catch (error: any) {
                setIsLoading(false)
                toast.error(error.message)
            }
        }
        fetchCollectionDetail()
    }, [])

    return (
        <div className={style['collection-detail-container']}>
            {isLoading && (
                <div className={style['center-page']}>
                    <Loading />
                </div>
            )}
            {!isLoading && collectionInfo && (
                <>
                    <div className={style['content-first']}>
                        <div className={style['content-first-1']}>
                            <img
                                className={style['content-first-1-bg']}
                                src={collectionInfo?.bannerImage}
                                alt="collection-banner-alt"
                            />
                        </div>
                        <div className={style['content-first-2']}>
                            <div className={style.artist}>
                                <img
                                    className={style['logo-header']}
                                    src={collectionInfo.iconImage}
                                    alt="collection-logo-alt"
                                    width={115}
                                    height={115}
                                />
                            </div>
                            <div className="points">
                                <div
                                    className={`${style['content-first-text-header']} heading--2`}
                                    title={collectionInfo.name}
                                >
                                    {collectionInfo.name}
                                    <span
                                        className={`${
                                            collectionInfo.isOfficial === 1 &&
                                            style['collection-off-logo-name']
                                        }`}
                                    ></span>
                                </div>
                                <div
                                    className={`${style['content-first-table']}`}
                                >
                                    <div className={style['table-child']}>
                                        <div
                                            className={
                                                style['table-child-title']
                                            }
                                        >
                                            {collectionInfo.totalNft || 0}
                                        </div>
                                        <div
                                            className={
                                                style[
                                                    'table-child-title-content'
                                                ]
                                            }
                                        >
                                            {t('NFTs')}
                                        </div>
                                    </div>
                                    <div className={style['line']}></div>
                                    <div className={style['table-child']}>
                                        <div
                                            className={
                                                style['table-child-title']
                                            }
                                        >
                                            {collectionInfo.totalOwner || 0}
                                        </div>
                                        <div
                                            className={
                                                style[
                                                    'table-child-title-content'
                                                ]
                                            }
                                        >
                                            {t('OWNERS')}
                                        </div>
                                    </div>
                                    <div className={style['line']}></div>

                                    <div className={style['table-child']}>
                                        <div
                                            className={
                                                style['table-child-title']
                                            }
                                        >
                                            {/* <img
                                                className={
                                                    style['ethereum-icon']
                                                }
                                                src="/svgs/ethereum-icon.svg"
                                                alt=""
                                            /> */}
                                            <svg
                                                style={{
                                                    width: '13px',
                                                    marginRight: '7px',
                                                }}
                                                height="30"
                                                viewBox="0 0 20 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clip-path="url(#clip0_1813_8)">
                                                    <path
                                                        opacity="0.6"
                                                        d="M9.99122 11.1006L0 15.2797L9.99122 20.7226L19.9945 15.2797L9.99122 11.1006Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.45"
                                                        d="M0 15.2754L9.99122 20.7182V0L0 15.2754Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.8"
                                                        d="M9.99707 0V20.7182L20.0003 15.2754L9.99707 0Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.45"
                                                        d="M0 17.0303L9.99122 30V22.462L0 17.0303Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.8"
                                                        d="M9.99707 22.462V30L20.0003 17.0303L9.99707 22.462Z"
                                                        fill="black"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1813_8">
                                                        <rect
                                                            width="20"
                                                            height="30"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            {roundNumber(
                                                collectionInfo.floorPrice,
                                                6,
                                            ) || 0}
                                        </div>
                                        <div
                                            className={
                                                style[
                                                    'table-child-title-content'
                                                ]
                                            }
                                        >
                                            {t('FLOOR_PRICE')}
                                        </div>
                                    </div>
                                    <div className={style['line']}></div>

                                    <div className={style['table-child']}>
                                        <div
                                            className={
                                                style['table-child-title']
                                            }
                                        >
                                            {/* <img
                                                className={
                                                    style['ethereum-icon']
                                                }
                                                src="/svgs/ethereum-icon.svg"
                                                alt=""
                                            /> */}
                                            <svg
                                                style={{
                                                    width: '13px',
                                                    marginRight: '7px',
                                                }}
                                                height="30"
                                                viewBox="0 0 20 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clip-path="url(#clip0_1813_8)">
                                                    <path
                                                        opacity="0.6"
                                                        d="M9.99122 11.1006L0 15.2797L9.99122 20.7226L19.9945 15.2797L9.99122 11.1006Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.45"
                                                        d="M0 15.2754L9.99122 20.7182V0L0 15.2754Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.8"
                                                        d="M9.99707 0V20.7182L20.0003 15.2754L9.99707 0Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.45"
                                                        d="M0 17.0303L9.99122 30V22.462L0 17.0303Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.8"
                                                        d="M9.99707 22.462V30L20.0003 17.0303L9.99707 22.462Z"
                                                        fill="black"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1813_8">
                                                        <rect
                                                            width="20"
                                                            height="30"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            {roundNumber(
                                                collectionInfo.volumeTraded,
                                                6,
                                            ) || 0}
                                        </div>
                                        <div
                                            className={
                                                style[
                                                    'table-child-title-content'
                                                ]
                                            }
                                        >
                                            {t('VOLUME_TRADED')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style['content-second']}>
                        <TabDefault
                            collectionName={collectionInfo.name}
                            collectionDescription={collectionInfo.description}
                            userData={collectionInfo.user}
                        />
                    </div>
                    <div className={style['content-third']}>
                        <SSRProvider>
                            <Tabs unmountOnExit={true}>
                                {filterTypes.map((filter, index) => (
                                    <Tab
                                        eventKey={filter}
                                        key={index}
                                        title={t(filter.toUpperCase())}
                                    >
                                        <NFTByFilter filter={filter} />
                                    </Tab>
                                ))}
                                {/* <Tab eventKey="activity" title={t('ACTIVITY')}>
                                    <ActivityCollections
                                        collectionId={collectionInfo.id}
                                    />
                                </Tab> */}
                            </Tabs>
                        </SSRProvider>
                    </div>
                </>
            )}
        </div>
    )
}

export default CollectionsPage
