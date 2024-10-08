import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getOptions, updateOptions } from "../components/general-header/utils";
import { IOptions } from "../components/general-header/types";

export interface IOptionsState {
    value: IOptions;
}

const initialState: IOptionsState = {
    value: getOptions() as IOptions,
}

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        changeOptions: (state, action: PayloadAction<any>) => {
            updateOptions(action.payload);
            state.value =  getOptions();
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
