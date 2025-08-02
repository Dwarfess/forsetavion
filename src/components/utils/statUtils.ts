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
                const positiveValue = stat.positiveValue || 0;
                const negativeValue = stat.negativeValue || 0;

                stat.value = defaultValue + artifactValue + positiveValue - negativeValue;
            })
    });

    // setStateValue('battleCards', battleCards);
}