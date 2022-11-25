import AwardBanner from '@/containers/awards2021/awardBanner/index'
import AwardHeader from '@/containers/awards2021/awardHeader/index'
import AwardBody from '@/containers/awards2021/awardBody/awardBody2021'
import AwardFooter from '@/containers/awards2021/awardFooter/awardFooter2021'

const Awards2021 = () => {
    return (
        <>
            <AwardHeader />
            <div className={'content-layout'}>
                <AwardBanner />
                <AwardBody />
            </div>
            <AwardFooter />
        </>
    )
}

export default Awards2021
