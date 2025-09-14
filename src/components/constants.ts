import {
    IArtifactCard,
    BattleCardType,
    IHeroBattleCard,
    PrimaryBattleCardType,
    Skill,
    Stat,
    IHeroCollectionItem
} from "./types";
import {generateSkill} from "./utils/utils2";

export const defaultFontSize = 20;
export const defaultWidth = 450;

export const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '←'];

// const DEFAULT_HEALTH = 10;
export const ordinaryBossPartsCount = 5;

export const skills: Skill[] = [
    // **************************** NEW SKILLS *******************************
    {
        name: 'berserk',
        label: 'Berserk',
        description: '',
        image: 'skill-passive-berserk',
        type: 'buff',
        useType: 'passive',
        level: 0,
        temporaryPoints: 0,
        // coolDown: 0,
        // nearbyCardsOnly: true,
        // active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 5,
                value: 0,
            },
            {
                name: 'healthMark',
                title: 'Health mark',
                defaultValue: 8,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            // {
            //     name: 'maxCoolDown',
            //     title: 'CoolDown',
            //     defaultValue: 2,
            //     value: 0,
            // },
        ]
    },
    {
        name: 'sword_hit',
        label: 'Sword hit',
        description: '',
        image: 'skill-active-sword-hit',
        type: 'attack',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'healthMark',
            //     title: 'Health mark',
            //     defaultValue: 20,
            //     value: 0,
            // },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 10,
                value: 0,
            },
        ]
    },
    {
        name: 'physical_shield',
        label: 'Physical shield',
        description: '',
        image: 'skill-active-physical-shield',
        type: 'buff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 4,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'sword_range_hit',
        label: 'Sword range hit',
        description: '',
        image: 'skill-active-sword-range-hit',
        type: 'attack',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            // {
            //     name: 'healthMark',
            //     title: 'Health mark',
            //     defaultValue: 20,
            //     value: 0,
            // },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'healing_grace',
        label: 'Healing grace',
        description: '',
        image: 'skill-passive-healing-grace',
        type: 'improvement',
        useType: 'passive',
        level: 0,
        temporaryPoints: 0,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1.5,
                value: 0,
            },
        ]
    },
    {
        name: 'heal',
        label: 'Heal',
        description: '',
        image: 'skill-active-heal',
        type: 'help',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'mass_heal',
        label: 'Massive heal',
        description: '',
        image: 'skill-active-mass-heal',
        type: 'help',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'resurrection',
        label: 'Resurrection',
        description: '',
        image: 'skill-active-resurrection',
        type: 'help',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 5,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'regeneration',
        label: 'regeneration',
        description: '',
        image: 'skill-active-regeneration',
        type: 'buff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'potion_rebirth',
        label: 'Potion rebirth',
        description: '',
        image: 'skill-active-potion-rebirth',
        type: 'help',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            // {
            //     name: 'duration',
            //     title: 'Duration',
            //     defaultValue: 6,
            //     value: 0,
            // },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 12,
                value: 0,
            },
        ]
    },
    {
        name: 'potion_conversion',
        label: 'Potion conversion',
        description: '',
        image: 'skill-active-potion-conversion',
        type: 'transform',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            // {
            //     name: 'duration',
            //     title: 'Duration',
            //     defaultValue: 6,
            //     value: 0,
            // },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 20,
                value: 0,
            },
        ]
    },
    {
        name: 'full_resist',
        label: 'Full resist',
        description: '',
        image: 'skill-passive-full-resist',
        type: 'improvement',
        useType: 'passive',
        level: 0,
        temporaryPoints: 0,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 2,
                value: 0,
            },
        ]
    },
    {
        name: 'drain',
        label: 'Drain',
        description: '',
        image: 'skill-active-drain',
        type: 'attack',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'duration',
            //     title: 'Duration',
            //     defaultValue: 6,
            //     value: 0,
            // },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 10,
                value: 0,
            },
        ]
    },
    {
        name: 'skill_master',
        label: 'Skill master',
        description: '',
        image: 'skill-active-skill-master',
        type: 'buff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 2,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'resist_master',
        label: 'Resist master',
        description: '',
        image: 'skill-active-resist-master',
        type: 'buff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 4,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'fortune',
        label: 'Fortune',
        description: '',
        image: 'skill-passive-fortune',
        type: 'improvement',
        useType: 'passive',
        level: 0,
        temporaryPoints: 0,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1.5,
                value: 0,
            },
        ]
    },
    {
        name: 'stone_skin',
        label: 'Stone skin',
        description: '',
        image: 'skill-active-stone-skin',
        type: 'buff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 8,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'enrichment',
        label: 'Enrichment',
        description: '',
        image: 'skill-active-enrichment',
        type: 'buff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 4,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'coin_conversion',
        label: 'Coin conversion',
        description: '',
        image: 'skill-active-coin-conversion',
        type: 'transform',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 20,
                value: 0,
            },
        ]
    },
    {
        name: 'poison_resist',
        label: 'Poison resist',
        description: '',
        image: 'skill-passive-poison-resist',
        type: 'improvement',
        useType: 'passive',
        level: 0,
        temporaryPoints: 0,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 5,
                value: 0,
            },
        ]
    },
    {
        name: 'poison',
        label: 'Poison',
        description: '',
        image: 'skill-active-poison',
        type: 'debuff',
        useType: 'active',
        elementType: 'poison',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 12,
                value: 0,
            },
        ]
    },
    {
        name: 'anti_grace',
        label: 'Anti grace',
        description: '',
        image: 'skill-active-anti-grace',
        type: 'debuff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 12,
                value: 0,
            },
        ]
    },
    {
        name: 'fire_resist',
        label: 'Fire resist',
        description: '',
        image: 'skill-passive-fire-resist',
        type: 'improvement',
        useType: 'passive',
        level: 0,
        temporaryPoints: 0,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 5,
                value: 0,
            },
        ]
    },
    {
        name: 'fire_icicle',
        label: 'Fire icicle',
        description: '',
        image: 'skill-active-fire-icicle',
        type: 'attack',
        useType: 'active',
        elementType: 'fire',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 6,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 10,
                value: 0,
            },
        ]
    },
    {
        name: 'fire_flame',
        label: 'Fire flame',
        description: '',
        image: 'skill-active-fire-flame',
        type: 'debuff',
        useType: 'active',
        elementType: 'fire',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 12,
                value: 0,
            },
        ]
    },
    {
        name: 'wildfire',
        label: 'Wildfire',
        description: '',
        image: 'skill-active-wildfire',
        type: 'attack',
        useType: 'active',
        elementType: 'fire',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'ice_resist',
        label: 'Ice resist',
        description: '',
        image: 'skill-passive-ice-resist',
        type: 'improvement',
        useType: 'passive',
        level: 0,
        temporaryPoints: 0,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 5,
                value: 0,
            },
        ]
    },
    {
        name: 'ice_tear',
        label: 'Ice tear',
        description: '',
        image: 'skill-active-ice-tear',
        type: 'attack',
        useType: 'active',
        elementType: 'ice',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 6,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 10,
                value: 0,
            },
        ]
    },
    {
        name: 'frostbite',
        label: 'Frostbite',
        description: '',
        image: 'skill-active-frostbite',
        type: 'debuff',
        useType: 'active',
        elementType: 'ice',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 12,
                value: 0,
            },
        ]
    },
    {
        name: 'ice_squall',
        label: 'Ice squall',
        description: '',
        image: 'skill-active-ice-squall',
        type: 'attack',
        useType: 'active',
        elementType: 'ice',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    // **************************** OLD SKILLS *******************************
    {
        name: 'light-ray',
        label: 'Sword range hit',
        description: '',
        image: 'skill-light-ray',
        type: 'attack',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 6,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 10,
                value: 0,
            },
        ]
    },
    {
        name: 'poison',
        label: 'Poison',
        description: '',
        image: 'skill-poison',
        type: 'debuff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: true,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 2,
                value: 0,
            },
        ]
    },
    {
        name: 'regeneration',
        label: 'Sword range hit',
        description: '',
        image: 'skill-regeneration',
        type: 'buff',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'ice-balls',
        label: 'Sword range hit',
        description: '',
        image: 'skill-ice-balls',
        type: 'attack',
        useType: 'active',
        level: 0,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 10,
                value: 0,
            },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'burning',
        label: 'Sword range hit',
        description: '',
        image: 'skill-burning',
        type: 'debuff',
        useType: 'active',
        level: 1,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'freezing',
        label: 'Sword range hit',
        description: '',
        image: 'skill-freezing',
        type: 'debuff',
        useType: 'active',
        level: 1,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    },
    {
        name: 'poisoned-claws',
        label: 'Sword range hit',
        description: '',
        image: 'skill-poisoned-claws',
        type: 'debuff',
        useType: 'active',
        level: 1,
        temporaryPoints: 0,
        coolDown: 0,
        nearbyCardsOnly: false,
        active: false,
        stats: [
            {
                name: 'power',
                title: 'Power',
                defaultValue: 1,
                value: 0,
            },
            {
                name: 'duration',
                title: 'Duration',
                defaultValue: 6,
                value: 0,
            },
            // {
            //     name: 'period',
            //     title: 'Period',
            //     defaultValue: 3,
            //     value: 0,
            // },
            {
                name: 'maxCoolDown',
                title: 'CoolDown',
                defaultValue: 15,
                value: 0,
            },
        ]
    }
];

