import {ArtifactCardType, BattleCardType, HeroBattleCardType, PrimaryBattleCardType, Skill} from "./types";
import {getSkill} from "./utils/cardsBuilder";

export const defaultFontSize = 20;
export const defaultWidth = 450;

export const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '←'];

// const DEFAULT_HEALTH = 10;
export const ordinaryBossPartsCount = 5;

const skills: Skill[] = [
    {
        name: 'light-ray',
        description: '',
        image: 'skill-light-ray',
        type: 'attack',
        level: 1,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                value: 2,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                value: 10,
            },
        ]
    },
    {
        name: 'poison',
        description: '',
        image: 'skill-poison',
        type: 'debuff',
        level: 1,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                value: 2,
            },
            {
                name: 'duration',
                title: 'Duration',
                value: 10,
            },
            {
                name: 'period',
                title: 'Period',
                value: 2,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                value: 15,
            },
        ]
    },
    {
        name: 'regeneration',
        description: '',
        image: 'skill-regeneration',
        type: 'buff',
        level: 1,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                value: 2,
            },
            {
                name: 'duration',
                title: 'Duration',
                value: 10,
            },
            {
                name: 'period',
                title: 'Period',
                value: 2,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                value: 15,
            },
        ]
    },
    {
        name: 'ice-balls',
        description: '',
        image: 'skill-ice-balls',
        type: 'attack',
        level: 1,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                value: 4,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                value: 15,
            },
        ]
    },
    {
        name: 'burning',
        description: '',
        image: 'skill-burning',
        type: 'debuff',
        level: 1,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                value: 1,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                value: 10,
            },
        ]
    },
    {
        name: 'freezing',
        description: '',
        image: 'skill-freezing',
        type: 'debuff',
        level: 1,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                value: 1,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                value: 10,
            },
        ]
    },
    {
        name: 'poisoned-claws',
        description: '',
        image: 'skill-poisoned-claws',
        type: 'debuff',
        level: 1,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                value: 1,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                value: 10,
            },
        ]
    }
];

export const defaultHeroCard: HeroBattleCardType = {
    id: Math.random().toString(16).slice(2),
    index: 0,
    name: 'hero',
    image: 'hero-1',
    type: 'hero',
    isVisible: true,
    active: true,
    health: 10,
    exp: 0,
    level: 1,
    coins: 0,
    crystals: 0,
    spheres: 0,
    bossParts: 0,
    stats: [
        {
            name: 'maxHealth',
            title: 'Max. health',
            value: 10,
        },
        {
            name: 'def',
            title: 'Def',
            value: 0,
        },
        {
            name: 'lifeDrain',
            title: 'Life drain',
            value: 0,
        },
        {
            name: 'expBoost',
            title: 'Exp. boost',
            value: 1,
        },
        {
            name: 'coinBoost',
            title: 'Coin boost',
            value: 1,
        },
    ],
    skills: [
        // {
        //     name: 'light-ray',
        //     description: '',
        //     image: 'skill-light-ray',
        //     type: 'attack',
        //     level: 1,
        //     coolDown: 0,
        //     nearbyCardsOnly: true,
        //     active: false,
        //     stats: [
        //         {
        //             name: 'power',
        //             title: 'Power',
        //             value: 2,
        //         },
        //         {
        //             name: 'maxCoolDown',
        //             title: 'CoolDown',
        //             value: 10,
        //         },
        //     ]
        // },
        // {
        //     name: 'poison',
        //     description: '',
        //     image: 'skill-poison',
        //     type: 'debuff',
        //     level: 1,
        //     coolDown: 0,
        //     nearbyCardsOnly: true,
        //     active: false,
        //     stats: [
        //         {
        //             name: 'power',
        //             title: 'Power',
        //             value: 2,
        //         },
        //         {
        //             name: 'duration',
        //             title: 'Duration',
        //             value: 10,
        //         },
        //         {
        //             name: 'period',
        //             title: 'Period',
        //             value: 2,
        //         },
        //         {
        //             name: 'maxCoolDown',
        //             title: 'CoolDown',
        //             value: 15,
        //         },
        //     ]
        // },
        // {
        //     name: 'regeneration',
        //     description: '',
        //     image: 'skill-regeneration',
        //     type: 'buff',
        //     level: 1,
        //     coolDown: 0,
        //     nearbyCardsOnly: false,
        //     active: false,
        //     stats: [
        //         {
        //             name: 'power',
        //             title: 'Power',
        //             value: 2,
        //         },
        //         {
        //             name: 'duration',
        //             title: 'Duration',
        //             value: 10,
        //         },
        //         {
        //             name: 'period',
        //             title: 'Period',
        //             value: 2,
        //         },
        //         {
        //             name: 'maxCoolDown',
        //             title: 'CoolDown',
        //             value: 15,
        //         },
        //     ]
        // },
        // {
        //     name: 'ice-balls',
        //     description: '',
        //     image: 'skill-ice-balls',
        //     type: 'attack',
        //     level: 1,
        //     coolDown: 0,
        //     nearbyCardsOnly: false,
        //     active: false,
        //     stats: [
        //         {
        //             name: 'power',
        //             title: 'Power',
        //             value: 4,
        //         },
        //         {
        //             name: 'maxCoolDown',
        //             title: 'CoolDown',
        //             value: 15,
        //         },
        //     ]
        // },
        getSkill(skills, 'light-ray'),
        getSkill(skills, 'poison'),
        getSkill(skills, 'regeneration'),
        getSkill(skills, 'ice-balls'),
    ],
    effects: [],
    artifacts: [],
    topCardIndex: null,
    topBottomIndex: null,
    topRightIndex: null,
    topLeftIndex: null,
};

