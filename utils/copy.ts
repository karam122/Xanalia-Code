export default async function copyText(text: string) {
    if (typeof navigator !== 'undefined') {
        return await navigator.clipboard
            .writeText(text)
            .then(() => true)
            .catch(() => false)
    } else if (typeof window !== 'undefined') {
        const input = document.createElement('input')
        try {
            input.innerHTML = text
            document.body.appendChild(input)
            input.select()
            return document.execCommand('copy')
        } finally {
            document.body.removeChild(input)
        }
    }
}
