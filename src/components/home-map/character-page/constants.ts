// import { defaultHeroCard } from "../../constants";
import { ICharacter } from "./types";
import {generateHeroCard} from "../../utils/cardsBuilder";

export const getDefaultCharacter = (): ICharacter => ({
    userId: '0',
    userRole: 'users',
    nickname: 'Sirocco',
    avatar: 'default-avatar',
    hero: generateHeroCard(),
    coins: 0,
    spheres: 0,
    score: 0,
    artifacts: [],
    inventory: {
        potions: [],
        potionLimit: 2
    },

});

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
