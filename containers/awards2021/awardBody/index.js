// import React, { Component } from 'react';
// import { Container, Col, Row } from 'react-bootstrap';
// import { Button, Accordion, Card } from 'react-bootstrap';
// import { withRouter }from 'next/router'
// import { FormattedMessage } from "react-intl";
// import LoginModal from '../../containers/awards/award-login/awardLoginModal';
// import { XanaliaLogo } from '../../../public/assets/CDN/CdnLinks';
// import { OpenDropDown } from '../../../public/assets/CDN/CdnLinks';
// import MyLazyImage from '../LazyImageLoader/LazyImageLoader';
// import AwardCard from 'component/Card/AwardCard/AwardCard';
// import { CDN_LINK_AWARD } from 'utils/constants';

// class AwardBody extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			drop: '0',
// 			loginModal: this.props.router?.query?.apply ? true : false,
// 		}
// 		this.setRotation = this.setRotation.bind(this)
// 	}

// 	showLoginModal = () => {
// 		this.props?.router?.push(this?.props?.router?.pathname)
// 		this.setState({
// 			loginModal: true
// 		})
// 	}

// 	hideLoginModal = (goBack= false) => {
// 		if(goBack && this.props.router?.query?.apply)
// 		{
// 			this.props.router.goBack()
// 		}
// 		this.setState({
// 			loginModal: false
// 		})
// 	}

// 	setRotation = (num) => {
// 		if (this.state.drop === num) {
// 			this.setState({ drop: '' })
// 		} else {
// 			this.setState({ drop: num })
// 		}
// 	}

// 	openInNewTab = () => {
// 		const newWindow = typeof window !== "undefined" && window.open("https://xanalia.com/", '_blank', 'noopener,noreferrer')
// 		if (newWindow) newWindow.opener = null
// 	}

// 	componentDidMount(){
// 		let style = document.querySelector('.entryBox').style;
// 		style.setProperty('--background', `url(${"https://ik.imagekit.io/xanalia/Images/strips.jpg"})`);
// 	}

// 	render() {
// 		const lang = typeof window !== "undefined" && localStorage.getItem('lang');
// 		return (
// 			<div id="award-body" className="mainAwardBody" style={{background: `url(${"https://ik.imagekit.io/xanalia/Images/award-bg.jpg"})` }}>
// 				<Container className="sectionBox" id="contestFlow">
// 					<div id="introducion" className="introBox">
// 						<h5> <FormattedMessage id={'introduction'}></FormattedMessage> </h5>
// 						<h2> <FormattedMessage id={'followingBeeple'}></FormattedMessage> </h2>
// 						<Row>
// 							<Col md={6} sm={12}>
// 								<p> <FormattedMessage id={'from2020to2021'}></FormattedMessage></p>

// 								<p> <FormattedMessage id={'meanwhileTheEpochMaking'}></FormattedMessage> </p>
// 							</Col>
// 							<Col md={6} sm={12}>
// 								<p> <FormattedMessage id={'thisInnovationHasEnabled'}></FormattedMessage></p>
// 								<p> <FormattedMessage id={'christieNewYork'}></FormattedMessage> </p>
// 								<p> <FormattedMessage id={'theWrldFirst'}></FormattedMessage></p>
// 							</Col>
// 						</Row>
// 					</div>
// 				</Container>

// 				<Container className="sectionBox">
// 					<div id="outline" className="eventBox">
// 						<h5> <FormattedMessage id={'outlineOfTheEvent'}></FormattedMessage> </h5>
// 						<p> <FormattedMessage id={'creatorsFromAll'}></FormattedMessage></p>
// 					</div>
// 					<div id="contest" className="flowBox">
// 						<h2> <FormattedMessage id={'contestFlow'}></FormattedMessage></h2>
// 						<hr />
// 						<ul>
// 							<li>
// 								<p className="text-center a_link" onClick={this.showLoginModal} ><FormattedMessage id={'postYourWork'}></FormattedMessage></p>
// 							</li>
// 							<li>
// 								<div className="screeningText">
// 									<p> <FormattedMessage id={'firstScreening'}></FormattedMessage></p>
// 									<hr />
// 									<p> <FormattedMessage id={'afterScreening'}></FormattedMessage></p>
// 								</div>

// 							</li>
// 							<li>
// 								<div className="text-center">
// 									<p className="text-center"> <FormattedMessage id={'auctionOfAll'}></FormattedMessage></p>
// 									<a className="flowbox_green" style={{ fontSize: "18px" }} onClick={() => this.props.router.push({ pathname: "/", search: "?award2021", query: { "award2021": true } })}> <FormattedMessage id={'https://xanalia.com/?awards2021'}></FormattedMessage></a>
// 								</div>
// 							</li>
// 							<li className="flowbox_text">
// 								<div className="text-content">
// 									<p><FormattedMessage id={'userPopularityVote'}></FormattedMessage></p>
// 									<hr />
// 									<p> <FormattedMessage id={'JudgesVote'}></FormattedMessage></p>
// 								</div>
// 								<p className="flowbox_green" ><FormattedMessage id="auctionrankupdate" /></p>
// 							</li>
// 							<li>
// 								<p className="text-center"> <FormattedMessage id={'winningEntries'}></FormattedMessage></p>
// 							</li>
// 							<li className="flowbox_text">
// 								<div className="text-content">
// 									<p className="text-center" style={{color: '#33509E'}}> <FormattedMessage id={'automaticRemittance'}></FormattedMessage></p>
// 								</div>
// 								<p className="text-center"> <FormattedMessage id={'automaticRemittance2'}></FormattedMessage></p>
// 							</li>
// 							<li>
// 								<p className="text-center"> <FormattedMessage id={'theBestThree'}></FormattedMessage></p>
// 								{/* <hr />
// 								<p> <FormattedMessage id={'theUser'}></FormattedMessage> </p> */}
// 							</li>
// 							<li>
// 								<p> <FormattedMessage id={'tradeBetweenUsers'}></FormattedMessage> </p>
// 								<hr />
// 								<p> <FormattedMessage id={'distributeSecondary'}></FormattedMessage> </p>
// 							</li>
// 						</ul>
// 					</div>
// 				</Container>

// 				<Container className="sectionBox sectionBoxPhone">
// 					<div id="award-id" className="AwardBox AwardBoxPhone">
// 						<h5> <FormattedMessage id={'award'}></FormattedMessage> </h5>
// 						<p> <FormattedMessage id={'highEndWorksWill'}></FormattedMessage></p>
// 						{/* Genaric Code for Award Card*/}
// 						<Row>
// 							<AwardCard
// 								alt="..."
// 								effect="blur"
// 								src="https://ik.imagekit.io/xanalia/Images/aWARD_ICON.svg"
// 								h4Data="1"
// 								h4SpanData="st"
// 								AwardType="Gold Award"
// 								h2Data="10,000"
// 								h3Data="US"
// 								h3SpanData="$"
// 							/>
// 							<AwardCard
// 								alt="..."
// 								effect="blur"
// 								src="https://ik.imagekit.io/xanalia/Images/aWARD_ICON.svg"
// 								h4Data="2"
// 								h4SpanData="nd"
// 								AwardType="SILVER Award"
// 								h2Data="5,000"
// 								h3Data="US"
// 								h3SpanData="$"
// 							/>
// 							<AwardCard
// 								alt="..."
// 								effect="blur"
// 								src="https://ik.imagekit.io/xanalia/Images/aWARD_ICON.svg"
// 								h4Data="3"
// 								h4SpanData="rd"
// 								AwardType="BRONZE Award"
// 								h2Data="3,000"
// 								h3Data="US"
// 								h3SpanData="$"
// 							/>
// 						</Row>
// 						<p> <FormattedMessage id={'howeverThisPrize'}></FormattedMessage> </p>
// 					</div>
// 					<Row id="application-deadline">
// 						<Col md={6} sm={12} className="mt-4 pr-md-0 applicationBox">
// 							<div className="AwardBox AwardBoxPhone">
// 								<h5><FormattedMessage id={'applicationDeadline'}></FormattedMessage> </h5>
// 								<h2>
// 									<FormattedMessage id={'firstDeadline'}></FormattedMessage> <br />
// 									<FormattedMessage id={'secondDeadline'}></FormattedMessage> <br />
// 									<FormattedMessage id={'thirdDeadline'}></FormattedMessage> <br />
// 									<FormattedMessage id={'fourthDeadline'}></FormattedMessage> <br />
// 									<FormattedMessage id={'lastDadline'}></FormattedMessage>
// 								</h2>
// 							</div>
// 						</Col>

// 						<Col md={6} sm={12} className="mt-4 pl-md-0 applicationBox">
// 							<div className="AwardBox AwardBoxPhone">
// 								<h5> <FormattedMessage id={'applicationWork01'}></FormattedMessage></h5>
// 								<h3>
// 									{lang === "en" ?
// 										<>
// 											<FormattedMessage id={'digitalArts'}></FormattedMessage> <br />
// 											<FormattedMessage id={'digitalArts2'}></FormattedMessage> <br />
// 											<FormattedMessage id={'artworkFormat'}></FormattedMessage>
// 										</>
// 										: <>
// 											<FormattedMessage id={'digitalArts'}></FormattedMessage> <br />
// 											<FormattedMessage id={'digitalArts1'}></FormattedMessage> <br />
// 											<FormattedMessage id={'artworkFormat'}></FormattedMessage>
// 										</>
// 									}

