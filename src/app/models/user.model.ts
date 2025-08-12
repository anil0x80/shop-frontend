export interface User{
    id: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    userType: 'ADMIN' | 'USER' | string;
}