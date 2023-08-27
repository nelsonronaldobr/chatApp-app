import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { conversationApi, friendsApi, searchsApi } from './apis';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [searchsApi.reducerPath]: searchsApi.reducer,
        [friendsApi.reducerPath]: friendsApi.reducer,
        [conversationApi.reducerPath]: conversationApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            searchsApi.middleware,
            friendsApi.middleware,
            conversationApi.middleware
        )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
