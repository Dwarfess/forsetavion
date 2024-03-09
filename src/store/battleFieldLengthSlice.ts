import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IBattleFieldLengthState {
    value: number
}

const initialState: IBattleFieldLengthState = {
    value: 0,
}

export const battleFieldLengthSlice = createSlice({
    name: 'battleFieldLength',
    initialState,
    reducers: {
        changeBattleFieldLength: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeBattleFieldLength } = battleFieldLengthSlice.actions;

export default battleFieldLengthSlice.reducer;
