import { defaultHeroCard } from "../../constants";
import { ICharacter } from "./types";

export const defaultCharacter: ICharacter = {
    userId: '0',
    userType: 'users',
    nickname: 'Sirocco',
    avatar: 'default-avatar',
    hero: defaultHeroCard,
    coins: 0,
    spheres: 0,
    score: 0,
    artifacts: [],
    inventory: {
        potions: []
    }
};

export const avatars: string[] = [
    'default-avatar',
    'avatar-1',
    'avatar-2',
    'avatar-3',
    'avatar-4',
    'avatar-5',
    'avatar-6',
    'beast-12',
    'beast-13',
    'beast-14',
];