// 								</h3>

// 								<small> <FormattedMessage id={'freedomSuchAs'}></FormattedMessage> </small>
// 							</div>
// 						</Col>
// 					</Row>

// 					<div id="application-rules" className="AwardBox AwardBoxPhone mt-4">
// 						<h5> <FormattedMessage id={'applicationRules'}></FormattedMessage> </h5>
// 						<ul>
// 							<li> <FormattedMessage id={'theWorkYouHave'}></FormattedMessage> </li>
// 							<li><FormattedMessage id={'theWorkMust'}></FormattedMessage></li>
// 							<li><FormattedMessage id={'theDurationOf'}></FormattedMessage></li>
// 							<li> <FormattedMessage id={'itCanBeWith'}></FormattedMessage></li>
// 							<li><FormattedMessage id={'thoughTheCopyrights'}></FormattedMessage></li>
// 							<li> <FormattedMessage id={'theSelected'}></FormattedMessage></li>
// 							<li><FormattedMessage id={'inTheEvent'}></FormattedMessage></li>
// 						</ul>
// 					</div>

// 					<div id="important-points" className="AwardBox AwardBoxPhone mt-4">
// 						<h5> <FormattedMessage id={'theImportantPoint'}></FormattedMessage> </h5>
// 						<ul>
// 							<li> <FormattedMessage id={'ifYourWorkIs'}></FormattedMessage></li>
// 							<li> <FormattedMessage id={'howeverWorks'}></FormattedMessage></li>
// 							<li> <FormattedMessage id={'ifThereAre'}></FormattedMessage></li>
// 							<li> <FormattedMessage id={'theNumberOf'}></FormattedMessage></li>
// 							<li>
// 								<FormattedMessage id={'plagiarismCopyright'}></FormattedMessage>
// 								<ol className="list_item_num">
// 									<li><FormattedMessage id={'entriesthatviolate'}></FormattedMessage></li>
// 									<li><FormattedMessage id={'anycontentdefames'}></FormattedMessage></li>
// 									<li><FormattedMessage id={'contentthatviolate'}></FormattedMessage></li>
// 									<li><FormattedMessage id={'anyothercontent'}></FormattedMessage>
// 										<ul className="fourth_step">
// 											<li><FormattedMessage id={'violent'}></FormattedMessage></li>
// 											<li><FormattedMessage id={'discrimination'}></FormattedMessage></li>
// 											<li><FormattedMessage id={'contentthatcontains'}></FormattedMessage></li>
// 											<li><FormattedMessage id={'political'}></FormattedMessage></li>
// 											<li><FormattedMessage id={'invitationdissemination'}></FormattedMessage></li>
// 											<li><FormattedMessage id={'multilevelmarketing'}></FormattedMessage></li>
// 										</ul>
// 									</li>

// 								</ol>
// 							</li>
// 							<li> <FormattedMessage id={'theWorkWillBe'}></FormattedMessage></li>
// 						</ul>
// 					</div>

// 					<div className="AwardBox AwardBoxPhone mt-4">
//      					<h5><FormattedMessage id={'judges'} /> </h5>
// 						<div className="media">
// 							<h6 className="mt-0"><FormattedMessage id={'kanaKawanishi'} /></h6>
// 							<div className="media-body">
// 								<img className="mr-3" src="https://ik.imagekit.io/xanalia/Images/kawanishi_2021_profile.jpg" alt="Generic placeholder image" />
// 								<p> <FormattedMessage id={'directorOfGallery'} /> <br />
// 								<a href="https://www.kanakawanishi.com" target="_blank"> https://www.kanakawanishi.com/ </a></p>
// 							</div>
// 						</div>
// 						<div className="media">
// 							<h6 className="mt-0"><FormattedMessage id={'junkoKuroda'} /> </h6>
// 							<div className="media-body">
// 								<img className="mr-3" src={`${CDN_LINK_AWARD}/4.jpg`} alt="Generic placeholder image" />
// 								<p> <FormattedMessage id={'digitalHollywood'} /> <br/> </p>
// 							</div>
// 						</div>
// 						<div className="media">
// 							<h6 className="mt-0"><FormattedMessage id={'kosukeTsunura'} /></h6>
// 							<div className="media-body">
// 								<img className="mr-3" src={`${CDN_LINK_AWARD}/4B.jpg`} alt="Generic placeholder image" />
// 								<p><FormattedMessage id={'artDirector'} /><br/>
// 								<a href="https://www.kosuketsumura.com/profile" target="_blank"> https://www.kosuketsumura.com/profile </a> </p>
// 							</div>
// 						</div>
// 						<div className="media">
// 							<h6 className="mt-0"><FormattedMessage id={'asakoTsuji'} /></h6>
// 							<div className="media-body">
// 								<img className="mr-3" src={`${CDN_LINK_AWARD}/4C.jpg`} alt="Generic placeholder image" />
// 								<p><FormattedMessage id={'creativeDirector'} /><br/></p>
// 							</div>
// 						</div>
// 						<div className="media">
// 							<h6 className="mt-0"><FormattedMessage id={'junyaYamamine'} /></h6>
// 							<div className="media-body">
// 								<img className="mr-3" src={`${CDN_LINK_AWARD}/image.png`} alt="Generic placeholder image" />
// 								<p><FormattedMessage id={'coChairman'} /><br/></p>
// 							</div>
// 						</div>
// 					</div>

// 					<div id="planning-application" className="AwardBox AwardBoxPhone mt-4">
// 						<h5> <FormattedMessage id={'planningAndOperation'}></FormattedMessage> </h5>
// 						<p className="mb-0"> <FormattedMessage id={'xanaliaNFTArt'}></FormattedMessage> </p>
// 						<p> <FormattedMessage id={'nobordersCorporation'}></FormattedMessage></p>
// 					</div>
// 				</Container>

// 				{/* Entry box */}
// 				<div id="entry-form" className="entryBox">
// 					<Container className="entryBoxBody">
// 						<h2> <FormattedMessage id={'Entry'}></FormattedMessage> </h2>
// 						<hr />
// 						<p> <FormattedMessage id={'pleaseReadTheAbove'}></FormattedMessage> </p>
// 						<Button onClick={this.showLoginModal}>
// 							<FormattedMessage id={'toApplicationForm'}></FormattedMessage>
// 							<svg width="18" height="33" viewBox="0 0 18 33" fill="none" xmlns="http://www.w3.org/2000/svg">
// 								<path d="M2.00001 32.2L0.200012 30.3L14.2 16.3L0.200012 2.3L2.00001 0.5L17.8 16.3L2.00001 32.2Z" fill="#251E1C" />
// 							</svg>
// 						</Button>
// 						<div className="goldAwardPrize">
// 							<h5 className="text-uppercase">
// 								<FormattedMessage id={'awardNow'}></FormattedMessage>  <br />
// 								<FormattedMessage id={'awardHiring'}></FormattedMessage>
// 							</h5>
// 						</div>
// 					</Container>
// 				</div>
// 				{/* Entry box End */}

// 				<Container id="award-faqs" className="sectionBox faqBox">
// 					<div className="flowBox">
// 						<h2> <FormattedMessage id={'frequentlyAskedQuestions'}></FormattedMessage></h2>
// 						<hr />
// 					</div>
// 					<div className="faqBoxBody">
// 						<Accordion defaultActiveKey="0">
// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => this.setRotation('0')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'howLongIsThe'}></FormattedMessage></p>

