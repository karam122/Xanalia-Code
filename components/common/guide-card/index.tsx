import { useTransHook } from '@/locales/hooks'
import XanaliaBrand from '@/public/images/xanalia-brand.webp'
import Image from 'next/image'
import styles from './style.module.scss'

interface IGuideCard {
    title: string
    redirectUrl: string
}

const GuideCard = ({ title, redirectUrl }: IGuideCard) => {
    const { t } = useTransHook()

    return (
        <a href={redirectUrl} target="_blank" rel="noreferrer">
            <div className={styles['guide-card']}>
                <div className={styles['guide-card__image']}>
                    <Image src={XanaliaBrand} alt={t(title)} layout="fill" />
                </div>
                <div className={`${styles['guide-card__title']} heading--4`}>
                    {t(title)}
                </div>
            </div>
        </a>
    )
}

export default GuideCard
