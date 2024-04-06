import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IBattleCardsState {
    value: any[];
}

const initialState: IBattleCardsState = {
    value: [],
}

export const battleCardsSlice = createSlice({
    name: 'battleCards',
    initialState,
    reducers: {
        changeBattleCards: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeBattleCards } = battleCardsSlice.actions;

export default battleCardsSlice.reducer;
