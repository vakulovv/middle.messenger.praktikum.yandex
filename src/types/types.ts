export interface User {
    id: null | string
    phone: null | string
    second_name: null | string
    avatar: null | string
    display_name: null | string
    login: null | string
    first_name: null | string
    email: null | string
}

export interface Indexed {
    error: null | string
    user: null | Record<string, any>
    users: null | User[]
    messages: any[]
    activeChatId: null | string
    chats: any[]
    chatUsers: any[]
    auth: boolean
}
