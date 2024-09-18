import {ICharacter, IUser} from "../character-page/types";
import {setStateValue} from "../../../store/storeUtils";
import {defaultCharacter} from "../character-page/constants";

export const signInUser = (data: any) => {
    const userCollection = localStorage.getItem('users');

    if (userCollection) {
        const users: IUser[] = JSON.parse(userCollection);
        const currentUser = users.find((user) => user.email === data.email);

        if (currentUser && currentUser.password === data.password) {
            setStateValue('character', currentUser.character);
            setStateValue('activePage', 'game-selection-page');

            return true;
        }
    }

    return false;
}

const generateNewUser = (data: any): IUser => {
    const newCharacter = structuredClone(defaultCharacter);
    const userId = Math.random().toString(16).slice(2);

    newCharacter.nickname = data.nickname;
    newCharacter.userId = userId;

    return {
        id: userId,
        email: data.email,
        password: data.password,
        character: newCharacter
    }
}

export const signUpUser = (data: any) => {
    const userCollection = localStorage.getItem('users');

    if (userCollection) {
        const users: IUser[] = JSON.parse(userCollection);
        const currentUser = users.find((user) => user.email === data.email);

        if (!currentUser) {
            localStorage.setItem('users', JSON.stringify([...users, generateNewUser(data)]));
            signInUser(data);

            return true;
        }
    } else {
        localStorage.setItem('users', JSON.stringify([generateNewUser(data)]));
        signInUser(data);

        return true;
    }

    return false;
}

export const updateCurrentCharacter = (character: ICharacter) => {
    const users = JSON.parse(localStorage.getItem('users') || '');

    const currentUser = users.find((user: IUser) => user.id === character.userId);

    if (currentUser) {
        currentUser.character = character
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// TODO: refactor this utils


