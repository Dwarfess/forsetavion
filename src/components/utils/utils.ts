import {
    defaultHeroCard,
    newEnemyCards,
    newPotionCards,
    secretCards,
    coinsCards,
    spheresCards,
    superCoinsCards,
    superPotionCards,
    artifactCards,
    bossPartCards,
    bossCards
} from "../constants";
import {BattleCardType, IHeroBattleCard, PrimaryBattleCardType, Skill} from "../types";
import {recalculateSkillsStatsAccordingLevel} from "./skillLevelUtils";
import {getStateValue, setStateValue} from "../../store/storeUtils";

export const getBattleCardsWithHero = (): (BattleCardType | IHeroBattleCard)[] => {
    const character = getStateValue('character');
    const heroCard = character.hero || defaultHeroCard;
    const battleCards: (BattleCardType | IHeroBattleCard)[] = generateBattleCards(heroCard.level);

    battleCards[0] = heroCard;

    const battleFieldLength = getStateValue('battleFieldLength');
    return battleCards.splice(0, battleFieldLength * battleFieldLength);
};

export const generateBattleCards = (heroLevel: number): BattleCardType[] => {
    const battleCards: any[] = [
        ...getMultiCards(secretCards, 2),
        ...getMultiCards(bossPartCards, 6),
        ...getMultiCards(newEnemyCards, 2),
        ...getMultiCards(newPotionCards, 8),
        ...getMultiCards(coinsCards, 8),
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, heroLevel),
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

export const generatePrizeCards = (selectedCardLevel: number) => {
    const artifactCardsAmount = 1 + Math.floor((selectedCardLevel / 4));
    const battleCards: any[] = [
        ...getMultiCards(spheresCards, 4),
        ...getMultiCards(superCoinsCards, 4),
        ...getMultiCards(superPotionCards, 4),
        ...getMultiCards(artifactCards, artifactCardsAmount),
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, selectedCardLevel),
        level: 1,
        effects: [],
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    // battleCards.forEach((card: BattleCardType, index: number) => card.index = index);

    return battleCards;
};

const getMultiCards = (battleCards: any[], amount: number) => {
    const cards = [];
    for (let i = 0; i < amount; i++) {
        cards.push(...structuredClone(battleCards));
    }

    return cards;
};

export const generateBossCards = (heroLevel: number) => {
    const battleCards: any[] = [
        ...structuredClone(bossCards),
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, heroLevel),
        level: heroLevel,
        expReward: calculateExpReward(battleCard.type),
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());
    battleCards.forEach((battleCard: BattleCardType) => {
        battleCard.skills.forEach((skill: Skill) => {
            skill.level = battleCard.level;
        });

        recalculateSkillsStatsAccordingLevel(battleCard.skills);
    });

    return battleCards;
};

const getRandomValue = (battleCard: PrimaryBattleCardType, heroLevel: number) => {
    const battleFieldLength = getStateValue('battleFieldLength');
    const defaultValue = battleFieldLength;
    const calculatedValue = defaultValue * (1 + ((heroLevel - 1) / 5));

    const healthMap: any = {
        enemy: getRandomCardValue(calculatedValue),
        potion: getRandomCardValue(defaultValue * 2),
        coin: getRandomCardValue(calculatedValue),
        sphere: getRandomCardValue(calculatedValue),
        superPotion: 1000,
        superCoin: getRandomCardValue(calculatedValue * 10),
        boss: getBossValue(heroLevel),
    };

    // const limitedValue = battleCard.type === 'enemy' ? enemyDefaultHealth : 10;
    return healthMap[battleCard.type] || 0;
};

const getRandomCardValue = (value: number) => Math.floor(Math.random() * value) + 1;
const getBossValue = (heroLevel: number) => {
    const battleFieldLength = getStateValue('battleFieldLength');
    return (heroLevel + battleFieldLength - 2) * 2 ;
};

export const getCardSizeInPercent = (): string => {
    const battleFieldLength = getStateValue('battleFieldLength');
    return `${100/battleFieldLength}%`;
};

export const getHeroScore = (heroCard: IHeroBattleCard): number => {
    const levelPoints = heroCard.level * 100;
    const coinPoints = heroCard.coins * 5;
    const crystalPoints = heroCard.spheres * 20;

    return levelPoints + coinPoints + crystalPoints;
};

export const recalculateCharacterParamsAfterBattle = (heroCard: IHeroBattleCard) => {
    const character = getStateValue('character');
    const coins = character.coins + heroCard.coins;
    const spheres = character.spheres + heroCard.spheres;

    const battleScore = getHeroScore(heroCard);
    const score = character.score > battleScore ? character.score : battleScore;

    setStateValue('character', {
        ...getStateValue('character'),
        coins, spheres, score
    })
}

export const getHeroCard = (battleCards: BattleCardType[]): any => {
    return battleCards.find((card: BattleCardType) => card.type === 'hero');
};
