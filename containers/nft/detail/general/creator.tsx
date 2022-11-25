import { useTransHook } from '@/locales/hooks'
import Image from 'next/image'
import { Accordion } from 'react-bootstrap'
import styles from './style.module.scss'
import Link from 'next/link'
import { ButtonGroup, Button } from 'react-bootstrap'
import { selectNFTDetails } from '@/store/nft/selectors'
import { useSelector } from 'react-redux'
import Twitter from '@/public/svgs/twitter.svg'
import Insta from '@/public/svgs/instagram.svg'
import { twitterLink } from '@/constants/url'
import { sliceAddress } from '@/utils/addressFormat'
const DefaultAvt = '/images/default-user.webp'

const imgurl = (url: string | undefined | null) => {
    if (!url || url.endsWith('null')) return DefaultAvt

    return url
}
const isLink = (link: string | undefined) => {
    if (!link || link === null) return false
    console.log('🚀 ~ file: creator.tsx ~ line 19 ~ isLink ~ link', link)
    return link.length > 1
}
const Creator = () => {
    const { t } = useTransHook()
    const nftDetails = useSelector(selectNFTDetails)
    const creator = nftDetails?.creator

    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <Image
                    src="/svgs/menu-icon.svg"
                    width={17}
                    height={14}
                    alt="menu-alt"
                />
                {t('CREATOR')}
            </Accordion.Header>
            <Accordion.Body>
                <div className={`${styles['creator__body']}`}>
                    <div>
                        <Link href={`/profile/${creator?.address}`} passHref>
                            <div className={styles['creator__header']}>
                                <div
                                    className={`${styles['creator__avatar']} ${
                                        creator?.role === 4
                                            ? styles['artist']
                                            : ''
                                    }`}
                                >
                                    <img
                                        src={imgurl(creator.avatar)}
                                        alt="avatar-creator-alt"
                                        // layout="fill"
                                    />
                                </div>
                                <div
                                    className={`${styles['creator__name']} text-body--04"`}
                                    title={
                                        creator?.name
                                            ? creator.name
                                            : creator?.address
                                    }
                                >
                                    {creator?.name
                                        ? creator.name
                                        : sliceAddress(creator?.address)}
                                </div>
                            </div>
                        </Link>

                        <div className={styles['creator__description']}>
                            {creator?.description}
                        </div>
                    </div>

                    <ButtonGroup
                        aria-label="Basic example"
                        className={`socialIcon-btn-group ${styles['social-buttons']}`}
                    >
                        <Button
                            disabled={!isLink(creator.twitterLink)}
                            variant="secondary"
                            href={twitterLink(creator?.twitterLink)}
                            target="_blank"
                        >
                            <Twitter />
                        </Button>
                        {/* <Button
                                variant="secondary"
                                href={creator?.facebookLink}
                                target="_blank"
                            >
                                <FB />
                            </Button> */}
                        <Button
                            variant="secondary"
                            href={creator?.instagramLink}
                            disabled={!isLink(creator?.instagramLink)}
                            target="_blank"
                        >
                            <Insta />
                        </Button>
                    </ButtonGroup>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Creator
