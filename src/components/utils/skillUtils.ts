import {BattleCardType, HeroBattleCardType, Skill} from "../types";
import {generateBattleCards} from "./utils";
import {recalculateHeroExp} from "./recalculateHeroStats";
import {addClassErrorWhenContactCard, addClassWhenContactCard} from "./contactItems";


const getHeroCard = (battleCards: BattleCardType[]): any => {
    return battleCards.find((card: BattleCardType) => card.type === 'hero');
}

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

export const getSkillClasses = (skill: Skill, activeSkill: Skill) => {
    return (activeSkill && ((activeSkill.name !== skill.name) ? 'disabled' : 'active'))
        || (skill.coolDown ? 'disabled' : '');
}

export const getActiveSkill = (heroCard: HeroBattleCardType) => {
    return heroCard.skills.find((skill:Skill) => skill.active);
}

export const checkAndUseActiveSkill = async (
    heroCard: any,
    selectedCard: any,
    battleCards: BattleCardType[],
    gridLength: number,
    nearbyCardsOnly: boolean
) => {
    const activeSkill = getActiveSkill(heroCard);
    if (!activeSkill) return;

    if (!activeSkill.nearbyCardsOnly || activeSkill.nearbyCardsOnly === nearbyCardsOnly) {
        await skillsHandler(activeSkill, heroCard, selectedCard, battleCards, gridLength);
    } else {
        await unsuitedCardHandler(selectedCard);
    }
}

const unsuitedCardHandler = async (selectedCard: BattleCardType) => {
    new Audio(`sounds/error.mp3`).play();
    await addClassErrorWhenContactCard(selectedCard);
}

// const skillNames = ['light-ray', 'poison', 'ice-balls'];
const skillsHandler = async (
    activeSkill: Skill,
    heroCard: HeroBattleCardType,
    selectedCard: BattleCardType,
    battleCards: BattleCardType[],
    gridLength: number
) => {
    const audioMap: any = {
        'light-ray': 'punch-2',
        'poison': 'punch-2',
        'ice-balls': 'punch-2',
    };

    const skillHandlerMap: any = {
        'light-ray': lightRaySkillHandler,
        'poison': lightRaySkillHandler,
        'ice-balls': lightRaySkillHandler,
    };

    const activeSkillHandler = skillHandlerMap[activeSkill.name](activeSkill, selectedCard);
    if (!activeSkillHandler) {
        await unsuitedCardHandler(selectedCard);
        return;
    }

    const audioName = audioMap[activeSkill.name];
    audioName && new Audio(`sounds/${audioName}.mp3`).play();

    await addClassWhenContactCard(selectedCard);

    if (selectedCard.value <= 0) {
        recalculateHeroExp(heroCard, selectedCard);
        changeBattleCardAfterSkill(battleCards, selectedCard, heroCard.level, gridLength)
    }
}

const lightRaySkillHandler = (activeSkill: Skill, selectedCard: BattleCardType) => {
    const allowedCardTypes = ['enemy', 'beast', 'boss'];
    if (!allowedCardTypes.includes(selectedCard.type)) return;

    selectedCard.value -= activeSkill.value;
    activeSkill.active = false;
    activeSkill.coolDown = activeSkill.maxCoolDown;

    return true;
}

const changeBattleCardAfterSkill = (battleCards: BattleCardType[], selectedCard: BattleCardType, heroLevel: number, gridLength: number) => {
    const battleCard = generateBattleCards(heroLevel, gridLength)[0];

    battleCard.index = selectedCard.index;
    battleCard.isNew = true;
    battleCards[selectedCard.index] = battleCard;
}

export const updateSkillsCoolDown = (battleCards: BattleCardType[]) => {
    const heroCard = getHeroCard(battleCards);
    heroCard.skills.forEach((skill: Skill) => skill.coolDown && skill.coolDown--);
}