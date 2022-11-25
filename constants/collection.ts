export const IMAGE_TYPE_UPLOAD = {
    USER_AVATAR: 'user_avatar',
    USER_COVER: 'user_cover',
    COLLECTION: 'collection',
    COLLECTION_COVER: 'collection_cover',
}

export enum DURATION {
    // eslint-disable-next-line no-unused-vars
    DAY = 1,
    // eslint-disable-next-line no-unused-vars
    WEEK = 7,
    // eslint-disable-next-line no-unused-vars
    MONTH = 30,
    // eslint-disable-next-line no-unused-vars
    ALL = 0,
}

export const exploreLink = (address: string, network: string) => {
    switch (network.toLowerCase()) {
        case 'ethereum':
            return `https://etherscan.io/address/${address}`
        case 'bsc':
            return `https://bscscan.com/address/${address}`
        case 'polygon':
            return `https://polygonscan.com/address/${address}`

        default:
            return `https://etherscan.io/address/${address}`
    }
}

export enum CollectionSort {
    // eslint-disable-next-line no-unused-vars
    VOLUME_DESC = 0,
    // eslint-disable-next-line no-unused-vars
    VOLUME_ASC = 1,
    // eslint-disable-next-line no-unused-vars
    PRICE_CHANGE_DAY_DESC = 2,
    // eslint-disable-next-line no-unused-vars
    PRICE_CHANGE_DAY_ASC = 3,
    // eslint-disable-next-line no-unused-vars
    PRICE_CHANGE_WEEK_DESC = 4,
    // eslint-disable-next-line no-unused-vars
    PRICE_CHANGE_WEEK_ASC = 5,
    // eslint-disable-next-line no-unused-vars
    FLOOR_DESC = 6,
    // eslint-disable-next-line no-unused-vars
    FLOOR_ASC = 7,
    // eslint-disable-next-line no-unused-vars
    OWNERS_DESC = 8,
    // eslint-disable-next-line no-unused-vars
    OWNERS_ASC = 9,
    // eslint-disable-next-line no-unused-vars
    ITEMS_DESC = 10,
    // eslint-disable-next-line no-unused-vars
    ITEMS_ASC = 11,
}
