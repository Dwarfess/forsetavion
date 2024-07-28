import {IHeroBattleCard, Skill, Stat} from "../types";
import {defaultHeroCard, heroCollection, skills, stats} from "../constants";
import {generateSkill, generateStat} from "./utils2";

export const bossCardBuilder = () => {
    return true;
}

export const generateHeroCards = (): IHeroBattleCard[] => {
    const heroCards = heroCollection.map(hero => {
        const clonedDefaultHeroCard = structuredClone(defaultHeroCard);

        // clonedDefaultHeroCard.id = Math.random().toString(16).slice(2),
        clonedDefaultHeroCard.name = hero.name;
        clonedDefaultHeroCard.image = hero.image;
        clonedDefaultHeroCard.health = hero.maxHealth;
        clonedDefaultHeroCard.stats = [
            generateStat(stats, 'maxHealth', hero.maxHealth),
            generateStat(stats, 'def', hero.def),
            generateStat(stats, 'lifeDrain', hero.lifeDrain),
            generateStat(stats, 'expBoost', hero.expBoost),
            generateStat(stats, 'coinBoost', hero.coinBoost)
        ];

        clonedDefaultHeroCard.skills = [
            generateSkill(skills, 'light-ray'),
            generateSkill(skills, 'poison'),
            generateSkill(skills, 'regeneration'),
            generateSkill(skills, 'ice-balls'),
        ];

        return clonedDefaultHeroCard;
    });

    return heroCards;
}
