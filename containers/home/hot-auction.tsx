/* eslint-disable no-unused-vars */

import NFTCard from '@/components/common/nft-card'
import { Container, Row, Col } from 'react-bootstrap'
import TitleHeader from '@/components/common/title-header'
import ModalPreviewNFT from '@/components/common/modals/modal-preview-nft'

const nftsList = [
    {
        nftId: 10,
        name: 'NFT 022 toi la nft hahahhahhaahahahahhahahah',
        category: 1,
        marketNftStatus: 0,
        mediaUrl: '',
        tokenId: '1',
        network: {
            networkName: 'BSC',
            avatar: 'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
        },
        creator: {
            avatar: null,
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        owner: {
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            avatar: null,
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        collection: {
            address: '0xa1b1d056192f0a04f7aeffe44f5ed0ec8d746af9',
        },
        saleData: {
            fixPrice: {
                price: '10322.300000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
            auction: {
                startPrice: '12.0000000000',
                highestPrice: '12.0000000000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
        },
    },
    {
        nftId: 10,
        name: 'NFT 022 toi la nft hahahhahhaahahahahhahahah',
        category: 1,
        marketNftStatus: 0,
        mediaUrl: '',
        tokenId: '1',
        network: {
            networkName: 'BSC',
            avatar: 'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
        },
        creator: {
            avatar: null,
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        owner: {
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            avatar: null,
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        collection: {
            address: '0xa1b1d056192f0a04f7aeffe44f5ed0ec8d746af9',
        },
        saleData: {
            fixPrice: {
                price: '10322.300000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
            auction: {
                startPrice: '12.0000000000',
                highestPrice: '12.0000000000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
        },
    },
    {
        nftId: 10,
        name: 'NFT 022 toi la nft hahahhahhaahahahahhahahah',
        category: 1,
        marketNftStatus: 0,
        mediaUrl: '',
        tokenId: '1',
        network: {
            networkName: 'BSC',
            avatar: 'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
        },
        creator: {
            avatar: null,
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        owner: {
            name: '0xea631Ce3ECCf6B3506857cbba7e5ead1C752A1cA',
            avatar: null,
            address: '0xea631ce3eccf6b3506857cbba7e5ead1c752a1ca',
        },
        collection: {
            address: '0xa1b1d056192f0a04f7aeffe44f5ed0ec8d746af9',
        },
        saleData: {
            fixPrice: {
                price: '10322.300000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
            auction: {
                startPrice: '12.0000000000',
                highestPrice: '12.0000000000',
                tokenPrice: 'MAR',
                tokenPriceIcon:
                    'https://storage.xanalia.com/output/nft-image/8/1654589957209_2.jpeg',
            },
        },
    },
]

const HotAuction = () => {
    return (
        <Container fluid>
            <TitleHeader title="Hot Auction" viewAll link="/" />

            <Row xs={1} md={6} className="g-4">
                {/* eslint-disable-next-line no-unused-vars */}
                {nftsList.map((nft, index) => (
                    <Col key={index}>
                        <NFTCard data={nft} />
                    </Col>
                ))}
            </Row>

            <ModalPreviewNFT />
        </Container>
    )
}

export default HotAuction
