import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IIsOpenLevelUpModal {
    value: boolean
}

const initialState: IIsOpenLevelUpModal = {
    value: false,
}

export const isOpenLevelUpModalSlice = createSlice({
    name: 'isOpenLevelUpModal',
    initialState,
    reducers: {
        changeIsOpenLevelUpModal: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeIsOpenLevelUpModal } = isOpenLevelUpModalSlice.actions;

export default isOpenLevelUpModalSlice.reducer;
