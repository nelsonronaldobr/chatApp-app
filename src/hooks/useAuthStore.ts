import { chatApi } from '@/api';
import { toast } from '@/components/ui/use-toast';
import { getSocket } from '@/helpers';
import {
    AuthResponse,
    LoginValues,
    RegisterValues,
    ErrorResponse,
    SimpleResponse
} from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/store';
import { conversationApi, friendsApi, searchsApi } from '@/store/apis';
import {
    loginError,
    loginStart,
    loginSuccess,
    logoutStart,
    registerError,
    registerStart,
    registerSuccess
} from '@/store/auth';

const socket = getSocket();

export const useAuthStore = () => {
    const { user, tokenSession, sessionStatus, isLoading } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();

    const login = async (form: LoginValues) => {
        try {
            dispatch(loginStart());
            const { data } = await chatApi.post<AuthResponse>('/auth/', form);
            dispatch(loginSuccess(data));
        } catch (error) {
            dispatch(loginError());
            const {
                response: { data }
            } = error as ErrorResponse;
            if (data.errors && Object.keys(data.errors).length > 0) {
                return Object.values(data.errors)[0]['msg'];
            }
            toast({
                title: 'Uh oh! Algo salió mal.',
                description: data.messages?.msg
            });
        }
    };

    const register = async (form: RegisterValues) => {
        try {
            dispatch(registerStart());
            const { data } = await chatApi.post<SimpleResponse>(
                '/auth/register',
                form
            );
            dispatch(registerSuccess());
            toast({
                description: data.messages.msg
            });
        } catch (error) {
            console.log(error);
            dispatch(registerError());
            const {
                response: { data }
            } = error as ErrorResponse;
            if (data.errors && Object.keys(data.errors).length > 0) {
                return Object.values(data.errors)[0]['msg'];
            }
            toast({
                title: 'Uh oh! Algo salió mal.',
                description: data.messages?.msg
            });
        }
    };

    const renew = async () => {
        const tokenSession = localStorage.getItem('tokenSession') || '';
        if (!tokenSession) return dispatch(logoutStart());

        try {
            dispatch(loginStart());
            const { data } = await chatApi.get<AuthResponse>('/auth/renew');
            dispatch(loginSuccess(data));
        } catch (error) {
            dispatch(loginError());
            const {
                response: { data }
            } = error as ErrorResponse;
            if (data.errors && Object.keys(data.errors).length > 0) {
                return Object.values(data.errors)[0]['msg'];
            }
            toast({
                title: 'Uh oh! Algo salió mal.',
                description: data.messages?.msg
            });
        }
    };

    const logout = () => {
        dispatch(searchsApi.util.resetApiState());
        dispatch(friendsApi.util.resetApiState());
        dispatch(conversationApi.util.resetApiState());
        socket.emit('leaveRooms');
        dispatch(logoutStart());
    };
    return {
        register,
        login,
        renew,
        user,
        tokenSession,
        sessionStatus,
        isLoading,
        isAuthenticated: sessionStatus === 'authenticated',
        logout
    };
};
