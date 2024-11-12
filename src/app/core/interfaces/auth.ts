
interface IAuthUser {
    id: string; 
    name: string;
    role: string 
}

export interface IAuthState {
    isAuthenticated: boolean;
    user: IAuthUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}