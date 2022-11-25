import { Navbar, Dropdown } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { useTransHook } from '@/locales/hooks'
import { AWARD_SUPPORTED_LANGUAGES } from '@/constants/awardLanguages'

const AwardHeader = () => {
    // const { t } = useTransHook()
    const { locale, asPath } = useRouter()
    const filteredSupportedLanguages = AWARD_SUPPORTED_LANGUAGES.filter(
        (lang) => lang.locale !== locale,
    )

    const currentLanguage = AWARD_SUPPORTED_LANGUAGES.find(
        (lang) => lang.locale === locale,
    )
    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                variant="dark"
                className="mainHeader award"
            >
                <Navbar.Brand>
                    <img
                        className="d-img"
                        src="https://ik.imagekit.io/xanalia/assestimagesaward/brandLogo.svg"
                        title="Company Logo"
                        alt="top nft marketplace"
                    />
                    {/* <img className="p-img" src="https://ik.imagekit.io/xanalia/assestimagesaward/brandLogophone.svg" title="Company Logo phone view" alt="digital art nft market" /> */}
                </Navbar.Brand>
                <div className="right-col">
                    <div className="lang-flex language-dropdown">
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {currentLanguage?.locale === 'ja'
                                    ? currentLanguage.name
                                    : currentLanguage.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {filteredSupportedLanguages.map(
                                    (lang, index) => (
                                        <li key={index}>
                                            <Link
                                                href={asPath}
                                                locale={lang.locale}
                                                passHref
                                            >
                                                <div>{lang.name}</div>
                                            </Link>
                                        </li>
                                    ),
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                {/* <div className="right-col">
                    <div className="lang-flex language-dropdown"> */}
                {/* <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.langVal === "ja" ? intl.formatMessage({ id: "japanese" }) : intl.formatMessage({ id: "english" })}
              </Dropdown.Toggle> */}
                {/* <Dropdown.Menu>
                <Dropdown.Item value="en" style={this.state.langVal === "en" ? { display: "none" } : {}} onClick={() => this.handleChange("en")}>{intl.formatMessage({ id: "english" })}</Dropdown.Item>
                <Dropdown.Item value="ja" style={this.state.langVal === "ja" ? { display: "none" } : {}} onClick={() => this.handleChange("ja")}>{intl.formatMessage({ id: "japanese" })}</Dropdown.Item>
              </Dropdown.Menu> */}
                {/* </Dropdown> */}
                {/* </div> */}
                {/* {!(location && location?.includes("/xanalia_nftart_award_2021")) && <Button onClick={this.props.handleOpen} className="menuButton navbar-toggler d-block" variant="light">
            <span id="navbar-toggler-icon" className="navbar-toggler-icon"></span>
          </Button>} */}
                {/* </div> */}
            </Navbar>
        </>
    )
}

export default AwardHeader
