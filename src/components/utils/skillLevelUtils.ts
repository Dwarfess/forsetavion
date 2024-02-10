import {BattleCardType, Skill} from "../types";
import {getItemStat} from "./recalculateHeroStats";

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
    recalculateSkillsStatsAccordingLevel(clonedHeroSkills);

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

export const recalculateSkillsStatsAccordingLevel = (skills: Skill[]) => {
    skills.forEach((skill: Skill) => {
        if (skill.level) {
            updateSkillPower(skill);
            updateSkillCoolDown(skill);
            updateSkillDuration(skill);
            updateSkillPeriod(skill);
        }
    });
}

const updateSkillPower = (skill: Skill) => {
    const power = getItemStat(skill, 'power');
    const level = (skill.type === 'attack' ? skill.level : Math.floor(skill.level / 2));
    power.value = power.defaultValue + (level - 1);
}

const updateSkillCoolDown = (skill: Skill) => {
    const coolDown = getItemStat(skill, 'maxCoolDown');
    const level = Math.floor(skill.level / 6);
    coolDown.value = coolDown.defaultValue - level;
}

const updateSkillDuration = (skill: Skill) => {
    if (skill.type === 'attack') return;

    const duration = getItemStat(skill, 'duration');
    const level = Math.floor(skill.level / 4);
    duration.value = duration.defaultValue + level;
}

const updateSkillPeriod = (skill: Skill) => {
    if (skill.type === 'attack') return;

    const period = getItemStat(skill, 'period');
    const level = Math.floor(skill.level / 10);
    period.value = period.defaultValue - level || 1;
}

