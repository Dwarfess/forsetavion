import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IActivePageState {
    value: string;
}

const initialState: IActivePageState = {
    // value: 'character-page',
    value: '',
}

export const activePageSlice = createSlice({
    name: 'activePage',
    initialState,
    reducers: {
        changeActivePage: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeActivePage } = activePageSlice.actions;

export default activePageSlice.reducer;
