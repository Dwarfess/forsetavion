import {IHeroBattleCard, IHeroCollectionItem, Stat} from "../types";
import {defaultHeroCard, heroCollection, skills, stats} from "../constants";
import { getStateValue } from '../../store/storeUtils';
import { generateSkill } from './utils';

const generateStat = (stats: Stat[], name: string, value: number = 0) => {
    return structuredClone(stats).find((stat: Stat) => {
        stat.defaultValue = value;
        stat.value = value;
        return stat.name === name;
    });
}

const heroConstructor = (heroItem: IHeroCollectionItem): IHeroBattleCard => {
    const character = getStateValue('character');
    const clonedDefaultHeroCard = structuredClone(defaultHeroCard);

    clonedDefaultHeroCard.nickname = character.nickname;
    clonedDefaultHeroCard.name = heroItem.name;
    clonedDefaultHeroCard.image = heroItem.image;
    clonedDefaultHeroCard.health = heroItem.maxHealth;
    clonedDefaultHeroCard.stats = [
        generateStat(stats, 'maxHealth', heroItem.maxHealth),
        generateStat(stats, 'pDef', heroItem.pDef),
        generateStat(stats, 'pAtk', heroItem.pAtk),
        generateStat(stats, 'mDef', heroItem.mDef),
        generateStat(stats, 'mAtk', heroItem.mAtk),
        generateStat(stats, 'fireResist', heroItem.fireResist),
        generateStat(stats, 'iceResist', heroItem.iceResist),
        generateStat(stats, 'poisonResist', heroItem.poisonResist),
        generateStat(stats, 'lifeDrainBoost', heroItem.lifeDrainBoost),
        generateStat(stats, 'healBoost', heroItem.healBoost),
        generateStat(stats, 'expBoost', heroItem.expBoost),
        generateStat(stats, 'coinBoost', heroItem.coinBoost)
    ];

    heroItem.skills.forEach(skill => clonedDefaultHeroCard.skills.push(generateSkill(skills, skill)));

    return clonedDefaultHeroCard;
}

export const generateHero = (): IHeroBattleCard => heroConstructor(heroCollection[0])

export const generateHeroes = (): IHeroBattleCard[] =>
    heroCollection.map(heroItem => heroConstructor(heroItem));
