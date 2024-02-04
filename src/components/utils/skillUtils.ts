import {BattleCardType, Effect, HeroBattleCardType, Skill} from "../types";
import {generateBattleCards, generatePrizeCards} from "./utils";
import {getItemStat, recalculateHeroExp} from "./recalculateHeroStats";
import {addClassErrorWhenContactCard, addClassWhenContactCard} from "./contactItems";
import {defineNewBattleCard} from "./moveItems";


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
    let skillClasses = (activeSkill && ((activeSkill.name !== skill.name) ? 'disabled' : 'active'))
        || (skill.coolDown ? 'disabled' : '');
    if (skill.level === 0) {
        skillClasses += ' block';
    }
    return skillClasses;
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

    await addClassWhenContactCard(selectedCard);

    checkBattleCardAfterSkill(battleCards, selectedCard, gridLength);
}

const checkBattleCardAfterSkill = (
    battleCards: BattleCardType[],
    selectedCard: BattleCardType,
    gridLength: number
) => {
    if (selectedCard.value > 0 || selectedCard.type === 'hero') return;

    const heroCard = getHeroCard(battleCards);

    if (selectedCard.type === 'boss') {
        heroCard.bossParts = 0;
    }

    recalculateHeroExp(heroCard, selectedCard);
    changeBattleCardAfterSkill(battleCards, selectedCard, heroCard, gridLength);
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
        battleCard.effects = battleCard.effects.filter((effect: Effect) => getItemStat(effect, 'duration').value > 0);
    });
}

const debuffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const period = getItemStat(effect, 'period');

    if (duration.value % period.value === 0 || duration.value === 0) {
        const power = getItemStat(effect, 'power');

        if (selectedCard.type === 'hero') {
            selectedCard.health -= power.value;
        } else {
            selectedCard.value -= power.value;
        }
    }

    duration.value--;
}

const buffSkillHandler = (effect: Effect, selectedCard: BattleCardType) => {
    const duration = getItemStat(effect, 'duration');
    const period = getItemStat(effect, 'period');

    if (duration.value % period.value === 0 || duration.value === 0) {
        const power = getItemStat(effect, 'power');

        const heroHealth = selectedCard.health + power.value;
        const heroStatMaxHealth = getItemStat(selectedCard, 'maxHealth');

        selectedCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;
    }

    duration.value--;
}

export const changeBattleCardAfterSkill = (battleCards: BattleCardType[], selectedCard: BattleCardType, heroCard: HeroBattleCardType, gridLength: number) => {
    const battleCard = defineNewBattleCard(heroCard, selectedCard.type, selectedCard.level, battleCards, gridLength);

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

export const availableSkill = (selectedSkill: Skill, skills: Skill[]) => {
    const selectedSkillIndex = skills.findIndex((skill: Skill) => skill.name === selectedSkill.name);
    if (!selectedSkillIndex) return true;

    return skills[selectedSkillIndex -1].level;
};

export const getHeroSkillsWithIncreasedSkill = (selectedSkill: Skill, skills: Skill[], heroSkillPoints: number): any => {
    const clonedSkills = {
        skills: structuredClone(skills),
        leftPoints: heroSkillPoints
    };

    clonedSkills.skills.forEach((skill: Skill) => {
        if (skill.name === selectedSkill.name) {
            skill.level++;
            skill.temporaryPoints++;
        }
    });
    clonedSkills.leftPoints--;

    return clonedSkills;
}

export const getHeroSkillsWithDecreasedSkill = (selectedSkill: Skill, skills: Skill[], heroSkillPoints: number): any => {
    const clonedSkills = {
        skills: structuredClone(skills),
        leftPoints: heroSkillPoints
    };

    let pointsUnavailableSkills = 0;
    clonedSkills.skills.forEach((skill: Skill) => {
        if (skill.name === selectedSkill.name) {
            skill.level--;
            skill.temporaryPoints--;
        }

        if (availableSkill(skill, clonedSkills.skills) === 0) {
            pointsUnavailableSkills += skill.temporaryPoints;
            skill.level -= skill.temporaryPoints;
            skill.temporaryPoints = 0;
        }
    });
    clonedSkills.leftPoints = clonedSkills.leftPoints + 1 + pointsUnavailableSkills;

    return clonedSkills;
}

export const getUpdatedBattleCardsByNewSkillLevels = (battleCards: BattleCardType[], heroSkills: Skill[]) => {
    const clonedBattleCards = structuredClone(battleCards);
    const clonedHeroSkills = structuredClone(heroSkills);
    clonedHeroSkills.forEach((skill: Skill) => {
        skill.temporaryPoints = 0;
    });

    clonedBattleCards.forEach((battleCard: BattleCardType) => {
        if (battleCard.type === 'hero') {
            battleCard.skills = clonedHeroSkills;
            battleCard.skillPoints = 0;
        }
    });

    return clonedBattleCards;
}

export const getHeroSkillsWithTemporaryPoints = (skills: Skill[]) => {
    const clonedSkills = structuredClone(skills);
    clonedSkills.forEach((skill: Skill) => {
       skill.temporaryPoints = 0;
    });

    return clonedSkills;
}
