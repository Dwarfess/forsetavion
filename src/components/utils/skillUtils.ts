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
import { getHeroCard } from './utils';
import {
    updateCurrentBattleAndResetActivePlayer
} from '../home-map/multi-battle-page/multiBattleUtils';

export const getCardSkills = (battleCard: BattleCardType): Skill[] => {
    return battleCard?.skills || [];
}

export const updateBattleCardsWithSelectedSkill = (skill: Skill) => {
    const battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);
    heroCard.skills.forEach((heroSkill: Skill) => {
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

    const selectedCardIsHeroCard = getHeroCard(battleCards).nickname === selectedCard.nickname;
    const activeSkillHandler = skillHandlerMap[activeSkill.name](activeSkill, selectedCard, selectedCardIsHeroCard);
    if (!activeSkillHandler) {
        await unsuitedCardHandler(selectedCard);
        return;
    }

    const audioName = audioMap[activeSkill.name];
    // audioName && new Audio(`sounds/${audioName}.mp3`).play();
    audioName && playSoundEffect(audioName);

    await addClassWhenUseSkill(selectedCard, activeSkill);

    if (activeSkill.type === 'attack') {
        await addClassWhenChangeHealth(selectedCard, getItemStat(activeSkill, 'power').value, activeSkill.type);
    } else {
        await checkBattleCardsEffects(battleCards);
    }

    const newBattleCard = checkBattleCardAfterSkill(battleCards, selectedCard);
    updateCurrentBattleAndResetActivePlayer({
        action: 'useActiveSkill',
        switchActivePlayer: true,
        selectedCardIndex: selectedCard.index,
        battleCardFromAnotherPlayer: newBattleCard,
        activeSkill
    });
}

const checkBattleCardAfterSkill = (
    battleCards: BattleCardType[],
    selectedCard: BattleCardType
) => {
    if (selectedCard.value > 0 || selectedCard.type === 'hero') return;

    const heroCard = getHeroCard(battleCards);

    if (selectedCard.type === 'boss') {
        battleCards.forEach((battleCard) => {
            if (battleCard.type !== 'hero') return;

            battleCard.bossParts = 0;
        });
        // heroCard.bossParts = 0;
    }

    recalculateHeroExp(heroCard, selectedCard);
    return changeBattleCardAfterSkill(battleCards, selectedCard);
}

const allowedCardTypesForNegativeSkill = ['enemy', 'beast', 'boss', 'hero'];
const allowedCardTypesForPositiveSkill = ['hero'];
const callAttackSkillHandler = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    selectedCardIsHeroCard: boolean
) => {
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type) || selectedCardIsHeroCard ) return;

    const powerValue = getItemStat(activeSkill, 'power').value;
    const maxCoolDownValue = getItemStat(activeSkill, 'maxCoolDown').value;

    if (selectedCard.type === 'hero') {
        selectedCard.health -= powerValue;
    } else {
        selectedCard.value -= powerValue;
    }

    selectedCard.value -= powerValue;
    activeSkill.active = false;
    activeSkill.coolDown = maxCoolDownValue;

    return true;
}

const callDebuffSkill = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    selectedCardIsHeroCard: boolean
) => {
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type) || selectedCardIsHeroCard) return;
    return addEffect(activeSkill, selectedCard);
}

const callBuffSkill = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    selectedCardIsHeroCard: boolean
) => {
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
    const promises = battleCards.map(battleCard => checkEveryBattleCardEffects(battleCards, battleCard));

    await Promise.all(promises);
}

const checkEveryBattleCardEffects = async (battleCards: BattleCardType[], battleCard: BattleCardType) => {
    if (battleCard.effects.length === 0) return;

    const effectsMap: any = {
        buff: buffSkillHandler,
        debuff: debuffSkillHandler,
    }

    let allBuffEffectsValue = 0;
    let allDebuffEffectsValue = 0;

    for (const effect of battleCard.effects) {
        if (effect.type === 'buff') {
            allBuffEffectsValue += effectsMap[effect.type](effect, battleCard);
        } else {
            allDebuffEffectsValue += effectsMap[effect.type](effect, battleCard);
        }
    }

    await Promise.all([
        allBuffEffectsValue && addClassWhenChangeHealth(battleCard, allBuffEffectsValue, 'buff'),
        allDebuffEffectsValue && addClassWhenChangeHealth(battleCard, allDebuffEffectsValue, 'debuff'),
    ]);

    checkBattleCardAfterSkill(battleCards, battleCard);
    battleCard.effects = battleCard.effects.filter((effect: Effect) => getItemStat(effect, 'duration').value > 0);
}

const debuffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const power = getItemStat(effect, 'power');

    // TODO: hero health to value
    if (selectedCard.type === 'hero') {
        selectedCard.health -= power.value;
    } else {
        selectedCard.value -= power.value;
    }

    duration.value--;

    return power.value;
}

const buffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const power = getItemStat(effect, 'power');
    const heroStatMaxHealth = getItemStat(selectedCard, 'maxHealth');

    const heroHealth = selectedCard.health + power.value;

    selectedCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;

    duration.value--;

    return power.value;
}

export const changeBattleCardAfterSkill = (
    battleCards: BattleCardType[],
    selectedCard: BattleCardType,
): BattleCardType => {
    const battleCardFromAnotherPlayer = getStateValue('actionDataFromActivePlayer').battleCardFromAnotherPlayer;
    const newBattleCard = battleCardFromAnotherPlayer
        || defineNewBattleCard(selectedCard.type, selectedCard.level, battleCards);

    newBattleCard.index = selectedCard.index;
    newBattleCard.isNew = true;
    battleCards[selectedCard.index] = newBattleCard;

    return newBattleCard;
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
                if (skill.coolDown) return;

                battleCards.forEach((battleCard) => {
                    if (battleCard.type !== 'hero') return;

                    addEffect(skill, battleCard);
                });
            });
    })
}

// TODO: must be move to independent utils
export const playSoundEffect = (soundEffect: SoundEffects) => {
    const options = getStateValue('options')
    const audio = new Audio(`sounds/${soundEffect}.mp3`);
    audio.volume = options.sounds / 100;
    audio.play();
};

export enum SoundEffects {
    Punch = 'punch-2',
    Blob = 'blob',
    Coins = 'coins'
}
