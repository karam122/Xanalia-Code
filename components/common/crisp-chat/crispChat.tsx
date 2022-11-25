import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

declare const window: Window &
    typeof globalThis & {
        $crisp: any
        CRISP_WEBSITE_ID: any
    }

function CrispChat() {
    const router = useRouter()
    useEffect(() => {
        const path = router.pathname
        if (path !== '/creative_x_award_2022' && !path?.includes('admin')) {
            window.$crisp = []
            window.CRISP_WEBSITE_ID = '65ecd4df-ee3c-4417-a69f-9795ce5888f6'
            ;(function () {
                var d = document
                var s = d.createElement('script')
                s.src = 'https://client.crisp.chat/l.js'
                s.async = true
                d.getElementsByTagName('head')[0].appendChild(s)
            })()
        }
    })
    return <div></div>
}

export default CrispChat
