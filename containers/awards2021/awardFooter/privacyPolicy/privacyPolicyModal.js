import { Modal, Button } from 'react-bootstrap'
import { injectIntl, FormattedMessage } from 'react-intl'

const PrivacyPolicy = ({ show, closeModal }) => {
    return (
        <>
            <Modal
                show={show}
                size="lg"
                className="privacy-modal"
                onHide={closeModal}
                backdrop="true"
                keyboard={false}
            >
                <Modal.Body
                    className="bg-white px-5 pt-5 pb-2 rounded"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3>
                        {' '}
                        <FormattedMessage id="privacyHeading" />{' '}
                    </h3>
                    <p>
                        <FormattedMessage id="whatXanaliaDoes" />{' '}
                    </p>
                    <p>
                        <FormattedMessage id="xanaliaLocation" />
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="introductionHeading" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="introductionText" />{' '}
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="personalInfo" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="weCollectInfo" />{' '}
                    </p>
                    <ul>
                        <li>
                            <FormattedMessage id="noWalletLogin" />
                        </li>
                    </ul>

                    <p>
                        <FormattedMessage id="weMayCollect" />{' '}
                    </p>
                    <table className="table">
                        <tr>
                            <th className="fixed-size">
                                <FormattedMessage id="dataCategory" />
                            </th>
                            <th>
                                <FormattedMessage id="typesOfInfo" />
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="identityD" />
                            </td>
                            <td>
                                <FormattedMessage id="descriptionOfInfo" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="contactD" />
                            </td>
                            <td>
                                <FormattedMessage id="contactInfo" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="financeD" />
                            </td>
                            <td>
                                <FormattedMessage id="cryptowalletInfo" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="technicalAndLocationD" />
                            </td>
                            <td>
                                <FormattedMessage id="ipAddressInfo" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="profileD" />
                            </td>
                            <td>
                                <FormattedMessage id="generalInfo" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="usageD" />
                            </td>
                            <td>
                                <FormattedMessage id="servicesUseInfo" />
                            </td>
                        </tr>
                    </table>
                    <p>
                        <FormattedMessage id="useOfCookies" />
                    </p>
                    <p>
                        <FormattedMessage id="purposeOfUse" />
                    </p>
                    <ul className="privacy_list">
                        <li>
                            <FormattedMessage id="accessToService" />
                        </li>
                        <li>
                            <FormattedMessage id="relevantUpdates" />
                        </li>
                        <li>
                            <FormattedMessage id="respondToInquiries" />
                        </li>
                        <li>
                            <FormattedMessage id="toAllowOther" />
                        </li>
                    </ul>
                    <p>
                        <FormattedMessage id="ifYouShare" />
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="cookie" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="cookieDesc" />{' '}
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="sharingOf" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="weMayDisclose" />{' '}
                    </p>
                    <ul>
                        <li>
                            <FormattedMessage id="toLawEnforcement" />
                            <ol type="i">
                                <li>
                                    <FormattedMessage id="whenReq" />
                                </li>
                                <li>
                                    <FormattedMessage id="toExercise" />
                                </li>
                                <li>
                                    <FormattedMessage id="toProtect" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <FormattedMessage id="providingInfo" />
                        </li>
                    </ul>

                    <strong>
                        {' '}
                        <FormattedMessage id="security" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="professionalService" />{' '}
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="thirdParty" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="thirdPartyDesc" />{' '}
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="updatingInfo" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="toEnsureThat" />{' '}
                    </p>
                    <p>
                        <FormattedMessage id="willDelete" />{' '}
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="policyUpdate" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="weMayUpdate" />{' '}
                    </p>

                    <strong>
                        {' '}
                        <FormattedMessage id="Inquiry" />{' '}
                    </strong>
                    <p>
                        <FormattedMessage id="inquiryDesc" />{' '}
                    </p>
                </Modal.Body>
                <Modal.Footer className="bg-white justify-content-center">
                    <Button
                        className="font-weight-bold"
                        style={{ width: '100px', height: '40px' }}
                        onClick={closeModal}
                    >
                        <FormattedMessage id="closebtn" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default injectIntl(PrivacyPolicy)
