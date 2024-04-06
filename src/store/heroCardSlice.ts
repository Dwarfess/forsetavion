import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IHeroCardState {
    value: any;
}

const initialState: IHeroCardState = {
    value: null,
}

export const heroCardSlice = createSlice({
    name: 'heroCard',
    initialState,
    reducers: {
        changeHeroCard: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeHeroCard } = heroCardSlice.actions;

export default heroCardSlice.reducer;
