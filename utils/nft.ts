import { CREATED_DRAFT_TYPES } from '@/constants/filters'

export const formatCreatedDraft = (status: number): string => {
    const option = CREATED_DRAFT_TYPES.find((t) => t.value === status)
    return option?.title as string
}

export const getTokenNameFromId = (id: any, tokens: any[]) => {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].id === id) {
            return tokens[i].tokenName
        }
    }
    return ''
}