export const stats: Stat[] = [
    {
        name: 'maxHealth',
        title: 'Max. Health',
        value: 0,
        defaultValue: 30,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'pDef',
        title: 'P. Def',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'pAtk',
        title: 'P. Attack',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'mDef',
        title: 'M. Def',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'mAtk',
        title: 'M. Attack',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'fireResist',
        title: 'Fire Resist',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'iceResist',
        title: 'Ice Resist',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'poisonResist',
        title: 'Poison Resist',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'lifeDrain',
        title: 'Life Drain',
        value: 0,
        defaultValue: 0,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'healBoost',
        title: 'Heal Boost',
        value: 0,
        defaultValue: 1,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'expBoost',
        title: 'Exp. Boost',
        value: 0,
        defaultValue: 1,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
    {
        name: 'coinBoost',
        title: 'Coin Boost',
        value: 0,
        defaultValue: 1,
        passiveSkillEffectValue: 0,
        debuffEffectValue: 0,
    },
];

export const heroCollection: IHeroCollectionItem[] = [
    {
        name: 'Fighter',
        image: 'hero-0',
        maxHealth: 40,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 0,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['berserk', 'sword_hit', 'physical_shield', 'sword_range_hit']
    },
    {
        name: 'Healer',
        image: 'hero-1',
        maxHealth: 30,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 3,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['healing_grace', 'heal', 'mass_heal', 'resurrection']
    },
    {
        name: 'Charmer',
        image: 'hero-5',
        maxHealth: 30,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 0,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['healing_grace', 'regeneration', 'potion_rebirth', 'potion_conversion']
    },
    {
        name: 'Krymar',
        image: 'hero-7',
        maxHealth: 30,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 0,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['full_resist', 'drain', 'skill_master', 'resist_master']
    },
    {
        name: 'Argonaut',
        image: 'hero-6',
        maxHealth: 50,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 0,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['fortune', 'stone_skin', 'enrichment', 'coin_conversion']
    },
    {
        name: 'Blightbringer',
        image: 'hero-2',
        maxHealth: 45,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 0,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['poison_resist', 'drain', 'poison', 'anti_grace']
    },
    {
        name: 'Celestial',
        image: 'hero-3',
        maxHealth: 35,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 0,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['fire_resist', 'fire_icicle', 'fire_flame', 'wildfire']
    },
    {
        name: 'Aqua Wizard',
        image: 'hero-4',
        maxHealth: 35,
        pDef: 0,
        pAtk: 0,
        mDef: 0,
        mAtk: 0,
        fireResist: 0,
        iceResist: 0,
        poisonResist: 0,
        lifeDrain: 0,
        healBoost: 1,
        expBoost: 1,
        coinBoost: 1,
        skills: ['ice_resist', 'ice_tear', 'frostbite', 'ice_squall']
    }
];

export const defaultHeroCard: IHeroBattleCard = {
    id: Math.random().toString(16).slice(2),
    index: 0,
    name: 'Healer',
    image: 'hero-1',
    type: 'hero',
    isVisible: true,
    active: true,
    health: 30,
    exp: 0,
    level: 1,
    skillPoints: 0,
    coins: 0,
    crystals: 0,
    spheres: 0,
    bossParts: 0,
    stats: [
        {
            name: 'maxHealth',
            title: 'Max. health',
            value: 30,
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
        // generateSkill(skills, 'light-ray'),
        // generateSkill(skills, 'poison'),
        // generateSkill(skills, 'regeneration'),
        // generateSkill(skills, 'ice-balls'),
    ],
    effects: [],
    artifacts: [],
    topCardIndex: null,
    topBottomIndex: null,
    topRightIndex: null,
    topLeftIndex: null,
    selectedPotions: [],
};

export const bossPartCards: PrimaryBattleCardType[] = [
    {
        name: 'Boss Coin',
        image: 'boss-part-7',
        subImage: 'boss-part-7',
        description: 'This is a rare currency used to unlock special items, upgrades, and exclusive features',
        type: 'bossPart',
    }
];

export const bossCards: any = [
    {
        name: 'Iceheart overlord',
        image: 'boss-1',
        type: 'boss',
        skills: [generateSkill(skills, 'freezing')],
        effects: []
    },
    {
        name: 'Ember overlord',
        image: 'boss-2',
        type: 'boss',
        skills: [generateSkill(skills, 'burning')],
        effects: []
    },
    {
        name: 'Poisonfang overlord',
        image: 'boss-3',
        type: 'boss',
        skills: [generateSkill(skills, 'poisoned-claws')],
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
        description: '',
        image: 'beast-8',
        type: 'enemy',
    },
    {
        name: 'enemy9',
        description: '',
        image: 'beast-9',
        type: 'enemy',
    },
    {
        name: 'Blazetalon',
        description: 'A fiery beast with claws engulfed in flames',
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
    // {
    //     name: 'potion1',
    //     image: 'potion-1',
    //     type: 'potion',
    // },
    {
        name: 'potion2',
        image: 'potion-2',
        type: 'potion',
    },
];

export const superPotionCards = [
    // {
    //     name: 'potion4',
    //     image: 'potion-4',
    //     type: 'superPotion'
    // },
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
                value: 5,
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
                value: 2,
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
    // {
    //     name: 'coin-3',
    //     image: 'coin-3',
    //     type: 'coin',
    // },
];

export const spheresCards = [
    {
        name: 'sphere-1',
        image: 'sphere-1',
        type: 'sphere',
    },
];