// 									<img className={this.state.drop === '0' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 									{/* <MyLazyImage
// 										className={this.state.drop === '0' ? 'dropRatation' : 'dropRatationY'}
// 										src={OpenDropDown}
// 										alt="..."
// 									/> */}
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="0">
// 									<Card.Body className="d-block">
// 										<div className="d-flex align-items-center mb-0">
// 											<span> A </span>
// 											<p className="mb-0"></p><FormattedMessage id={'itIsFrom'}></FormattedMessage><br />
// 										</div>
// 										<div className="sub-content">
// 											<FormattedMessage id={'firstdeadline'}></FormattedMessage><br />
// 											<FormattedMessage id={'seconddeadline'}></FormattedMessage><br />
// 											<FormattedMessage id={'thirddeadline'}></FormattedMessage><br />
// 											<FormattedMessage id={'finaldeadline'}></FormattedMessage><br />
// 										</div>
// 										<div className="end-content">
// 											<FormattedMessage id={'auctionVRgallery'}></FormattedMessage><br />
// 											<br />
// 											<FormattedMessage id={'biddeadline'}></FormattedMessage><br />
// 											<FormattedMessage id={'awardceremony'}></FormattedMessage><br />
// 											<FormattedMessage id={ 'announcementVr' }></FormattedMessage>
// 										</div>
// 									</Card.Body>
// 								</Accordion.Collapse>
// 							</Card>
// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => this.setRotation('1')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'whetherIbuyer'}></FormattedMessage></p>
// 									<img className={this.state.drop === '1' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="1">
// 									<Card.Body>
// 										<span className="faq_2"> A </span><p className="faq_2 mb-0"> <FormattedMessage id={'noyoucannot'}></FormattedMessage></p> </Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="2" onClick={() => this.setRotation('2')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'whenanNFT'}></FormattedMessage></p>
// 									<img className={this.state.drop === '2' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="2">
// 									<Card.Body>
// 										<span> A </span> <p className="faq_3 mb-0"><FormattedMessage id={'cpyrightbelong'}></FormattedMessage></p> </Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="3" onClick={() => this.setRotation('3')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'sellinyen'}></FormattedMessage></p>
// 									<img className={this.state.drop === '3' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="3">
// 									<Card.Body>
// 										<span className="text-padding"> A </span> <p className="mb-0"><FormattedMessage id={'sellinyenans'}></FormattedMessage></p></Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="4" onClick={() => this.setRotation('4')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'transfer'}></FormattedMessage> </p>
// 									<img className={this.state.drop === '4' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="4">
// 									<Card.Body>
// 										<span className="text-padding"> A </span><p className="mb-0"><FormattedMessage id={'transferans'}></FormattedMessage></p> </Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="5" onClick={() => this.setRotation('5')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'howmuchsold'}></FormattedMessage></p>
// 									<img className={this.state.drop === '5' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="5">
// 									<Card.Body>
// 										<span> A </span> <p className="faq_6 mb-0"><FormattedMessage id={'howmuchsoldans'}></FormattedMessage></p></Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="6" onClick={() => this.setRotation('6')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'soldsectime'}></FormattedMessage> </p>
// 									<img className={this.state.drop === '6' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="6">
// 									<Card.Body>
// 										<span> A </span> <p className="faq_7 mb-0"><FormattedMessage id={'soldsectimeans'}></FormattedMessage></p></Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="7" onClick={() => this.setRotation('7')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'platform'}></FormattedMessage></p>
// 									<img className={this.state.drop === '7' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="7">
// 									<Card.Body>
// 										<span> A </span> <p className="mb-0"> <FormattedMessage id={'platformans'}></FormattedMessage> </p></Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="8" onClick={() => this.setRotation('8')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'setupaccnt'}></FormattedMessage> </p>
// 									<img className={this.state.drop === '8' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="8">
// 									<Card.Body>
// 										<span className="faq_9"> A </span>
// 										<p className="faq_9 mb-0"><FormattedMessage id={'setupaccntans'}></FormattedMessage>
// 											<br/>
// 											<br/> <FormattedMessage id={'setupaccntans1'}></FormattedMessage>
// 											<br/> <a href="https://www.coindeskjapan.com/bitflyer-open-account/">https://www.coindeskjapan.com/bitflyer-open-account/</a>
// 										</p>
// 									</Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="9" onClick={() => this.setRotation('9')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'vtrualcrncy'}></FormattedMessage></p>
// 									<img className={this.state.drop === '9' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="9">
// 									<Card.Body>
// 										<span> A </span> <p className="faq_10 mb-0"> <FormattedMessage id={'vtrualcrncyans'}></FormattedMessage> </p></Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 							<Card>
// 								<Accordion.Toggle as={Card.Header} eventKey="10" onClick={() => this.setRotation('10')}>
// 									<span> Q </span> <p className="mb-0"> <FormattedMessage id={'notaccepted'}>  </FormattedMessage> </p>
// 									<img className={this.state.drop === '10' ? 'dropRatation' : 'dropRatationY'} src={OpenDropDown} alt="..." />
// 								</Accordion.Toggle>
// 								<Accordion.Collapse eventKey="10">
// 									<Card.Body>
// 										<span> A </span> <p className="mb-0"> <FormattedMessage id={'notacceptedans'}></FormattedMessage> </p></Card.Body>
// 								</Accordion.Collapse>
// 							</Card>

// 						</Accordion>
// 					</div>
// 				</Container>

// 				<Container id="about-award" className="sectionBox aboutSection">

// 					<div className="flowBox">
// 						<h2> <FormattedMessage id={'awardAboutXaanalia'}></FormattedMessage></h2>
// 						<hr />
// 						<p> <FormattedMessage id={'xanaliaWasDeveloped'}></FormattedMessage> </p>
// 					</div>

