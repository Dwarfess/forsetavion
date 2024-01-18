import {
    heroCard,
    newEnemyCards,
    newPotionCards,
    secretCards, coinsCards, spheresCards, superCoinsCards, superPotionCards, artifactCards, bossPartCards, bossCards
} from "../constants";
import {BattleCardType, HeroBattleCardType, PrimaryBattleCardType} from "../types";
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
    const battleCards: (BattleCardType | HeroBattleCardType)[] = generateBattleCards(heroCard.level, gridLength);

    battleCards[0] = heroCard;

    return battleCards.splice(0, gridLength * gridLength);
};

export const generateBattleCards = (heroLevel: number, gridLength: number): BattleCardType[] => {
    const battleCards: any[] = [
        ...secretCards,
        ...secretCards,
        ...secretCards,
        ...secretCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        // ...secretCards,
        // ...secretCards,
        // ...secretCards,
        // ...secretCards,
        // ...secretCards,
        // ...secretCards,
        // ...secretCards,
        ...newEnemyCards,
        ...newEnemyCards,
        ...newPotionCards,
        ...newPotionCards,
        ...newPotionCards,
        ...coinsCards,
        ...coinsCards,
        ...coinsCards,
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, heroLevel, gridLength),
        level: heroLevel,
        expReward: calculateExpReward(battleCard.type),
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    battleCards.forEach((card: BattleCardType, index: number) => card.index = index);

    return battleCards;
};

const calculateExpReward = (battleCardType: string) => {
    const expRewardMap: any = {
        enemy: 10,
        boss: 30,
    };

    return expRewardMap[battleCardType] || 0;
}

export const generateSecretPrizeCards = (secretCard: BattleCardType) => {
    const battleCards: any[] = [
        // ...spheresCards,
        // ...superCoinsCards,
        // ...superPotionCards,
        ...artifactCards,
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, secretCard.level, 5),
        level: 1,
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    // battleCards.forEach((card: BattleCardType, index: number) => card.index = index);

    return battleCards;
};

export const generateBossCards = (heroLevel: number, gridLength: number) => {
    const battleCards: any[] = [
        ...bossCards,
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, heroLevel, gridLength),
        level: heroLevel,
        expReward: calculateExpReward(battleCard.type),
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    return battleCards;
};

const getRandomValue = (battleCard: PrimaryBattleCardType, heroLevel: number, gridLength: number) => {
    const defaultValue = gridLength;
    const calculatedValue = defaultValue * (1 + ((heroLevel - 1) / 5));

    const healthMap: any = {
        enemy: getRandomCardValue(calculatedValue),
        potion: getRandomCardValue(defaultValue * 2),
        coin: getRandomCardValue(calculatedValue),
        sphere: getRandomCardValue(calculatedValue),
        superPotion: 1000,
        superCoin: getRandomCardValue(calculatedValue * 10),
        boss: getBossValue(heroLevel, gridLength),
    };

    // const limitedValue = battleCard.type === 'enemy' ? enemyDefaultHealth : 10;
    return healthMap[battleCard.type] || 0;
};

const getRandomCardValue = (value: number) => Math.floor(Math.random() * value) + 1;
const getBossValue = (heroLevel: number, gridLength: number) => {
    return (heroLevel + gridLength - 2) * 2 ;
};

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
    setIsOpenSecretModal: (val: boolean) => void,
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
            setIsOpenBattleOverModal,
            setIsOpenSecretModal
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
    setIsOpenSecretModal: (val: boolean) => void,
) => {
    const selectedCard = battleCards[selectedCardIndex];

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

    if (heroCard.health === 0) {
        setIsMoving(false);
        setIsOpenBattleOverModal(true);

        return;
    }

    battleCards = structuredClone(battleCards);
    await moveBattleCards(heroCard, selectedCardIndex, battleCards, gridLength);

    setBattleCards(battleCards);
    setIsMoving(false);
};

export const getCardSizeInPercent = (gridLength: number): string => {
    return `${100/gridLength}%`;
};

export const getHeroScore = (heroCard: HeroBattleCardType) => {
    const levelPoints = heroCard.level * 100;
    const coinPoints = heroCard.coins * 5;
    const crystalPoints = heroCard.spheres * 20;

    return levelPoints + coinPoints + crystalPoints;
};
