/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import NFTCard from '@/components/common/nft-card'
import React, { useState } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import styles from './styles.module.scss'
import Pagination from '@/components/ui/pagination'
import { Pagination as BPagination } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'

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

console.log(nftsList)

const listFilter = ['Price: High to Low', 'Most Liked', 'On Auction']

const DetailRankingPage = () => {
    const [showLayout, setShowLayout] = useState(6)

    const [active, setActive] = useState(listFilter[0])

    const { t } = useTransHook()

    return (
        <div className={styles['main']}>
            <div className={styles['filter-page']}>
                <div className={styles['form-btn']}>
                    <div
                        onClick={() => setShowLayout(4)}
                        className={styles['view-btn-first']}
                    >
                        <div>
                            <img
                                className={styles['form-btn-left']}
                                src="/svgs/view-btn-first.svg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        onClick={() => setShowLayout(5)}
                        className={styles['view-btn-right']}
                    >
                        <div>
                            <img
                                className={styles['form-btn-right']}
                                src="/svgs/view-btn-second.svg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <Dropdown className={styles['drop-down']}>
                    <Dropdown.Toggle className={styles['drop-down-list']}>
                        {active}
                        <img
                            className={styles['filter-img']}
                            src="/svgs/filter-award.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles['menu-show-items']}>
                        {listFilter.map((item, i) => (
                            <Dropdown.Item
                                className={
                                    active === item
                                        ? styles['filter-items__active']
                                        : styles['filter-items']
                                }
                                key={i}
                                onClick={() => {
                                    setActive(item)
                                }}
                            >
                                <div className={styles['dot-items']}></div>
                                {t(item)}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <Container fluid className={styles['content-card']}>
                <Row xs={1} md={showLayout} className="g-4">
                    {nftsList.map((nft, index) => (
                        <Col key={index}>
                            <NFTCard data={nft} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <div className={styles['auction-ranking-pagination']}>
                <Pagination>
                    <BPagination.First />
                    <BPagination.Prev />
                    <BPagination.Item>{1}</BPagination.Item>
                    <BPagination.Ellipsis />

                    <BPagination.Item>{10}</BPagination.Item>
                    <BPagination.Item>{11}</BPagination.Item>
                    <BPagination.Item active>{12}</BPagination.Item>
                    <BPagination.Item>{13}</BPagination.Item>
                    <BPagination.Item disabled>{14}</BPagination.Item>

                    <BPagination.Ellipsis />
                    <BPagination.Item>{20}</BPagination.Item>
                    <BPagination.Next />
                    <BPagination.Last />
                </Pagination>
            </div>
        </div>
    )
}

export default DetailRankingPage
