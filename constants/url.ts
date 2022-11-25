export const collectionUrl = (
    address: string | undefined,
    networkName: string | undefined,
): string => {
    return `/collection/${networkName}/${address}`
}

export const collectionLaunchPadUrl = (
    id: number | undefined | null,
): string => {
    return `/collection-launchpad/${id}`
}

export const marketplaceUrl = (tab?: undefined | string) => {
    if (tab) {
        return `/marketplace?tab=${tab}`
    }
    return `/marketplace`
}

export const collectionRankingUrl = () => {
    return `/statistics/ranking`
}

export const myCollectionsUrl = '/my-items?tab=collection'

export const createCollectionsUrl = `/create/collection`

export const profileUrl = (address: string | undefined) => {
    return `/profile/${address}`
}

export const imgurl = (url: string | undefined | null) => {
    const DefaultAvt = '/images/default-user.webp'
    if (!url || url.endsWith('null') || url.endsWith('.com')) return DefaultAvt

    return url
}

export const twitterLink = (username: string | null | undefined) =>
    `https://twitter.com/${username}`
