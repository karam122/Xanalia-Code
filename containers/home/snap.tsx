import SnapContainer from '@/components/common/snap-container'
import SnapItem from '@/components/common/snap-item'
import nftServices from '@/services/nft'
import { loadingHomepageSectionDone } from '@/store/app/slice'
import { sliceAddress } from '@/utils/addressFormat'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Snap() {
    const [data, setData] = useState<any>([])
    const dispatch = useDispatch()

    async function getData() {
        try {
            const res = await nftServices.getSliderNFT({
                page: 1,
                limit: 12,
            })
            if (res.list) {
                setData(res.list)
            }
            dispatch(loadingHomepageSectionDone())
        } catch (error) {
            dispatch(loadingHomepageSectionDone())
            console.log(
                '🚀 ~ file: snap.tsx ~ line 94 ~ getData ~ error',
                error,
            )
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const mid = Math.floor(data.length / 2)

    return (
        <div style={{ margin: '16px 0' }}>
            {data.length > 0 && (
                <div>
                    <SnapContainer duration="100s" spaceItem="7px">
                        {data.slice(0, mid).map((obj: any) => (
                            <SnapItem
                                key={obj.nftId}
                                image={`${obj.mediaUrl}`}
                                owner={
                                    obj.owner.name
                                        ? obj.owner.name
                                        : sliceAddress(
                                              obj.owner.address,
                                          )?.toString()
                                }
                                title={obj.name}
                                link={`/assets/${obj.network.networkName}/${obj.collection.address}/${obj.tokenId}`}
                            />
                        ))}
                    </SnapContainer>
                    <div style={{ marginTop: '14px' }} />
                    <SnapContainer duration="80s" spaceItem="7px">
                        {data.slice(mid, data.length).map((obj: any) => (
                            <SnapItem
                                key={obj.nftId}
                                image={`${obj.mediaUrl}`}
                                owner={
                                    obj.owner.name
                                        ? obj.owner.name
                                        : sliceAddress(
                                              obj.owner.address,
                                          )?.toString()
                                }
                                title={obj.name}
                                link={`/assets/${obj.network.networkName}/${obj.collection.address}/${obj.tokenId}`}
                            />
                        ))}
                    </SnapContainer>
                </div>
            )}
        </div>
    )
}
