import { BattleCardType, Effect, IHeroBattleCard, Skill, Stat } from '../types';
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
import { recalculateHeroStats } from './statUtils';

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
        'drain': callAttackSkillHandler,
        // 'light-ray': callAttackSkillHandler,
        'poison': callDebuffSkillHandler,
        'fire_flame': callDebuffSkillHandler,
        'frostbite': callDebuffSkillHandler,
        'anti_grace': callDebuffSkillHandler,
        'regeneration': callBuffSkillHandler,
        'physical_shield': callBuffSkillHandler,
        'skill_master': callBuffSkillHandler,
        'resist_master': callBuffSkillHandler,
        'stone_skin': callBuffSkillHandler,
        'enrichment': callBuffSkillHandler,
        'heal': callHelpSkillHandler,
        'mass_heal': callHelpSkillHandler,
        'resurrection': callHelpSkillHandler,
        'potion_rebirth': callHelpSkillHandler, //todo
        'potion_conversion': allowedCardTypesForTransformSkill.includes(selectedCard.type)
            ? callTransformSkillHandler : callAttackSkillHandler, //todo
        'coin_conversion': allowedCardTypesForTransformSkill.includes(selectedCard.type)
            ? callTransformSkillHandler : callAttackSkillHandler, //todo
    };

    const valueFromActiveSkillHandler = skillHandlerMap[activeSkill.name](activeSkill, selectedCard, battleCards);

    if (!valueFromActiveSkillHandler) {
        await unsuitedCardHandler(selectedCard);
        return;
    }

    const audioName = audioMap[activeSkill.name];
    audioName && playSoundEffect(audioName);

    await addClassWhenUseSkill(selectedCard, activeSkill);

    const heroCard = getHeroCard(battleCards);
    // if (activeSkill.type === 'attack') {
    //     // TODO: create separated method with promises
    //     await Promise.all([
    //         valueFromActiveSkillHandler.heroCardGetValue
    //             && addClassWhenChangeHealth(heroCard, valueFromActiveSkillHandler.heroCardGetValue, 'buff'),
    //         addClassWhenChangeHealth(selectedCard, valueFromActiveSkillHandler.selectedCardLostValue, activeSkill.type)
    //     ])
    // } else if (activeSkill.type === 'help') {
    //     valueFromActiveSkillHandler.heroCardGetValue
    //     && await addClassWhenChangeHealth(heroCard, valueFromActiveSkillHandler.heroCardGetValue, 'buff');
    // } else {
    //     await checkBattleCardsEffects(battleCards);
    //     recalculateHeroStats(battleCards);
    // }

    const callSkillHandlerResulAttack = async () => {
        // TODO: create separated method with promises
        await Promise.all([
            valueFromActiveSkillHandler.heroCardGetValue
            && addClassWhenChangeHealth(heroCard, valueFromActiveSkillHandler.heroCardGetValue, 'buff'),
            addClassWhenChangeHealth(selectedCard, valueFromActiveSkillHandler.selectedCardLostValue, activeSkill.type)
        ])
    }

    const callSkillHandlerResulHelp = async () => {
        valueFromActiveSkillHandler.heroCardGetValue
        && await addClassWhenChangeHealth(heroCard, valueFromActiveSkillHandler.heroCardGetValue, 'help');
    }

    const callSkillHandlerResulBuffDebuff = async () => {
        await checkBattleCardsEffects(battleCards);
        recalculateHeroStats(battleCards);
    }

    const callSkillHandlerResulTransform = () => {}

    const skillHandlerResultMap: any = {
        'attack': callSkillHandlerResulAttack,
        'help': callSkillHandlerResulHelp,
        'buff': callSkillHandlerResulBuffDebuff,
        'debuff': callSkillHandlerResulBuffDebuff,
        'transform': allowedCardTypesForTransformSkill.includes(selectedCard.type)
            ? callSkillHandlerResulTransform : callSkillHandlerResulAttack,
    }

    await skillHandlerResultMap[activeSkill.type]();

    const newBattleCard = checkBattleCardAfterSkill(
        battleCards,
        selectedCard,
        valueFromActiveSkillHandler.newBattleCardInitialData
    );

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
    selectedCard: BattleCardType,
    newBattleCardInitialData?: any
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
    return changeBattleCardAfterSkill(battleCards, selectedCard, newBattleCardInitialData);
}