// 					<div className="eventBox aboutSectionBody">
// 						<Row>
// 							<Col md={4} sm={12} className="aboutSectionBox">
// 								{/* <img src={DecentralizedIcon} alt="icon" /> */}
// 								<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
// 									<path d="M43.1601 85.1598C34.7381 85.1598 26.5053 82.6623 19.5029 77.9831C12.5004 73.3039 7.04283 66.6538 3.82035 58.8727C0.597863 51.0917 -0.244777 42.5292 1.39899 34.2692C3.04276 26.0092 7.09911 18.422 13.055 12.4675C19.0109 6.51293 26.5989 2.45889 34.8593 0.817061C43.1197 -0.824768 51.6814 0.0195057 59.4617 3.24382C67.242 6.46813 73.8914 11.9278 78.5689 18.9313C83.2465 25.9349 85.7421 34.1676 85.7401 42.5895C85.7269 53.8775 81.2362 64.6995 73.2535 72.6803C65.2708 80.6612 54.448 85.1492 43.1601 85.1598ZM43.1601 1.00944C34.9364 1.00944 26.8973 3.44839 20.0595 8.01726C13.2217 12.5861 7.89228 19.0806 4.74518 26.6784C1.59809 34.2761 0.774676 42.6361 2.37905 50.7018C3.98342 58.7676 7.94353 66.1768 13.7586 71.9919C19.5737 77.8069 26.9825 81.7664 35.0482 83.3708C43.114 84.9751 51.4743 84.1517 59.0721 81.0046C66.6698 77.8575 73.1637 72.5279 77.7326 65.6901C82.3015 58.8523 84.7401 50.8133 84.7401 42.5895C84.7269 31.5659 80.3419 20.9977 72.547 13.2028C64.7521 5.40791 54.1837 1.02268 43.1601 1.00944Z" fill="#37497F" />
// 									<path d="M43.1601 27.04C43.4253 27.04 43.6796 26.9346 43.8672 26.7471C44.0547 26.5595 44.1601 26.3053 44.1601 26.04V25.2305C44.2035 25.0814 44.2117 24.9242 44.1839 24.7715C44.1562 24.6187 44.0932 24.4748 44.0001 24.3506C43.9069 24.2264 43.7861 24.1251 43.6473 24.0557C43.5084 23.9862 43.3553 23.9502 43.2001 23.9502C43.0448 23.9502 42.8917 23.9862 42.7529 24.0557C42.614 24.1251 42.4932 24.2264 42.4001 24.3506C42.3069 24.4748 42.244 24.6187 42.2162 24.7715C42.1884 24.9242 42.1966 25.0814 42.2401 25.2305V26.04C42.2393 26.292 42.3336 26.5353 42.5041 26.7207C42.6747 26.9061 42.909 27.0199 43.1601 27.04Z" fill="#37497F" />
// 									<path d="M43.1601 35.2002C43.4253 35.2002 43.6796 35.0948 43.8672 34.9072C44.0547 34.7197 44.1601 34.4654 44.1601 34.2002V33.3906C44.2035 33.2416 44.2117 33.0844 44.1839 32.9316C44.1562 32.7789 44.0932 32.634 44.0001 32.5098C43.9069 32.3856 43.7861 32.2852 43.6473 32.2158C43.5084 32.1464 43.3553 32.1104 43.2001 32.1104C43.0448 32.1104 42.8917 32.1464 42.7529 32.2158C42.614 32.2852 42.4932 32.3856 42.4001 32.5098C42.3069 32.634 42.244 32.7789 42.2162 32.9316C42.1884 33.0844 42.1966 33.2416 42.2401 33.3906V34.2002C42.2393 34.4521 42.3336 34.6955 42.5041 34.8809C42.6747 35.0663 42.909 35.18 43.1601 35.2002Z" fill="#37497F" />
// 									<path d="M47.34 40.9308C47.4328 40.9454 47.5273 40.9454 47.62 40.9308L48.4 40.6808C48.5558 40.6789 48.7089 40.6401 48.8472 40.5685C48.9855 40.497 49.1052 40.3937 49.1967 40.2677C49.2883 40.1417 49.3491 39.9966 49.3744 39.8429C49.3997 39.6893 49.3887 39.5317 49.3424 39.383C49.2961 39.2343 49.2157 39.0986 49.1076 38.9865C48.9996 38.8744 48.8668 38.7892 48.7199 38.7375C48.573 38.6857 48.416 38.669 48.2616 38.6886C48.1071 38.7083 47.9593 38.7639 47.83 38.8508L47.05 39.09C46.8614 39.1851 46.7078 39.3378 46.6111 39.5256C46.5145 39.7134 46.4797 39.9272 46.5119 40.1359C46.5441 40.3447 46.6416 40.5377 46.7904 40.6877C46.9391 40.8376 47.1315 40.937 47.34 40.9709V40.9308Z" fill="#37497F" />
// 									<path d="M43.1601 31.1201C43.4253 31.1201 43.6796 31.0147 43.8672 30.8271C44.0547 30.6396 44.1601 30.3853 44.1601 30.1201V29.2998C44.2035 29.1508 44.2117 28.9945 44.1839 28.8418C44.1562 28.6891 44.0932 28.5441 44.0001 28.4199C43.9069 28.2957 43.7861 28.1954 43.6473 28.126C43.5084 28.0565 43.3553 28.0205 43.2001 28.0205C43.0448 28.0205 42.8917 28.0565 42.7529 28.126C42.614 28.1954 42.4932 28.2957 42.4001 28.4199C42.3069 28.5441 42.244 28.6891 42.2162 28.8418C42.1884 28.9945 42.1966 29.1508 42.2401 29.2998V30.1201C42.2393 30.372 42.3336 30.6154 42.5041 30.8008C42.6747 30.9862 42.909 31.1 43.1601 31.1201Z" fill="#37497F" />
// 									<path d="M51.72 37.5903L50.94 37.8403C50.7035 37.9247 50.5074 38.0955 50.3907 38.3178C50.274 38.5401 50.2452 38.7979 50.31 39.0405C50.3754 39.2343 50.4987 39.4033 50.6632 39.5249C50.8277 39.6464 51.0255 39.7155 51.23 39.7211C51.3228 39.7354 51.4173 39.7354 51.51 39.7211L52.29 39.4809C52.4443 39.4766 52.5954 39.4362 52.7316 39.3637C52.8678 39.2913 52.9854 39.1884 53.0752 39.0629C53.165 38.9375 53.2245 38.7934 53.2492 38.6411C53.2738 38.4888 53.2629 38.3324 53.2172 38.185C53.1716 38.0376 53.0924 37.9032 52.986 37.7915C52.8796 37.6798 52.7488 37.5942 52.6038 37.5415C52.4588 37.4887 52.3036 37.4705 52.1503 37.4877C51.9969 37.505 51.8497 37.5574 51.72 37.6411V37.5903Z" fill="#37497F" />
// 									<path d="M55.6602 36.3802L54.8802 36.6204C54.6874 36.7135 54.5296 36.8656 54.43 37.055C54.3303 37.2444 54.2941 37.4616 54.3265 37.6731C54.359 37.8847 54.4584 38.08 54.6103 38.2308C54.7622 38.3816 54.9584 38.4791 55.1702 38.5101C55.2688 38.5078 55.3665 38.4911 55.4602 38.4603L56.2302 38.221C56.3844 38.2167 56.5355 38.1763 56.6717 38.1038C56.8079 38.0314 56.9255 37.9285 57.0153 37.803C57.1051 37.6776 57.1647 37.5325 57.1893 37.3802C57.2139 37.2279 57.203 37.0725 57.1574 36.9251C57.1117 36.7777 57.0326 36.6432 56.9261 36.5315C56.8197 36.4198 56.6889 36.3343 56.5439 36.2815C56.3989 36.2288 56.2437 36.2096 56.0904 36.2269C55.9371 36.2441 55.7898 36.2966 55.6602 36.3802Z" fill="#37497F" />
// 									<path d="M36.5402 50.4905C36.3293 50.3489 36.0724 50.2924 35.8217 50.3333C35.5709 50.3742 35.3451 50.509 35.1902 50.7103L34.7202 51.3704C34.6008 51.4676 34.5054 51.5907 34.4415 51.7308C34.3776 51.8708 34.3469 52.0242 34.3518 52.178C34.3567 52.3319 34.397 52.4827 34.4696 52.6185C34.5423 52.7542 34.6453 52.8709 34.7706 52.9603C34.8959 53.0496 35.0401 53.1086 35.1921 53.1331C35.344 53.1576 35.4996 53.1473 35.6467 53.1019C35.7937 53.0564 35.9283 52.9774 36.0399 52.8714C36.1515 52.7654 36.2372 52.635 36.2902 52.4905L36.7602 51.8304C36.8989 51.6203 36.9533 51.3659 36.9125 51.1175C36.8717 50.8691 36.7387 50.6452 36.5402 50.4905Z" fill="#37497F" />
// 									<path d="M35.21 39.8001L35.98 40.0403C36.0737 40.0712 36.1714 40.0879 36.27 40.0901C36.4818 40.0592 36.678 39.9617 36.8299 39.8108C36.9817 39.66 37.0812 39.4638 37.1137 39.2523C37.1461 39.0407 37.1099 38.8245 37.0102 38.6351C36.9106 38.4457 36.7527 38.2935 36.56 38.2005L35.78 37.9603C35.6504 37.8766 35.5031 37.8242 35.3498 37.8069C35.1965 37.7897 35.0413 37.8089 34.8963 37.8616C34.7513 37.9144 34.6205 37.9989 34.514 38.1106C34.4076 38.2224 34.3285 38.3578 34.2828 38.5052C34.2372 38.6526 34.2262 38.808 34.2509 38.9603C34.2755 39.1126 34.3351 39.2577 34.4249 39.3831C34.5146 39.5086 34.6323 39.6114 34.7685 39.6839C34.9047 39.7563 35.0558 39.7958 35.21 39.8001Z" fill="#37497F" />
// 									<path d="M28.77 35.7806L28 35.5403C27.8711 35.4538 27.7238 35.399 27.5697 35.3792C27.4157 35.3595 27.2592 35.3758 27.1126 35.4271C26.966 35.4783 26.8334 35.5627 26.7252 35.6741C26.617 35.7855 26.5363 35.9206 26.4894 36.0687C26.4424 36.2167 26.4306 36.3733 26.4549 36.5267C26.4792 36.6801 26.5388 36.8261 26.6291 36.9525C26.7194 37.0788 26.8379 37.1826 26.9752 37.2552C27.1125 37.3278 27.2648 37.3669 27.42 37.3704L28.2 37.6204C28.3297 37.704 28.4769 37.7565 28.6302 37.7737C28.7835 37.791 28.9388 37.7728 29.0838 37.72C29.2288 37.6673 29.3596 37.5817 29.466 37.47C29.5724 37.3583 29.6516 37.2239 29.6972 37.0765C29.7429 36.9291 29.7538 36.7727 29.7291 36.6204C29.7045 36.4681 29.645 36.324 29.5552 36.1986C29.4654 36.0731 29.3478 35.9692 29.2116 35.8968C29.0754 35.8243 28.9242 35.7849 28.77 35.7806Z" fill="#37497F" />
// 									<path d="M32.6601 36.9898L31.8801 36.7496C31.7507 36.6663 31.604 36.6145 31.4511 36.5972C31.2983 36.5799 31.1435 36.5977 30.9989 36.65C30.8542 36.7022 30.7236 36.787 30.6171 36.898C30.5106 37.009 30.4311 37.1429 30.3849 37.2896C30.3386 37.4363 30.3269 37.5917 30.3505 37.7437C30.3741 37.8957 30.4324 38.0408 30.5209 38.1666C30.6095 38.2923 30.7259 38.3958 30.861 38.4693C30.9961 38.5428 31.1464 38.5835 31.3001 38.5894L32.0801 38.8297C32.2094 38.9129 32.3561 38.9657 32.509 38.983C32.6618 39.0003 32.8166 38.9815 32.9612 38.9293C33.1059 38.877 33.2365 38.7922 33.343 38.6812C33.4495 38.5702 33.529 38.4363 33.5752 38.2896C33.6215 38.1429 33.6333 37.9875 33.6097 37.8355C33.5861 37.6835 33.5277 37.5394 33.4392 37.4136C33.3506 37.2879 33.2343 37.1844 33.0991 37.1109C32.964 37.0374 32.8137 36.9957 32.6601 36.9898Z" fill="#37497F" />
// 									<path d="M41.28 43.8999C41.07 43.7612 40.8153 43.7068 40.5669 43.7476C40.3186 43.7884 40.0947 43.9211 39.94 44.1197L39.46 44.7798C39.3194 44.9919 39.2649 45.2497 39.3077 45.5005C39.3504 45.7513 39.4871 45.9759 39.69 46.1294C39.8516 46.2423 40.0429 46.3056 40.24 46.3101C40.3944 46.3074 40.5461 46.2689 40.6831 46.1978C40.8202 46.1266 40.9389 46.0246 41.03 45.8999L41.5 45.2398C41.6387 45.0297 41.6931 44.7753 41.6523 44.5269C41.6116 44.2785 41.4786 44.0546 41.28 43.8999Z" fill="#37497F" />
// 									<path d="M38.9101 47.2098C38.6989 47.0721 38.4435 47.0197 38.195 47.0623C37.9465 47.105 37.7233 47.24 37.5701 47.4402L37.0901 48.1004C36.9514 48.3104 36.897 48.5649 36.9378 48.8133C36.9786 49.0617 37.1115 49.2856 37.3101 49.4402C37.521 49.5819 37.7779 49.6373 38.0286 49.5965C38.2793 49.5556 38.5051 49.4218 38.6601 49.2205L39.1301 48.5604C39.2718 48.3495 39.3279 48.0923 39.287 47.8416C39.2461 47.5909 39.1114 47.3648 38.9101 47.2098Z" fill="#37497F" />
// 									<path d="M51.06 50.6507C50.905 50.4494 50.6792 50.3146 50.4285 50.2737C50.1778 50.2329 49.9209 50.2893 49.71 50.431C49.5114 50.5856 49.3785 50.8095 49.3377 51.0579C49.2969 51.3063 49.3513 51.5608 49.49 51.7708L49.96 52.4407C50.115 52.642 50.3408 52.7768 50.5915 52.8177C50.8422 52.8585 51.0991 52.8021 51.31 52.6604C51.5086 52.5058 51.6415 52.2819 51.6823 52.0335C51.7231 51.7851 51.6687 51.5307 51.53 51.3206L51.06 50.6507Z" fill="#37497F" />
// 									<path d="M49.1601 48.0003L48.6901 47.3401C48.5351 47.1388 48.3094 47.004 48.0586 46.9632C47.8079 46.9223 47.551 46.9787 47.3401 47.1204C47.1415 47.2751 47.0086 47.499 46.9678 47.7474C46.927 47.9957 46.9814 48.2502 47.1201 48.4603L47.5901 49.1204C47.6822 49.2433 47.8014 49.343 47.9384 49.4124C48.0754 49.4818 48.2266 49.5193 48.3801 49.5208C48.5513 49.5083 48.7164 49.4515 48.8595 49.3567C49.0026 49.262 49.1189 49.1325 49.1973 48.9798C49.2756 48.8271 49.3134 48.6571 49.3069 48.4856C49.3003 48.3142 49.2498 48.1466 49.1601 48.0003Z" fill="#37497F" />
// 									<path d="M46.7901 44.6904L46.3101 44.0205C46.2584 43.8742 46.1733 43.7415 46.0617 43.6338C45.95 43.526 45.8148 43.4459 45.6668 43.3994C45.5187 43.3529 45.3619 43.3416 45.2087 43.3662C45.0554 43.3908 44.9101 43.4505 44.784 43.541C44.6579 43.6315 44.5547 43.7504 44.4824 43.8877C44.4101 44.025 44.3707 44.1769 44.3674 44.332C44.3641 44.4872 44.397 44.641 44.4634 44.7812C44.5298 44.9215 44.628 45.0448 44.7501 45.1406L45.2201 45.8105C45.3751 46.0118 45.6008 46.1466 45.8516 46.1875C46.1023 46.2283 46.3592 46.1719 46.5701 46.0302C46.7687 45.8756 46.9016 45.6517 46.9424 45.4033C46.9832 45.1549 46.9288 44.9005 46.7901 44.6904Z" fill="#37497F" />
// 									<path d="M46.0701 41.2705C46.0671 40.6603 45.8724 40.0658 45.5135 39.5723C45.1546 39.0788 44.6497 38.7113 44.0701 38.5205C44.075 38.4506 44.075 38.3805 44.0701 38.3105V37.4902C44.0095 37.2825 43.8832 37.1005 43.7101 36.9707C43.537 36.8409 43.3264 36.7705 43.1101 36.7705C42.8937 36.7705 42.6832 36.8409 42.5101 36.9707C42.337 37.1005 42.2107 37.2825 42.1501 37.4902V38.3105C42.1451 38.3805 42.1451 38.4506 42.1501 38.5205C41.567 38.7174 41.0624 39.096 40.7101 39.6006C40.6125 39.5203 40.5005 39.4585 40.3801 39.4199L39.6001 39.1699C39.4704 39.0863 39.3232 39.0338 39.1699 39.0166C39.0165 38.9994 38.8613 39.0186 38.7163 39.0713C38.5713 39.124 38.4405 39.2096 38.3341 39.3213C38.2277 39.433 38.1485 39.5675 38.1029 39.7148C38.0572 39.8622 38.0463 40.0176 38.0709 40.1699C38.0956 40.3222 38.1551 40.4673 38.2449 40.5928C38.3347 40.7182 38.4523 40.8211 38.5885 40.8936C38.7247 40.966 38.8759 41.0054 39.0301 41.0098L39.8001 41.25C39.8962 41.2641 39.9939 41.2641 40.0901 41.25H40.1801C40.1801 42.0218 40.4867 42.7619 41.0324 43.3076C41.5781 43.8533 42.3183 44.1602 43.0901 44.1602C43.8619 44.1602 44.602 43.8533 45.1478 43.3076C45.6935 42.7619 46.0001 42.0218 46.0001 41.25L46.0701 41.2705Z" fill="#37497F" />
// 									<path d="M65.4101 35.2402C65.4088 34.7104 65.2629 34.1913 64.9882 33.7383C64.7134 33.2853 64.3202 32.9159 63.851 32.6699C63.3817 32.424 62.8543 32.311 62.3254 32.3428C61.7966 32.3746 61.2865 32.5502 60.8501 32.8506L45.9401 22.0205C46.0245 21.7518 46.0683 21.472 46.0701 21.1904C46.0701 20.4186 45.7635 19.6785 45.2178 19.1328C44.672 18.5871 43.9319 18.2803 43.1601 18.2803C42.3883 18.2803 41.6481 18.5871 41.1024 19.1328C40.5567 19.6785 40.2501 20.4186 40.2501 21.1904C40.2519 21.472 40.2957 21.7518 40.3801 22.0205L25.4701 32.8506C25.0971 32.5917 24.6687 32.4231 24.2192 32.3594C23.7697 32.2957 23.3115 32.3384 22.8813 32.4834C22.4511 32.6284 22.0608 32.8725 21.7416 33.1953C21.4224 33.5182 21.1831 33.9109 21.043 34.3428C20.9028 34.7746 20.8657 35.2329 20.9345 35.6816C21.0033 36.1304 21.1761 36.5567 21.4392 36.9268C21.7023 37.2968 22.0483 37.6001 22.4495 37.8125C22.8508 38.0249 23.2962 38.1409 23.7501 38.1504L29.3401 55.3604C28.9121 55.5684 28.5419 55.8788 28.2621 56.2637C27.9823 56.6486 27.8015 57.0961 27.7356 57.5674C27.6698 58.0386 27.7209 58.519 27.8845 58.9658C28.0481 59.4127 28.3191 59.8125 28.6737 60.1299C29.0283 60.4472 29.4555 60.6719 29.9177 60.7852C30.3798 60.8984 30.8628 60.8958 31.3239 60.7783C31.785 60.6608 32.2101 60.4319 32.5617 60.1113C32.9133 59.7907 33.1806 59.3888 33.3401 58.9404H52.3901C52.5388 59.3696 52.786 59.7577 53.1117 60.0742C53.4374 60.3908 53.8328 60.6263 54.266 60.7627C54.6993 60.8991 55.1584 60.9323 55.6067 60.8594C56.0551 60.7865 56.4801 60.6094 56.8478 60.3428C57.2155 60.0762 57.5157 59.7277 57.7244 59.3242C57.9331 58.9208 58.0444 58.4737 58.0495 58.0195C58.0545 57.5654 57.9532 57.117 57.7537 56.709C57.5541 56.301 57.2618 55.9447 56.9001 55.6699L62.5901 38.1504C63.3462 38.127 64.0634 37.8098 64.5898 37.2666C65.1162 36.7234 65.4104 35.9967 65.4101 35.2402ZM54.0801 55.2402C54.1 55.0121 54.036 54.7849 53.9001 54.6006L53.4301 53.9404C53.2751 53.7391 53.0493 53.6043 52.7986 53.5635C52.5478 53.5226 52.291 53.579 52.0801 53.7207C51.8815 53.8754 51.7486 54.0983 51.7078 54.3467C51.667 54.5951 51.7214 54.8505 51.8601 55.0605L52.3401 55.7207C52.4686 55.9061 52.6608 56.0369 52.8801 56.0898C52.6606 56.3589 52.4881 56.6636 52.3701 56.9902H33.3201C33.2191 56.7029 33.074 56.4332 32.8901 56.1904C33.0747 56.2294 33.2666 56.2149 33.4435 56.1494C33.6205 56.0839 33.7753 55.97 33.8901 55.8203L34.3601 55.1602C34.4795 55.063 34.5748 54.9398 34.6387 54.7998C34.7026 54.6598 34.7333 54.5064 34.7284 54.3525C34.7236 54.1987 34.6832 54.0488 34.6106 53.9131C34.538 53.7774 34.435 53.6597 34.3097 53.5703C34.1844 53.4809 34.0401 53.422 33.8882 53.3975C33.7362 53.373 33.5807 53.3833 33.4336 53.4287C33.2865 53.4742 33.152 53.5532 33.0403 53.6592C32.9287 53.7652 32.8431 53.8955 32.7901 54.04L32.3201 54.7002C32.2349 54.8225 32.1781 54.9623 32.1539 55.1094C32.1296 55.2564 32.1386 55.4066 32.1801 55.5498C31.9051 55.3574 31.5964 55.2191 31.2701 55.1406L25.5501 37.5205C25.9052 37.2493 26.1929 36.8997 26.3906 36.499C26.5884 36.0983 26.6909 35.6568 26.6901 35.21C26.6917 34.9289 26.6512 34.649 26.5701 34.3799L41.4801 23.5498C41.9639 23.888 42.5398 24.0693 43.1301 24.0693C43.7203 24.0693 44.2963 23.888 44.7801 23.5498L59.6901 34.3799C59.6194 34.6172 59.5791 34.8629 59.5701 35.1104H59.4701L58.6901 35.3506C58.5057 35.4693 58.3655 35.6453 58.291 35.8516C58.2165 36.0578 58.2119 36.2821 58.2778 36.4912C58.3437 36.7003 58.4765 36.8826 58.6558 37.0088C58.8351 37.135 59.051 37.1989 59.2701 37.1904L60.0501 36.9502H60.1401C60.2986 37.1721 60.491 37.3679 60.7101 37.5303L55.0101 55.0605C54.6903 55.0765 54.3757 55.1475 54.0801 55.2705V55.2402Z" fill="#37497F" />
// 								</svg>
// 								<h4> <FormattedMessage id={'decentralized'}></FormattedMessage> </h4>
// 								<p> <FormattedMessage id={'weHaveAdoptedA'}></FormattedMessage></p>
// 							</Col>

