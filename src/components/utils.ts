import { enemyCards, potionCards, weaponCards, heroCard, newEnemyCards, newPotionCards, equipmentCards } from "./constants";
import {BattleCardType, PrimaryBattleCardType} from "./types";
import {
    getBottomCardIndex,
    getLeftCardIndex,
    getRightCardIndex,
    getTopCardIndex, hideSelectedCard,
    moveBattleCard, moveBattleCards,
    // resetBattleCard
} from "./moveItems";
import {addClassWhenContactCard} from "./contactItems";

export const getBattleCardsWithHero = (gridLength: number): BattleCardType[] => {
    const battleCards = generateBattleCards();

    battleCards[0] = heroCard;

    return battleCards.splice(0, gridLength * gridLength);
};

export const generateBattleCards = (): BattleCardType[] => {
    const battleCards: BattleCardType[] | any = [
        ...newEnemyCards,
        ...newPotionCards,
        ...equipmentCards,
        ...newEnemyCards,
        ...newPotionCards,
        ...equipmentCards,
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        health: getRandomHealth(battleCard),
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    battleCards.forEach((card: BattleCardType, index: number) => card.index = index);

    return battleCards;
};

const getRandomHealth = (battleCard: PrimaryBattleCardType) => {
    const limitedValue = battleCard.type === 'enemy' ? 5 : 10;
    return Math.floor(Math.random() * limitedValue) + 1;
};

export const cardHandler = (
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    setBattleCards: any,
    gridLength: number,
    setIsMoving: (val: boolean) => void,
) => {
    const clonedBattleCards = structuredClone(battleCards);

    const heroCard = clonedBattleCards.find((card: BattleCardType) => card.type === 'hero');

    heroCard.topCardIndex = getTopCardIndex(heroCard.index, gridLength);
    heroCard.bottomCardIndex = getBottomCardIndex(heroCard.index, gridLength);
    heroCard.rightCardIndex = getRightCardIndex(heroCard.index, gridLength);
    heroCard.leftCardIndex = getLeftCardIndex(heroCard.index, gridLength);

    const allowedIndexes: any[] = [
        heroCard.topCardIndex,
        heroCard.bottomCardIndex,
        heroCard.rightCardIndex,
        heroCard.leftCardIndex
    ];

    if (allowedIndexes.includes(selectedCardIndex)) {
        resetBattleCards(heroCard, selectedCardIndex, clonedBattleCards, gridLength, setBattleCards);
    } else {
        setIsMoving(false);
    }
};

const resetBattleCards = async (
    heroCard: BattleCardType,
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    gridLength: number,
    setBattleCards: (item: BattleCardType[]) => void
) => {
    const newBattleCards = generateBattleCards();
    await recalculateHeroHealth(heroCard, selectedCardIndex, battleCards);
    setBattleCards(battleCards);
    // hideSelectedCard(selectedCardIndex)
    // await moveBattleCard(heroCard.index, selectedCardIndex);
    // const calcLastCardIndex = await moveBattleCards(heroCard.index, selectedCardIndex, battleCards, gridLength);
    battleCards = structuredClone(battleCards);
    await moveBattleCards(heroCard.index, selectedCardIndex, battleCards, gridLength);
    // battleCards[calcLastCardIndex] = newBattleCards[calcLastCardIndex];
    // battleCards[selectedCardIndex] = heroCard;
    // heroCard.index = selectedCardIndex;

    setBattleCards(battleCards);
};

const recalculateHeroHealth = async (
    heroCard: BattleCardType,
    selectedCardIndex: number,
    battleCards: BattleCardType[]
) => {
    const selectedCard = battleCards[selectedCardIndex];
    let audioName;

    if (selectedCard.type === 'enemy') {
        audioName = 'punch';
        heroCard.health = heroCard.health - selectedCard.health;
    } else {
        audioName = 'blob';
        heroCard.health = heroCard.health + selectedCard.health;
    }

    new Audio(`sounds/${audioName}.mp3`).play();
    await addClassWhenContactCard(selectedCard);
};

export const getCardSizeInPercent = (gridLength: number): string => {
    return `${100/gridLength - 2}%`;
};
