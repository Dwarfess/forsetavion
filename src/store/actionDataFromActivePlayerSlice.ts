import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IActionDataFromActivePlayerState {
    value: any;
}

const initialState: IActionDataFromActivePlayerState = {
    value: {},
}

export const actionDataFromActivePlayerSlice = createSlice({
    name: 'actionDataFromActivePlayer',
    initialState,
    reducers: {
        changeActionDataFromActivePlayer: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeActionDataFromActivePlayer } = actionDataFromActivePlayerSlice.actions;

export default actionDataFromActivePlayerSlice.reducer;