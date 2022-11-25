/* eslint-disable no-unused-vars */

import ToggleButton, { TypeValuesSupport } from '@/components/ui/toggle-button'
import styles from './style.module.scss'

export type IItems<T> = {
    value: T
    content: string
}

interface IToggleButtonGroup<T> {
    items: IItems<T>[]
    defaultActiveValue: T
    handleToggle: (value: T) => void
}

const ToggleButtonGroup = <T extends TypeValuesSupport>({
    items,
    defaultActiveValue,
    handleToggle,
}: IToggleButtonGroup<T>) => {
    return (
        <div className={styles['toggle-button-group']}>
            {items.map((item, index) => (
                <ToggleButton
                    key={index}
                    value={item.value}
                    content={item.content}
                    activeValue={defaultActiveValue}
                    onClick={handleToggle}
                />
            ))}
        </div>
    )
}

export default ToggleButtonGroup
