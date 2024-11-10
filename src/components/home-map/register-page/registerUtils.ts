import {ICharacter, IUser} from "../character-page/types";
import {setStateValue} from "../../../store/storeUtils";
import {defaultCharacter} from "../character-page/constants";

export const signInUser = (data: any) => {
    const userCollection = localStorage.getItem('users');

    if (userCollection) {
        const users: IUser[] = JSON.parse(userCollection);
        const currentUser = users.find((user) => user.email === data.email);

        if (currentUser && currentUser.password === data.password) {
            setStateValue('character', currentUser.character); // сетаємо данні в стейт що пришли з бекенда
            setStateValue('activePage', 'game-selection-page');

            return true;
        }
    }

    return false;
}

const postUser = (user: IUser) => {
    fetch('http://localhost:8888/users', {
        method: 'POST', // Метод запиту
        headers: {
            'Content-Type': 'application/json', // Вказуємо, що передаємо JSON
        },
        body: JSON.stringify(user), // Дані, які передаємо у вигляді JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Перетворюємо відповідь у JSON
        })
        .then(data => {
            console.log('Success:', data); // Обробка успішної відповіді
        })
        .catch(error => {
            console.error('Error:', error); // Обробка помилок
        });
}

export const signInAsGuest = async () => {
    const questsCollection = localStorage.getItem('guests');
    const currentGuest = generateNewUser(
        { nickname: `Guest_${Math.random().toString(16).slice(2, 7)}` },
        'guests'
    );

    if (questsCollection) {
        const guests: IUser[] = JSON.parse(questsCollection);

        localStorage.setItem('guests', JSON.stringify([...guests, currentGuest]));
        // postUser(currentGuest);
    } else {
        localStorage.setItem('guests', JSON.stringify([currentGuest]));
    }

    setStateValue('character', currentGuest.character);
    setStateValue('activePage', 'game-selection-page');

    return true;
}

const generateNewUser = (data: any, role: string = 'users'): IUser => {
    const newCharacter = structuredClone(defaultCharacter);
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

export const signUpUser = (data: any) => {
    let userCollection = localStorage.getItem('users');

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
    const users = JSON.parse(localStorage.getItem(character.userRole) || '');

    const currentUser = users.find((user: IUser) => user.id === character.userId);

    if (currentUser) {
        currentUser.character = character
        localStorage.setItem(character.userRole, JSON.stringify(users));
    }
}

// TODO: refactor this utils


