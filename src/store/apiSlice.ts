import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ICharacter, IUser} from "../components/home-map/character-page/types";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/' }),
    endpoints: (builder) => ({
        signInUser: builder.mutation<boolean, { email: string; password: string }>({
            query: (data) => ({
                url: 'users/sign-in',
                method: 'POST',
                body: data,
            }),
        }),
        signUpUser: builder.mutation<boolean, IUser>({
            query: (data) => ({
                url: 'users/sign-up',
                method: 'POST',
                body: data,
            }),
        }),
        signUpGuest: builder.mutation<boolean, IUser>({
            query: (data) => ({
                url: 'guest/sign-up',
                method: 'POST',
                body: data,
            }),
        }),
        deleteUser: builder.mutation<boolean, string>({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE',
            }),
        }),
        createCharacter: builder.mutation<boolean, ICharacter>({
            query: (data) => ({
                url: 'characters/create',
                method: 'POST',
                body: data,
            }),
        }),
        getCharacterByUserId: builder.mutation<boolean, string>({
            query: (userId) => ({
                url: `characters/${userId}`,
                method: 'GET',
            }),
        }),
        updateCurrentCharacter: builder.mutation<boolean, ICharacter>({
            query: (data) => ({
                url: `characters/${data._id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const {
    useSignInUserMutation,
    useSignUpUserMutation,
    useDeleteUserMutation,
    useCreateCharacterMutation,
    useGetCharacterByUserIdMutation,
    useUpdateCurrentCharacterMutation,
} = apiSlice;
