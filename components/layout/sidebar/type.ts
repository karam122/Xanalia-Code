export type ItemNavType = {
    label: string
    items: { label: string; href?: string }[]
}
export type SideBarProps = {
    items: ItemNavType[]
    icon: any
    // showMenu: boolean
}
