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
import characterReducer from './characterSlice';
import activeMapReducer from './activeMapSlice';
import activePageReducer from './activePageSlice';
import optionsReducer from './optionsSlice';
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
        character: characterReducer,
        activeMap: activeMapReducer,
        activePage: activePageReducer,
        options: optionsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
