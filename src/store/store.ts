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
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
