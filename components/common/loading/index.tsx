import styles from './style.module.scss'

const Loading = () => {
    return (
        <div className={styles['loading-container']}>
            <div className={styles['loading-spinner--1']}></div>
            <div className={styles['loading-spinner--2']}></div>
        </div>
    )
}

export default Loading
