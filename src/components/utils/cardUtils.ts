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

export const cardHandler = async (selectedCardIndex: number) => {
    const battleFieldLength = getStateValue('battleFieldLength');
    const cardAmount = battleFieldLength * battleFieldLength;

    if (selectedCardIndex < 0 || selectedCardIndex > cardAmount) {
        setStateValue('isMoving',false);
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
        setStateValue('isMoving',false);

        return;
    }

    if (allowedIndexes.includes(selectedCardIndex)) {
        resetBattleCards(selectedCardIndex);
    }
};

// TODO: should to refactor this large method
const resetBattleCards = async (selectedCardIndex: number) => {
    let battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);
    const selectedCard = battleCards[selectedCardIndex];
    // const activeSkill = getActiveSkill(heroCard);

    // if (activeSkill) {
    //     await checkAndUseActiveSkill(selectedCard, battleCards, true);
    //     await checkBattleCardsEffects(battleCards);
    //
    //     setStateValue('isMoving',false);
    //     setStateValue('battleCards', battleCards);
    //
    //     return;
    // } else {
    if (selectedCard.type === 'secret') {
        setStateValue('isMoving',false);
        setStateValue('battleCards', battleCards);
        setStateValue('selectedSecretCard', selectedCard);

        return;
    }

    recalculateHeroStatsAfterContact(heroCard, selectedCard);
    await addClassWhenContactCard(selectedCard);
    setStateValue('battleCards', battleCards);

    if (heroCard.health <= 0) {
        setStateValue('isMoving',false);
        setStateValue('isOpenBattleOverModal', true);

        return;
    }

    battleCards = structuredClone(battleCards);
    if (selectedCard.type === 'boss') {
        changeBattleCardAfterSkill(battleCards, selectedCard);
    } else {
        await moveBattleCards(selectedCardIndex, battleCards);
    }
    // }

    // TODO: add animation for boss effects
    checkBossSkillsReadyToUse(battleCards);
    await checkBattleCardsEffects(battleCards);
    updateSkillsCoolDown(battleCards);

    // MOVE THIS LOGIC TO BATTLE PAGE (AFTER DEBUFF HERO DOESN'T DIE)
    if (getHeroCard(battleCards).health <= 0) {
        setStateValue('isMoving',false);
        setStateValue('isOpenBattleOverModal', true);

        return;
    }

    setStateValue('battleCards', battleCards);
    setStateValue('isMoving',false);
};
