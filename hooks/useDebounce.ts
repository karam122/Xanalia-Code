import { useEffect, useState } from 'react'

const useDebounce = (value: any, delay: number) => {
    const [debounceValue, setDebounceValue] = useState<any>(value)

    useEffect(() => {
        const setDebounceValueTimeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => clearTimeout(setDebounceValueTimeout)
    }, [value])

    return debounceValue
}

export default useDebounce
