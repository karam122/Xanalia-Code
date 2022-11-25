/* eslint-disable no-unused-vars */

import styles from './style.module.scss'

export type TypeValuesSupport = string | number
interface IToggleButton<T> {
    value: T
    content: string
    activeValue: T
    onClick: (value: T) => void
}

const IToggleButton = <T extends TypeValuesSupport>({
    value,
    content,
    activeValue,
    onClick,
}: IToggleButton<T>) => {
    const isToggleButtonActive = value === activeValue
    return (
        <div
            className={`${styles['toggle-button']} text-body--03 ${
                isToggleButtonActive ? styles['toggle-button--active'] : ''
            }`}
            onClick={() => onClick(value)}
        >
            {content}
        </div>
    )
}

export default IToggleButton
