import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCharacter } from "../components/character-page/utils";
import { ICharacter } from "../components/character-page/types";

export interface ICharacterState {
    value: ICharacter;
}

const initialState: ICharacterState = {
    value: getCharacter(),
}

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        changeCharacter: (state, action: PayloadAction<any>) => {
            localStorage.setItem('character', JSON.stringify(action.payload));
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeCharacter } = characterSlice.actions;

export default characterSlice.reducer;
