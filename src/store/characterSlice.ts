import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from "../components/home-map/character-page/types";

export interface ICharacterState {
    value: ICharacter;
}

const initialState: ICharacterState = {
    // value: getCharacter(),
    value: {} as ICharacter,
}

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        changeCharacter: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeCharacter } = characterSlice.actions;

export default characterSlice.reducer;
