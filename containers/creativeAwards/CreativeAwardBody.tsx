import { ListGroup, Row, Col, Card } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'

const CreativeBanner = () => {
    const { t } = useTransHook()

    return (
        <div className="creativeAwardBody">
            <section className="creatorsSection">
                <div className="introBox whiteBox">
                    <h2>{t('gather')}</h2>
                    {/* <h2>
                        Gather, creators of action sports that have spread to
                        the world!
                    </h2> */}
                    <p>{t('inrecentyrs')}</p>
                    {/* <p>
                        In recent years, attention to action sports and street
                        culture, such as the Tokyo Olympics and the first X
                        Games held in Japan, has spread across generations.
                        Behind the fact that people are accepting it as a
                        culture beyond the framework of mere sports, we must not
                        forget the power of creators who cut out their
                        brilliance and express themselves. At the same time as
                        athletes who are sometimes athletes and sometimes
                        artists, I feel that training and discovering creators
                        is an important issue in the future action sports scene.
                        For this reason, we have decided to hold a creative
                        award specializing in action sports and street culture.
                        Through this award, I would like to convey the appeal of
                        action sports and street culture from the perspective of
                        creativity, and discover world-class creators
                    </p> */}
                    <h6>{t('jurychairman')}</h6>
                    {/* <h6>Jury Chairman Hitoshi Kajino</h6> */}
                </div>
            </section>
            {/* ORGANIZER Start*/}
            <section className="organizerSection">
                <div className="introBox whiteBox">
                    <h3>{t('orgnaizer')}</h3>

                    {/* <h3>orgnaizer</h3> */}
                    <hr className="divDivider" />
                    <h6> {t('executivecomtee')}</h6>
                    {/* <h6><FormattedMessage id='executivecomtee' /></h6> */}
                    <ListGroup horizontal className="organizerImgGrup">
                        <ListGroup.Item>
                            <img
                                src="https://ik.imagekit.io/xanalia/Images/fuelmedia.png"
                                alt="img1"
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <img
                                src="https://ik.imagekit.io/xanalia/Images/zeta.png"
                                alt="img2"
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <img
                                src="https://ik.imagekit.io/xanalia/Images/XANA-logo-side.png"
                                alt="img3"
                            />
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup horizontal className="organizerPartnerImgs">
                        <ListGroup.Item>
                            <p>{t('OFmedia')}</p>
                            <img
                                src="https://ik.imagekit.io/xanalia/Images/finePlay.png"
                                alt="img4"
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{t('NFTpltfrm')}</p>
                            <img
                                src="https://ik.imagekit.io/xanalia/Images/XANALI-block-hori.png"
                                alt="img78"
                            />
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup horizontal className="organizerPartnerImgs">
                        <ListGroup.Item>
                            <p>{t('sponship')}</p>
                            <img
                                src="https://ik.imagekit.io/xanalia/Images/WesternDigital_Logo.jpg"
                                alt="img5"
                            />
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </section>
            {/* AwardBox */}
            <section className="AwardsSectionUI">
                <div id="award-id" className="AwardBox ">
                    <h3>{t('xanaaward')}</h3>
                    {/* <h3>Grand Prize Video Category</h3> */}
                    <hr className="divDivider" />
                    <h6>{t('SprizeTop')}</h6>
                    {/* <h6>Supplementary prize</h6> */}
                    {/* Genaric Code for Award Card*/}
                    <Row>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                {/* <FontAwesomeIcon icon={faCrown} className="crown_icon" /> */}
                                <h4>{t('Gprizevideo')}</h4>
                                {/* <h4 className="phone-heading">
                                    Grand Prize Video Category
                                </h4> */}
                                <h2 className="text-uppercase d-card-heading">
                                    <span className="text-lowercase">¥</span>
                                    150,000
                                </h2>
                            </div>
                        </Col>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                <h4 className="phone-heading">
                                    {t('Gprizephoto')}
                                </h4>
                                {/* <h4 className="phone-heading">
                                    Grand Prize Photo Category
                                </h4> */}
                                <h2 className="text-uppercase d-card-heading">
                                    <span className="text-lowercase">¥</span>
                                    150,000
                                </h2>
                            </div>
                        </Col>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                <h4 className="phone-heading">
                                    {t('Xanaward')}
                                </h4>

                                {/* <h4 className="phone-heading">XANALIA Award</h4> */}
                                <p className="genesis-nft">
                                    {t('genesisNft')}
                                    {/* ①XANA : GENESIS NFT */}
                                    <br />
                                    {t('globalPromotion')}
                                    {/* ②Global promotion for award- */}
                                    <br />
                                    {t('metaverseNft')}
                                    {/* converted to Metaverse NFT */}
                                    <br />
                                    {t('metaverseLand')}
                                    {/* ④XANA Metaverse Land */}
                                </p>
                            </div>
                        </Col>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                {/* <FontAwesomeIcon icon={faCrown} className="crown_icon" /> */}
                                <h4 className="phone-heading">
                                    {t('excelAwardvideo')}
                                    {/* Excellence Award */}
                                </h4>
                                <h5 className=" d-card-heading">
                                    {t('SprizeTop')}
                                    {/* Video Category */}
                                    <br />
                                    {t('Sdeskext')}
                                    {/* Supplementary prize */}
                                    <br />
                                    {t('portblesdd')}
                                    {/* Sundesk Extreme */}
                                </h5>
                            </div>
                        </Col>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                {/* <FontAwesomeIcon icon={faCrown} className="crown_icon" /> */}
                                <h4 className="phone-heading">
                                    {t('excelAwardphotoctgry')}
                                    {/* Excellence Award */}
                                </h4>
                                <h5 className=" d-card-heading">
                                    {/* Supplementary prize */}
                                    {t('SprizeTop')}
                                    <br />
                                    {/* Sundesk Extreme */}
                                    {t('Sdeskext')}
                                    <br />
                                    {/* Portable SDD 2TB */}
                                    {t('portblesdd')}
                                </h5>
                            </div>
                        </Col>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                {/* <FontAwesomeIcon icon={faCrown} className="crown_icon" /> */}
                                <h4 className="phone-heading">
                                    {/* Western Digital Award */}
                                    {t('wstrndigaward')}
                                </h4>
                                <h5 className=" d-card-heading">
                                    {/* Supplementary prize */}
                                    {t('SprizeTop')}
                                    <br />
                                    {t('WDpassport')}
                                    {/* WD My passport SSD 2TB */}
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            {/* Application Start*/}
            <section className="organizerSection applicationSection">
                <div className="introBox whiteBox">
                    <h3>APPLICATION</h3>
                    <hr className="divDivider" />
                    <h6>{t('abtApplctn')}</h6>
                    {/* <h6>About Application</h6> */}
                    <Row>
                        <Col className="appSectionCol pl-60">
                            <div>
                                <h4>{t('abtAppldctn')}</h4>
                                {/* <h4>Application deadline </h4> */}
                                <p>
                                    {t('endofaprl')}
                                    {/* April 28th (Thursday) -June 30th (Thursday){' '} */}
                                </p>
                            </div>

                            <div>
                                <h4>{t('CAtheme')}</h4>

                                {/* <h4>theme</h4> */}
                                <p>{t('CAstyle')}</p>
                                {/* <p> keep the style</p> */}
                            </div>

                            <div>
                                <h4>{t('CAentrywork')}</h4>
                                {/* <h4> Entry work </h4> */}
                                <p>
                                    {' '}
                                    {t('CArules')}
                                    {/* Completely unpublished original work */}
                                    <br /> {t('CArules2')}
                                    {/* according to the theme and rules{' '} */}
                                </p>
                            </div>

                            <div>
                                {/* <h4> Qualification requirements </h4> */}
                                <h4>{t('CAqualifyrequire')}</h4>
                                <p>{t('CAnationality')}</p>
                                {/* <p>
                                    Nationality, age, gender, occupation,
                                    professional amateur are not required.
                                    Residents in Japan.
                                </p> */}
                            </div>
                        </Col>
                        <Col className="appSectionCol pr-60">
                            <div>
                                {/* <h4>Video work</h4> */}
                                <h4>{t('CAvideowork')}</h4>
                                <p>
                                    {t('CAvideodurtn')}

                                    {/* Video should be of 3 minutes (180 seconds)
                                    Video can be( 3-motion graphics, animation,
                                    live action, etc.  */}
                                    <br />
                                    {t('CAvideoformat')}
                                    {/* Encoding format: HD (1920x1080) H264/Mp4 */}
                                </p>
                            </div>

                            <div>
                                <h4>{t('CAphotowork')}</h4>
                                {/* <h4>Photo work </h4> */}
                                <p>
                                    {t('CAsubjctisactn')}
                                    {/* Action and street sports genres must be the
                                    subject of the photograph. Any format can be
                                    used. */}
                                </p>
                            </div>

                            <div>
                                <h4>
                                    {t('CAnftwork')}
                                    {/* NFT work */}
                                </h4>
                                <p>
                                    {t('CAdetails')}
                                    {/* Click here for details (XANALIA) */}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            {/* SCHEDULE */}
            <section className="AwardsSectionUI scheduleSection">
                <div id="award-id" className="AwardBox ">
                    <h3>SCHEDULE</h3>
                    <hr className="divDivider" />
                    <h3>{t('CAscheduletitle')}</h3>

                    {/* <h6>Schedule</h6> */}
                    {/* Genaric Code for Award Card*/}
                    <Row>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                <h4 className="phone-heading">
                                    {t('CAnichi')}
                                </h4>

                                {/* <h4 className="phone-heading">April 28</h4> */}
                                <h5 className=" d-card-heading">
                                    {t('CAappstart')}
                                    {/* Application start */}
                                </h5>
                            </div>
                        </Col>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                <h4 className="phone-heading">
                                    {t('CAenddate')}
                                </h4>

                                {/* <h4 className="phone-heading">June 30</h4> */}
                                <h5 className=" d-card-heading">
                                    {t('CAappdeadline')}
                                    {/* Application deadline */}
                                </h5>
                            </div>
                        </Col>
                        <Col md={4} sm={12} className="goldAwardPrize">
                            <div className="card-phone-header">
                                <h4 className="phone-heading">
                                    {t('CAmidjune')}
                                </h4>

                                {/* <h4 className="phone-heading">Mid-July</h4> */}
                                <h5 className=" d-card-heading">
                                    {t('CAwinannounce')}
                                    {/* Winner announcement */}
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            {/* JUDGE Start*/}
            <section className="organizerSection JudgeSection">
                <div className="introBox whiteBox">
                    <h3>JUDGE</h3>
                    <hr className="divDivider" />
                    <h6>{t('CAjudjingmember')}</h6>
                    {/* <h6>Judging members</h6> */}

                    <div className="bg_text mb-8">
                        <h5>{t('CAjurychairman')}</h5>
                        {/* <h5>Jury chairman </h5> */}
                    </div>
                    <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <div className="judgeCardImg">
                            <Card.Img
                                className="w200"
                                src="https://ik.imagekit.io/xanalia/Images/7b41d75b27a69aa29e7e8ae1e3eee3ec.png	"
                                alt="Generic placeholder image"
                            />
                        </div>
                        <Card.Body>
                            <Card.Title>◆ {t('CAhitoshi')}</Card.Title>

                            {/* <Card.Title>◆ Hitoshi Kajino</Card.Title> */}
                            <Card.Text>
                                {/* <FormattedMessage id='CAceooffur' /> <br /> */}
                                {t('CAhitoshidesc')}
                                {/* He is a Video producer and action sports
                                journalist. He has directed many action sports
                                brands and corporate video works . He has also
                                been active in big contests around the world
                                such as the X-GAMES and Red Bull X-Fighters ,
                                and has worked on domestic and international
                                action sports media . In 2012 , he founded Fur
                                Media Co., Ltd. , planning and producing a wide
                                range of content on the subject of action sports
                                . */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </section>
            <section className="organizerSection JudgeSection JudgingMemberSection ">
                <div className="introBox whiteBox pt-0">
                    <div className="bg_text mb-8">
                        <h5>{t('CAjudje')}</h5>
                        {/* <h5>judge </h5> */}
                    </div>
                    <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <div className="judgeCardImg">
                            <Card.Img
                                className="w200"
                                src="https://ik.imagekit.io/xanalia/Images/50caf845fe59749d57bdb25e38928e47.png"
                                alt="Generic placeholder image"
                            />
                        </div>
                        <Card.Body>
                            <Card.Title>
                                ◆ {t('CAsatoshi')}
                                {/* Satoshi Kuroda / Director: */}
                            </Card.Title>
                            <Card.Text>
                                {t('CAsatoshidesc')}
                                {/* He Joined PICS in 2006 after working for a CG
                                company . He currently belongs to PICS
                                management . In addition to video direction , he
                                has a career in Art Direction , Motion Graphics
                                , 3DCG production , etc. In addition to planning
                                / directing commercials , music videos , OOH ,
                                etc. , co- working with musicians He is active
                                in a wide range of activities , such as
                                developing collaboration videos and original
                                works with the theme of street culture / action
                                sports . */}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <div className="judgeCardImg">
                            <Card.Img
                                className="w200"
                                src="https://ik.imagekit.io/xanalia/Images/4d6928cf60fa421ed639cd5a7b03a711.png"
                                alt="Generic placeholder image"
                            />
                        </div>
                        <Card.Body>
                            <Card.Title>
                                ◆ {t('CAhidenori')}
                                {/* Hidenori Matsuoka Hidenori Matsuoka / Creative
                                Art Director :{' '} */}
                            </Card.Title>
                            <Card.Text>
                                {t('CAhidenoridesc')}
                                {/* He Has a deep knowledge of street culture ,
                                especially art, fashion , and action sports.
                                Since 2003 , the art and culture free magazine
                                Hidden Champion Issuance . He also publishes
                                photo books and art books , manages art shows ,
                                and curates . Recent skateboard photo book There
                                is art direction for NIKE SB TSUMAMI (Photo:
                                Nobuo Iseki ) */}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <div className="judgeCardImg">
                            <Card.Img
                                className="w200"
                                src="https://ik.imagekit.io/xanalia/Images/537fdb4066346bb0da1124228f393ef4.png"
                                alt="Generic placeholder image"
                            />
                        </div>
                        <Card.Body>
                            <Card.Title>
                                ◆ {t('CAyusuke')}
                                {/* Yusuke Kashiwazaki Cinematographer /
                                Photographer: */}
                            </Card.Title>
                            <Card.Text>
                                {t('CAyusukedesc')}
                                {/* Fur Media Co., Ltd .: <br /> */}
                                {/* After studying under Rowland Kirishima , he
                                became independent in 2011 . He is active in a
                                wide range of genres, including TV commercials ,
                                WEB commercials , advertising photos and other
                                short movies , music videos and other movies ,
                                and graphics . He also leaves many works with
                                action sports as the subject . */}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <div className="judgeCardImg">
                            <Card.Img
                                className="w200"
                                src="https://ik.imagekit.io/xanalia/Images/e6189e0f8b7103af3adca6a249b39688.png"
                                alt="Generic placeholder image"
                            />
                        </div>
                        <Card.Body>
                            <Card.Title>
                                ◆ {t('CAjason')}
                                {/* Jason Halayko Photographer: */}
                            </Card.Title>
                            <Card.Text>
                                {t('CAjasondesc')}
                                {/* He Shoots a wide range of action sports such as
                                He FMX , BMX , snowboarding , and breakdancing .
                                He has a track record in advertising and on the
                                web for various companies . In 2022 , his work
                                was published in RED BULL　ILLUME , an authority
                                on action sports photography . */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </section>
            {/* ANNOUNCEMENT Start*/}
            <section className="organizerSection announcSection">
                <div className="introBox whiteBox">
                    <h3>Announcement</h3>
                    <hr className="divDivider" />
                    <h6>{t('CAselandannounce')}</h6>
                    {/* <h6>Selection and announcement</h6> */}
                    <h2>{t('CAselectionflow')}</h2>
                    {/* <h2>【Selection flow】</h2> */}
                    <p>
                        {t('CAselectrules')}
                        {/* The selection will be made by the CREATIVE X AWARD
                        Judging Secretariat (Hitoshi Kajino, CEO of Furmedia
                        Co., Ltd.) and four judges. */}
                    </p>
                    <h3>{t('CApublctions')}</h3>
                    {/* <h2>【publication】 </h2> */}
                    <p>
                        {t('CAannouncementitle')}
                        {/* In early April 2022, we will notify the winners and
                        announce them on the FINE PLAY site CREATIVE X AWARD
                        FINE PLAY SNS account */}
                        <br />
                        {t('CAJudgewinrs')}
                        {/* ※The judging office will contact the winners. */}
                    </p>
                    <h2>{t('Regsbmwork')}</h2>
                    {/* <h2>Regarding the submitted work </h2> */}
                    <p className="mb-0 pb-0">
                        {/* Entries must be completely original and unpublished
                        works that follows the theme and rules. */}
                        {t('Subwkrpublcrltins')} {t('Subwkrpublcrltins1')}
                        {/* We will not be
                        held responsible for any violation of the copyright or
                        portrait rights of the work itself or of the subject of */}
                        {/* the work.  */}
                        <br />
                        {t('Subwkrpublcrltins2')}
                        {/* The works will be used for publicity and promotional
                        purposes on the CREATIVE X AWARD website, social
                        networking services, event filming, and in the media.{' '} */}
                        <br />
                        {t('Subwkrpublcrltins3')}
                        {/* All costs associated with the production, submission,
                        and communication of entries are the responsibility of
                        the applicant. */}
                        <br />
                        {t('Subwkrpublcrltins4')}
                        {/* ※Entries will not be considered for judging if we
                        consider them to be equivalent to the following <br />
                        Subwkrpublcrltins4 */}
                    </p>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">
                            {t('Worknotflwthmrls')}
                            {/* Entries that do not follow the theme and rules of
                            the competition. */}
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            {t('Workvltscpyrts')}
                            {/* Works that replicate existing works or infringe on
                            copyrights, portrait rights, or other rights held by
                            third parties. */}
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            {t('WorkvltsPblOrds')}
                            {/* Works with content that is offensive to public order
                            and morals. */}
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            {t('WrkinfrPrvcyRgltns')}
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            {t('WrkinfrPrvcyRgltns')}

                            {/* Works that defame or abuse the privacy of third
                            parties. */}
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            {t('Wrkinfrviolate')}
                            {/* Works that violate laws and regulations or are
                            associated with criminal acts. */}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </section>
        </div>
    )
}

export default CreativeBanner
