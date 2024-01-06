import {BattleCardType, HeroBattleCardType, PrimaryBattleCardType} from "./types";

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

// const DEFAULT_HEALTH = 10;

export const heroCard: HeroBattleCardType = {
    id: Math.random().toString(16).slice(2),
    index: 0,
    name: 'hero',
    image: 'hero-1',
    type: 'hero',
    isVisible: true,
    active: true,
    health: 10,
    maxHealth: 10,
    healthBoost: 1,
    exp: 0,
    level: 1,
    coins: 0,
    crystals: 0,
    topCardIndex: null,
    topBottomIndex: null,
    topRightIndex: null,
    topLeftIndex: null,
};

export const enemyCards: PrimaryBattleCardType[] = [
    {
        name: 'enemy1',
        image: 'enemy1.png',
        type: 'enemy',
    },
    {
        name: 'enemy2',
        image: 'enemy2.png',
        type: 'enemy',
    },
    {
        name: 'enemy3',
        image: 'enemy3.png',
        type: 'enemy',
    },
    {
        name: 'enemy4',
        image: 'enemy4.png',
        type: 'enemy',
    },
    {
        name: 'enemy5',
        image: 'enemy5.png',
        type: 'enemy',
    },
    {
        name: 'enemy6',
        image: 'enemy6.png',
        type: 'enemy',
    },
    {
        name: 'enemy7',
        image: 'enemy7.png',
        type: 'enemy',
    },
    {
        name: 'enemy8',
        image: 'enemy8.png',
        type: 'enemy',
    },
    {
        name: 'enemy9',
        image: 'enemy9.png',
        type: 'enemy',
    },
    {
        name: 'enemy10',
        image: 'enemy10.png',
        type: 'enemy',
    },
    {
        name: 'enemy11',
        image: 'enemy11.png',
        type: 'enemy',
    },
    {
        name: 'enemy12',
        image: 'enemy12.png',
        type: 'enemy',
    },
];

export const newEnemyCards: PrimaryBattleCardType[] = [
    {
        name: 'enemy1',
        image: 'beast-1',
        type: 'enemy',
    },
    {
        name: 'enemy2',
        image: 'beast-2',
        type: 'enemy',
    },
    {
        name: 'enemy3',
        image: 'beast-3',
        type: 'enemy',
    },
    {
        name: 'enemy4',
        image: 'beast-4',
        type: 'enemy',
    },
    {
        name: 'enemy5',
        image: 'beast-5',
        type: 'enemy',
    },
    {
        name: 'enemy6',
        image: 'beast-6',
        type: 'enemy',
    },
    {
        name: 'enemy7',
        image: 'beast-7',
        type: 'enemy',
    },
    {
        name: 'enemy8',
        image: 'beast-8',
        type: 'enemy',
    },
    {
        name: 'enemy9',
        image: 'beast-9',
        type: 'enemy',
    },
    {
        name: 'enemy10',
        image: 'beast-10',
        type: 'enemy',
    },
    {
        name: 'enemy11',
        image: 'beast-11',
        type: 'enemy',
    },
    {
        name: 'enemy12',
        image: 'beast-12',
        type: 'enemy',
    },
    {
        name: 'enemy13',
        image: 'beast-13',
        type: 'enemy',
    },
    {
        name: 'enemy14',
        image: 'beast-14',
        type: 'enemy',
    },
    {
        name: 'enemy15',
        image: 'beast-15',
        type: 'enemy',
    },
    {
        name: 'enemy16',
        image: 'beast-16',
        type: 'enemy',
    },
];

export const potionCards = [
    {
        name: 'potion1',
        image: 'potion1.png',
        type: 'potion',
    },
    {
        name: 'potion2',
        image: 'potion2.png',
        type: 'potion',
    },
    {
        name: 'potion3',
        image: 'potion3.png',
        type: 'potion',
    },
    {
        name: 'potion4',
        image: 'potion4.png',
        type: 'potion',
    },
];

export const newPotionCards = [
    {
        name: 'potion1',
        image: 'potion-1',
        type: 'potion',
    },
    {
        name: 'potion2',
        image: 'potion-2',
        type: 'potion',
    },
    // {
    //     name: 'potion3',
    //     image: 'portal-3',
    //     type: 'potion',
    //     types: 'portal'
    // },
    {
        name: 'potion4',
        image: 'potion-4',
        type: 'potion',
    },
    {
        name: 'potion5',
        image: 'potion-5',
        type: 'potion',
    },
];

export const secretCards = [
    {
        name: 'portal',
        image: 'portal-3',
        secondImage: 'portal-4',
        type: 'secret',
    },
];

export const equipmentCards = [
    // {
    //     name: 'equipment1',
    //     image: 'equipment-1',
    //     type: 'equipment',
    // },
    {
        name: 'equipment2',
        image: 'equipment-2',
        type: 'equipment',
    },
    {
        name: 'equipment3',
        image: 'equipment-3',
        type: 'equipment',
    },
    {
        name: 'equipment4',
        image: 'equipment-4',
        type: 'equipment',
    },
    {
        name: 'equipment5',
        image: 'equipment-5',
        type: 'equipment',
    }
];

export const weaponCards = [
    {
        name: 'weapon1',
        image: 'weapon1.png',
        type: 'weapon',
    },
];

export const coinsCards = [
    {
        name: 'coins-1',
        image: 'coins-1',
        type: 'coins',
    },
    {
        name: 'coins-2',
        image: 'coins-2',
        type: 'coins',
    },
    {
        name: 'coins-3',
        image: 'coins-3',
        type: 'coins',
    },
    {
        name: 'coins-4',
        image: 'coins-4',
        type: 'coins',
    }
];
