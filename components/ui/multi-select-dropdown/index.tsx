import { useTransHook } from '@/locales/hooks'
import React from 'react'
import Select, { MultiValue } from 'react-select'

export type IMSDOption = {
    value: number
    label: string
}

interface IMultiSelectDropdown {
    defaultValue?: IMSDOption[]
    options: IMSDOption[]
    // eslint-disable-next-line
    onChange: (options: MultiValue<IMSDOption>) => void
}

export type MSDValuesType = MultiValue<IMSDOption>

const MultiSelectDropdown = ({
    defaultValue = [],
    options,
    onChange,
}: IMultiSelectDropdown) => {
    const { t } = useTransHook()
    const translatedOptions = options.map((option) => ({
        value: option.value,
        label: t(option.label),
    }))

    return (
        <Select
            defaultValue={defaultValue}
            isMulti
            name="multi-select-dropdown"
            options={translatedOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
            placeholder={t('SELECT')}
        />
    )
}

export default MultiSelectDropdown