const allowedCardTypesForHelpSkill = ['hero'];
const allowedCardTypesForTransformSkill = ['enemy', 'beast'];
const allowedCardTypesForNegativeSkill = ['enemy', 'beast', 'boss', 'hero'];
const allowedCardTypesForPositiveSkill = ['hero'];
const callAttackSkillHandler = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    battleCards: BattleCardType[],
) => {
    const heroCard = getHeroCard(battleCards);
    const selectedCardIsHeroCard = heroCard.nickname === selectedCard.nickname;

    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type) || selectedCardIsHeroCard ) return;

    const powerValue = getItemStat(activeSkill, 'power').value;
    const mAtkValue = getItemStat(heroCard, 'mAtk').value;

    const mDefValue = getItemStat(selectedCard, 'mDef')?.value || 0;
    const resistValue = getItemStat(selectedCard, `${activeSkill.elementType}Resist`)?.value || 0;

    const selectedCardLostValue = powerValue + mAtkValue - mDefValue - resistValue;

    const maxCoolDownValue = getItemStat(activeSkill, 'maxCoolDown').value;

    if (selectedCard.type === 'hero') {
        selectedCard.health -= selectedCardLostValue;
    } else {
        selectedCard.value -= selectedCardLostValue;
    }

    let heroCardGetValue = 0;
    const drainHandler = () => {
        heroCardGetValue = selectedCardLostValue;

        const heroStatMaxHealth = getItemStat(selectedCard, 'maxHealth');
        const heroHealth = heroCard.health + heroCardGetValue;
        heroCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;
    }

    const attackSkillHandlerMap: any = {
        drain: drainHandler,
    }

    attackSkillHandlerMap[activeSkill.name]?.();

    activeSkill.active = false;
    activeSkill.coolDown = maxCoolDownValue;

    return {
        selectedCardLostValue,
        heroCardGetValue,
    };
}

const callHelpSkillHandler = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    battleCards: BattleCardType[],
) => {
    if (!allowedCardTypesForHelpSkill.includes(selectedCard.type)) return;
    const heroCard = getHeroCard(battleCards);

    const mAtkValue = getItemStat(heroCard, 'mAtk').value;
    let powerValue = getItemStat(activeSkill, 'power').value + mAtkValue;

    const healHandler = (heroCard: BattleCardType = selectedCard) => {
        const heroStatMaxHealth = getItemStat(heroCard, 'maxHealth');
        const heroHealth = heroCard.health + powerValue;
        heroCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;
    }

    const massHealHandler = () => {
        battleCards.forEach((battleCard) => {
            if (battleCard.type === 'hero') {
                healHandler(battleCard);
            }
        })
    }

    const resurrectionHandler = (heroCard: BattleCardType = selectedCard) => {
        const maxHealthValue = getItemStat(heroCard, 'maxHealth').value;
        heroCard.health = maxHealthValue;
        powerValue = maxHealthValue;
    }

    const potionRebirthHandler = () => {
        const character = getStateValue('character');
        const selectedPotionsLength = selectedCard.selectedPotions.length;
        if (selectedCard.selectedPotions.length < character.inventory.potionLimit) {
            // const existingPotion = selectedCard.selectedPotions
            //     .find(potion => potion.value === powerValue * 10);
            //
            // if (existingPotion?.count) {
            //     existingPotion.count++;
            // } else {
                selectedCard.selectedPotions.push({
                    id: Math.random().toString(16).slice(2),
                    count: 1,
                    index: selectedPotionsLength,
                    type: 'potion',
                    name: 'health',
                    image: `icon-health-potion-${powerValue < 4 ? powerValue : 4}`,
                    price: 10 * powerValue,
                    value: 10 * powerValue,
                    selected: true
                });
            // }
        }

        powerValue = 0;
    }

    const helpSkillHandlerMap: any = {
        heal: healHandler,
        mass_heal: massHealHandler,
        resurrection: resurrectionHandler,
        potion_rebirth: potionRebirthHandler
    }

    helpSkillHandlerMap[activeSkill.name]?.();

    activeSkill.coolDown = getItemStat(activeSkill, 'maxCoolDown').value;
    activeSkill.active = false;

    return { heroCardGetValue: powerValue };
}

