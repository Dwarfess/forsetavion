import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ICharacter, IUser} from "../components/home-map/character-page/types";
import {IBattleData} from "../components/home-map/multi-battle-page/types";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:8888/',
        // baseUrl: 'https://forsetavion-server-3.onrender.com/',
        baseUrl: 'https://forsetavion-server-919845618131.europe-west1.run.app/',
        prepareHeaders: (headers) => {
            headers.set('X-App-Token', 'sertavion_unique_token');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // user api
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
        // character api
        createCharacter: builder.mutation<boolean, ICharacter>({
            query: (data) => ({
                url: 'characters/create',
                method: 'POST',
                body: data,
            }),
        }),
        getCharacters: builder.mutation<boolean, object>({
            query: () => ({
                url: `characters/`,
                method: 'GET',
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
        // battle api
        randomBattle: builder.mutation<boolean, void>({
            query: () => ({
                url: 'battles/randomBattle',
                method: 'GET',
            }),
        }),
        getBattle: builder.mutation<boolean, string>({
            query: (battleId) => ({
                url: `battles/get/${battleId}`,
                method: 'GET',
            }),
        }),
        createBattle: builder.mutation<boolean, IBattleData>({
            query: (data) => ({
                url: 'battles/create',
                method: 'POST',
                body: data,
            }),
        }),
        updateBattle: builder.mutation<boolean, any>({
            query: (data) => ({
                url: `battles/update`,
                method: 'POST',
                body: data,
            }),
        }),
        joinBattle: builder.mutation<boolean, any>({
            query: (data) => ({
                url: 'battles/join',
                method: 'POST',
                body: data,
            }),
        }),
        deleteBattle: builder.mutation<boolean, string>({
            query: (battleId) => ({
                url: `battles/${battleId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useSignInUserMutation,
    useSignUpUserMutation,
    useDeleteUserMutation,
    useCreateCharacterMutation,
    useGetCharactersMutation,
    useGetCharacterByUserIdMutation,
    useRandomBattleMutation,
    useGetBattleMutation,
    useCreateBattleMutation,
    useUpdateBattleMutation,
    useJoinBattleMutation,
    useDeleteBattleMutation,
} = apiSlice;
