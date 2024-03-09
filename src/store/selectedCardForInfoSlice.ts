import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ISelectedCardForInfoState {
    value: any
}

const initialState: ISelectedCardForInfoState = {
    value: null,
}

export const selectedCardForInfoSlice = createSlice({
    name: 'selectedCardForInfo',
    initialState,
    reducers: {
        changeSelectedCardForInfo: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeSelectedCardForInfo } = selectedCardForInfoSlice.actions;

export default selectedCardForInfoSlice.reducer;