const callTransformSkillHandler = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
) => {
    const transformSkillTypeMap: any = {
        potion_conversion: 'potion',
        coin_conversion: 'coin',
    }

    const newBattleCardInitialData = {
        value: selectedCard.value,
        type: transformSkillTypeMap[activeSkill.name],
    }

    selectedCard.value = 0;

    activeSkill.coolDown = getItemStat(activeSkill, 'maxCoolDown').value;
    activeSkill.active = false;
    // const transformSkillHandlerMap: any = {
    //     potion_conversion: potionConversionHandler
    // }
    //
    // transformSkillHandlerMap[activeSkill.name]?.();

    return { newBattleCardInitialData };
}

const callDebuffSkillHandler = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    battleCards: BattleCardType[],
) => {
    const heroCard = getHeroCard(battleCards);
    const selectedCardIsHeroCard = heroCard.nickname === selectedCard.nickname;
    if (!allowedCardTypesForNegativeSkill.includes(selectedCard.type) || selectedCardIsHeroCard) return;

    const power = structuredClone(getItemStat(activeSkill, 'power'));
    const mAtkValue = getItemStat(heroCard, 'mAtk').value;

    const mDefValue = getItemStat(selectedCard, 'mDef')?.value || 0;
    const resistValue = getItemStat(selectedCard, `${activeSkill.elementType}Resist`)?.value || 0;

    const selectedCardLostValue = power.value + mAtkValue - mDefValue - resistValue;

    power.value = selectedCardLostValue > 0 ? selectedCardLostValue : 0;

    return addEffect(activeSkill, selectedCard, power);
}

const callBuffSkillHandler = (
    activeSkill: Skill,
    selectedCard: BattleCardType,
    battleCards: BattleCardType[],
) => {
    const heroCard = getHeroCard(battleCards);
    if (!allowedCardTypesForPositiveSkill.includes(selectedCard.type)) return;

    const power = structuredClone(getItemStat(activeSkill, 'power'));
    const mAtkValue = getItemStat(heroCard, 'mAtk').value;

    power.value = power.value + mAtkValue;

    return addEffect(activeSkill, selectedCard, power);
}

const addEffect = (activeSkill: Skill, selectedCard: BattleCardType, power: Stat) => {
    const { name, image, type } = activeSkill;

    const maxCoolDown = getItemStat(activeSkill, 'maxCoolDown');
    // const power = structuredClone(getItemStat(activeSkill, 'power'));
    const duration = structuredClone(getItemStat(activeSkill, 'duration'));
    const period = structuredClone(getItemStat(activeSkill, 'period'));
    //
    // const powerValue = getItemStat(activeSkill, 'power').value;
    // const mAtkValue = getItemStat(heroCard, 'mAtk').value;
    //
    // const mDefValue = getItemStat(selectedCard, 'mDef')?.value || 0;
    // const resistValue = getItemStat(selectedCard, `${activeSkill.elementType}Resist`)?.value || 0;
    //
    // const selectedCardLostValue = powerValue + mAtkValue - mDefValue - resistValue;

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
    let sphereEffectsValue = 0;
    let allDebuffEffectsValue = 0;

    for (const effect of battleCard.effects) {
        if (effect.name === 'enrichment') {
            sphereEffectsValue += effectsMap[effect.type](effect, battleCard);
        } else if (effect.type === 'buff') {
            allBuffEffectsValue += effectsMap[effect.type](effect, battleCard);
        } else {
            allDebuffEffectsValue += effectsMap[effect.type](effect, battleCard);
        }
    }

    await Promise.all([
        sphereEffectsValue && addClassWhenChangeHealth(battleCard, sphereEffectsValue, 'sphere'),
        allBuffEffectsValue && addClassWhenChangeHealth(battleCard, allBuffEffectsValue, 'buff'),
        allDebuffEffectsValue && addClassWhenChangeHealth(battleCard, allDebuffEffectsValue, 'debuff'),
    ]);

    checkBattleCardAfterSkill(battleCards, battleCard);
    battleCard.effects = battleCard.effects.filter((effect: Effect) => getItemStat(effect, 'duration').value > 0);
}

const debuffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    let powerValue = getItemStat(effect, 'power').value;

    const commonDebuffHandler = () => {
        // TODO: hero health to value
        if (selectedCard.type === 'hero') {
            selectedCard.health -= powerValue;
        } else {
            selectedCard.value -= powerValue;
        }
    }

    const antiGraceHandler = () => {
        const healBoost = getItemStat(selectedCard, 'healBoost');
        healBoost.debuffEffectValue = 0;

        if (duration.value > 1) {
            healBoost.debuffEffectValue = powerValue;
        }

        powerValue = 0;
    }

    const debuffSkillHandlerMap: any = {
        poison: commonDebuffHandler,
        fire_flame: commonDebuffHandler,
        frostbite: commonDebuffHandler,
        burning: commonDebuffHandler,
        freezing: commonDebuffHandler,
        poisoned_claws: commonDebuffHandler,
        anti_grace: antiGraceHandler,
    }

    debuffSkillHandlerMap[effect.name]?.();

    duration.value--;

    return powerValue;
}

const buffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    let powerValue = getItemStat(effect, 'power').value;

    const regenerationHandler = () => {
        const heroStatMaxHealth = getItemStat(selectedCard, 'maxHealth');
        const heroHealth = selectedCard.health + powerValue;
        selectedCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;
    }

    const skillMasterHandler = () => {
        const mAtk = getItemStat(selectedCard, 'mAtk');
        mAtk.buffEffectValue = 0;

        if (duration.value > 1) {
            mAtk.buffEffectValue = powerValue;
        }

        powerValue = 0;
    }

    const resistMasterHandler = () => {
        const pDef = getItemStat(selectedCard, 'pDef');
        const mDef = getItemStat(selectedCard, 'mDef');
        const fireResist = getItemStat(selectedCard, 'fireResist');
        const iceResist = getItemStat(selectedCard, 'iceResist');
        const poisonResist = getItemStat(selectedCard, 'poisonResist');

        pDef.buffEffectValue = 0;
        mDef.buffEffectValue = 0;
        fireResist.buffEffectValue = 0;
        iceResist.buffEffectValue = 0;
        poisonResist.buffEffectValue = 0;

        if (duration.value > 1) {
            pDef.buffEffectValue = powerValue;
            mDef.buffEffectValue = powerValue;
            fireResist.buffEffectValue = powerValue;
            iceResist.buffEffectValue = powerValue;
            poisonResist.buffEffectValue = powerValue;
        }

        powerValue = 0;
    }

    const stoneSkinHandler = () => {
        const pDef = getItemStat(selectedCard, 'pDef');

        pDef.buffEffectValue = 0;

        if (duration.value > 1) {
            pDef.buffEffectValue = powerValue;
        }

        powerValue = 0;
    }

    const physicalShieldHandler = () => {
        const pDef = getItemStat(selectedCard, 'pDef');

        pDef.buffEffectValue = 0;

        if (duration.value > 1) {
            pDef.buffEffectValue = powerValue;
        }

        powerValue = 0;
    }

    const enrichmentHandler = () => {
        selectedCard.spheres += powerValue;

        // powerValue = 0;
    }

    const buffSkillHandlerMap: any = {
        regeneration: regenerationHandler,
        physical_shield: physicalShieldHandler,
        skill_master: skillMasterHandler,
        resist_master: resistMasterHandler,
        stone_skin: stoneSkinHandler,
        enrichment: enrichmentHandler,
    }

    buffSkillHandlerMap[effect.name]?.();
    duration.value--;

    return powerValue;
}

