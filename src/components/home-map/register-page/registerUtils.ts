import {IUser} from "../character-page/types";
import {setStateValue} from "../../../store/storeUtils";
import {getDefaultCharacter} from "../character-page/constants";

export const signInAsGuest = async () => {
    const questsCollection = localStorage.getItem('guests');
    const currentGuest = generateNewUser(
        { nickname: `Guest_${Math.random().toString(16).slice(2, 7)}` },
        'guests'
    );

    if (questsCollection) {
        const guests: IUser[] = JSON.parse(questsCollection);

        localStorage.setItem('guests', JSON.stringify([...guests, currentGuest]));
    } else {
        localStorage.setItem('guests', JSON.stringify([currentGuest]));
    }

    setStateValue('character', currentGuest.character);
    setStateValue('activePage', 'game-selection-page');

    return true;
}

const generateNewUser = (data: any, role: string = 'users'): IUser => {
    const newCharacter = structuredClone(getDefaultCharacter());
    const userId = Math.random().toString(16).slice(2);

    newCharacter.nickname = data.nickname;
    newCharacter.userId = userId;
    newCharacter.userRole = role;

    return {
        id: userId,
        email: data.email,
        password: data.password,
        character: newCharacter,
        role
    }
}
