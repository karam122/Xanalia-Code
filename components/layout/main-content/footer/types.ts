export type FooterLinkType = {
    label: string
    items: { label: string; href?: string }[]
}
export type FooterProps = {
    items: FooterLinkType[]
}
