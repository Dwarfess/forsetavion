import {BattleCardType, HeroBattleCardType, Skill} from "../types";
import {getHeroCard} from "../utils";

export const getCardSkills = (battleCards: BattleCardType[], type: string): Skill[] => {
    return battleCards.find((battleCard:BattleCardType) => battleCard.type === type)?.skills || [];
}

export const getUpdatedBattleCardsWithSkills = (battleCards: BattleCardType[], skill: Skill) => {
    const clonedBattleCards = structuredClone(battleCards);

    getHeroCard(clonedBattleCards).skills.forEach((heroSkill: Skill) => {
        if (heroSkill.name === skill.name) {
            heroSkill.active = !heroSkill.active;
        } else {
            heroSkill.active = false;
        }
    });

    return clonedBattleCards;
}

export const getActiveSkill = (heroCard: HeroBattleCardType) => {
    return heroCard.skills.find((skill:Skill) => skill.active);
}

export const getSkillClasses = (skill: Skill, activeSkill: Skill) => {
    return (activeSkill && ((activeSkill.name !== skill.name) ? 'disabled' : 'active'))
        || (skill.coolDown ? 'disabled' : '');
}

export const useActiveSkill = (skill: Skill, nearbyCardsOnly: boolean) => {
    if (!skill) return;


}