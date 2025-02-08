import { getStateValue, setStateValue } from '../../store/storeUtils';
import { addClassWhenChangeHealth, getHeroCard } from '../utils';
import { updateCurrentBattleAndResetActivePlayer } from '../home-map/multi-battle-page/multiBattleUtils';

export const changeTurnAfterTimer = async () => {
    if (getStateValue('isAnotherPlayerActive')) return;

    const battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);

    console.log('turn end for', heroCard.nickname)
    await decreaseHeroHealth();

    updateCurrentBattleAndResetActivePlayer({ action: 'decreaseHeroHealth'});
}

export const decreaseHeroHealth = async () => {
    const battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);
    heroCard.health--;

    await addClassWhenChangeHealth(heroCard, 1, 'debuff');

    setStateValue('actionDataFromActivePlayer', {});
    setStateValue('battleCards', battleCards);
}
