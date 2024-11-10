export enum UserRoles {
    ADMIN = 'admin',
    FRONTDESK = 'frontdesk',
    HOUSEKEEPING = 'housekeeping'
}

export type UserRole = typeof UserRoles;