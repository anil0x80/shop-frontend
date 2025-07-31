export interface UserResponse{
    id: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    userType: 'ADMIN' | 'USER' | string;
}