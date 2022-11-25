export function addressSplice(
    address: string,
    start: number = 0,
    end: number = 0,
) {
    if (!address) return undefined
    return (
        address.substring(0, start) +
        '...' +
        address.substring(address.length - end, address.length)
    )
}

export function numberToHexadecimal(value: number | string) {
    return '0x' + Number(value).toString(16)
}

export function hexadecimalToNumber(hex: string) {
    return parseInt(hex, 16)
}
