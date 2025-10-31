import { getStateValue, setStateValue } from '../../store/storeUtils';
import { addClassWhenChangeHealth, executeMethodsAfterMoving, getHeroCard } from '../utils';
import { updateCurrentBattleAndResetActivePlayer } from '../home-map/multi-battle-page/multiBattleUtils';

export const changeTurnAfterTimer = async () => {
    if (getStateValue('isAnotherPlayerActive')) return;

    const battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);

    console.log('turn end for', heroCard.nickname)
    await decreaseHeroHealth();

    updateCurrentBattleAndResetActivePlayer({
        action: 'decreaseHeroHealth',
        switchActivePlayer: true
    });
}

export const decreaseHeroHealth = async () => {
    const battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);
    heroCard.value--;

    await addClassWhenChangeHealth(heroCard, 1, 'debuff');

    setStateValue('actionDataFromActivePlayer', {});
    setStateValue('battleCards', battleCards);
    setStateValue('actionCount', getStateValue('actionCount')+1);
}
