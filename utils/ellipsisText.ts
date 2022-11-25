export const ellipsisText = (
    text: string | undefined | null,
    limit: number,
) => {
    if (text && text.length > limit) {
        return text.slice(0, limit) + '...'
    }
    return text
}
