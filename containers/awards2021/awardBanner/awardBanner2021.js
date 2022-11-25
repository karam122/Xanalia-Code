import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { bannerVideo } from '../../../public/assets/CDN/CdnLinks'
import LoginModal from '../../containers/awards/award-login/awardLoginModal'
import { withRouter } from 'next/router'

import { connect } from 'react-redux'

import { setSelectedTab } from '_actions/market.actions'
class AwardBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginModal: this?.props?.router?.query?.apply ? true : false,
        }
    }
    showLoginModal = () => {
        // this.props?.router?.push(this?.props?.router?.pathname)
        this.setState({
            loginModal: true,
        })
    }

    hideLoginModal = (goBack = false) => {
        if (goBack && this.props.router?.query?.apply) {
            this.props.router.goBack()
        }
        this.setState({
            loginModal: false,
        })
    }

    RedirectMarket = (awards2021) => {
        this.props?.setSelectedTab(awards2021)
        window.open('/market')
    }
    RedirectMarket = (awards2021) => {
        this.props?.setSelectedTab(awards2021)
        window.open('/market')
    }

    render() {
        const language =
            typeof window !== 'undefined' && localStorage.getItem('lang')
        return (
            <>
                <div id="eventOutline banner_section">
                    <h1 className="heroHeadingPhone p-view">
                        {' '}
                        WORLD&apos;S FIRST! <br /> NFTART <br /> COMPETITION{' '}
                    </h1>
                    <Jumbotron className="heroHeader yello_glob">
                        <div className="video-bg">
                            <video loop autoPlay muted playsInline>
                                <source
                                    src={bannerVideo}
                                    type="video/mp4"
                                ></source>
                            </video>
                        </div>
                        <h1 className="d-view">
                            WORLD LEADING
                            <br /> NFTART <br /> COMPETITION
                        </h1>
                        {/* <h4> <h5> <FormattedMessage id={'worldsFirst!'}></FormattedMessage> <span> ( <FormattedMessage id={'MethodCompetition!'}></FormattedMessage> ) </span> </h5> <br /> */}
                        {/* <h5> <FormattedMessage id={'awardNFTArt'}></FormattedMessage> </h5> <br /> <h5> <FormattedMessage id={'competition'}></FormattedMessage> </h5> </h4> */}
                        {/* <button className={`visti_btn ${language === "en" ? "en_btn" : "jp_btn"}`} 
                        onClick={() => this.RedirectMarket("awards2021")} */}
                        {/* //onClick={() => this.props.history.push({ pathname: "/", search: "?award2021", state: { "award2021": true } })} */}

                        {/* > <FormattedMessage id="visitExhibition" /> </button> */}
                        <div className="goldAwardPrize">
                            <h5 className="text-uppercase">
                                Gold <br />
                                Award Prize
                            </h5>
                            <h2>10,000</h2>
                            <h3>
                                US <span>$</span>
                            </h3>
                        </div>
                        {/* <p className="bounce-1"> SCROLL </p> */}
                        {/* Entry box End */}
                        <LoginModal
                            show={this.state.loginModal}
                            handleClose={this.hideLoginModal}
                            openSignin={this.showLoginModal}
                            match={this.props.router?.query}
                        />
                    </Jumbotron>
                </div>
                <div>
                    <div className="text-center applyNow ">
                        {/* <button className="btn_apply" onClick={this.showLoginModal}><FormattedMessage id={'applyNow'}></FormattedMessage> </button> */}
                        {/* <a href='https://www.xanalia.com/market' target="_blank">  */}
                        <button
                            className={`btn_apply visit ${
                                language === 'en' ? 'en_btn' : 'jp_btn'
                            }`}
                            onClick={() => this.RedirectMarket('awards2021')}
                        >
                            {' '}
                            <FormattedMessage
                                id={'visitExhibition'}
                            ></FormattedMessage>
                        </button>
                        {/* </a> */}
                    </div>
                </div>
            </>
        )
    }
}

// export default withRouter(AwardBanner);

const mapDispatchToProps = {
    setSelectedTab,
}

export default connect(null, mapDispatchToProps)(withRouter(AwardBanner))
