import './creativeAwards2022.module.scss'
import CreativeBanner from '@/containers/creativeAwards/CreativeAwardBanner'
import CreativeAwardBody from '@/containers/creativeAwards/CreativeAwardBody'
const CreativeAwards2022 = () => {
    return (
        <div className="content-layout creativeAward2022_">
            <CreativeBanner />
            <CreativeAwardBody />
        </div>
    )
}

export default CreativeAwards2022
