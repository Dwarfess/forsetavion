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
        // 'ice-balls': callAttackSkillHandler,
        'sword_hit': callAttackSkillHandler,
        'sword_range_hit': callAttackSkillHandler,
        'fire_icicle': callAttackSkillHandler,
        'wildfire': callAttackSkillHandler,
        'ice_tear': callAttackSkillHandler,
        'ice_squall': callAttackSkillHandler,
        'drain': callAttackSkillHandler,//todo
        // 'light-ray': callAttackSkillHandler,
        'poison': callDebuffSkill,
        'fire_flame': callDebuffSkill,
        'frostbite': callDebuffSkill,
        'anti_grace': callDebuffSkill,
        'regeneration': callBuffSkill,
        'physical_shield': callBuffSkill,
        'skill_master': callBuffSkill,//todo
        'resist_master': callBuffSkill,//todo
        'stone_skin': callBuffSkill,//todo
        'enrichment': callBuffSkill,//todo
        'heal': callHelpSkill,
        'mass_heal': callHelpSkill, //todo
        'resurrection': callHelpSkill, //todo
        'potion_rebirth': callHelpSkill, //todo
        'potion_conversion': callHelpSkill, //todo
        'coin_conversion': callHelpSkill, //todo
    };

    const selectedCardIsHeroCard = getHeroCard(battleCards).nickname === selectedCard.nickname;
    const activeSkillHandler = skillHandlerMap[activeSkill.name](activeSkill, selectedCard, selectedCardIsHeroCard);
    // const activeSkillHandler = skillHandlerMap['light-ray'](activeSkill, selectedCard, selectedCardIsHeroCard);
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

const allowedCardTypesForHelpSkill = ['enemy', 'beast', 'boss', 'hero'];
const allowedCardTypesForNegativeSkill = ['enemy', 'beast', 'boss', 'hero'];
const allowedCardTypesForPositiveSkill = ['hero'];
const callAttackSkillHandler = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    selectedCardIsHeroCard: boolean
) => {
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type) || selectedCardIsHeroCard ) return;

    const powerValue = getItemStat(activeSkill, 'power').value;
    const mAtkValue = getItemStat(activeSkill, 'mAtk').value;
    const maxCoolDownValue = getItemStat(activeSkill, 'maxCoolDown').value;

    if (selectedCard.type === 'hero') {
        selectedCard.health -= powerValue;
    } else {
        selectedCard.value -= powerValue;
    }

    // selectedCard.value -= powerValue;
    activeSkill.active = false;
    activeSkill.coolDown = maxCoolDownValue;

    return true;
}

const callHelpSkill = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
) => {
    if (!allowedCardTypesForHelpSkill.includes(selectedCard.type)) return;

    const powerValue = getItemStat(activeSkill, 'power').value;
    const maxCoolDownValue = getItemStat(activeSkill, 'maxCoolDown').value;

    if (selectedCard.type === 'hero') {
        selectedCard.health += powerValue;
    } else {
        selectedCard.value += powerValue;
    }

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

export const recalculatePassiveSkills = () => {
    const battleCards = getStateValue('battleCards');
    battleCards.forEach((battleCard: BattleCardType) => {
        if (battleCard.type !== 'hero') return;

        battleCard.skills
            .filter((skill) => skill.useType === 'passive' )
            .forEach((skill) => {
                passiveSkillsHandler(battleCard, skill);
            })
    });

    setStateValue('battleCards', battleCards);
}

const passiveSkillsHandler = (heroCard: BattleCardType, skill: Skill) => {
    const berserkHandler = () => {
        const healthMarkValue = getItemStat(skill, 'healthMark').value;
        const pAtk = getItemStat(heroCard, 'pAtk');
        if (heroCard.health <= healthMarkValue) {
            pAtk.positiveValue = getItemStat(skill, 'power').value;
        } else {
            pAtk.positiveValue = 0;
        }

        // pAtk.value = pAtk.positiveValue;
    }

    const healingGraceHandler = () => {
        const healingGraceValue = getItemStat(skill, 'power').value;
        const healBoost = getItemStat(heroCard, 'healBoost');

        healBoost.positiveValue = healingGraceValue;
    }

    const fullResistHandler = () => {
        const fullResistValue = getItemStat(skill, 'power').value;

        const pDef = getItemStat(heroCard, 'pDef');
        const mDef = getItemStat(heroCard, 'mDef');
        const fireResist = getItemStat(heroCard, 'fireResist');
        const iceResist = getItemStat(heroCard, 'iceResist');
        const poisonResist = getItemStat(heroCard, 'poisonResist');

        pDef.positiveValue = fullResistValue;
        mDef.positiveValue = fullResistValue;
        fireResist.positiveValue = fullResistValue;
        iceResist.positiveValue = fullResistValue;
        poisonResist.positiveValue = fullResistValue;
    }

    const fortuneHandler = () => {
        const fortuneValue = getItemStat(skill, 'power').value;
        const coinBoost = getItemStat(heroCard, 'coinBoost');

        coinBoost.positiveValue = fortuneValue;
    }

    const poisonResistHandler = () => {
        const poisonResistValue = getItemStat(skill, 'power').value;
        const poisonResist = getItemStat(heroCard, 'poisonResist');

        poisonResist.positiveValue = poisonResistValue;
    }

    const fireResistHandler = () => {
        const fireResistValue = getItemStat(skill, 'power').value;
        const fireResist = getItemStat(heroCard, 'fireResist');

        fireResist.positiveValue = fireResistValue;
    }

    const iceResistHandler = () => {
        const iceResistValue = getItemStat(skill, 'power').value;
        const iceResist = getItemStat(heroCard, 'iceResist');

        iceResist.positiveValue = iceResistValue;
    }

    const passiveSkillsHandlerMap: any = {
        berserk: berserkHandler,
        healing_grace: healingGraceHandler,
        full_resist: fullResistHandler,
        fortune: fortuneHandler,
        poison_resist: poisonResistHandler,
        fire_resist: fireResistHandler,
        ice_resist: iceResistHandler,
    }

    passiveSkillsHandlerMap[skill.name]?.();
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