export const bossPartCards: PrimaryBattleCardType[] = [
    {
        name: 'part7',
        image: 'boss-part-7',
        subImage: 'boss-part-7',
        type: 'bossPart',
    }
];

export const bossCards: any = [
    {
        name: 'Iceheart overlord',
        image: 'boss-1',
        type: 'boss',
        skills: [getSkill(skills, 'freezing')],
        effects: []
    },
    {
        name: 'Ember overlord',
        image: 'boss-2',
        type: 'boss',
        skills: [getSkill(skills, 'burning')],
        effects: []
    },
    {
        name: 'Poisonfang overlord',
        image: 'boss-3',
        type: 'boss',
        skills: [getSkill(skills, 'poisoned-claws')],
        effects: []
    },
];

export const newEnemyCards: PrimaryBattleCardType[] = [
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
];

export const superPotionCards = [
    {
        name: 'potion4',
        image: 'potion-4',
        type: 'superPotion'
    },
    {
        name: 'potion5',
        image: 'potion-5',
        type: 'superPotion',
    },
];

export const superCoinsCards = [
    {
        name: 'coin-1',
        image: 'coin-1',
        type: 'superCoin',
    },
];

export const secretCards = [
    {
        name: 'portal',
        image: 'portal-3',
        subImage: 'portal-4',
        type: 'secret',
    },
];

export const artifactCards: any[] = [
    // {
    //     name: 'equipment1',
    //     image: 'equipment-1',
    //     type: 'equipment',
    // },
    {
        name: 'equipment2',
        image: 'equipment-2',
        type: 'artifact',
        count: 1,
        stats: [
            {
                name: 'expBoost',
                title: 'Exp. boost',
                value: 0.5,
            },
        ],
    },
    {
        name: 'equipment3',
        image: 'equipment-3',
        type: 'artifact',
        count: 1,
        stats: [
            {
                name: 'maxHealth',
                title: 'Max. health',
                value: 2,
            },
        ]
    },
    {
        name: 'equipment5',
        image: 'equipment-5',
        type: 'artifact',
        count: 1,
        stats: [
            {
                name: 'def',
                title: 'Def',
                value: 1,
            },
        ]
    }
];

export const coinsCards = [
    {
        name: 'coin-2',
        image: 'coin-2',
        type: 'coin',
    },
    {
        name: 'coin-3',
        image: 'coin-3',
        type: 'coin',
    },
];

export const spheresCards = [
    {
        name: 'sphere-1',
        image: 'sphere-1',
        type: 'sphere',
    },
];
