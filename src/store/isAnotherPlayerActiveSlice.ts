import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IIsAnotherPlayerActiveState {
    value: boolean
}

const initialState: IIsAnotherPlayerActiveState = {
    value: true,
}

export const isAnotherPlayerActiveSlice = createSlice({
    name: 'isAnotherPlayerActive',
    initialState,
    reducers: {
        changeIsAnotherPlayerActive: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeIsAnotherPlayerActive } = isAnotherPlayerActiveSlice.actions;

export default isAnotherPlayerActiveSlice.reducer;
