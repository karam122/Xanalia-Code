import AwardNavBar from './AwardNavBar'
import { useTransHook } from '@/locales/hooks'

const CreativeAwardBody = () => {
    const { t } = useTransHook()

    return (
        <div className="creativeAwardHeadUI">
            <AwardNavBar />
            <div className="creativeAwardHead_section">
                <h3>{t('HeaderTxt')}</h3>

                {/* <h3>
                    Gather together, the creators of the world&apos;s most
                    popular action sports!
                </h3> */}
                <img
                    src="https://ik.imagekit.io/xanalia/Images/Awardwinning2021.png"
                    className="heroimageaward"
                    alt="heroimageaward"
                />
            </div>
            <div>
                <div className="text-center applyNow ">
                    <h1>
                        {t('expresssport')} <br />
                        {t('keepstyle')}
                        <br /> <h1>{t('keepstypebottom')}</h1>
                    </h1>
                    {/* <h1>
                       
                        Express your action sport <br />
                        Keep the style
                        <br /> <h1>Express!</h1>
                    </h1> */}
                    <hr className="divDivider" />
                    <p>{t('totalprize')}</p>
                    {/* <p> Total prize money 300,000 yen</p> */}
                    <button className="btn_apply">{t('ApComingSoon')}</button>
                    {/* <button className="btn_apply">Click here to apply</button> */}
                </div>
            </div>
        </div>
    )
}

export default CreativeAwardBody
