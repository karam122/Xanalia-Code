// import { Jumbotron } from 'react-bootstrap';
// import { useTransHook } from '@/locales/hooks'
const AwardBanner = () => {
    // const { t } = useTransHook()
    return (
        <>
            <div id="eventOutline" className="heroHeader">
                <h1 className="heroHeadingPhone p-view">
                    {' '}
                    WORLD&apos;S FIRST! <br /> NFTART <br /> COMPETITION{' '}
                </h1>
                {/* <h1>{t('ERROR_EMPTY_NFT_FIX_PRICE')}</h1> */}
                {/* <Jumbotron className="heroHeader"> */}

                <div className="video-bg">
                    <video loop autoPlay muted playsInline>
                        <source
                            src={
                                'https://ik.imagekit.io/xanalia/assestimagesaward/banner-video.mp4'
                            }
                            type="video/mp4"
                        ></source>
                    </video>
                </div>
                <h1 className="d-view">
                    World&apos;s First <br /> NFTART <br /> Competition
                </h1>
                <h4>
                    <h5>
                        worldsFirst
                        <span> ( MethodCompetition )</span>
                    </h5>
                    <br />
                    <h5>awardNFTArt</h5>
                    <br />
                    <h5>competition</h5>
                </h4>
                {/* <button className={`btnaward2021 ${language === "en" ? "en_btn" : "jp_btn"}`} onClick={() => this.props.router.push({ pathname: "/", search: "?award2021", query: { "award2021": true } })}> <FormattedMessage id="awardLink2021" /> </button> */}
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
                <p className="bounce-1"> SCROLL </p>
                {/* </Jumbotron> */}
            </div>
        </>
    )
}

export default AwardBanner
