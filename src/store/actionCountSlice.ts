import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IActionCountSliceState {
    value: number
}

const initialState: IActionCountSliceState = {
    value: 0,
}

export const actionCountSlice = createSlice({
    name: 'battleFieldLength',
    initialState,
    reducers: {
        changeActionCount: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeActionCount } = actionCountSlice.actions;

export default actionCountSlice.reducer;
