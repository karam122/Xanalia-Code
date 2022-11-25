import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { isMobile } from 'react-device-detect'
import PrivacyModal from './privacyPolicy/privacyPolicyModal'

const AwardFooter = () => {
    const [show, setShow] = useState(false)

    const openPrivacyModal = () => setShow(true)
    const closePrivacyModal = () => setShow(false)

    return (
        <div id="award-footer" className="position-relative">
            <footer className="awardFooterCls">
                <img
                    src="https://ik.imagekit.io/xanalia/Images/footer-logo.svg"
                    alt="logo"
                    title="footer logo"
                />
                <p>
                    {/* <FormattedMessage id={'privacyPolicy'}></FormattedMessage> */}
                    <a className="nav-icon btn" onClick={openPrivacyModal}>
                        <FormattedMessage
                            id={'privacyPolicy'}
                        ></FormattedMessage>
                    </a>
                    <a
                        className="nav-icon btn"
                        target="_blank"
                        rel="noreferrer"
                        href={
                            isMobile
                                ? 'mailto:Contact@noborderz.com'
                                : 'https://mail.google.com/mail/?view=cm&fs=1&to=Contact@noborderz.com'
                        }
                    >
                        <FormattedMessage id={'Inquiries'}></FormattedMessage>
                    </a>
                </p>
                <p>
                    {' '}
                    <FormattedMessage
                        id={'awardXanaliaNFTArtWorld'}
                    ></FormattedMessage>
                </p>
            </footer>
            <PrivacyModal show={show} closeModal={closePrivacyModal} />
        </div>
    )
}

export default AwardFooter
