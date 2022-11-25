import { useTranslation } from 'next-i18next'

export const useTransHook = () => {
    const { t } = useTranslation('common')
    return { t }
}