// 							<Col md={4} sm={12} className="aboutSectionBox">
// 								{/* <img src={TradingIcon} alt="icon" /> */}
// 								<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
// 									<path d="M42.9101 85.16C34.4886 85.16 26.2562 82.663 19.2539 77.9842C12.2517 73.3055 6.79409 66.6553 3.57131 58.8749C0.34853 51.0944 -0.494699 42.533 1.14826 34.2733C2.79122 26.0136 6.84657 18.4265 12.8015 12.4716C18.7564 6.51663 26.3434 2.46119 34.6032 0.818232C42.8629 -0.824726 51.4243 0.0183043 59.2048 3.24108C66.9852 6.46386 73.6353 11.9215 78.3141 18.9237C82.9928 25.9259 85.4901 34.1584 85.4901 42.58C85.4769 53.8688 80.9865 64.6922 73.0041 72.6747C65.0217 80.6571 54.199 85.1468 42.9101 85.16ZM42.9101 0.999873C34.6864 0.999873 26.6473 3.43882 19.8095 8.00769C12.9717 12.5766 7.64227 19.0701 4.49518 26.6678C1.34809 34.2656 0.524675 42.6265 2.12905 50.6923C3.73342 58.758 7.69353 66.1662 13.5086 71.9813C19.3237 77.7964 26.7325 81.7568 34.7982 83.3612C42.864 84.9656 51.2243 84.1421 58.8221 80.995C66.4198 77.8479 72.9137 72.5183 77.4826 65.6805C82.0515 58.8427 84.4901 50.8037 84.4901 42.58C84.4769 31.5563 80.0919 20.9881 72.297 13.1932C64.5021 5.39834 53.9337 1.01311 42.9101 0.999873Z" fill="#37497F" />
// 									<path d="M42.8958 69.4805C42.567 69.4829 42.2493 69.3607 42.0058 69.1396L21.7658 50.6904C21.5673 50.5113 21.4279 50.2757 21.366 50.0156C21.3041 49.7556 21.3226 49.4827 21.419 49.2334C21.5155 48.9841 21.6854 48.7698 21.9062 48.6191C22.1271 48.4685 22.3885 48.3885 22.6558 48.3896H31.0758V33C31.0758 32.6499 31.2149 32.314 31.4624 32.0664C31.71 31.8189 32.0457 31.6797 32.3958 31.6797C32.7459 31.6797 33.0816 31.8189 33.3292 32.0664C33.5767 32.314 33.7158 32.6499 33.7158 33V49.6699C33.7171 49.8441 33.6839 50.0164 33.6182 50.1777C33.5525 50.339 33.4554 50.4857 33.3327 50.6094C33.21 50.733 33.0641 50.8315 32.9033 50.8984C32.7424 50.9654 32.57 51 32.3958 51H26.0658L42.8958 66.3496L59.7258 51H53.3958C53.0457 51 52.71 50.8608 52.4624 50.6133C52.2149 50.3657 52.0758 50.0298 52.0758 49.6797V33C52.0758 32.6499 52.2149 32.314 52.4624 32.0664C52.71 31.8189 53.0457 31.6797 53.3958 31.6797C53.7459 31.6797 54.0816 31.8189 54.3292 32.0664C54.5767 32.314 54.7158 32.6499 54.7158 33V48.3496H63.1358C63.4031 48.3485 63.6645 48.4285 63.8853 48.5791C64.1062 48.7297 64.2761 48.944 64.3726 49.1934C64.469 49.4427 64.4875 49.7155 64.4256 49.9756C64.3637 50.2356 64.2243 50.4713 64.0258 50.6504L43.7858 69.0996C43.5485 69.3352 43.2301 69.472 42.8958 69.4805Z" fill="#37497F" />
// 									<path d="M39.5358 20.6393C39.3621 20.6407 39.1898 20.6075 39.0291 20.5417C38.8683 20.4758 38.7223 20.3784 38.5995 20.2556C38.4766 20.1327 38.3794 19.9866 38.3136 19.8259C38.2477 19.6651 38.2145 19.4927 38.2158 19.319C38.2065 19.2326 38.2065 19.1457 38.2158 19.0593C38.2299 18.9768 38.2533 18.8961 38.2858 18.819L38.4058 18.5895C38.457 18.5184 38.5138 18.4513 38.5758 18.3893L38.7758 18.2194C38.8469 18.1696 38.9242 18.1291 39.0058 18.0993C39.0857 18.0652 39.1698 18.0423 39.2558 18.03C39.4235 17.99 39.5981 17.99 39.7658 18.03C39.8518 18.0423 39.9359 18.0652 40.0158 18.0993C40.0964 18.1313 40.1734 18.1717 40.2458 18.2194C40.3161 18.2677 40.38 18.3248 40.4358 18.3893C40.5005 18.4487 40.5576 18.5161 40.6058 18.5895C40.6556 18.6607 40.696 18.7375 40.7258 18.819C40.7569 18.8975 40.7837 18.9778 40.8058 19.0593C40.8104 19.1459 40.8104 19.2324 40.8058 19.319C40.8056 19.6717 40.6653 20.0102 40.4158 20.2595C40.3557 20.3205 40.2886 20.3744 40.2158 20.4196C40.1482 20.4693 40.0742 20.5097 39.9958 20.5397C39.9159 20.5738 39.8318 20.5967 39.7458 20.6091C39.6769 20.6259 39.6066 20.6362 39.5358 20.6393Z" fill="#37497F" />
// 									<path d="M38.2158 41.1895C38.2158 40.8394 38.3549 40.5034 38.6024 40.2559C38.85 40.0083 39.1857 39.8691 39.5358 39.8691C39.8859 39.8691 40.2216 40.0083 40.4692 40.2559C40.7167 40.5034 40.8558 40.8394 40.8558 41.1895C40.8558 41.5395 40.7167 41.8755 40.4692 42.123C40.2216 42.3706 39.8859 42.5098 39.5358 42.5098C39.1857 42.5098 38.85 42.3706 38.6024 42.123C38.3549 41.8755 38.2158 41.5395 38.2158 41.1895ZM38.2158 35.75C38.2184 35.4007 38.3583 35.0663 38.6053 34.8193C38.8523 34.5724 39.1865 34.4323 39.5358 34.4297C39.8851 34.4323 40.2193 34.5724 40.4663 34.8193C40.7133 35.0663 40.8532 35.4007 40.8558 35.75C40.8558 36.1001 40.7167 36.4351 40.4692 36.6826C40.2216 36.9302 39.8859 37.0693 39.5358 37.0693C39.1857 37.0693 38.85 36.9302 38.6024 36.6826C38.3549 36.4351 38.2158 36.1001 38.2158 35.75ZM38.2158 30.3193C38.2158 29.9693 38.3549 29.6333 38.6024 29.3857C38.85 29.1382 39.1857 29 39.5358 29C39.8859 29 40.2216 29.1382 40.4692 29.3857C40.7167 29.6333 40.8558 29.9693 40.8558 30.3193C40.8558 30.6694 40.7167 31.0054 40.4692 31.2529C40.2216 31.5005 39.8859 31.6396 39.5358 31.6396C39.1857 31.6396 38.85 31.5005 38.6024 31.2529C38.3549 31.0054 38.2158 30.6694 38.2158 30.3193Z" fill="#37497F" />
// 									<path d="M39.5358 25.6448C39.1865 25.6421 38.8523 25.5021 38.6053 25.2551C38.3583 25.0081 38.2184 24.6737 38.2158 24.3244C38.2054 24.2381 38.2054 24.151 38.2158 24.0647C38.2314 23.9782 38.2582 23.8941 38.2958 23.8147C38.3278 23.7341 38.368 23.6566 38.4158 23.5842C38.4603 23.511 38.5141 23.4435 38.5758 23.384C38.7298 23.2316 38.9187 23.1196 39.1261 23.0569C39.3335 22.9941 39.5531 22.9832 39.7658 23.0246C39.8523 23.0402 39.9363 23.0672 40.0158 23.1047C40.0973 23.1346 40.1747 23.175 40.2458 23.2248C40.391 23.3167 40.5139 23.439 40.6058 23.5842C40.6535 23.6566 40.6937 23.7341 40.7258 23.8147C40.7633 23.8941 40.7902 23.9782 40.8058 24.0647C40.8161 24.151 40.8161 24.2381 40.8058 24.3244C40.8073 24.4969 40.7745 24.6677 40.7092 24.8274C40.644 24.987 40.5476 25.1321 40.4258 25.2541C40.2998 25.3743 40.1544 25.4723 39.9958 25.5442C39.8489 25.6023 39.6935 25.6367 39.5358 25.6448Z" fill="#37497F" />
// 									<path d="M46.3958 39.3827C46.0431 39.3827 45.7048 39.2425 45.4554 38.9931C45.2059 38.7436 45.0658 38.4054 45.0658 38.0526C45.0728 37.7043 45.2123 37.3721 45.4558 37.1229C45.6083 36.9683 45.7971 36.8538 46.005 36.7909C46.2128 36.728 46.4332 36.7184 46.6458 36.7626C46.7318 36.775 46.8159 36.7988 46.8958 36.8329C46.9757 36.8702 47.0526 36.9136 47.1258 36.9628C47.199 37.0073 47.2663 37.0613 47.3258 37.1229C47.5665 37.3731 47.7025 37.7055 47.7058 38.0526C47.7075 38.2266 47.6749 38.3991 47.6096 38.5604C47.5444 38.7218 47.448 38.8692 47.3258 38.9931C47.2037 39.1156 47.0572 39.2103 46.8958 39.2724C46.7385 39.3431 46.5683 39.3809 46.3958 39.3827Z" fill="#37497F" />
// 									<path d="M45.0458 32.623C45.0484 32.2738 45.1883 31.9394 45.4353 31.6924C45.6823 31.4454 46.0165 31.3054 46.3658 31.3027C46.7159 31.3027 47.0516 31.4419 47.2992 31.6895C47.5467 31.937 47.6858 32.273 47.6858 32.623C47.6858 32.9731 47.5467 33.3091 47.2992 33.5566C47.0516 33.8042 46.7159 33.9434 46.3658 33.9434C46.0165 33.9407 45.6823 33.8007 45.4353 33.5537C45.1883 33.3067 45.0484 32.9723 45.0458 32.623ZM45.0458 27.1934C45.0484 26.8441 45.1883 26.5097 45.4353 26.2627C45.6823 26.0157 46.0165 25.8757 46.3658 25.873C46.7159 25.873 47.0516 26.0122 47.2992 26.2598C47.5467 26.5073 47.6858 26.8433 47.6858 27.1934C47.6858 27.5434 47.5467 27.8784 47.2992 28.126C47.0516 28.3735 46.7159 28.5127 46.3658 28.5127C46.0165 28.5101 45.6823 28.37 45.4353 28.123C45.1883 27.8761 45.0484 27.5426 45.0458 27.1934ZM45.0458 21.7529C45.0484 21.4037 45.1883 21.0692 45.4353 20.8223C45.6823 20.5753 46.0165 20.4352 46.3658 20.4326C46.7159 20.4326 47.0516 20.5718 47.2992 20.8193C47.5467 21.0669 47.6858 21.4028 47.6858 21.7529C47.6858 22.103 47.5467 22.439 47.2992 22.6865C47.0516 22.9341 46.7159 23.0732 46.3658 23.0732C46.0165 23.0706 45.6823 22.9306 45.4353 22.6836C45.1883 22.4366 45.0484 22.1022 45.0458 21.7529Z" fill="#37497F" />
// 									<path d="M46.3957 17.6426C46.2239 17.6442 46.0536 17.6106 45.8957 17.5429C45.7338 17.4771 45.5874 17.3784 45.4657 17.2529C45.3425 17.1313 45.2446 16.9868 45.1776 16.8271C45.1107 16.6675 45.076 16.4963 45.0757 16.3232C45.0749 16.15 45.109 15.9781 45.1761 15.8183C45.2431 15.6586 45.3416 15.5134 45.4657 15.3926C45.5251 15.3278 45.5923 15.2708 45.6657 15.2226C45.7368 15.1728 45.8142 15.1324 45.8957 15.1025L46.1457 15.0224C46.3144 14.9925 46.487 14.9925 46.6557 15.0224L46.9057 15.1025C46.9873 15.1324 47.0646 15.1728 47.1357 15.2226C47.2092 15.2708 47.2763 15.3278 47.3357 15.3926C47.58 15.6404 47.7166 15.9753 47.7157 16.3232C47.7172 16.4957 47.6844 16.6665 47.6192 16.8262C47.5539 16.9858 47.4576 17.1309 47.3357 17.2529C47.2123 17.3763 47.0663 17.4748 46.9057 17.5429C46.7446 17.6116 46.5708 17.6453 46.3957 17.6426Z" fill="#37497F" />
// 								</svg>
// 								<h4> <FormattedMessage id={'oneHundredthOfThe'}></FormattedMessage> </h4>
// 								<p><FormattedMessage id={'ethereumETHWasMainly'}></FormattedMessage></p>
// 							</Col>

