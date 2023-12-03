import { enemyCards, potionCards, weaponCards, heroCard } from "./constants";
import {BattleCardType, PrimaryBattleCardType} from "./types";
import {
    getBottomCardIndex,
    getLeftCardIndex,
    getRightCardIndex,
    getTopCardIndex, hideSelectedCard,
    moveBattleCard,
    resetBattleCard
} from "./moveItems";

export const getBattleCardsWithHero = (gridLength: number): BattleCardType[] => {
    const battleCards = generateBattleCards();

    battleCards[0] = heroCard;

    return battleCards.splice(0, gridLength * gridLength);
};

const generateBattleCards = (): BattleCardType[] => {
    const battleCards: BattleCardType[] | any = [
        ...enemyCards,
        ...potionCards,
        ...weaponCards,
        ...enemyCards,
        ...potionCards,
        ...weaponCards
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
    gridLength: number
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
    recalculateHeroHealth(heroCard, selectedCardIndex, battleCards);

    hideSelectedCard(selectedCardIndex)
    // await moveBattleCard(heroCard.index, selectedCardIndex);
    const calcLastCardIndex = await resetBattleCard(heroCard.index, selectedCardIndex, battleCards, gridLength);
    battleCards[calcLastCardIndex] = newBattleCards[calcLastCardIndex];
    // battleCards[selectedCardIndex] = heroCard;
    // heroCard.index = selectedCardIndex;

    setBattleCards(battleCards);
};

const recalculateHeroHealth = (
    heroCard: BattleCardType,
    selectedCardIndex: number,
    battleCards: BattleCardType[]
) => {
    const selectedCard = battleCards[selectedCardIndex];

    if (selectedCard.type === 'enemy') {
        heroCard.health = heroCard.health - selectedCard.health;
    } else {
        heroCard.health = heroCard.health + selectedCard.health;
    }
};

export const getCardSizeInPercent = (gridLength: number): string => {
    return `${100/gridLength - 2}%`;
};
