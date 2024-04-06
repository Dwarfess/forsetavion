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

export const cardHandler = async (
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    setBattleCards: any,
) => {
    const battleFieldLength = getStateValue('battleFieldLength');
    const cardAmount = battleFieldLength * battleFieldLength;

    if (selectedCardIndex < 0 || selectedCardIndex > cardAmount) {
        setStateValue('isMoving',false);
        return;
    }

    const clonedBattleCards = structuredClone(battleCards);
    const heroCard = getHeroCard(clonedBattleCards);
    const selectedCard = clonedBattleCards[selectedCardIndex];

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

    if (allowedIndexes.includes(selectedCardIndex)) {
        resetBattleCards(
            selectedCardIndex,
            clonedBattleCards,
            setBattleCards,
        );
    } else {
        await checkAndUseActiveSkill(selectedCard, clonedBattleCards, false);
        setBattleCards(clonedBattleCards);
        setStateValue('isMoving',false);

        return;
    }
};

const resetBattleCards = async (
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    setBattleCards: (item: BattleCardType[]) => void,
) => {
    const heroCard = getHeroCard(battleCards);
    const selectedCard = battleCards[selectedCardIndex];
    const activeSkill = getActiveSkill(heroCard);
    if (activeSkill) {
        await checkAndUseActiveSkill(selectedCard, battleCards, true);
        setStateValue('isMoving',false);
        setBattleCards(battleCards);

        return;
    } else {
        if (selectedCard.type === 'secret') {
            setStateValue('isMoving',false);
            setBattleCards(battleCards);
            setStateValue('selectedSecretCard', selectedCard);

            return;
        }

        recalculateHeroStatsAfterContact(heroCard, selectedCard);
        await addClassWhenContactCard(selectedCard);
        setBattleCards(battleCards);

        //TODO MOVE THIS LOGIC TO BATTLE PAGE (AFTER DEBUFF HERO DOESN'T DIE)
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
    }

    checkBossSkillsReadyToUse(battleCards);
    checkBattleCardsEffects(battleCards);
    updateSkillsCoolDown(battleCards);

    // MOVE THIS LOGIC TO BATTLE PAGE (AFTER DEBUFF HERO DOESN'T DIE)
    if (getHeroCard(battleCards).health <= 0) {
        setStateValue('isMoving',false);
        setStateValue('isOpenBattleOverModal', true);

        return;
    }

    setBattleCards(battleCards);
    setStateValue('isMoving',false);
};
