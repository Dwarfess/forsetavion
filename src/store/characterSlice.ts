import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCharacter } from "../components/home-map/character-page/utils";
import { ICharacter } from "../components/home-map/character-page/types";
import {updateCurrentCharacter} from "../components/home-map/registration-page/registerUtils";

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
            // localStorage.setItem('character', JSON.stringify(action.payload));
            updateCurrentCharacter(action.payload);
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeCharacter } = characterSlice.actions;

export default characterSlice.reducer;
