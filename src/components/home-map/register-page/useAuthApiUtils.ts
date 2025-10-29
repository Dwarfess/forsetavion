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

