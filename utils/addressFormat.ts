export const formatAddress = (address: string) => {
    if (!address) return ''
    return address.slice(0, 6)
}

export const artistLink = (address: string) => {
    return `/profile/${address}`
}

export const sliceAddress = (address: string | undefined) => {
    if (address) {
        return address.slice(0, 6) + '...' + address.slice(address.length - 4)
    }
    return address
}
