import {IHeroBattleCard, Skill, Stat} from "../types";
import {defaultHeroCard, heroCollection, stats} from "../constants";

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

        return clonedDefaultHeroCard;
    });

    return heroCards;
}

export const generateSkill = (skills: Skill[], name: string): Skill => {
    return structuredClone(skills).find((skill: Skill) => skill.name === name);
}

export const generateStat = (stats: Stat[], name: string, value: number) => {
    return structuredClone(stats).find((stat: Stat) => {
        stat.value = value;
        return stat.name === name;
    });
}
