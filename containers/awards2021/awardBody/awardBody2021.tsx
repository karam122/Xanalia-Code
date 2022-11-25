import { Container, Col, Row, ListGroup } from 'react-bootstrap'
import { useTransHook } from '@/locales/hooks'

const AwardBody2021 = () => {
    const { t } = useTransHook()
    const CDN_LINK_AWARD = 'https://ik.imagekit.io/xanalia/assestimagesaward'

    const data = [
        {
            alt: '...',
            effect: 'blur',
            src: 'https://ik.imagekit.io/xanalia/Images/aWARD_ICON.svg',
            h4Data: '1',
            h4SpanData: 'st',
            AwardType: 'goldAward',
            h2Data: '10,000 US $',
            ItemLink:
                'https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-658/658',
            imgsrc: 'https://ik.imagekit.io/xanalia/award/1632903952376.jpg?tr:w-400,tr:h-400',
            Heading: 'カワウ型飛行都市 GREAT CORMORANT FLYING CITY',
            holderName: 'yuya',
        },
        {
            alt: '...',
            effect: 'blur',
            src: 'https://ik.imagekit.io/xanalia/Images/aWARD_ICON.svg',
            h4Data: '2',
            h4SpanData: 'nd',
            AwardType: 'SilverAward',
            h2Data: '5,000 US $',
            ItemLink:
                'https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1133/1133',
            imgsrc: 'https://xanalia.s3.ap-southeast-1.amazonaws.com/awardThumb/1636461566933.jpg',
            Heading: 'ZEUS',
            holderName: 'Obliraj',
            video: 'video',
        },
        {
            alt: '...',
            effect: 'blur',
            src: 'https://ik.imagekit.io/xanalia/Images/aWARD_ICON.svg',
            h4Data: '3',
            h4SpanData: 'rd',
            AwardType: 'BronzeAward',
            h2Data: '3,000 US $',
            ItemLink:
                'https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1087/1087',
            imgsrc: 'https://ik.imagekit.io/xanalia/award/1640939817487.png?tr=w-400,tr=h-400',
            Heading: 'SQUARE HUMAN ALPHA RAINBOW',
            holderName: 'WINGLAY',
        },
    ]

    return (
        <>
            <div
                id="award-body"
                className="mainAwardBody award2021 "
                style={{
                    background: `url(${'https://ik.imagekit.io/xanalia/Images/award-bg.jpg'})`,
                }}
            >
                <Container className="sectionBox" id="contestFlow">
                    <div id="introducion" className="introBox wtrns">
                        <h2>{t('xanaliaNftart2021')} </h2>
                        {/* <h2> What is XANALIA NFTART AWARD 2021 ? </h2> */}
                        <Row>
                            <Col sm={12}>
                                <p>{t('digitizationAccelerated')}</p>
                                {/* <p> digitizationAccelerated</p> */}
                                {/* <h1>{t('ERROR_EMPTY_NFT_FIX_PRICE')}</h1> */}
                            </Col>
                            <Col sm={12}>
                                <h2 className="hosted_sec mt-5">
                                    {t('hosted')}
                                </h2>
                                {/* <h2 className="hosted_sec mt-5">hosted</h2> */}
                                <div className="company-logo">
                                    <img
                                        alt="..."
                                        className="img-fluid img01"
                                        src="https://ik.imagekit.io/xanalia/Images/FCC.png"
                                    />
                                    <img
                                        alt="..."
                                        className="img-fluid  img02 second"
                                        src="https://ik.imagekit.io/xanalia/Images/download_file.png"
                                    />
                                    <img
                                        alt="..."
                                        className="img-fluid  img03"
                                        src="https://ik.imagekit.io/xanalia/Images/download_file-1.png"
                                    />
                                    <img
                                        alt="..."
                                        className="img-fluid  img04"
                                        src="https://ik.imagekit.io/xanalia/Images/NOBORDERZ-logo.svg"
                                    />
                                </div>
                            </Col>
                            <Col sm={12} className="sponsored_sec">
                                <h2 className="hosted_sec mt-5">
                                    {t('sponsored')}
                                </h2>

                                {/* <h2 className="hosted_sec mt-5">sponsored</h2> */}
                                <div className="company-logo">
                                    <img
                                        alt="..."
                                        className="img-fluid img01"
                                        src="https://ik.imagekit.io/xanalia/Images/Web-Logo1.gif"
                                    />
                                </div>
                            </Col>
                            <Col sm={12} className="press_release_sec">
                                <h2 className="hosted_sec mt-5">
                                    {t('pressRelease')}
                                </h2>
                                {/* <h2 className="hosted_sec mt-5">
                                    pressRelease
                                </h2> */}
                                <div className="table-data">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>2022.4.21</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://prtimes.jp/main/html/rd/p/000000038.000080034.html"
                                                    >
                                                        {t(
                                                            'galleryOfNominated',
                                                        )}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2022.3.30</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://prtimes.jp/main/html/rd/p/000001271.000031071.html"
                                                    >
                                                        {t(
                                                            'internationalArtExhibition',
                                                        )}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2022.3.16</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://prtimes.jp/main/html/rd/p/000001251.000031071.html (PCP)"
                                                    >
                                                        {t(' cormorantFlying')}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021.11.1</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://prtimes.jp/main/html/rd/p/000000015.000080034.html"
                                                    >
                                                        {t('companyGroup')}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021.09.1</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://prtimes.jp/main/html/rd/p/000001033.000031071.html (PCP)"
                                                    >
                                                        {t('nominations')}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2021.09.1</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://prtimes.jp/main/html/rd/p/000000007.000080034.html"
                                                    >
                                                        {t('vrMetaverse')}
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div
                        id="award-id"
                        className="AwardBox  btrns AwardBoxPhone"
                    >
                        <h5 className="text-center"> {t('awardPrizes')} </h5>
                        <hr className="awardprice mb-3" />
                        {/* Genaric Code for Award Card*/}
                        <Row>
                            {data.map((item, index) => {
                                {
                                    console.log(item, '>>>>>>>>>>>>>>>>')
                                }
                                return (
                                    <Col
                                        md={4}
                                        sm={12}
                                        className="goldAwardPrize new-gold-prize"
                                        key={index}
                                    >
                                        <div className="card-phone-header">
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="crown"
                                                className="svg-inline--fa fa-crown fa-w-20 crown_icon"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"
                                                ></path>
                                            </svg>

                                            <h4 className="text-uppercase phone-heading">
                                                {item.h4Data}{' '}
                                                {t(item.AwardType)}
                                                <span className="text-lowercase">
                                                    {t(item.h4SpanData)}
                                                </span>
                                            </h4>
                                            <h4 className="text-uppercase phone-heading"></h4>
                                            <h4 className="text-uppercase d-card-heading">
                                                {item.h4Data}
                                                <span className="text-lowercase">
                                                    {t(item.h4SpanData)}{' '}
                                                    {t(item.AwardType)}
                                                </span>
                                                <br />
                                            </h4>
                                        </div>
                                        <div className="card-phone-body">
                                            <h2>{item.h2Data}</h2>
                                            {/* <h3>{item.h3Data} <span>{item.h3SpanData}</span></h3> */}
                                        </div>
                                        <div className="hotAuctionUI explorCardUI desktop-view">
                                            <ListGroup className="cardListGrup">
                                                <a
                                                    className="list-group-item"
                                                    href={item.ItemLink}
                                                >
                                                    <div className="cardlistCardImg">
                                                        <img
                                                            alt="banner"
                                                            src={item.imgsrc}
                                                            className="listCardImg"
                                                        />
                                                    </div>
                                                    <div className="listgroup-body">
                                                        <h5>{item.Heading}</h5>
                                                        <div className="holderBox">
                                                            <h6 className="holderName">
                                                                {
                                                                    item.holderName
                                                                }
                                                            </h6>
                                                        </div>
                                                        <div className="videoBox">
                                                            <span className="vidoName">
                                                                {t('video')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </ListGroup>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                        <div className="hotAuctionUI explorCardUI mb-none">
                            <ul className="cardListGrup">
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-658/658"
                                >
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1632903952376.jpg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>
                                            カワウ型飛行都市 GREAT CORMORANT
                                            FLYING CITY
                                        </h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">yuya</h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1133/1133"
                                >
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://xanalia.s3.ap-southeast-1.amazonaws.com/awardThumb/1636461566933.jpg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>ZEUS</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                Obliraj
                                            </h6>
                                        </div>
                                        <div className="videoBox">
                                            <span className="vidoName">
                                                {t('video')}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1087/1087"
                                >
                                    {/* <div className="listgroup-Header">    
										Header
									</div> */}
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1640939817487.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>SQUARE HUMAN ALPHA RAINBOW</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                WINGLAY
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                            </ul>
                        </div>
                    </div>

                    <div className="application_section wtrns">
                        <div className="hotAuctionUI explorCardUI">
                            <ListGroup className="cardListGrup">
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1072/1072"
                                >
                                    <div className="listgroup-Header">
                                        {t('tsumuraPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://xanalia.s3.ap-southeast-1.amazonaws.com/awardThumb/1640961827773.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>SKULL</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">T</h6>
                                            <span className="vidoName">
                                                {t('video')}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-538/538"
                                >
                                    <div className="listgroup-Header">
                                        {t('tsujiPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1631180666076.jpg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>TO THE SECOND NOAH IN 20XX</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                T&Kphotounit
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-714/714"
                                >
                                    <div className="listgroup-Header">
                                        {t('ambassadorsPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1634737142425.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>ねじねじドーナツ部長の日常</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                みうらどーなつ
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1080/1080"
                                >
                                    <div className="listgroup-Header">
                                        {t('specialPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1640962922155.jpg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>META GIRL</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                saorikashimura
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1131/1131"
                                >
                                    <div className="listgroup-Header">
                                        {t('specialPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://xanalia.s3.ap-southeast-1.amazonaws.com/awardThumb/1640323810901.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>
                                            自己犠牲症候群／SELF SACRIFICE
                                            SYNDROME
                                        </h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                しののめあや
                                            </h6>
                                            <span className="vidoName">
                                                {t('video')}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1014/1014"
                                >
                                    <div className="listgroup-Header">
                                        {t('specialPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://xanalia.s3.amazonaws.com/award/1639136362223.jpg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>A GIRL AND SPIRITS</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                HoshiHiro
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1073/1073"
                                >
                                    <div className="listgroup-Header">
                                        {t('specialPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1640062213034.jpg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>THE CAT WOMAN</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                ERINA MUKAIJO
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-705/705"
                                >
                                    <div className="listgroup-Header">
                                        {t('specialPrize')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://xanalia.s3.ap-southeast-1.amazonaws.com/awardThumb/1634722279834.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>MODEL-TYPEC-</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                Arisa Nakane
                                            </h6>
                                            <span className="vidoName">
                                                {t('video')}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1081/1081"
                                >
                                    <div className="listgroup-Header">
                                        {t('Winner')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1640946545679.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>{'/** MAZE **/'}</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                {'/* Evercraft */'}
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-872/872"
                                >
                                    <div className="listgroup-Header">
                                        {t('Winner')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1637416054545.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>72 SPIRITS OF SOLOMON</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                Lightmaru
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1125/1125"
                                >
                                    <div className="listgroup-Header">
                                        {t('Winner')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://xanalia.s3.ap-southeast-1.amazonaws.com/awardThumb/1640776524986.jpg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>IN AND OUT</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                OfirK_design
                                            </h6>
                                            <span className="vidoName">
                                                {t('video')}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-803/803"
                                >
                                    <div className="listgroup-Header">
                                        {t('Winner')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1635705780355.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>INDEPENDENCE</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                REIKAJITANI
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-932/932"
                                >
                                    <div className="listgroup-Header">
                                        Winner
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1636896057087.gif?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>シカのマトリョーシカ</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                qlippers
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1140/1140"
                                >
                                    <div className="listgroup-Header">
                                        {t('Winner')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/awardThumb/PNG.png?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>
                                            磁場の拡散（DIFFUSION OF MAGNETIC
                                            FIELD）
                                        </h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                HIROMU KONNO
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    className="list-group-item"
                                    href="https://www.xanalia.com/market-details/polygon/polygon-0xb567D9Abd7c7854463a0beFD2078Fe4c219aaF82-1095/1095"
                                >
                                    <div className="listgroup-Header">
                                        {t('Winner')}
                                    </div>
                                    <div className="cardlistCardImg">
                                        <img
                                            alt="banner"
                                            src="https://ik.imagekit.io/xanalia/award/1640571255526.jpeg?tr=w-400,tr=h-400"
                                            className="listCardImg"
                                        />
                                    </div>
                                    <div className="listgroup-body">
                                        <h5>ICE DYE#1</h5>
                                        <div className="holderBox">
                                            <h6 className="holderName">
                                                Sayaka
                                            </h6>
                                            <span className="vidoName">
                                                {'video'}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </ListGroup>
                        </div>
                    </div>

                    <div className="timeline_Section btrns AwardBox eventFlow">
                        <h5 className="text-center"> {t('eventFlow')} </h5>
                        <hr className="awardprice mb-5" />
                        <ul className="timeline">
                            <li>
                                <div className="timeline-badge one-penci">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('submitWork')}
                                        </h4>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <div className="timeline-badge">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('screening')}
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{t('screeningSelect')}</p>
                                        <p>{t('afterScreening')}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-badge">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('websiteDisplay')}
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{t('allNominated')}</p>
                                        <a href="https://xanalia.com/?awards2021">
                                            https://xanalia.com/?awards2021
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <div className="timeline-badge">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('auctionBid')}
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{t('auctionRanking')}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-badge">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('virtualDisplay')}
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{t('theWinningEntries')}</p>
                                    </div>
                                </div>
                            </li>

                            <li className="timeline-inverted">
                                <div className="timeline-badge">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('winnerAnnouncement')}
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{t('best3Winner')}</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="timeline-badge">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('auctionResult')}
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{t('theHighestBidder')}</p>
                                        <p>{t('creatorsAccording')}</p>
                                    </div>
                                </div>
                            </li>

                            <li className="timeline-inverted">
                                <div className="timeline-badge ">
                                    {/* <FontAwesomeIcon icon={faPencilAlt} className="mt-2" /> */}
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4 className="timeline-title">
                                            {t('secondaryMarket')}
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{t('revenueOfsecondary')}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/*  */}
                    <div
                        id="introducion"
                        className="introBox wtrns meta-gallery"
                    >
                        <h2> {t('metaGallery')} </h2>
                        <Row>
                            <Col sm={12}>
                                <p>
                                    {t('receivedNft')} <br />
                                    {t('smartphoneVisit')}
                                    <br />
                                    {t('developBusiness')}{' '}
                                </p>
                            </Col>

                            <Col sm={6} className="press_release_sec">
                                <p>
                                    <strong>◉ iPhone</strong>
                                </p>
                                <div className="table-data">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>{t('model')}</td>
                                                <td>{t('iphoneXabove')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('OS')}</td>
                                                <td>{t('iosAbove')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('CPU')}</td>
                                                <td>{t('6cores')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('GPU')}</td>
                                                <td>{t('appleGpu')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('downloadUrl')}</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://apps.apple.com/jp/app/xana/id1524283847"
                                                    >
                                                        https://apps.apple.com/jp/app/xana/id1524283847
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                            <Col sm={6} className="press_release_sec">
                                <p>
                                    <strong>◉ Android </strong>
                                </p>
                                <div className="table-data">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>{t('OS')}</td>
                                                <td>{t('andversion')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('CPU')}</td>
                                                <td>{t('sapdragon')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('GPU')}</td>
                                                <td>{t('adreno')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('RAM')}</td>
                                                <td>{t('6Above')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('freeStorage')}</td>
                                                <td>3 GB</td>
                                            </tr>
                                            <tr>
                                                <td>{t('downloadUrl')}</td>
                                                <td>
                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        href="https://play.google.com/store/apps/details?id=com.nbi.xana"
                                                    >
                                                        https://play.google.com/store/apps/details?id=com.nbi.xana
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div className="img-gallery">
                                    {/* <img className="img-fluid" src={Gameimg} /> */}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/*  */}

                    <div className="judge_section wtrns">
                        <div className="AwardBox AwardBoxPhone">
                            <div className="bg_text mb-8">
                                <h5>{t('judges')} </h5>
                            </div>

                            <div className="media">
                                <div className="media-body">
                                    <Row>
                                        <Col md={3} className="text-center">
                                            <img
                                                className="mr-3 "
                                                src="https://ik.imagekit.io/xanalia/Images/kawanishi_2021_profile.jpg"
                                                alt="Generic placeholder image"
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <h6 className="mt-0">
                                                {t('kanaKawanishi')}
                                            </h6>
                                            <p>
                                                {' '}
                                                {t(
                                                    'directorOfGalleryPhotogrphy',
                                                )}{' '}
                                                <br />
                                                <a
                                                    href="https://www.kanakawanishi.com"
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                >
                                                    {' '}
                                                    https://www.kanakawanishi.com/{' '}
                                                </a>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-body">
                                    <Row>
                                        <Col md={3} className="text-center">
                                            <img
                                                className="mr-3"
                                                src={`${CDN_LINK_AWARD}/4.jpg`}
                                                alt="Generic placeholder image"
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <h6 className="mt-0">
                                                {t('junkoKuroda')}{' '}
                                            </h6>
                                            <p>
                                                {' '}
                                                {t(
                                                    'professorDesigner',
                                                )} <br />{' '}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-body">
                                    <Row>
                                        <Col md={3} className="text-center">
                                            <img
                                                className="mr-3"
                                                src={`${CDN_LINK_AWARD}/4B.jpg`}
                                                alt="Generic placeholder image"
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <h6 className="mt-0">
                                                {t('kosukeTsunura')}
                                            </h6>
                                            <p>
                                                {t('artDirectorProfessor')}
                                                <br />
                                                <a
                                                    href="https://www.kosuketsumura.com/profile"
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                >
                                                    {' '}
                                                    https://www.kosuketsumura.com/profile{' '}
                                                </a>{' '}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-body">
                                    <Row>
                                        <Col md={3} className="text-center">
                                            <img
                                                className="mr-3"
                                                src={`${CDN_LINK_AWARD}/4C.jpg`}
                                                alt="Generic placeholder image"
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <h6 className="mt-0">
                                                {t('asakoTsuji')}
                                            </h6>
                                            <p>
                                                {t('creativeDirectorofArca')}
                                                <br />
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-body">
                                    <Row>
                                        <Col md={3} className="text-center">
                                            <img
                                                className="mr-3"
                                                src={`${CDN_LINK_AWARD}/image.png`}
                                                alt="Generic placeholder image"
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <h6 className="mt-0">
                                                {t('junyaYamamine')}
                                            </h6>
                                            <p>
                                                {t('curatorCoChairman')}
                                                <br />
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="judge_section wtrns">
                        <div className="AwardBox AwardBoxPhone ambassadorAwardBox">
                            <div className="bg_text mb-8">
                                <h5>{t('ambassador')} </h5>
                            </div>
                            <div className="media">
                                <div className="media-body">
                                    <Row>
                                        <Col md={3} className="text-center">
                                            <img
                                                className="mr-3 w200"
                                                src="https://ik.imagekit.io/xanalia/Images/GY-ZLFRS.png"
                                                alt="Generic placeholder image"
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <h6 className="mt-0">
                                                {t('ikehaya')}
                                            </h6>
                                            <p>
                                                {' '}
                                                {t('founderOfCryptoNinja')}{' '}
                                                <br />
                                                <a
                                                    href="https://opensea.io/collection/crypto-ninja-nft"
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                >
                                                    {' '}
                                                    https://opensea.io/collection/crypto-ninja-nft{' '}
                                                </a>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_section btrns">
                        <div id="award-faqs" className="AwardBox faqBox">
                            <div className="flowBox">
                                <h2> {t('faqs')}</h2>
                                <hr />
                            </div>
                            {/* <div className="faqBoxBody award21">
								<Accordion defaultActiveKey="0">

									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => this.setRotation('0')}>
											<span> Q </span> <p className="mb-0"> auctionBuyers</p>
											<FontAwesomeIcon className={`createRight ${this.state.drop === '0' ? 'dropRatation' : 'dropRatationY'}`} icon={faCaretRight} />
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="0">
											<Card.Body className="d-block">
												<div className="d-flex align-items-center mb-0">
													<span> A </span>
													<p className="mb-0">fisrtAward<br /></p>
												</div>

											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => this.setRotation('1')}>
											<span> Q </span> <p className="mb-0"> auctionOpen</p>
											<FontAwesomeIcon className={`createRight ${this.state.drop === '1' ? 'dropRatation' : 'dropRatationY'}`} icon={faCaretRight} />
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="1">
											<Card.Body className="d-block">
												<div className="d-flex align-items-center mb-0">
													<span> A </span>
													<p className="mb-0">heldUntil<br /></p>
												</div>

											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="2" onClick={() => this.setRotation('2')}>
											<span> Q </span> <p className="mb-0"> participateAution</p>
											<FontAwesomeIcon className={`createRight ${this.state.drop === '2' ? 'dropRatation' : 'dropRatationY'}`} icon={faCaretRight} />
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="2">
											<Card.Body className="d-block">
												<div className="d-flex align-items-center mb-0">
													<span> A </span>
													<p className="mb-0">wbInformation<a target="_blank" rel="noreferrer noopener" href="https://site.xanalia.com/how-to-set-bid-in-an-auction/" className='white-text'>https://site.xanalia.com/how-to-set-bid-in-an-auction/ </a><br /></p>
												</div>

											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="3" onClick={() => this.setRotation('3')}>
											<span> Q </span> <p className="mb-0"> winningBidder</p>
											<FontAwesomeIcon className={`createRight ${this.state.drop === '3' ? 'dropRatation' : 'dropRatationY'}`} icon={faCaretRight} />
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="3">
											<Card.Body className="d-block">
												<div className="d-flex align-items-center mb-0">
													<span> A </span>
													<p className="mb-0">purchasedWork<br /></p>
												</div>

											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="4" onClick={() => this.setRotation('4')}>
											<span> Q </span> <p className="mb-0"> virtualCurrency</p>
											<FontAwesomeIcon className={`createRight ${this.state.drop === '4' ? 'dropRatation' : 'dropRatationY'}`} icon={faCaretRight} />
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="4">
											<Card.Body className="d-block">
												<div className="d-flex align-items-center mb-0">
													<span> A </span>
													<p className="mb-0">cardBidding<br /></p>
												</div>

											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey="5" onClick={() => this.setRotation('5')}>
											<span> Q </span> <p className="mb-0"> receiveAnyProceeds</p>
											<FontAwesomeIcon className={`createRight ${this.state.drop === '5' ? 'dropRatation' : 'dropRatationY'}`} icon={faCaretRight} />
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="5">
											<Card.Body className="d-block">
												<div className="d-flex align-items-center mb-0">
													<span> A </span>
													<p className="mb-0">automaticallyCredited<br /></p>
												</div>

											</Card.Body>
										</Accordion.Collapse>
									</Card>

								</Accordion> 
							</div>*/}
                        </div>
                    </div>

                    <div className="about_section btrns">
                        <div id="about-award" className="AwardBox aboutSection">
                            <div className="flowBox">
                                <h2> {t('awardAboutXaanalia1')}</h2>
                                <hr />
                                <p> {t('worldDecentralized')} </p>
                            </div>
                            <div className="mt-4 aboutSectionBody">
                                <ul className="award-list">
                                    <li>
                                        <img
                                            className="first_"
                                            src={`${CDN_LINK_AWARD}/award-1.png`}
                                            alt="xanalia"
                                        />
                                        <div className="d-flex justify-content-center">
                                            <p className="first_box">
                                                {t(' no_1')}
                                                <br />
                                                {t('rapidlyGrowing')}
                                                <br />
                                                {t('nftMarketplace')}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <img
                                            className="second_"
                                            src={`${CDN_LINK_AWARD}/award-2.png`}
                                            alt="xanalia"
                                        />
                                        <div className="d-flex justify-content-center">
                                            <p className="second_box_sec">
                                                {t('no_12')}
                                                <br />
                                                {t('mostGrowth')}
                                                <br />
                                                {t('blockchainProject')}
                                                <br />
                                                {t('blockchainYear')}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <img
                                            className="third_"
                                            src="https://ik.imagekit.io/xanalia/Images/sJMRO_logoSizes-03.png"
                                            alt="xanalia"
                                        />
                                        <div className="d-flex justify-content-center">
                                            <p>
                                                {t('no_13')}
                                                <br />
                                                {t('expectedRaise')}
                                                <br />
                                                {t('DeFiProject')}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default AwardBody2021