// 							<Col md={4} sm={12} className="aboutSectionBox">
// 								{/* <img src={VRIcon} alt="icon" /> */}
// 								<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
// 									<path d="M42.9101 85.16C34.4886 85.16 26.2562 82.662 19.2539 77.9833C12.2517 73.3045 6.79409 66.6544 3.57131 58.8739C0.34853 51.0934 -0.494699 42.532 1.14826 34.2723C2.79122 26.0126 6.84657 18.4265 12.8015 12.4716C18.7564 6.51663 26.3434 2.46119 34.6032 0.818232C42.8629 -0.824726 51.4243 0.0183043 59.2048 3.24108C66.9852 6.46386 73.6353 11.9215 78.3141 18.9237C82.9928 25.9259 85.4901 34.1584 85.4901 42.58C85.4769 53.8688 80.9865 64.6913 73.0041 72.6737C65.0217 80.6561 54.199 85.1468 42.9101 85.16ZM42.9101 1.00964C34.6859 1.00964 26.6465 3.44814 19.8084 8.01745C12.9704 12.5868 7.64103 19.0822 4.49424 26.6805C1.34744 34.2789 0.524597 42.639 2.12978 50.705C3.73496 58.771 7.69607 66.1803 13.5121 71.995C19.3282 77.8097 26.738 81.7687 34.8044 83.3719C42.8708 84.9752 51.2314 84.1505 58.829 81.0018C66.4266 77.8532 72.9198 72.5226 77.4875 65.6835C82.0551 58.8444 84.4921 50.8041 84.4901 42.58C84.4769 31.5572 80.0916 20.9895 72.2964 13.1962C64.5012 5.40286 53.9328 1.02022 42.9101 1.00964Z" fill="#37497F" />
// 									<path d="M43.2801 53.6309C33.0401 53.6309 24.9601 44.11 24.6201 43.71C24.4307 43.4789 24.3281 43.1894 24.3301 42.8906C24.3301 41.4606 28.2501 38.1706 30.0401 36.8906C33.0401 34.7306 37.8101 32.1602 43.2801 32.1602C53.5201 32.1602 61.6001 41.6801 61.9401 42.0801C62.1295 42.3094 62.2331 42.598 62.2331 42.8955C62.2331 43.193 62.1295 43.4806 61.9401 43.71C61.6001 44.15 53.5201 53.6309 43.2801 53.6309ZM27.1801 42.7705C29.1801 44.8805 35.7201 51.1104 43.2801 51.1104C50.8401 51.1104 57.1401 45.1104 59.2801 42.9004C57.1501 40.6804 50.7101 34.6807 43.2801 34.6807C35.6601 34.6807 28.9901 40.6205 27.1801 42.7705Z" fill="#37497F" />
// 									<path d="M43.2802 50.3303C41.7786 50.3323 40.3102 49.8887 39.0607 49.0559C37.8112 48.2231 36.8368 47.0383 36.2608 45.6516C35.6848 44.2649 35.5331 42.7388 35.8248 41.2659C36.1165 39.7929 36.8386 38.4397 37.8997 37.3772C38.9608 36.3147 40.3132 35.5908 41.7858 35.2971C43.2584 35.0034 44.785 35.1526 46.1724 35.7268C47.5599 36.301 48.7459 37.2743 49.5803 38.5227C50.4148 39.7711 50.8602 41.2389 50.8602 42.7405C50.8575 44.7509 50.0584 46.6783 48.6377 48.1008C47.2171 49.5234 45.2906 50.325 43.2802 50.3303ZM43.2802 37.6907C42.2764 37.6887 41.2948 37.9847 40.4601 38.5422C39.6255 39.0997 38.9754 39.8926 38.5927 40.8205C38.2101 41.7485 38.112 42.7694 38.311 43.7532C38.51 44.737 38.9971 45.6397 39.7104 46.3459C40.4237 47.0521 41.3309 47.5307 42.3166 47.72C43.3024 47.9092 44.3221 47.8003 45.2462 47.4084C46.1703 47.0165 46.9569 46.359 47.5061 45.5188C48.0552 44.6786 48.3421 43.6943 48.3302 42.6907C48.3144 41.3608 47.7757 40.0902 46.8307 39.1545C45.8856 38.2188 44.6101 37.6932 43.2802 37.6907Z" fill="#37497F" />
// 									<path d="M25.5901 35.3106C25.4243 35.3119 25.2598 35.2797 25.1064 35.2168C24.9529 35.154 24.8135 35.0616 24.6962 34.9444C24.5789 34.8271 24.4862 34.6877 24.4233 34.5342C24.3605 34.3807 24.3288 34.2167 24.3301 34.0508V30.2608C24.3288 30.0949 24.3605 29.9299 24.4233 29.7764C24.4862 29.6229 24.5789 29.4835 24.6962 29.3663C24.8135 29.249 24.9529 29.1566 25.1064 29.0938C25.2598 29.0309 25.4243 28.9987 25.5901 29H29.3801C29.7143 29 30.0348 29.1329 30.2711 29.3692C30.5074 29.6055 30.6401 29.9266 30.6401 30.2608C30.6401 30.595 30.5074 30.9151 30.2711 31.1514C30.0348 31.3877 29.7143 31.5205 29.3801 31.5205H26.8501V34.0508C26.8515 34.2167 26.8198 34.3807 26.7569 34.5342C26.6941 34.6877 26.6013 34.8271 26.484 34.9444C26.3668 35.0616 26.2273 35.154 26.0739 35.2168C25.9204 35.2797 25.7559 35.3119 25.5901 35.3106Z" fill="#37497F" />
// 									<path d="M60.9702 35.3106C60.8043 35.3119 60.6399 35.2797 60.4864 35.2168C60.3329 35.154 60.1935 35.0616 60.0762 34.9444C59.959 34.8271 59.8662 34.6877 59.8034 34.5342C59.7405 34.3807 59.7088 34.2167 59.7102 34.0508V31.5205H57.1802C56.846 31.5205 56.5255 31.3877 56.2892 31.1514C56.0529 30.9151 55.9202 30.595 55.9202 30.2608C55.9202 29.9266 56.0529 29.6055 56.2892 29.3692C56.5255 29.1329 56.846 29 57.1802 29H60.9702C61.136 28.9987 61.3004 29.0309 61.4539 29.0938C61.6074 29.1566 61.7468 29.249 61.8641 29.3663C61.9814 29.4835 62.0741 29.6229 62.137 29.7764C62.1998 29.9299 62.2315 30.0949 62.2302 30.2608V34.0508C62.2315 34.2167 62.1998 34.3807 62.137 34.5342C62.0741 34.6877 61.9814 34.8271 61.8641 34.9444C61.7468 35.0616 61.6074 35.154 61.4539 35.2168C61.3004 35.2797 61.136 35.3119 60.9702 35.3106Z" fill="#37497F" />
// 									<path d="M29.3801 56.79H25.5901C25.4243 56.7914 25.2598 56.7601 25.1064 56.6973C24.9529 56.6344 24.8135 56.5411 24.6962 56.4238C24.5789 56.3066 24.4862 56.1671 24.4233 56.0137C24.3605 55.8602 24.3288 55.6961 24.3301 55.5303V51.7402C24.3301 51.4061 24.4629 51.0859 24.6992 50.8496C24.9355 50.6133 25.2559 50.4805 25.5901 50.4805C25.9243 50.4805 26.2448 50.6133 26.4811 50.8496C26.7174 51.0859 26.8501 51.4061 26.8501 51.7402V54.2705H29.3801C29.7143 54.2705 30.0348 54.4034 30.2711 54.6396C30.5074 54.8759 30.6401 55.1961 30.6401 55.5303C30.6401 55.8644 30.5074 56.1846 30.2711 56.4209C30.0348 56.6572 29.7143 56.79 29.3801 56.79Z" fill="#37497F" />
// 									<path d="M60.9702 56.79H57.1802C56.846 56.79 56.5255 56.6572 56.2892 56.4209C56.0529 56.1846 55.9202 55.8644 55.9202 55.5303C55.9202 55.1961 56.0529 54.8759 56.2892 54.6396C56.5255 54.4034 56.846 54.2705 57.1802 54.2705H59.7102V51.7402C59.7102 51.4061 59.8429 51.0859 60.0792 50.8496C60.3155 50.6133 60.636 50.4805 60.9702 50.4805C61.3043 50.4805 61.6248 50.6133 61.8611 50.8496C62.0974 51.0859 62.2302 51.4061 62.2302 51.7402V55.5303C62.2315 55.6961 62.1998 55.8602 62.137 56.0137C62.0741 56.1671 61.9814 56.3066 61.8641 56.4238C61.7468 56.5411 61.6074 56.6344 61.4539 56.6973C61.3004 56.7601 61.136 56.7914 60.9702 56.79Z" fill="#37497F" />
// 								</svg>
// 								<h4> <FormattedMessage id={'arVRSupport'}></FormattedMessage></h4>
// 								<p> <FormattedMessage id={'inThePastThe'}></FormattedMessage></p>
// 							</Col>

