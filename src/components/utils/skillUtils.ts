import {BattleCardType, Effect, IHeroBattleCard, Skill} from "../types";
import {getItemStat, recalculateHeroExp} from "./recalculateHeroStats";
import {
    addClassErrorWhenContactCard,
    addClassWhenChangeHealth,
    addClassWhenContactCard,
    addClassWhenUseSkill
} from "./contactItems";
import {defineNewBattleCard} from "./moveItems";
import {getStateValue, setStateValue} from "../../store/storeUtils";


const getHeroCard = (battleCards: BattleCardType[]): any => {
    return battleCards.find((card: BattleCardType) => card.type === 'hero');
}

export const getCardSkills = (battleCards: BattleCardType[], type: string): Skill[] => {
    return battleCards.find((battleCard:BattleCardType) => battleCard.type === type)?.skills || [];
}

export const updateBattleCardsWithSelectedSkill = (skill: Skill) => {
    const battleCards = getStateValue('battleCards');

    getHeroCard(battleCards).skills.forEach((heroSkill: Skill) => {
        if (heroSkill.name === skill.name) {
            heroSkill.active = !heroSkill.active;
        } else {
            heroSkill.active = false;
        }
    });

    setStateValue('battleCards', battleCards);
}

export const getSkillClasses = (skill: Skill, activeSkill: Skill) => {
    let skillClasses = (activeSkill && ((activeSkill.name !== skill.name) ? 'disabled' : 'active'))
        || (skill.coolDown ? 'disabled' : '');
    if (skill.level === 0) {
        skillClasses += ' block';
    }
    return skillClasses;
}

export const getActiveSkill = (heroCard: IHeroBattleCard) => {
    return heroCard.skills.find((skill:Skill) => skill.active);
}

export const checkAndUseActiveSkill = async (
    selectedCard: any,
    battleCards: BattleCardType[],
    nearbyCardsOnly: boolean
) => {
    const heroCard = getHeroCard(battleCards);
    const activeSkill = getActiveSkill(heroCard);
    if (!activeSkill) return;

    if (!activeSkill.nearbyCardsOnly || activeSkill.nearbyCardsOnly === nearbyCardsOnly) {
        await skillsHandler(activeSkill, selectedCard, battleCards);
        return true;
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
    selectedCard: BattleCardType,
    battleCards: BattleCardType[]
) => {
    const audioMap: any = {
        'light-ray': 'magic1',
        'poison': 'punch-2',
        'ice-balls': 'punch-2',
    };

    const skillHandlerMap: any = {
        'light-ray': callAttackSkillHandler,
        'poison': callDebuffSkill,
        'regeneration': callBuffSkill,
        'ice-balls': callAttackSkillHandler,
    };

    const activeSkillHandler = skillHandlerMap[activeSkill.name](activeSkill, selectedCard);
    if (!activeSkillHandler) {
        await unsuitedCardHandler(selectedCard);
        return;
    }

    const audioName = audioMap[activeSkill.name];
    audioName && new Audio(`sounds/${audioName}.mp3`).play();

    await addClassWhenUseSkill(selectedCard, activeSkill);

    if (activeSkill.type === 'attack') {
        await addClassWhenChangeHealth(selectedCard, activeSkill);
    }

    await checkBattleCardsEffects(battleCards);
    checkBattleCardAfterSkill(battleCards, selectedCard);
}

const checkBattleCardAfterSkill = (
    battleCards: BattleCardType[],
    selectedCard: BattleCardType
) => {
    if (selectedCard.value > 0 || selectedCard.type === 'hero') return;

    const heroCard = getHeroCard(battleCards);

    if (selectedCard.type === 'boss') {
        heroCard.bossParts = 0;
    }

    recalculateHeroExp(heroCard, selectedCard);
    changeBattleCardAfterSkill(battleCards, selectedCard);
}

const allowedCardTypesForNegativeSkill = ['enemy', 'beast', 'boss'];
const allowedCardTypesForPositiveSkill = ['hero'];
const callAttackSkillHandler = (activeSkill: Skill, selectedCard: BattleCardType) => {
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type)) return;

    const powerValue = getItemStat(activeSkill, 'power').value;
    const maxCoolDownValue = getItemStat(activeSkill, 'maxCoolDown').value;

    selectedCard.value -= powerValue;
    activeSkill.active = false;
    activeSkill.coolDown = maxCoolDownValue;

    return true;
}

const callDebuffSkill = (activeSkill: Skill, selectedCard: BattleCardType) => {
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type)) return;
    return addEffect(activeSkill, selectedCard);
}

const callBuffSkill = (activeSkill: Skill, selectedCard: BattleCardType) => {
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

export const checkBattleCardsEffects = async (battleCards: BattleCardType[]) => {
    const effectsMap: any = {
        buff: buffSkillHandler,
        debuff: debuffSkillHandler,
    }

    for (const battleCard of battleCards) {
        for (const effect of battleCard.effects) {
            await effectsMap[effect.type](effect, battleCard);
            checkBattleCardAfterSkill(battleCards, battleCard);
        }
        battleCard.effects = battleCard.effects.filter((effect: Effect) => getItemStat(effect, 'duration').value > 0);
    }
}

const debuffSkillHandler = async (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const period = getItemStat(effect, 'period');

    if (duration.value % period.value === 0 || duration.value === 0) {
        const power = getItemStat(effect, 'power');

        // TODO: hero health to value
        if (selectedCard.type === 'hero') {
            selectedCard.health -= power.value;
        } else {
            selectedCard.value -= power.value;
        }

        await addClassWhenChangeHealth(selectedCard, effect);
    }

    duration.value--;
}

const buffSkillHandler = async (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const period = getItemStat(effect, 'period');

    if (duration.value % period.value === 0 || duration.value === 0) {
        const power = getItemStat(effect, 'power');

        const heroHealth = selectedCard.health + power.value;
        const heroStatMaxHealth = getItemStat(selectedCard, 'maxHealth');

        selectedCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;

        await addClassWhenChangeHealth(selectedCard, effect);
    }

    duration.value--;
}

export const changeBattleCardAfterSkill = (battleCards: BattleCardType[], selectedCard: BattleCardType) => {
    const battleCard = defineNewBattleCard(selectedCard.type, selectedCard.level, battleCards);

    battleCard.index = selectedCard.index;
    battleCard.isNew = true;
    battleCards[selectedCard.index] = battleCard;
}

export const updateSkillsCoolDown = (battleCards: BattleCardType[]) => {
    battleCards.forEach((battleCard: BattleCardType) => {
        battleCard.skills?.forEach((skill: Skill) => skill.coolDown && skill.coolDown--);
    });
}

export const checkBossSkillsReadyToUse = (battleCards: BattleCardType[]) => {
    battleCards.filter((battleCard: BattleCardType) => battleCard.type === 'boss')
        .forEach((bossCard: BattleCardType) => {
            bossCard.skills.forEach((skill: Skill) => {
                !skill.coolDown && addEffect(skill, getHeroCard(battleCards));
            });
    })
}
