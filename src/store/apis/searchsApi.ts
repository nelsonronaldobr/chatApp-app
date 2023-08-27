import { getEnvVariables } from '@/helpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { SimpleResponse } from '@/interfaces';

const { VITE_API_URL } = getEnvVariables();

export const searchsApi = createApi({
    reducerPath: 'searchsApi',
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
    tagTypes: ['Searchs'],
    endpoints: (builder) => ({
        getUserByUsername: builder.query<SimpleResponse, { username: string }>({
            query: ({ username }) => ({
                url: `/search/user/${username}`
            }),
            providesTags: ['Searchs']
        })
    })
});

export const { useGetUserByUsernameQuery } = searchsApi;
