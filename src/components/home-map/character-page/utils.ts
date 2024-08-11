import { defaultCharacter } from "./constants";

export const getCharacter = () => {
    const character = localStorage.getItem('character');

    return character ? JSON.parse(character) : structuredClone(defaultCharacter);
}
