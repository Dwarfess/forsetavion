import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMultiBattle } from './types';
import { defaultMultiBattle } from './constants';

export interface IMultiBattleState {
    value: IMultiBattle;
}

const initialState: IMultiBattleState = {
    value: defaultMultiBattle
}

export const multiBattleSlice = createSlice({
    name: 'multiBattle',
    initialState,
    reducers: {
        changeMultiBattle: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeMultiBattle } = multiBattleSlice.actions;

export default multiBattleSlice.reducer;
