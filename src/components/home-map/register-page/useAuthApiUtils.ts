import {ICharacter, IUser} from "../character-page/types";
import {setStateValue} from "../../../store/storeUtils";
import {getDefaultCharacter} from "../character-page/constants";
import {
    useSignInUserMutation,
    useSignUpUserMutation,
    useCreateCharacterMutation,
    useDeleteUserMutation,
    useGetCharacterByUserIdMutation,
    useGetCharactersMutation
} from "../../../store/apiSlice";

// export const signInUser = (data: any) => {
//     const [ signInUser ] = useSignInUserMutation();
//     const userCollection = localStorage.getItem('users');
//
//     if (userCollection) {
//         const users: IUser[] = JSON.parse(userCollection);
//         const currentUser = users.find((user) => user.email === data.email);
//
//         if (currentUser && currentUser.password === data.password) {
//             setStateValue('character', currentUser.character); // сетаємо данні в стейт що пришли з бекенда
//             setStateValue('activePage', 'game-selection-page');
//
//             return true;
//         }
//     }
//
//     return false;
// }
//
// const postUser = (user: IUser) => {
//     fetch('http://localhost:8888/users', {
//         method: 'POST', // Метод запиту
//         headers: {
//             'Content-Type': 'application/json', // Вказуємо, що передаємо JSON
//         },
//         body: JSON.stringify(user), // Дані, які передаємо у вигляді JSON
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json(); // Перетворюємо відповідь у JSON
//         })
//         .then(data => {
//             console.log('Success:', data); // Обробка успішної відповіді
//         })
//         .catch(error => {
//             console.error('Error:', error); // Обробка помилок
//         });
// }
//
// export const signInAsGuest = async () => {
//     const questsCollection = localStorage.getItem('guests');
//     const currentGuest = generateNewUser(
//         { nickname: `Guest_${Math.random().toString(16).slice(2, 7)}` },
//         'guests'
//     );
//
//     if (questsCollection) {
//         const guests: IUser[] = JSON.parse(questsCollection);
//
//         localStorage.setItem('guests', JSON.stringify([...guests, currentGuest]));
//         postUser(currentGuest);
//     } else {
//         localStorage.setItem('guests', JSON.stringify([currentGuest]));
//     }
//
//     setStateValue('character', currentGuest.character);
//     setStateValue('activePage', 'game-selection-page');
//
//     return true;
// }
//
// const generateNewUser = (data: any, role: string = 'users'): IUser => {
//     const newCharacter = structuredClone(defaultCharacter);
//     const userId = Math.random().toString(16).slice(2);
//
//     newCharacter.nickname = data.nickname;
//     newCharacter.userId = userId;
//     newCharacter.userRole = role;
//
//     return {
//         id: userId,
//         email: data.email,
//         password: data.password,
//         character: newCharacter,
//         role
//     }
// }
//
// export const signUpUser = (data: any) => {
//     let userCollection = localStorage.getItem('users');
//
//     // fetch('http://localhost:8888/users', {
//     //     method: 'GET', // Метод запиту
//     //     headers: {
//     //         'Content-Type': 'application/json', // Вказуємо, що передаємо JSON
//     //     },
//     // })
//     //     .then(response => {
//     //         if (!response.ok) {
//     //             throw new Error('Network response was not ok');
//     //         }
//     //         return response.json(); // Перетворюємо відповідь у JSON
//     //     })
//     //     .then(data => {
//     //         console.log('Success:', data); // Обробка успішної відповіді
//     //         userCollection = data;
//     //     })
//     //     .catch(error => {
//     //         console.error('Error:', error); // Обробка помилок
//     //     });
//
//     if (userCollection) {
//         const users: IUser[] = JSON.parse(userCollection);
//         const currentUser = users.find((user) => user.email === data.email);
//
//         if (!currentUser) {
//             localStorage.setItem('users', JSON.stringify([...users, generateNewUser(data)]));
//             signInUser(data);
//
//             return true;
//         }
//     } else {
//         localStorage.setItem('users', JSON.stringify([generateNewUser(data)]));
//         signInUser(data);
//
//         return true;
//     }
//
//     return false;
// }
//
// export const updateCurrentCharacter = (character: ICharacter) => {
//     const users = JSON.parse(localStorage.getItem(character.userRole) || '');
//
//     const currentUser = users.find((user: IUser) => user.id === character.userId);
//
//     if (currentUser) {
//         currentUser.character = character
//         localStorage.setItem(character.userRole, JSON.stringify(users));
//     }
// }
//
// TODO: refactor this utils

