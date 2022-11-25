import { useTransHook } from '@/locales/hooks'
import { GetMaintenance, IMaintenance } from '@/services/maintain'
import moment from 'moment'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const MaintenancePage = () => {
    const { t } = useTransHook()
    const router = useRouter()
    const [maintain, setMaintain] = useState<IMaintenance | undefined>(
        undefined,
    )

    useEffect(() => {
        ;(async () => {
            const rest = await GetMaintenance()
            if (
                !rest ||
                !rest.data ||
                !(rest.status >= 200 && rest.status <= 299)
            )
                return

            if (!rest.data.status) {
                router.push('/')
            }
            setMaintain(rest.data)
        })()
    }, [])

    return (
        <div className="maintain-page">
            <h1>Maintenance</h1>
            {maintain ? (
                <>
                    <h2>{maintain.title}</h2>
                    <textarea
                        readOnly
                        defaultValue={maintain.description}
                        style={{
                            height:
                                (String(maintain.description).split('\n')
                                    .length || 1) *
                                    24 +
                                12 +
                                'px',
                        }}
                    />
                    <span>
                        {t('MAINTENANCE_END_TIME')}{' '}
                        {maintain.endTime
                            ? moment(maintain.endTime).format('L HH:mm')
                            : ''}
                    </span>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default MaintenancePage
