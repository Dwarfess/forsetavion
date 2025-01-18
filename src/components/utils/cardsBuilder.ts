import {IHeroBattleCard, IHeroCollectionItem, Skill, Stat} from "../types";
import {defaultHeroCard, heroCollection, skills, stats} from "../constants";
import {generateSkill, generateStat} from "./utils2";
import { getStateValue } from '../../store/storeUtils';

export const bossCardBuilder = () => {
    return true;
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
        generateStat(stats, 'def', heroItem.def),
        generateStat(stats, 'lifeDrain', heroItem.lifeDrain),
        generateStat(stats, 'expBoost', heroItem.expBoost),
        generateStat(stats, 'coinBoost', heroItem.coinBoost)
    ];

    clonedDefaultHeroCard.skills = [
        generateSkill(skills, 'light-ray'),
        generateSkill(skills, 'poison'),
        generateSkill(skills, 'regeneration'),
        generateSkill(skills, 'ice-balls'),
    ];

    return clonedDefaultHeroCard;
}

export const generateHeroCard = (): IHeroBattleCard => heroConstructor(heroCollection[0])

export const generateHeroCards = (): IHeroBattleCard[] =>
    heroCollection.map(heroItem => heroConstructor(heroItem));
