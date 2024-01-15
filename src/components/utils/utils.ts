import {
    heroCard,
    newEnemyCards,
    newPotionCards,
    secretCards, coinsCards, spheresCards, superCoinsCards, superPotionCards, artifactCards, bossPartCards
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
        expReward: battleCard.type === 'enemy' ? 10 : 0,
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    battleCards.forEach((card: BattleCardType, index: number) => card.index = index);

    return battleCards;
};

export const generateSecretPrizeCard = (secretCard: BattleCardType) => {
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
}

const getRandomValue = (battleCard: PrimaryBattleCardType, heroLevel: number, gridLength: number) => {
    const defaultValue = gridLength;
    const enemyDefaultValue = defaultValue * (1 + ((heroLevel - 1) / 5));

    const healthMap: any = {
        enemy: randomHealth(enemyDefaultValue),
        potion: randomHealth(defaultValue * 3),
        coin: randomHealth(defaultValue * 3),
        sphere: randomHealth(defaultValue * 3),
        superPotion: 1000,
        superCoin: randomHealth(defaultValue * 30),
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
    return `${100/gridLength - 2}%`;
};

export const getHeroScore = (heroCard: HeroBattleCardType) => {
    const levelPoints = heroCard.level * 100;
    const coinPoints = heroCard.coins * 5;
    const crystalPoints = heroCard.spheres * 20;

    return levelPoints + coinPoints + crystalPoints;
};
