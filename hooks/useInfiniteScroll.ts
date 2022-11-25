import { RefObject, useEffect, useState } from 'react'

const useInfiniteScroll = (ref: RefObject<HTMLElement>, callback: Function) => {
    const [isFetching, setIsFetching] = useState<any>(false)

    useEffect(() => {
        const container = ref.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            return () => container.removeEventListener('scroll', handleScroll)
        }
        // eslint-disable-next-line
    }, [ref.current])

    useEffect(() => {
        if (!isFetching) return
        callback()
        // eslint-disable-next-line
    }, [isFetching])

    const handleScroll = (event: any) => {
        if (
            event.currentTarget.clientHeight + event.currentTarget.scrollTop <
                event.currentTarget.scrollHeight ||
            isFetching
        ) {
            return
        }
        setIsFetching(true)
    }

    return [isFetching, setIsFetching]
}

export default useInfiniteScroll
