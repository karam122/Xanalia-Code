/* eslint-disable */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dropdown } from 'react-bootstrap'
import styles from './style.module.scss'
import { SUPPORTED_LANGUAGES } from '@/constants/languages'
import Image from 'next/image'

export const ToggleLocale = () => {
    const { locale, asPath } = useRouter()
    const filteredSupportedLanguages = SUPPORTED_LANGUAGES.filter(
        (lang) => lang.locale !== locale,
    )

    const currentLanguage = SUPPORTED_LANGUAGES.find(
        (lang) => lang.locale === locale,
    )

    return (
        <Dropdown className={styles['dropdown-languages']}>
            <Dropdown.Toggle variant="default">
                <div className={styles['dropdown-languages__selected']}>
                    <Image
                        src={currentLanguage?.logo as string}
                        alt={currentLanguage?.name}
                        width={30}
                        height={30}
                    />
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles['dropdown-languages__list']}>
                {filteredSupportedLanguages.map((lang, index) => (
                    <li key={index}>
                        <Link href={asPath} locale={lang.locale}>
                            <Image
                                src={lang.logo}
                                alt={lang.name}
                                width={28}
                                height={28}
                            />
                        </Link>
                    </li>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ToggleLocale
