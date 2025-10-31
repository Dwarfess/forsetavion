import { BattleCardType } from '../types';
import {
    getBottomCardIndex,
    getLeftCardIndex,
    getRightCardIndex,
    getTopCardIndex,
    moveBattleCards,
} from './moveItems';

import { addClassWhenContactCard } from './contactItems';
import { recalculateHeroStatsAfterContact } from './recalculateHeroStats';
import {
    changeBattleCardAfterSkill,
    checkAndUseActiveSkill,
    checkBattleCardsEffects,
    checkBossSkillsReadyToUse,
    getActiveSkill,
    updateSkillsCoolDown
} from './skillUtils';

import { getHeroCard } from './utils';

import { getStateValue, setStateValue } from '../../store/storeUtils';
import { updateCurrentBattleAndResetActivePlayer } from '../home-map/multi-battle-page/multiBattleUtils';
import { recalculateHeroStatsWithPassiveSkills } from './statUtils';

export const cardHandler = async (selectedCardIndex: number) => {
    setStateValue('isProcessingAction', true);
    const battleFieldLength = getStateValue('battleFieldLength');
    const cardAmount = battleFieldLength * battleFieldLength;

    if (selectedCardIndex < 0 || selectedCardIndex > cardAmount) {
        setStateValue('isProcessingAction',false);
        return;
    }

    const battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);

    heroCard.topCardIndex = getTopCardIndex(heroCard.index, battleFieldLength);
    heroCard.bottomCardIndex = getBottomCardIndex(heroCard.index, battleFieldLength);
    heroCard.rightCardIndex = getRightCardIndex(heroCard.index, battleFieldLength);
    heroCard.leftCardIndex = getLeftCardIndex(heroCard.index, battleFieldLength);

    const allowedIndexes: any[] = [
        heroCard.topCardIndex,
        heroCard.bottomCardIndex,
        heroCard.rightCardIndex,
        heroCard.leftCardIndex
    ];


    const activeSkill = getActiveSkill(heroCard);
    if (activeSkill) {
        const selectedCard = battleCards[selectedCardIndex];
        const isUsedActiveSkill =
            await checkAndUseActiveSkill(selectedCard, battleCards, allowedIndexes.includes(selectedCardIndex));

        setStateValue('battleCards', battleCards);
        setStateValue('isProcessingAction',false);
        isUsedActiveSkill && setStateValue('actionCount', getStateValue('actionCount')+1);

        return;
    }

    if (allowedIndexes.includes(selectedCardIndex)) {
        resetBattleCards(selectedCardIndex);
    } else {
        setStateValue('isProcessingAction', false);
    }
};

// TODO: (checked) should refactor this large method
export const resetBattleCards = async (selectedCardIndex: number) => {
    let battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);
    const selectedCard = battleCards[selectedCardIndex];

    if (selectedCard.type === 'secret') {
        setStateValue('isProcessingAction',false);
        setStateValue('battleCards', battleCards);
        setStateValue('selectedSecretCard', selectedCard);

        return;
    }

    recalculateHeroStatsAfterContact(heroCard, selectedCard, battleCards);

    if (selectedCard.type === 'hero') {

        await addClassWhenContactCard(selectedCard);
        setStateValue('isProcessingAction',false);
        setStateValue('battleCards', battleCards);

        updateCurrentBattleAndResetActivePlayer({
            action: 'move',
            switchActivePlayer: true,
            selectedCardIndex
        });

        setStateValue('actionCount', getStateValue('actionCount')+1);
        return;
    }

    // from the part of code starts moving card
    setStateValue('isMoving', true);
    await addClassWhenContactCard(selectedCard);
    setStateValue('battleCards', battleCards);

    if (heroCard.value <= 0) {
        setStateValue('isProcessingAction',false);
        setStateValue('isOpenBattleOverModal', true);

        updateCurrentBattleAndResetActivePlayer({
            action: 'move',
            switchActivePlayer: true,
            selectedCardIndex
        });

        return;
    }

    battleCards = structuredClone(battleCards);

    let newBattleCard: any;
    if (selectedCard.type === 'boss') {
        newBattleCard = changeBattleCardAfterSkill(battleCards, selectedCard);
    } else {
        await moveBattleCards(selectedCardIndex, battleCards).then((result: BattleCardType) => {
            newBattleCard = result
        });
    }

    const heroSkillPoints = getHeroCard(battleCards).skillPoints;
    updateCurrentBattleAndResetActivePlayer({
        action: 'move',
        switchActivePlayer: !heroSkillPoints,
        battleCardFromAnotherPlayer: newBattleCard,
        selectedCardIndex
    });

    setStateValue('battleCards', battleCards);
    setStateValue('isProcessingAction',false);
    setStateValue('actionCount', getStateValue('actionCount')+1);

    if (heroSkillPoints && !getStateValue('isAnotherPlayerActive')) {
        setStateValue('isOpenLevelUpModal', true);
    } else {
        setStateValue('isMoving', false);
    }
};

export const executeMethodsAfterMoving = async (currentBattleCards: BattleCardType[]) => {
    setStateValue('isProcessingAction',true);

    const battleCards = structuredClone(currentBattleCards);
    await checkBossSkillsReadyToUse(battleCards);
    await checkBattleCardsEffects(battleCards);
    recalculateHeroStatsWithPassiveSkills(battleCards);
    updateSkillsCoolDown(battleCards);
    setStateValue('battleCards', battleCards);

    setStateValue('isProcessingAction',false);
    getHeroWithoutHealth(battleCards) && setStateValue('isOpenBattleOverModal', true);
}

const getHeroWithoutHealth = (battleCards: BattleCardType[]) => {
    const isHeroWithoutHealth = battleCards.find((battleCard) => {
        return battleCard.type === 'hero' && battleCard.value <= 0;
    });

    return !!isHeroWithoutHealth;
}