export const useAuthApiUtils = () => {
    const [signUpUser] = useSignUpUserMutation();
    const [signInUser] = useSignInUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [createCharacter] = useCreateCharacterMutation();
    const [getCharacters] = useGetCharactersMutation();
    const [getCharacterByUserId] = useGetCharacterByUserIdMutation();

    const signUpNewUser = ({ nickname, email, password }: any) => {
        return signUpUser({ email: email.toLowerCase(), password, role: 'user' })
            .unwrap()
            .then((user: any) => {
                const userId = user?._id
                console.log("Sign up successful", user);
                return createNewCharacter(nickname, userId)
                    .then(() => signInCurrentUser({ email, password }))
                    .catch((error) => {
                        console.error("Character creation failed", error);
                        deleteCurrentUser(userId);
                        throw new Error("Character creation failed");
                    });
            })
            .catch((error) => {
                console.error("Sign up error", error);
                return error;
            });
    };

    const signUpNewGuest = () => {
        const nickname = `Guest_${Math.random().toString(16).slice(2, 7)}`;
        const email = `${nickname}@guest.com`;
        const password = email;
        return signUpUser({ email, password, role: 'guest' })
            .unwrap()
            .then((guest: any) => {
                const guestId = guest?._id
                console.log("Sign up successful", guest);
                return createNewCharacter(nickname, guestId)
                    .then(() => signInCurrentUser({ email, password }))
                    .catch((error) => {
                        console.error("Character creation failed", error);
                        deleteCurrentUser(guestId);
                        throw new Error("Character creation failed");
                    });
            })
            .catch((error) => {
                console.error("Sign up error", error);
                return error;
            });
    };

    const signInCurrentUser = ({email, password}: any) => {
        return signInUser({ email: email.toLowerCase(), password })
            .unwrap()
            .then((user: any) => {
                console.log("Sign in successful", user);
                setStateValue('activePage', 'game-selection-page');
                getCurrentCharacter(user._id);

                return true
            })
            .catch((error) => {
                console.error("Sign in error", error);
                return false;
            });
    };

    const deleteCurrentUser = (userId: string) => {
        return deleteUser(userId)
            .unwrap()
            .then((result) => {
                console.log("User was deleted", result);
            })
            .catch((error) => {
                console.error("User deletion failed", error);
                return error;
            });
    };

    const createNewCharacter = (nickname: string, userId: string) => {
        const defaultCharacter = getDefaultCharacter();
        return createCharacter({ ...defaultCharacter, nickname, userId })
            .unwrap()
            .then((result) => {
                console.log("Character was created", result);
            })
    };

    const getAllCharacters = (setCharacterList: any) => {
        return getCharacters({})
            .unwrap()
            .then((characters: any) => {
                console.log("Character list", characters);
                setCharacterList(characters);
            })
    };

    const getCurrentCharacter = (userId: string) => {
        return getCharacterByUserId(userId)
            .unwrap()
            .then((character) => {
                console.log("Character was received", character);
                setStateValue('character', character);
            })
    };

    const updateCurrentCharacter = (userId: string) => {
        return getCharacterByUserId(userId)
            .unwrap()
            .then((character) => {
                console.log("Character was updated", character);
                setStateValue('character', character);
            })
    };

    return {
        signUpNewUser,
        signInCurrentUser,
        getAllCharacters,
        updateCurrentCharacter,
        signUpNewGuest
    };
};

