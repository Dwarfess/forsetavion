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
import {getStateValue} from "../../store/storeUtils";

export const cardHandler = async (
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    setBattleCards: any,
    setIsMoving: (val: boolean) => void,
    setIsOpenBattleOverModal: (val: boolean) => void,
    setIsOpenSecretModal: (val: boolean) => void,
) => {
    const battleFieldLength = getStateValue('battleFieldLength');
    const cardAmount = battleFieldLength * battleFieldLength;

    if (selectedCardIndex < 0 || selectedCardIndex > cardAmount) {
        setIsMoving(false);
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
            heroCard,
            selectedCardIndex,
            clonedBattleCards,
            battleFieldLength,
            setBattleCards,
            setIsMoving,
            setIsOpenBattleOverModal,
            setIsOpenSecretModal
        );
    } else {
        await checkAndUseActiveSkill(heroCard, selectedCard, clonedBattleCards, false);
        setBattleCards(clonedBattleCards);
        setIsMoving(false);

        return;
    }
};

const resetBattleCards = async (
    heroCard: IHeroBattleCard,
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    gridLength: number,
    setBattleCards: (item: BattleCardType[]) => void,
    setIsMoving: (val: boolean) => void,
    setIsOpenBattleOverModal: (val: boolean) => void,
    setIsOpenSecretModal: (val: boolean) => void,
) => {
    const selectedCard = battleCards[selectedCardIndex];
    const activeSkill = getActiveSkill(heroCard);
    if (activeSkill) {
        await checkAndUseActiveSkill(heroCard, selectedCard, battleCards, true);
        setIsMoving(false);
        setBattleCards(battleCards);

        return;
    } else {
        if (selectedCard.type === 'secret') {
            selectedCard.active = true;

            setIsMoving(false);
            setBattleCards(battleCards);
            setIsOpenSecretModal(true);

            return;
        }

        recalculateHeroStatsAfterContact(heroCard, selectedCard);
        await addClassWhenContactCard(selectedCard);
        setBattleCards(battleCards);

        // MOVE THIS LOGIC TO BATTLE PAGE (AFTER DEBUFF HERO DOESN'T DIE)
        if (heroCard.health <= 0) {
            setIsMoving(false);
            setIsOpenBattleOverModal(true);

            return;
        }

        battleCards = structuredClone(battleCards);
        if (selectedCard.type === 'boss') {
            changeBattleCardAfterSkill(battleCards, selectedCard, heroCard);
        } else {
            await moveBattleCards(selectedCardIndex, battleCards, gridLength);

        }
    }

    checkBossSkillsReadyToUse(battleCards);
    checkBattleCardsEffects(battleCards);
    updateSkillsCoolDown(battleCards);

    // MOVE THIS LOGIC TO BATTLE PAGE (AFTER DEBUFF HERO DOESN'T DIE)
    if (getHeroCard(battleCards).health <= 0) {
        setIsMoving(false);
        setIsOpenBattleOverModal(true);

        return;
    }

    setBattleCards(battleCards);
    setIsMoving(false);
};
