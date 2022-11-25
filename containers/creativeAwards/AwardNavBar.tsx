import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dropdown } from 'react-bootstrap'
import styles from '../../components/layout/header/style.module.scss'
import { AWARD_SUPPORTED_LANGUAGES } from '@/constants/awardLanguages'

const AwardNavBar = () => {
    const { locale, asPath } = useRouter()
    const filteredSupportedLanguages = AWARD_SUPPORTED_LANGUAGES.filter(
        (lang) => lang.locale !== locale,
    )

    const currentLanguage = AWARD_SUPPORTED_LANGUAGES.find(
        (lang) => lang.locale === locale,
    )
    console.log(currentLanguage, 'currentLanguage')

    return (
        <>
            <Dropdown className={styles['dropdown-languages']}>
                <Dropdown.Toggle variant="default">
                    <div className={styles['dropdown-languages__selected']}>
                        <img
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
                            <Link href={asPath} locale={lang.locale} passHref>
                                <img
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
        </>
    )
}

export default AwardNavBar
