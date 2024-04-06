import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IIsOpenBattleOverModalState {
    value: boolean
}

const initialState: IIsOpenBattleOverModalState = {
    value: false,
}

export const isOpenBattleOverModalSlice = createSlice({
    name: 'isOpenBattleOverModal',
    initialState,
    reducers: {
        changeIsOpenBattleOverModal: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeIsOpenBattleOverModal } = isOpenBattleOverModalSlice.actions;

export default isOpenBattleOverModalSlice.reducer;
