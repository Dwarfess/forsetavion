import {
    enemyCards,
    potionCards,
    weaponCards,
    heroCard,
    newEnemyCards,
    newPotionCards,
    equipmentCards,
    secretCards, coinsCards
} from "./constants";
import {BattleCardType, HeroBattleCardType, PrimaryBattleCardType} from "./types";
import {
    getBottomCardIndex,
    getLeftCardIndex,
    getRightCardIndex,
    getTopCardIndex, hideSelectedCard,
    moveBattleCard, moveBattleCards,
    // resetBattleCard
} from "./moveItems";
import {addClassWhenContactCard} from "./contactItems";
import {recalculateHeroStatsAfterContact} from "./recalculateHeroStats";

export const getBattleCardsWithHero = (gridLength: number): (BattleCardType | HeroBattleCardType)[] => {

    const battleCards: (BattleCardType | HeroBattleCardType)[] = generateBattleCards(heroCard.level);

    battleCards[0] = heroCard;

    return battleCards.splice(0, gridLength * gridLength);
};

export const generateBattleCards = (heroLevel: number): BattleCardType[] => {
    const battleCards: any[] = [
        ...secretCards,
        ...newEnemyCards,
        ...newPotionCards,
        ...equipmentCards,
        ...newEnemyCards,
        ...newPotionCards,
        ...equipmentCards,
        ...coinsCards,
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, heroLevel),
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    battleCards.forEach((card: BattleCardType, index: number) => card.index = index);

    return battleCards;
};

const getRandomValue = (battleCard: PrimaryBattleCardType, heroLevel: number) => {
    const enemyDefaultValue = 5 * (1 + ((heroLevel - 1) / 5));

    const healthMap: any = {
        enemy: randomHealth(enemyDefaultValue),
        potion: randomHealth(10),
        coins: randomHealth(10),
        // boss:
    };

    // const limitedValue = battleCard.type === 'enemy' ? enemyDefaultHealth : 10;
    return healthMap[battleCard.type] || 0;
};

const randomHealth = (health: number) => Math.floor(Math.random() * health) + 1;

export const getHeroCard = (battleCards: BattleCardType[]): any => {
    return battleCards.find((card: BattleCardType) => card.type === 'hero');
}

export const cardHandler = (
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    setBattleCards: any,
    gridLength: number,
    setIsMoving: (val: boolean) => void,
    setIsOpenBattleOverModal: (val: boolean) => void,
) => {
    const clonedBattleCards = structuredClone(battleCards);

    const heroCard = getHeroCard(clonedBattleCards);

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
        resetBattleCards(
            heroCard,
            selectedCardIndex,
            clonedBattleCards,
            gridLength,
            setBattleCards,
            setIsMoving,
            setIsOpenBattleOverModal
        );
    } else {
        setIsMoving(false);
    }
};

const resetBattleCards = async (
    heroCard: HeroBattleCardType,
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    gridLength: number,
    setBattleCards: (item: BattleCardType[]) => void,
    setIsMoving: (val: boolean) => void,
    setIsOpenBattleOverModal: (val: boolean) => void,
) => {
    // const newBattleCards = generateBattleCards();
    const selectedCard = battleCards[selectedCardIndex];

    await recalculateHeroStatsAfterContact(heroCard, selectedCard);
    setBattleCards(battleCards);

    if (heroCard.health === 0) {
        setIsMoving(false);
        setIsOpenBattleOverModal(true);
        return;
    }
    console.log('You lose!')
    // hideSelectedCard(selectedCardIndex)
    // await moveBattleCard(heroCard.index, selectedCardIndex);
    // const calcLastCardIndex = await moveBattleCards(heroCard.index, selectedCardIndex, battleCards, gridLength);
    battleCards = structuredClone(battleCards);
    await moveBattleCards(heroCard, selectedCardIndex, battleCards, gridLength);
    // battleCards[calcLastCardIndex] = newBattleCards[calcLastCardIndex];
    // battleCards[selectedCardIndex] = heroCard;
    // heroCard.index = selectedCardIndex;

    setBattleCards(battleCards);
    setIsMoving(false);
};

export const getCardSizeInPercent = (gridLength: number): string => {
    return `${100/gridLength - 2}%`;
};
