import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IIsProcessingActionState {
    value: boolean
}

const initialState: IIsProcessingActionState = {
    value: false,
}

export const isProcessingActionSlice = createSlice({
    name: 'isProcessingActionSlice',
    initialState,
    reducers: {
        changeIsProcessingAction: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeIsProcessingAction } = isProcessingActionSlice.actions;

export default isProcessingActionSlice.reducer;
