import {
    defaultHeroCard,
    newEnemyCards,
    newPotionCards,
    secretCards, coinsCards, spheresCards, superCoinsCards, superPotionCards, artifactCards, bossPartCards, bossCards
} from "../constants";
import {BattleCardType, HeroBattleCardType, PrimaryBattleCardType, Skill} from "../types";

export const getBattleCardsWithHero = (gridLength: number): (BattleCardType | HeroBattleCardType)[] => {
    const heroCard = defaultHeroCard;
    const battleCards: (BattleCardType | HeroBattleCardType)[] = generateBattleCards(heroCard.level, gridLength);

    battleCards[0] = heroCard;

    return battleCards.splice(0, gridLength * gridLength);
};

export const generateBattleCards = (heroLevel: number, gridLength: number): BattleCardType[] => {
    const battleCards: any[] = [
        ...secretCards,
        ...secretCards,
        // ...secretCards,
        // ...secretCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        ...bossPartCards,
        // ...bossPartCards,
        // ...bossPartCards,
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
        skills: [],
        effects: [],
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
        ...spheresCards,
        ...superCoinsCards,
        ...superPotionCards,
        ...artifactCards,
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, secretCard.level, 5),
        level: 1,
        effects: [],
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

export const getCardSizeInPercent = (gridLength: number): string => {
    return `${100/gridLength}%`;
};

export const getHeroScore = (heroCard: HeroBattleCardType) => {
    const levelPoints = heroCard.level * 100;
    const coinPoints = heroCard.coins * 5;
    const crystalPoints = heroCard.spheres * 20;

    return levelPoints + coinPoints + crystalPoints;
};

export const getHeroCard = (battleCards: BattleCardType[]): any => {
    return battleCards.find((card: BattleCardType) => card.type === 'hero');
};
