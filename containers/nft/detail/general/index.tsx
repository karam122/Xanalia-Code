import styles from './style.module.scss'
import Creator from './creator'
import Detail from './detail'
import { Accordion } from 'react-bootstrap'

const GeneralInformation = () => {
    return (
        <div className={styles['nft-general-information']}>
            <Accordion defaultActiveKey={'1'}>
                <Creator />
                <Detail />
            </Accordion>
        </div>
    )
}

export default GeneralInformation
