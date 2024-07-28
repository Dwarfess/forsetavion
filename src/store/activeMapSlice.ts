import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IActiveMapState {
    value: string;
}

const initialState: IActiveMapState = {
    value: 'home-map',
}

export const activeMapSlice = createSlice({
    name: 'activeMap',
    initialState,
    reducers: {
        changeActiveMap: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeActiveMap } = activeMapSlice.actions;

export default activeMapSlice.reducer;
