import {BattleCardType, PrimaryBattleCardType} from "./types";

export const images = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
    '14.png',
    '15.png',
    '16.png',
    '17.png',
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
];

export const heroCard: BattleCardType = {
    id: Math.random().toString(16).slice(2),
    index: 0,
    name: 'hero',
    image: 'hero.png',
    type: 'hero',
    isVisible: true,
    active: true,
    health: 20,
    topCardIndex: null,
    topBottomIndex: null,
    topRightIndex: null,
    topLeftIndex: null,
};

export const enemyCards: PrimaryBattleCardType[] = [
    {
        name: 'enemy',
        image: 'enemy1.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy2.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy3.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy4.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy5.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy6.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy7.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy8.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy9.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy10.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy11.png',
        type: 'enemy',
    },
    {
        name: 'enemy',
        image: 'enemy12.png',
        type: 'enemy',
    },
];

export const potionCards = [
    {
        name: 'potion',
        image: 'potion1.png',
        type: 'potion',
    },
    {
        name: 'potion',
        image: 'potion2.png',
        type: 'potion',
    },
    {
        name: 'potion',
        image: 'potion3.png',
        type: 'potion',
    },
    {
        name: 'potion',
        image: 'potion4.png',
        type: 'potion',
    },
];

export const weaponCards = [
    {
        name: 'weapon',
        image: 'weapon1.png',
        type: 'weapon',
    },
];
