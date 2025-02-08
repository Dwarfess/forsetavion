import { configureStore } from '@reduxjs/toolkit';

import battleFieldLengthReducer from './battleFieldLengthSlice';
import heroCardReducer from './heroCardSlice';
import selectedCardForInfoReducer from './selectedCardForInfoSlice';
import selectedSecretCardReducer from './selectedSecretCardSlice';
import isOpenBattleOverModalReducer from './isOpenBattleOverModalSlice';
import isOpenLevelUpModalReducer from './isOpenLevelUpModalSlice';
import isMovingReducer from './isMovingSlice';
import isProcessingActionReducer from './isProcessingActionSlice';
import battleCardsReducer from './battleCardsSlice';
import multiBattleReducer from './multiBattleSlice';
import multiBattleSocketReducer from './multiBattleSocketSlice';
import characterReducer from './characterSlice';
import activeMapReducer from './activeMapSlice';
import activePageReducer from './activePageSlice';
import optionsReducer from './optionsSlice';
import actionDataFromActivePlayerReducer from './actionDataFromActivePlayerSlice';
import isAnotherPlayerActiveReducer from './isAnotherPlayerActiveSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        battleFieldLength: battleFieldLengthReducer,
        heroCard: heroCardReducer,
        selectedCardForInfo: selectedCardForInfoReducer,
        selectedSecretCard: selectedSecretCardReducer,
        isOpenBattleOverModal: isOpenBattleOverModalReducer,
        isOpenLevelUpModal: isOpenLevelUpModalReducer,
        isMoving: isMovingReducer,
        isProcessingAction: isProcessingActionReducer,
        battleCards: battleCardsReducer,
        multiBattle: multiBattleReducer,
        multiBattleSocket: multiBattleSocketReducer,
        character: characterReducer,
        activeMap: activeMapReducer,
        activePage: activePageReducer,
        options: optionsReducer,
        actionDataFromActivePlayer: actionDataFromActivePlayerReducer,
        isAnotherPlayerActive: isAnotherPlayerActiveReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ігноруємо перевірку на серіалізацію для певних шляхи
                ignoredActions: ['multiBattleSocket/changeMultiBattleSocket'],
                ignoredPaths: ['multiBattleSocket'],
            },
        }).concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
