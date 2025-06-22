import {IHeroBattleCard, IHeroCollectionItem, Skill, Stat} from "../types";
import {defaultHeroCard, heroCollection, skills, stats} from "../constants";
import { generateSkill } from "./utils2";
import { getStateValue } from '../../store/storeUtils';

export const bossCardBuilder = () => {
    return true;
}

const generateStat = (stats: Stat[], name: string, value: number = 0) => {
    return structuredClone(stats).find((stat: Stat) => {
        stat.value = value;
        return stat.name === name;
    });
}

// TODO: merge the method with getBattleCardsWithHero (utils)
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
        generateStat(stats, 'lifeDrain', heroItem.lifeDrain),
        generateStat(stats, 'healBoost', heroItem.healBoost),
        generateStat(stats, 'expBoost', heroItem.expBoost),
        generateStat(stats, 'coinBoost', heroItem.coinBoost)
    ];

    // clonedDefaultHeroCard.skills = [
    //     generateSkill(skills, 'light-ray'),
    //     generateSkill(skills, 'poison'),
    //     generateSkill(skills, 'regeneration'),
    //     generateSkill(skills, 'ice-balls'),
    // ];
    heroItem.skills.forEach(skill => clonedDefaultHeroCard.skills.push(generateSkill(skills, skill)));

    return clonedDefaultHeroCard;
}

export const generateHeroCard = (): IHeroBattleCard => heroConstructor(heroCollection[0])

export const generateHeroCards = (): IHeroBattleCard[] =>
    heroCollection.map(heroItem => heroConstructor(heroItem));
