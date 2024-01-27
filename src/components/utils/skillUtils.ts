import {BattleCardType, Effect, HeroBattleCardType, Skill} from "../types";
import {generateBattleCards} from "./utils";
import {getItemStat, recalculateHeroExp} from "./recalculateHeroStats";
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
        'light-ray': attackSkillHandler,
        'poison': addDebuffSkill,
        'regeneration': addBuffSkill,
        'ice-balls': attackSkillHandler,
    };

    const activeSkillHandler = skillHandlerMap[activeSkill.name](activeSkill, selectedCard);
    if (!activeSkillHandler) {
        await unsuitedCardHandler(selectedCard);
        return;
    }

    const audioName = audioMap[activeSkill.name];
    audioName && new Audio(`sounds/${audioName}.mp3`).play();

    await addClassWhenContactCard(selectedCard);

    checkBattleCardAfterSkill(battleCards, selectedCard, gridLength);
}

const checkBattleCardAfterSkill = (
    battleCards: BattleCardType[],
    selectedCard: BattleCardType,
    gridLength: number
) => {
    if (selectedCard.value > 0 || selectedCard.health > 0) return;

    const heroCard = getHeroCard(battleCards);
    recalculateHeroExp(heroCard, selectedCard);
    changeBattleCardAfterSkill(battleCards, selectedCard, heroCard.level, gridLength);
}

const allowedCardTypesForNegativeSkill = ['enemy', 'beast', 'boss'];
const allowedCardTypesForPositiveSkill = ['hero'];
const attackSkillHandler = (activeSkill: Skill, selectedCard: BattleCardType) => {
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type)) return;

    const powerValue = getItemStat(activeSkill, 'power').value;
    const maxCoolDownValue = getItemStat(activeSkill, 'maxCoolDown').value;

    selectedCard.value -= powerValue;
    activeSkill.active = false;
    activeSkill.coolDown = maxCoolDownValue;

    return true;
}

const addDebuffSkill = (activeSkill: Skill, selectedCard: BattleCardType) => {
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type)) return;
    return addEffect(activeSkill, selectedCard);
}

const addBuffSkill = (activeSkill: Skill, selectedCard: BattleCardType) => {
    if (!allowedCardTypesForPositiveSkill.includes(selectedCard.type)) return;
    return addEffect(activeSkill, selectedCard);
}

const addEffect = (activeSkill: Skill, selectedCard: BattleCardType) => {
    const { name, image, type } = activeSkill;

    const maxCoolDown = getItemStat(activeSkill, 'maxCoolDown');
    const power = structuredClone(getItemStat(activeSkill, 'power'));
    const duration = structuredClone(getItemStat(activeSkill, 'duration'));
    const period = structuredClone(getItemStat(activeSkill, 'period'));

    const effect: Effect = { name, image, type, stats: [power, duration, period] };

    selectedCard.effects.push(effect);

    activeSkill.active = false;
    activeSkill.coolDown = maxCoolDown.value;

    return true;
}

export const checkBattleCardsEffects = (battleCards: BattleCardType[], gridLength: number) => {
    const effectsMap: any = {
        buff: buffSkillHandler,
        debuff: debuffSkillHandler,
    }

    battleCards.forEach((battleCard: BattleCardType) => {
        battleCard.effects.forEach((effect: Effect) => {
            effectsMap[effect.type](effect, battleCard);
            checkBattleCardAfterSkill(battleCards, battleCard, gridLength);
        });
    });
}

const debuffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const period = getItemStat(effect, 'period');

    if (duration.value % period.value === 0) {
        const power = getItemStat(effect, 'power');
        selectedCard.value -= power.value;
    }

    duration.value--;
}

const buffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const period = getItemStat(effect, 'period');

    if (duration.value % period.value === 0) {
        const power = getItemStat(effect, 'power');

        const heroHealth = selectedCard.health + power.value;
        const heroStatMaxHealth = getItemStat(selectedCard, 'maxHealth');

        selectedCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;
    }

    duration.value--;
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
