export type SessionStatus = 'checking' | 'not-authenticated' | 'authenticated';
export type UserStatus = 'verified' | 'pending' | 'banned';
export type Type = 'error' | 'success';
export type Messages = { type: Type; msg: string };

export type Auth = {
    _id: string;
    username: string;
    name: string;
    email: string;
    bio: string;
    //photo_url: string;
    //email_verified: boolean;
};

export interface InitialStateAuth {
    user: Auth | null;
    sessionStatus: SessionStatus;
    isLoading: boolean;
    tokenSession: string | null;
}

export interface RegisterValues {
    name: string;
    email: string;
    password: string;
}
export interface LoginValues {
    email: string;
    password: string;
}
