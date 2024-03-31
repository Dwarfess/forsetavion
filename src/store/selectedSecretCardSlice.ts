import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ISelectedSecretCardState {
    value: any
}

const initialState: ISelectedSecretCardState = {
    value: null,
}

export const selectedSecretCardSlice = createSlice({
    name: 'selectedSecretCard',
    initialState,
    reducers: {
        changeSelectedSecretCard: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeSelectedSecretCard } = selectedSecretCardSlice.actions;

export default selectedSecretCardSlice.reducer;
