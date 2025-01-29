import {BattleCardType, IHeroBattleCard, PrimaryBattleCardType, Skill} from "../types";
import {
    getBottomCardIndex,
    getLeftCardIndex,
    getRightCardIndex,
    getTopCardIndex,
    moveBattleCards,
} from "./moveItems";

import {addClassWhenContactCard} from "./contactItems";
import {recalculateHeroStatsAfterContact} from "./recalculateHeroStats";
import {
    changeBattleCardAfterSkill,
    checkAndUseActiveSkill,
    checkBattleCardsEffects,
    checkBossSkillsReadyToUse,
    getActiveSkill,
    updateSkillsCoolDown
} from "./skillUtils";

import {getHeroCard} from "./utils";

import {getStateValue, setStateValue} from "../../store/storeUtils";
import {
    updateCurrentBattleAndResetActivePlayer
} from '../home-map/multi-battle-page/multiBattleUtils';

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
        await checkAndUseActiveSkill(selectedCard, battleCards, allowedIndexes.includes(selectedCardIndex));

        setStateValue('battleCards', battleCards);
        setStateValue('isProcessingAction',false);

        return;
    }

    if (allowedIndexes.includes(selectedCardIndex)) {
        resetBattleCards(selectedCardIndex);
    } else {
        setStateValue('isProcessingAction',false);
    }
};

// export const executeActionFromAnotherPlayer = (data: any) => {
//     // const character = getStateValue('character');
//     // if (character.nickname === data.nickname) return;
//
//     resetBattleCards(data.selectedCardIndex);
// };

// TODO: should to refactor this large method
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
            selectedCardIndex
        });

        return;
    }

    // from the part of code starts moving card
    setStateValue('isMoving',true);
    await addClassWhenContactCard(selectedCard);
    setStateValue('battleCards', battleCards);

    if (heroCard.health <= 0) {
        setStateValue('isProcessingAction',false);
        setStateValue('isOpenBattleOverModal', true);

        updateCurrentBattleAndResetActivePlayer({
            action: 'move',
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

    updateCurrentBattleAndResetActivePlayer({
        action: 'move',
        battleCardFromAnotherPlayer: newBattleCard,
        selectedCardIndex
    });
    // setStateValue('actionDataFromActivePlayer', {});
    // TODO: add animation for boss effects
    setStateValue('battleCards', battleCards);
    setStateValue('isProcessingAction',false);
    setStateValue('isMoving',false);
};

export const executeMethodsAfterMoving = async () => {
    setStateValue('isProcessingAction',true);

    let battleCards = getStateValue('battleCards');
    // TODO: add animation for boss effects
    checkBossSkillsReadyToUse(battleCards);
    await checkBattleCardsEffects(battleCards);
    updateSkillsCoolDown(battleCards);

    // TODO: MOVE THIS LOGIC TO BATTLE PAGE (AFTER DEBUFF HERO DOESN'T DIE)
    if (getHeroCard(battleCards).health <= 0) {
        setStateValue('isProcessingAction',false);
        setStateValue('isOpenBattleOverModal', true);

        return;
    }

    setStateValue('battleCards', battleCards);
    setStateValue('isProcessingAction',false);
}

