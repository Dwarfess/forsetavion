import { BattleCardType } from '../types';
import { recalculatePassiveSkills } from './skillUtils';

export const recalculateHeroStats = (battleCards: BattleCardType[]) => {
    battleCards.forEach((battleCard: BattleCardType) => {
        if (battleCard.type !== 'hero') return;

        battleCard.stats
            .forEach((stat) => {
                // TODO: (checked) temporary consts before this props are optional in "stat" type
                const defaultValue = stat.defaultValue || 0;
                const artifactValue = stat.artifactValue || 0;
                const passiveSkillEffectValue = stat.passiveSkillEffectValue || 0;
                const buffEffectValue = stat.buffEffectValue || 0;
                const debuffEffectValue = stat.debuffEffectValue || 0;

                stat.value = defaultValue + artifactValue + passiveSkillEffectValue + buffEffectValue - debuffEffectValue;
            })
    });
}

export const recalculateHeroStatsWithPassiveSkills = (battleCards: BattleCardType[]) => {
    recalculatePassiveSkills(battleCards);
    recalculateHeroStats(battleCards);
}
