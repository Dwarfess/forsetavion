import { enemyCards, potionCards, weaponCards, heroCard } from "./constants";
import {BattleCardType, PrimaryBattleCardType} from "./types";

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
        resetBattleCards(heroCard, selectedCardIndex, clonedBattleCards, setBattleCards);
    }
};

const resetBattleCards = (
    heroCard: BattleCardType,
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    setBattleCards: (item: BattleCardType[]) => void
) => {
    const newBattleCards = generateBattleCards();
    recalculateHeroHealth(heroCard, selectedCardIndex, battleCards);

    moveBattleCard(heroCard.index, selectedCardIndex);

    battleCards[heroCard.index] = newBattleCards[heroCard.index];
    battleCards[selectedCardIndex] = heroCard;
    heroCard.index = selectedCardIndex;

    setBattleCards(battleCards);
};

const moveBattleCard = async (heroCardIndex: number, selectedCardIndex: number) => {

    // @ts-ignore
    document.querySelector(`.battle-card-${selectedCardIndex}`).style.display = 'none';
    await new Promise(() => setTimeout(() => {
        // @ts-ignore
        document.querySelector(`.battle-card-${heroCardIndex}`).classList.add('active');
        // @ts-ignore
        // document.querySelector(`.battle-card-${heroCardIndex}`).style.animationDuration = '8s';
    }, 100));
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

const getTopCardIndex = (currentCardIndex: number, gridLength: number) => {
    const newCardIndex = currentCardIndex - gridLength;

    return (newCardIndex >= 0) ? newCardIndex : null;
};

const getBottomCardIndex = (currentCardIndex: number, gridLength: number) => {
    const cardLength = gridLength * gridLength;
    const newCardIndex = currentCardIndex + gridLength;

    return (newCardIndex < cardLength) ? newCardIndex : null;
};

const getRightCardIndex = (currentCardIndex: number, gridLength: number) => {
    const newCardIndex = currentCardIndex + 1;

    return (!currentCardIndex || (currentCardIndex + 1) % gridLength) ? newCardIndex : null;
};

const getLeftCardIndex = (currentCardIndex: number, gridLength: number) => {
    const newCardIndex = currentCardIndex - 1;

    return (!newCardIndex || currentCardIndex % gridLength) ? newCardIndex : null;
};

export const getCardSizeInPercent = (gridLength: number): string => {
    return `${100/gridLength - 2}%`;
};

export const keyDownHandler = (
    key: string,
    battleCards: BattleCardType[],
    setBattleCards: (item: BattleCardType[]) => void,
    gridLength: number
) => {
    const allowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    if (!allowedKeys.includes(key)) return;

    const heroCardIndex: any = battleCards.find((card: BattleCardType) => card.type === 'hero')?.index;

    const keyMap: any = {
        ArrowRight: () => heroCardIndex + 1,
        ArrowLeft: () => heroCardIndex - 1,
        ArrowUp: () => heroCardIndex - gridLength,
        ArrowDown: () => heroCardIndex + gridLength,
    };

    const selectedCardIndex = keyMap[key]();
    const cardLength = gridLength * gridLength;

    if (selectedCardIndex >= 0 && selectedCardIndex < cardLength) {
        cardHandler(selectedCardIndex, battleCards, setBattleCards, gridLength);
    }
};