// 						</Row>
// 						<hr />
// 					</div>

// 					<div className="AwardBox mt-4 aboutSectionBody">
// 						<ul className="award-list">
// 							<li>
// 								<img className="first_" src={`${CDN_LINK_AWARD}/award-1.png`} alt="xanalia" />
// 								<div className="d-flex justify-content-center">
// 									<p><FormattedMessage id="highExpectingMarketPlace" /><br /><FormattedMessage id="highExpectingMarketPlace1" /><br /><FormattedMessage id="highExpectingMarketPlace2" /></p>
// 								</div>
// 							</li>
// 							<li>
// 								<img className="second_" src={`${CDN_LINK_AWARD}/award-2.png`} alt="xanalia" />
// 								<div className="d-flex justify-content-center">
// 									<p className="second_text"><FormattedMessage id="nOBlockchainProject1" /><br /><FormattedMessage id="nOBlockchainProject3" /><br /><FormattedMessage id="nOBlockchainProject4" /></p>
// 								</div>
// 							</li>
// 							<li>
// 								<img className="third_" src={`${CDN_LINK_AWARD}/award-3.png`} alt="xanalia" />
// 								<div className="d-flex justify-content-center">
// 									<p><FormattedMessage id="priceRaisingToken" /><br /><FormattedMessage id="priceRaisingToken1" /><br /><FormattedMessage id="priceRaisingToken2" /></p>
// 								</div>
// 							</li>
// 						</ul>

