import React from 'react'
const AwardHeader2022 = () => {
    return (
        <>
            <div id="ultraman" className="mainultraman ">
                <div className="ultraman-header"></div>
            </div>
        </>
    )
}

export default AwardHeader2022

/* eslint-disable */
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { Dropdown } from 'react-bootstrap'
// // import styles from './style.module.scss'
// import styles from '../../components/layout/header/style.module.scss'
// import { AWARD_SUPPORTED_LANGUAGES } from '@/constants/awardLanguages'
// import Image from 'next/image'

//  const AwardHeader2022 = () => {
//     const { locale, asPath } = useRouter()
//     const filteredSupportedLanguages = AWARD_SUPPORTED_LANGUAGES.filter(
//         (lang) => lang.locale !== locale,
//     )

//     const currentLanguage = AWARD_SUPPORTED_LANGUAGES.find(
//         (lang) => lang.locale === locale,
//     )
// console.log(filteredSupportedLanguages,"filteredSupportedLanguages")
//     return (
//         <>
//         <Dropdown className={styles['dropdown-languages']}>
//             <Dropdown.Toggle variant="default">
//                 <div className={styles['dropdown-languages__selected']}>
//                     <img
//                         src={currentLanguage?.logo as string}
//                         alt={currentLanguage?.name}
//                         width={30}
//                         height={30}
//                     />
//                 </div>
//             </Dropdown.Toggle>
//             <Dropdown.Menu className={styles['dropdown-languages__list']}>
//                 {filteredSupportedLanguages.map((lang, index) => (
//                     <li key={index}>
//                         <Link href={asPath} locale={lang.locale}>
//                             <img
//                                 src={lang.logo}
//                                 alt={lang.name}
//                                 width={28}
//                                 height={28}
//                             />
//                         </Link>
//                     </li>
//                 ))}
//             </Dropdown.Menu>
//         </Dropdown>
//         </>
//     )
// }

// export default AwardHeader2022
