import { getStateValue, setStateValue } from '../../store/storeUtils';
import { BattleCardType } from '../types';

export const recalculateHeroStats = (battleCards: BattleCardType[]) => {
    // const battleCards = getStateValue('battleCards');
    battleCards.forEach((battleCard: BattleCardType) => {
        if (battleCard.type !== 'hero') return;

        battleCard.stats
            .forEach((stat) => {
                // TODO: temporary consts before this props are optional in "stat" type
                const defaultValue = stat.defaultValue || 0;
                const artifactValue = stat.artifactValue || 0;
                const passiveSkillEffectValue = stat.passiveSkillEffectValue || 0;
                const buffEffectValue = stat.buffEffectValue || 0;
                const debuffEffectValue = stat.debuffEffectValue || 0;

                stat.value = defaultValue + artifactValue + passiveSkillEffectValue + buffEffectValue - debuffEffectValue;
            })
    });

    // setStateValue('battleCards', battleCards);
}