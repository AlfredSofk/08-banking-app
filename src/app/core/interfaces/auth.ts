
interface IAuthUser {
    id: string;
    name: string;
}

export interface IAuthState {
    isAuthenticated: boolean;
    user: IAuthUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}