// 						{lang === "en" ?
// 							<>
// 								<small> <FormattedMessage id={'accordingToASurveyByTheJapan'}></FormattedMessage> </small>
// 								<h5> <FormattedMessage id={'featuredOnMajorSitesIn'}></FormattedMessage> </h5>
// 							</>
// 							: <>
// 								<small> <FormattedMessage id={'accordingToASurveyByTheJapan'}></FormattedMessage> </small>
// 								<h5> <FormattedMessage id={'featuredOnMajorSitesIn'}></FormattedMessage> </h5>
// 							</>
// 						}
// 					</div>

// 					<Button id="to-xanalia" onClick={this.openInNewTab}>
// 						<MyLazyImage
// 							src={XanaliaLogo}
// 							alt="xanalia logo"
// 						/>
// 						<FormattedMessage id={'awardXANALIA'}></FormattedMessage>
// 						<svg width="18" height="33" viewBox="0 0 18 33" fill="none" xmlns="http://www.w3.org/2000/svg">
// 							<path d="M2.00001 32.2L0.200012 30.3L14.2 16.3L0.200012 2.3L2.00001 0.5L17.8 16.3L2.00001 32.2Z" fill="#251E1C" />
// 						</svg>
// 					</Button>

// 				</Container>

// 				{/* Entry box */}
// 				<div className="entryBox">
// 					<Container className="entryBoxBody">
// 						<h2> <FormattedMessage id={'Entry'}></FormattedMessage>  </h2>
// 						<hr />
// 						<p>  <FormattedMessage id={'pleaseReadTheAbove'}></FormattedMessage> </p>
// 						<Button onClick={this.showLoginModal}>
// 							<FormattedMessage id={'toApplicationForm'}></FormattedMessage>
// 							<svg width="18" height="33" viewBox="0 0 18 33" fill="none" xmlns="http://www.w3.org/2000/svg">
// 								<path d="M2.00001 32.2L0.200012 30.3L14.2 16.3L0.200012 2.3L2.00001 0.5L17.8 16.3L2.00001 32.2Z" fill="#251E1C" />
// 							</svg>
// 						</Button>
// 						<div className="goldAwardPrize">
// 							<h5 className="text-uppercase">
// 								<FormattedMessage id={'awardNow'}></FormattedMessage> <br />
// 								<FormattedMessage id={'awardHiring'}></FormattedMessage>
// 							</h5>
// 						</div>
// 					</Container>
// 				</div>
// 				{/* Entry box End */}
// 				<LoginModal show={this.state.loginModal} handleClose={this.hideLoginModal} openSignin={this.showLoginModal} match={this.props.match} />
// 			</div>
// 		)
// 	}
// }

// export default withRouter(AwardBody)