export const changeBattleCardAfterSkill = (
    battleCards: BattleCardType[],
    selectedCard: BattleCardType,
    newBattleCardInitialData?: any,
): BattleCardType => {
    const battleCardFromAnotherPlayer = getStateValue('actionDataFromActivePlayer').battleCardFromAnotherPlayer;
    const newBattleCard = battleCardFromAnotherPlayer
        || defineNewBattleCard(selectedCard.type, selectedCard.level, battleCards, newBattleCardInitialData);

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
    const heroCard = getHeroCard(battleCards);

    battleCards.filter((battleCard: BattleCardType) => battleCard.type === 'boss')
        .forEach((bossCard: BattleCardType) => {
            bossCard.skills.forEach((skill: Skill) => {
                if (skill.coolDown) return;

                battleCards.forEach((battleCard) => {
                    if (battleCard.type !== 'hero') return;

                    const power = structuredClone(getItemStat(skill, 'power'));
                    // TODO: before bosses have no stats it is not necessary
                    // const mAtkValue = getItemStat(heroCard, 'mAtk').value;

                    const mDefValue = getItemStat(heroCard, 'mDef')?.value || 0;
                    const resistValue = getItemStat(heroCard, `${skill.elementType}Resist`)?.value || 0;

                    const selectedCardLostValue = power.value - mDefValue - resistValue;
                    power.value = selectedCardLostValue > 0 ? selectedCardLostValue : 0;

                    addEffect(skill, battleCard, power);
                });
            });
    })
}

export const recalculatePassiveSkills = (battleCards: BattleCardType[]) => {
    // const battleCards = getStateValue('battleCards');
    battleCards.forEach((battleCard: BattleCardType) => {
        if (battleCard.type !== 'hero') return;

        battleCard.skills
            .filter((skill) => skill.useType === 'passive' )
            .forEach((skill) => {
                passiveSkillsHandler(battleCard, skill);
            })
    });

    // setStateValue('battleCards', battleCards);
}

const passiveSkillsHandler = (heroCard: BattleCardType, skill: Skill) => {
    const berserkHandler = () => {
        const healthMarkValue = getItemStat(skill, 'healthMark').value;
        const pAtk = getItemStat(heroCard, 'pAtk');
        if (heroCard.health <= healthMarkValue) {
            pAtk.passiveSkillEffectValue = getItemStat(skill, 'power').value;
        } else {
            pAtk.passiveSkillEffectValue = 0;
        }

        // pAtk.value = pAtk.passiveSkillEffectValue;
    }

    const healingGraceHandler = () => {
        const healingGraceValue = getItemStat(skill, 'power').value;
        const healBoost = getItemStat(heroCard, 'healBoost');

        healBoost.passiveSkillEffectValue = healingGraceValue;
    }

    const fullResistHandler = () => {
        const fullResistValue = getItemStat(skill, 'power').value;

        const pDef = getItemStat(heroCard, 'pDef');
        const mDef = getItemStat(heroCard, 'mDef');
        const fireResist = getItemStat(heroCard, 'fireResist');
        const iceResist = getItemStat(heroCard, 'iceResist');
        const poisonResist = getItemStat(heroCard, 'poisonResist');

        pDef.passiveSkillEffectValue = fullResistValue;
        mDef.passiveSkillEffectValue = fullResistValue;
        fireResist.passiveSkillEffectValue = fullResistValue;
        iceResist.passiveSkillEffectValue = fullResistValue;
        poisonResist.passiveSkillEffectValue = fullResistValue;
    }

    const fortuneHandler = () => {
        const fortuneValue = getItemStat(skill, 'power').value;
        const coinBoost = getItemStat(heroCard, 'coinBoost');

        coinBoost.passiveSkillEffectValue = fortuneValue;
    }

    const poisonResistHandler = () => {
        const poisonResistValue = getItemStat(skill, 'power').value;
        const poisonResist = getItemStat(heroCard, 'poisonResist');

        poisonResist.passiveSkillEffectValue = poisonResistValue;
    }

    const fireResistHandler = () => {
        const fireResistValue = getItemStat(skill, 'power').value;
        const fireResist = getItemStat(heroCard, 'fireResist');

        fireResist.passiveSkillEffectValue = fireResistValue;
    }

    const iceResistHandler = () => {
        const iceResistValue = getItemStat(skill, 'power').value;
        const iceResist = getItemStat(heroCard, 'iceResist');

        iceResist.passiveSkillEffectValue = iceResistValue;
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
