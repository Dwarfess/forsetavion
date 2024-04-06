import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IIsMovingState {
    value: boolean
}

const initialState: IIsMovingState = {
    value: false,
}

export const isMovingSlice = createSlice({
    name: 'isMovingSlice',
    initialState,
    reducers: {
        changeIsMoving: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeIsMoving } = isMovingSlice.actions;

export default isMovingSlice.reducer;
