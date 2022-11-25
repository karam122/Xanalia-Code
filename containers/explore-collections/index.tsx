import CollectionCard from '@/components/common/collection-card'
import { AppDispatch } from '@/store'
import { getMarketCollections } from '@/store/collection/listMarketSlice'
import { selectListMarketCollection } from '@/store/collection/selectors'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/components/common/loading'

import PaginationComponent from '@/components/ui/pagination/pagination-component'
import { changePage } from '@/store/collection/listMarketSlice'
import { collectionGridClass } from '@/constants/nft'
// const allCollections = [
//     {
//         id: 1,
//         name: 'Alo',
//         description: '',
//         symbol: 'K',
//         type: 1,
//         address: 'hjbjkjkkjhkh',
//         iconImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         bannerImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         contractAddress: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//         status: 1,
//         hashTransaction: '',
//         owner: {
//             address: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//             name: 'Chinh',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         network: {
//             id: 1,
//             name: 'ETHERIUM',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         createdAt: '',
//         updatedAt: '',
//         totalNftOnSale: 10,
//         totaNft: 100,
//     },
//     {
//         id: 1,
//         name: 'Alo',
//         description: '',
//         symbol: 'K',
//         type: 1,
//         iconImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         bannerImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         contractAddress: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//         status: 1,
//         hashTransaction: '',
//         owner: {
//             address: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//             name: 'Chinh',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         network: {
//             id: 1,
//             name: 'ETHERIUM',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         createdAt: '',
//         updatedAt: '',
//         totalNftOnSale: 10,
//         totaNft: 100,
//     },
//     {
//         id: 1,
//         name: 'Alo',
//         description: '',
//         symbol: 'K',
//         type: 1,
//         iconImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         bannerImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         contractAddress: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//         status: 1,
//         hashTransaction: '',
//         owner: {
//             address: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//             name: 'Chinh',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         network: {
//             id: 1,
//             name: 'ETHERIUM',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         createdAt: '',
//         updatedAt: '',
//         totalNftOnSale: 10,
//         totaNft: 100,
//     },
//     {
//         id: 1,
//         name: 'Alo',
//         description: '',
//         symbol: 'K',
//         type: 1,
//         iconImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         bannerImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         contractAddress: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//         status: 1,
//         hashTransaction: '',
//         owner: {
//             address: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//             name: 'Chinh',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         network: {
//             id: 1,
//             name: 'ETHERIUM',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         createdAt: '',
//         updatedAt: '',
//         totalNftOnSale: 10,
//         totaNft: 100,
//     },
//     {
//         id: 1,
//         name: 'Alo',
//         description: '',
//         symbol: 'K',
//         type: 1,
//         iconImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         bannerImage:
//             'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         contractAddress: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//         status: 1,
//         hashTransaction: '',
//         owner: {
//             address: '0x325c12a38e1d4c84DAF40041eaE7C3B6D44F46FE',
//             name: 'Chinh',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         network: {
//             id: 1,
//             name: 'ETHERIUM',
//             avatar: 'https://storage.xanalia.com/output/nft-image/8/1654749684189_2.jpeg',
//         },
//         createdAt: '',
//         updatedAt: '',
//         totalNftOnSale: 10,
//         totaNft: 100,
//     },
// ]

const ExploreCollections = () => {
    const { data, isLoading, pageSize, current, total } = useSelector(
        selectListMarketCollection,
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            getMarketCollections({
                page: current,
                limit: pageSize,
            }),
        )
    }, [])

    const setPage = (i: number) => {
        dispatch(getMarketCollections({ page: i, limit: pageSize }))
        dispatch(changePage(i))
    }

    return (
        <Container fluid>
            {isLoading ? (
                <div className="flex-center min-h-[60vh]">
                    <Loading />
                </div>
            ) : (
                <Row
                    lg={5}
                    md={3}
                    xs={2}
                    className={collectionGridClass + ' min-h-[60vh]'}
                >
                    {/* eslint-disable-next-line no-unused-vars */}
                    {data.map((collection, index) => (
                        <Col key={index}>
                            <CollectionCard data={collection} />
                        </Col>
                    ))}
                </Row>
            )}

            <div className="flex justify-end mt-4">
                <PaginationComponent
                    total={total}
                    current={current}
                    pageSize={pageSize}
                    onChange={setPage}
                />
            </div>
        </Container>
    )
}

export default ExploreCollections
