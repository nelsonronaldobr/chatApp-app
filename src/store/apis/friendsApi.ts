import { getEnvVariables, invalidateOn } from '@/helpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import {
    SocialUserResponse,
    SimpleResponse,
    GetFriendsResponse,
    GetFriendRequestsReceivedResponse,
    GetFriendRequestsSentResponse,
    SearchUsersResponse,
    GetProfileResponse
} from '@/interfaces';

const { VITE_API_URL } = getEnvVariables();

export const friendsApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.tokenSession;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Friends', 'Profile'],
    endpoints: (builder) => ({
        getSearchUserByName: builder.query<
            SearchUsersResponse,
            { _search: string }
        >({
            query: ({ _search }) => ({
                url: '/search/user',
                params: { _search }
            }),
            providesTags: ['Friends']
        }),
        createFriendRequest: builder.mutation<
            SimpleResponse,
            { receiver: string }
        >({
            query: ({ receiver }) => ({
                url: '/friend',
                method: 'POST',
                body: { receiver }
            }),
            invalidatesTags: invalidateOn({ success: ['Friends' as const] })
        }),
        cancelFriendRequest: builder.mutation<
            SimpleResponse,
            { requestId: string }
        >({
            query: ({ requestId }) => ({
                url: `/friend/${requestId}`,
                method: 'PATCH'
            }),
            invalidatesTags: invalidateOn({ success: ['Friends' as const] })
        }),
        deleteFriend: builder.mutation<SimpleResponse, { requestId: string }>({
            query: ({ requestId }) => ({
                url: `/friend/${requestId}`,
                method: 'DELETE'
            }),
            invalidatesTags: invalidateOn({ success: ['Friends' as const] })
        }),
        acceptedFriendRequest: builder.mutation<
            SimpleResponse,
            { requestId: string }
        >({
            query: ({ requestId }) => ({
                url: `/friend/${requestId}`,
                method: 'PUT'
            }),
            invalidatesTags: invalidateOn({ success: ['Friends' as const] })
        }),
        getSocialUser: builder.query<SocialUserResponse, void>({
            query: () => ({
                url: '/friend/social',
                method: 'GET'
            }),
            providesTags: ['Friends']
        }),
        getFriends: builder.query<GetFriendsResponse, void>({
            query: () => ({
                url: '/friend'
            }),
            providesTags: ['Friends']
        }),
        getFriendRequestsReceived: builder.query<
            GetFriendRequestsReceivedResponse,
            void
        >({
            query: () => ({
                url: '/friend/received'
            }),
            providesTags: ['Friends']
        }),
        getFriendRequestsSent: builder.query<
            GetFriendRequestsSentResponse,
            void
        >({
            query: () => ({
                url: '/friend/sent'
            }),
            providesTags: ['Friends']
        }),
        getProfileById: builder.query<GetProfileResponse, { userId: string }>({
            query: ({ userId }) => ({
                url: `/profile/user/${userId}`
            }),
            providesTags: ['Profile']
        }),
        updateProfileById: builder.mutation<
            GetProfileResponse,
            {
                userId: string;
                profile: {
                    email: string;
                    bio: string;
                    name: string;
                    username: string;
                };
            }
        >({
            query: ({ userId, profile }) => ({
                url: `/profile/user/${userId}`,
                method: 'PUT',
                body: profile
            }),
            invalidatesTags: invalidateOn({ success: ['Profile' as const] })
        })
    })
});

export const {
    useCreateFriendRequestMutation,
    useGetSocialUserQuery,
    useGetFriendRequestsReceivedQuery,
    useGetFriendRequestsSentQuery,
    useGetFriendsQuery,
    useAcceptedFriendRequestMutation,
    useLazyGetSearchUserByNameQuery,
    useCancelFriendRequestMutation,
    useDeleteFriendMutation,
    useGetProfileByIdQuery,
    useUpdateProfileByIdMutation
} = friendsApi;
