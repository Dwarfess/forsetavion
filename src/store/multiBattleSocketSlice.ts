import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IMultiBattleSocketState {
    value: any;
}

const initialState: IMultiBattleSocketState = {
    value: null
}

export const multiBattleSocketSlice = createSlice({
    name: 'multiBattleSocket',
    initialState,
    reducers: {
        changeMultiBattleSocket: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeMultiBattleSocket } = multiBattleSocketSlice.actions;

export default multiBattleSocketSlice.reducer;
