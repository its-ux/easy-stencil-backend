// Type definitions for User, Stencil, AdminSettings
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface Stencil {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
}

export interface AdminSettings {
    maxStencilsPerUser: number;
    maxStencilHistory: number;
}