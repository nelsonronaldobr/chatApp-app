import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/auth/layouts';
import { LoginPage, RegisterPage } from '@/auth/pages';
import { Private, Public } from './middlewares';
import { ProfileLayout } from '@/profile/layouts';
import { AccountPage, ProfilePage } from '@/profile/pages';
import { BaseLayout, HomeLayout } from '@/home/layouts';
import { ConversationPage } from '@/home/pages';
import { useCheckSession } from '@/hooks';
import { SocialLayout } from '@/social/layouts';
import {
    FriendRequestReceivedPage,
    FriendRequestSentPage,
    FriendsPage,
    SearchFriendPage
} from '@/social/pages';

export const AppRouter = () => {
    const { sessionStatus } = useCheckSession();

    if (sessionStatus === 'checking') {
        return <></>;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/auth/*'
                    element={
                        <Public>
                            <AuthLayout />
                        </Public>
                    }>
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route
                        path='*'
                        element={<Navigate to={'login'} replace />}
                    />
                </Route>
                <Route
                    path='/*'
                    element={
                        <Private>
                            <BaseLayout />
                        </Private>
                    }>
                    <Route path='conversations' element={<HomeLayout />}>
                        <Route
                            path=':conversation'
                            element={<ConversationPage />}
                        />
                    </Route>
                    <Route path='settings' element={<ProfileLayout />}>
                        <Route path='profile' element={<ProfilePage />} />
                        <Route path='account' element={<AccountPage />} />
                        <Route
                            path='*'
                            element={<Navigate to={'profile'} replace />}
                        />
                    </Route>
                    <Route path='friends' element={<SocialLayout />}>
                        <Route path='@' index element={<FriendsPage />} />
                        <Route
                            path='requests'
                            element={<FriendRequestSentPage />}
                        />
                        <Route
                            path='receiveds'
                            element={<FriendRequestReceivedPage />}
                        />
                        <Route path='search' element={<SearchFriendPage />} />
                        <Route
                            path='*'
                            element={<Navigate to={'@'} replace />}
                        />
                    </Route>
                    <Route
                        path='*'
                        element={<Navigate to={'conversations'} replace />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
